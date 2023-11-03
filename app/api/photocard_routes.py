from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, Photocard, Review, User
from app.forms.photocard_form import PhotocardForm
from app.forms.review_form import ReviewForm
from .auth_routes import validation_errors_to_error_messages
from .aws_helpers import get_unique_filename, upload_file_to_s3, remove_file_from_s3

photocard_routes = Blueprint('photocards', __name__)

#Get all photocard listing
@photocard_routes.route('/')
def get_all_photocard():
    photocards = Photocard.query.all()
    return jsonify([photocard.to_dict() for photocard in photocards])

#Get a single photocard listing
@photocard_routes.route('/<int:id>')
def get_single_photocard(id):
    photocard = Photocard.query.get(id)
    if photocard:
        return photocard.to_dict()
    else:
        return {'error': 'Photocard listing does not exist'}, 404

#Create a photocard listing
@photocard_routes.route('/create', methods=['POST'])
@login_required
def create_photocard():
    form = PhotocardForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        photocard_image = form.data['photocard_image']
        photocard_image.filename = get_unique_filename(photocard_image.filename)
        upload = upload_file_to_s3(photocard_image)

        if 'url' not in upload:
            return {'errors': [upload]}

        new_photocard = Photocard(
            listing_name = form.data['listing_name'],
            user_id = form.data['user_id'],
            photocard_image = upload['url'],
            price = form.data['price'],
            description = form.data['description']
        )
        db.session.add(new_photocard)
        db.session.commit()
        return new_photocard.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400

#Update photocard listing
@photocard_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_photocard(id):
    form = PhotocardForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        photocard = Photocard.query.get(id)
        photocard.photocard_name = form.data['photocard_name']
        photocard.price = form.data['price']
        photocard.description = form.data['description']

        db.session.commit()
        return photocard.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400

#Delete photocard listing
@photocard_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_photocard(id):
    photocard = Photocard.query.get(id)
    if photocard:
        db.session.delete(photocard)
        db.session.commit()
        return 'Photocard listing is successfully deleted'
    else:
        return {'error': 'Photocard listing does not exist'}, 404


#Get all review for photocard listing
@photocard_routes.route('/<int:postId>/reviews', methods=['GET'])
def get_reviews(postId):
    photocard = Photocard.query.get(postId)
    if not photocard:
        return {'errors': 'Photocard listing does not exist'}, 404

    reviews = Review.query.filter_by(post_id=postId).all()
    reviews_dict = {}
    for review in reviews:
        data = review.to_dict()
        data['User'] = review.user.to_dict()
        reviews_dict[str(review.id)] = data

        return jsonify(reviews_dict), 200


#Post review for photocard listing
@photocard_routes.route('/<int:postId>/reviews', methods=['POST'])
@login_required
def create_review(postId):
    user = User.query.get(current_user.id)
    photocard = Photocard.query.get(postId)
    if not photocard:
        return {'errors': 'Review does not exist'}, 404

    data = request.get_json()
    data_text = data.get('review')
    form = ReviewForm(data={'text': data_text})
    form['csrf_token'].data = request.cookies['csrf_token']

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
