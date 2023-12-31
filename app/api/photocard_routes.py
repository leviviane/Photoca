from flask import Blueprint, request, jsonify, redirect
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
def photocard_drama():
    form = PhotocardForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        photocard_image = form.data['photocard_image']
        photocard_image.filename = get_unique_filename(photocard_image.filename)
        upload = upload_file_to_s3(photocard_image)

        if 'url' not in upload:
            return {'errors': [upload]}

        new_photocard = Photocard(
            user_id = form.data['user_id'],
            listing_name = form.data['listing_name'],
            photocard_image = upload['url'],
            price = form.data['price'],
            description = form.data['description']
        )
        db.session.add(new_photocard)
        db.session.commit()
        return new_photocard.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400

#Create a photocard listing
# @photocard_routes.route('/create', methods=['POST'])
# @login_required
# def new_photocard():
#     form = PhotocardForm()
#     form['csrf_token'].data = request.cookies['csrf_token']

#     if form.validate_on_submit():
#         photocard_image = form.data['photocard_image']
#         photocard_image.filename = get_unique_filename(photocard_image.filename)
#         upload = upload_file_to_s3(photocard_image)
#         url = upload['url']

#         # if 'url' not in upload:
#         #     return {'errors': upload}

#         photocard = Photocard(
#             user_id = form.data['user_id'],
#             listing_name = form.data['listing_name'],
#             price = form.data['price'],
#             description = form.data['description'],
#             image = url
#         )

#         db.session.add(photocard)
#         db.session.commit()

#         return {'resPost': photocard.to_dict()}
#     return {'errors': validation_errors_to_error_messages(form.errors)}, 400


#Update photocard listing
@photocard_routes.route('/<int:id>/update', methods=['PUT'])
@login_required
def update_photocard(id):
    form = PhotocardForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        photocard = Photocard.query.get(id)
        photocard.listing_name = form.data['listing_name']
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
    file_to_delete = remove_file_from_s3(photocard.photocard_image)

    if file_to_delete:
        db.session.delete(photocard)
        db.session.commit()
        return 'Photocard listing is successfully deleted'
    else:
        print(file_to_delete)
        return {'error': 'Photocard listing does not exist'}, 404
