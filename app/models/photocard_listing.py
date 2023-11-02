from .db import db, environment, SCHEMA, add_prefix_for_prod

class Photocard_listing(db.Model):
    __tablename__ = 'photocard_listings'

    if environment == 'production':
        __table_args__ = { 'schema': SCHEMA }

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('user.id')), nullable=False)
    listing_name = db.Column(db.String, nullable=False)
    price = db.Column(db.Integer, nullable=False)
    description = db.Column(db.Text, nullable=False)
    photocard_image = db.Column(db.String, nullable=False)

    user = db.relationship('User', back_populates='photocard_listing')
    reviews = db.relationship('Review', back_populates='photocard_listing')

    def to_dict(self):
        return {
            'id': self.id,
            'listing_name': self.listing_name,
            'user_id': self.user_id,
            'price': self.price,
            'description': self.description,
            'photocard_image': self.photocard_image
        }
