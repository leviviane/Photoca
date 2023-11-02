from app.models import db, Review, environment, SCHEMA
from datetime import date
from sqlalchemy.sql import text

def seed_review():
    review1 = Review (
        user_id = 1,
        post_id = 1,
        text = 'Smooth transaction',
        created_at = date.today()
    )
    db.session.add(review1)

    db.session.commit()

    def undo_review():
        if environment == "production":
            db.session.execute(f"TRUNCATE table {SCHEMA}.review RESTART IDENTITY CASCADE;")
        else:
            db.session.execute(text("DELETE FROM review"))
            db.session.commit()
