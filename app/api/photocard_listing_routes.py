from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, PhotocardListing, Review, User
from app.forms.photocard_listing_form import PhotocardListingForm
from app.forms.review_form import ReviewForm
from .auth_routes import validation_errors_to_error_messages
from .aws_helpers import get_unique_filename, upload_file_to_s3, remove_file_from_s3

photocard_listing_routes = Blueprint('photocard_listing', __name__)

#Get all photocard listing
@photocard_listing_routes.route('/', methods=['GET'])
def get_all_photocard_listing():
    photocard_listings = PhotocardListing.query.all()
    return jsonify([photocard_listing.to_dict() for photocard_listing in photocard_listings])

#Get a single photocard listing
@photocard_listing_routes.route('/<int:id>')
def get_single_photocard_listing(id):
    photocard_listing = PhotocardListing.query.get(id)
    if photocard_listing:
        return photocard_listing.to_dict()
    else:
        return {'error': 'Photocard listing does not exist'}, 404

#Create a photocard listing
@photocard_listing_routes.route('/create_listing', methods=['POST'])
@login_required
def create_listing():
    form = PhotocardListingForm
    form['csrf_token'].data = request.cookie['csrf_token']
    if form.validate_on_submit():
        photocard_image = form.data['photocard_image']
        photocard_image.filename = get_unique_filename(photocard_image.filename)
        upload = upload_file_to_s3(photocard_image)

        if 'url' not in upload:
            return {'errors': [upload]}

        new_photocard_listing = PhotocardListing(
            listing_name = form.data['listing_name'],
            price = form.data['price'],
            description = form.data['description'],
            photocard_image = upload['url']
        )
        db.session.add(new_photocard_listing)
        db.session.commit()
        return new_photocard_listing.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400

#Update photocard listing
@photocard_listing_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_photocard_listing(id):
    form = PhotocardListingForm
    form['csrf_token'].data = request.cookie['csrf_token']

    if form.validate_on_submit():
        photocard_listing = PhotocardListing.query.get(id)
        photocard_listing.photocard_name = form.data['photocard_name']
        photocard_listing.price = form.data['price']
        photocard_listing.description = form.data['description']

        db.session.commit()
        return photocard_listing.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400

#Delete photocard listing
@photocard_listing_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_photocard_listing(id):
    photocard_listing = PhotocardListing.query.get(id)
    if photocard_listing:
        db.session.delete(photocard_listing)
        db.session.commit()
        return 'Photocard listing is successfully deleted'
    else:
        return {'error': 'Photocard listing does not exist'}, 404



#Get all review for photocard listing
@photocard_listing_routes.route('/<int:postId>/reviews', methods=['GET'])
def get_reviews(postId):
    photocard_listing = PhotocardListing.query.get(postId)
    if not photocard_listing:
        return {'errors': 'Photocard listing does not exist'}, 404

    reviews = Review.query.filter_by(post_id=postId).all()
    reviews_dict = {}
    for review in reviews:
        data = review.to_dict()
        data['User'] = review.user.to_dict()
        reviews_dict[str(review.id)] = data

        return jsonify(reviews_dict), 200


#Post review for photocard listing
@photocard_listing_routes.route('/<int:postId>/reviews', methods=['POST'])
@login_required
def create_review(postId):
    user = User.query.get(current_user.id)
    photocard_listing = PhotocardListing.query.get(postId)
    if not photocard_listing:
        return {'errors': 'Review does not exist'}, 404

    data = request.get_json()
    data_text = data.get('review')
    form = ReviewForm(data={'text': data_text})
    form['csrf_token'].data = request.cookie['csrf_token']

    if form.validate_on_submit():
        new_review = Review (
            post_id = postId,
            user_id = user.id,
            text = form.data['text']
        )
        db.session.add(new_review)
        db.session.commit()

        return jsonify(new_review.to_dict()), 201

    return {'errors': form.errors}, 400
