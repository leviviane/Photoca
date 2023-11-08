from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, Review, Photocard
from app.forms.review_form import ReviewForm
from .auth_routes import validation_errors_to_error_messages
from .aws_helpers import get_unique_filename, upload_file_to_s3, remove_file_from_s3

review_routes = Blueprint('reviews', __name__)

#Get all review for photocard listing
@review_routes.route('/<int:photocardId>', methods=['GET'])
def get_reviews(photocardId):
    photocard = Photocard.query.get(photocardId)
    if not photocard:
        return {'errors': 'Photocard listing does not exist'}, 404

    reviews = Review.query.filter_by(photocard_id=photocardId).all()
    return jsonify([review.to_dict() for review in reviews])
    # reviews_dict = {}
    # for review in reviews:
    #     data = review.to_dict()
    #     data['User'] = review.user.to_dict()
    #     reviews_dict[str(review.id)] = data

    #     return jsonify(reviews_dict), 200


#Post review for photocard listing
@review_routes.route('/<int:reviewId>', methods=['POST'])
@login_required
def create_review(reviewId):
    user = User.query.get(current_user.id)
    photocard = Photocard.query.get(reviewId)
    if not photocard:
        return {'errors': 'Review does not exist'}, 404

    data = request.get_json()
    data_text = data.get('review')
    form = ReviewForm(data={'text': data_text})
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_review = Review (
            post_id = reviewId,
            user_id = user.id,
            text = form.data['text']
        )
        db.session.add(new_review)
        db.session.commit()

        return jsonify(new_review.to_dict()), 201

    return {'errors': form.errors}, 400


#Update review
@review_routes.route('/<int:reviewId>', methods=['PUT'])
@login_required
def update_review(reviewId):
    review = Review.query.get(reviewId)

    if not review:
        return {'error': 'Review does not exist'}, 404

    if review.user_id != current_user.id:
        return {'error': 'Unauthorized user'}, 401

    data = request.get_json()
    data_text = data.get('review')

    form = ReviewForm(data={'text': data_text})
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        review.text = form.data['text']

        new_review = {}
        copy = review.to_dict()
        copy['User'] = review.user.to_dict()
        new_review[str(review.id)] = copy

        db.session.commit()
        return jsonify(new_review), 200

    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

#Delete review
@review_routes.route('/<int:reviewId>', methods=['DELETE'])
@login_required
def delete_review(reviewId):
    review = Review.query.get(reviewId)
    if not review:
        return {'error': 'Review does not exist'}, 404
    if review.user_id != current_user.id:
        return {'error': 'Unauthorized user'}, 401

    db.session.delete(review)
    db.session.commit()

    return {'message': 'Review successfully deleted'}
