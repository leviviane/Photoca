from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Review(db.Model):
    __tablename__ = 'reviews'

    if environment == 'production':
        __table_args__ = { 'schema': SCHEMA }

    id = db.Column(db.Integer, primary_key=True)
    photocard_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('photocards.id')))
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    text = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now(), nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.now(), nullable=False)

    user = db.relationship('User', back_populates='review')
    photocard = db.relationship('Photocard', back_populates='review')

    def to_dict(self):
        return {
            'id': self.id,
            'photocard_id': self.photocard_id,
            'user_id': self.user_id,
            'text': self.text,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
        }
