from .db import db, environment, SCHEMA, add_prefix_for_prod

class Favorite(db.Model):
    __tablename__ = 'favorites'

    if environment == 'production':
        __table_args__ = { 'schema': SCHEMA }

        id = db.Column(db.Integer, primary_key=True)
        photocard_listing_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('post_id')), nullable=False)
        user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('post_id')), nullable=False)

    user = db.relationship('User', back_populates='favorites')
    photocard_listing = db.relationship('PhotocardListing', back_populates='favorites')
    photocard_image = db.relationship('PhotocardImage', back_populates='favorite')
