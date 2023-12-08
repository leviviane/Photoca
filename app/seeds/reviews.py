from app.models import db, Review, environment, SCHEMA
from datetime import date
from sqlalchemy.sql import text

def seed_reviews():
    review1 = Review (
        user_id = 2,
        # review_id = 1,
        photocard_id = 1,
        text = 'Smooth transaction',
        created_at = date.today()
    )
    db.session.add(review1)

    review2 = Review (
    user_id = 2,
    photocard_id = 1,
    text = 'LOVE MY CARD',
    created_at = date.today()
    )
    db.session.add(review2)

    review3 = Review (
    user_id = 1,
    photocard_id = 22,
    text = "Great transaction but wish the quality of this card was better",
    created_at = date.today()
    )
    db.session.add(review3)

    review4 = Review (
    user_id = 1,
    photocard_id = 5,
    text = "I have been on the hunt for this card at a reasonable price, so happy I found it",
    created_at = date.today()
    )
    db.session.add(review4)

    db.session.commit()



def undo_reviews():
    if environment == 'production':
          db.session.execute(f"TRUNCATE table {SCHEMA}.review RESTART IDENTITY CASCADE;")
    else:
      db.session.execute(text("DELETE FROM review"))

    db.session.commit()
