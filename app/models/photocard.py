from .db import db, environment, SCHEMA, add_prefix_for_prod

class Photocard(db.Model):
    __tablename__ = 'photocards'

    if environment == 'production':
        __table_args__ = { 'schema': SCHEMA }

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    listing_name = db.Column(db.String, nullable=False)
    price = db.Column(db.Numeric, nullable=False)
    description = db.Column(db.Text, nullable=False)
    photocard_image = db.Column(db.String, nullable=False)

    user = db.relationship('User', back_populates='photocard')
    review = db.relationship('Review', back_populates='photocard')
    favorite = db.relationship('Favorite', back_populates='photocard')

    def to_dict(self):
        return {
            'id': self.id,
            'listing_name': self.listing_name,
            'user_id': self.user_id,
            'price': self.price,
            'description': self.description,
            'photocard_image': self.photocard_image
        }
