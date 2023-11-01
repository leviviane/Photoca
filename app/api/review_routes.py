from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, Review
from app.forms.review_form import ReviewForm
from .auth_routes import validation_errors_to_error_messages
from .aws_helpers import get_unique_filename, upload_file_to_s3, remove_file_from_s3

review_routes = Blueprint('review', __name__)

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
    form['csrf_token'].data = request.cookie['csrf_token']
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
