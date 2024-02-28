from app.models import db, Photocard, environment, SCHEMA
from sqlalchemy.sql import text

def seed_photocard():
    photocard1 = Photocard (
        user_id=1,
        listing_name='Heeseung D:D Charybdis',
        price=5.00,
        description='Heeseung Dimension: Dilemma Charybdis album version',
        photocard_image='https://imgur.com/0uh5MyR'
    )
    db.session.add(photocard1)

    photocard2 = Photocard (
        user_id=1,
        listing_name='Heeseung Darkblood Era',
        price=10.00,
        description='Heeseung Darkblood Weverse US album photocard',
        photocard_image='https://imgur.com/CBMPFCW'
    )
    db.session.add(photocard2)

    photocard3 = Photocard (
        user_id=1,
        listing_name='Specs Heeseung',
        price=50.00,
        description='Border:Hakanai Heeseung, solo jacket version',
        photocard_image='https://imgur.com/undefined'
    )
    db.session.add(photocard3)

    photocard4 = Photocard (
    user_id=2,
    listing_name='Teddywon',
    price=25.00,
    description='Border:Carnival Jungwon, hybe version',
    photocard_image='https://imgur.com/VpoPGaj'
    )
    db.session.add(photocard4)

    photocard5 = Photocard (
    user_id=2,
    listing_name='Peace sign Jungwon',
    price=50.00,
    description='Border:Hakanai Jungwon, solo jacket version',
    photocard_image='https://imgur.com/g2nHmXs'
    )
    db.session.add(photocard5)

    photocard6 = Photocard (
    user_id=2,
    listing_name='Dark Blood Jungwon',
    price=5.00,
    description='Dark Blood Weverse Global POB',
    photocard_image='https://imgur.com/CzXLHqR'
    )
    db.session.add(photocard6)

    photocard7 = Photocard (
    user_id=3,
    listing_name='Piston Jersey Jay',
    price=65.00,
    description='2023 JPFC PC, 1000 copies',
    photocard_image='https://imgur.com/Qgz0vjQ'
    )
    db.session.add(photocard7)

    photocard8 = Photocard (
    user_id=3,
    listing_name='Jay with Pink Rose',
    price=15.00,
    description='Darkblood era Jay Yizhiyu benefit lucky draw R2',
    photocard_image='https://imgur.com/rd9Yw4B'
    )
    db.session.add(photocard8)

    photocard9 = Photocard (
    user_id=3,
    listing_name='Hybe Insight Jay',
    price=30.00,
    description='Hybe Insight lucky draw Jay',
    photocard_image='https://imgur.com/jUNrh3S'
    )
    db.session.add(photocard9)

    photocard10 = Photocard (
    user_id=4,
    listing_name='Skateboard Jake',
    price=20.00,
    description='Memories: Step 2 Weverse POB, translucent card',
    photocard_image='https://imgur.com/sCYiLiH'
    )
    db.session.add(photocard10)

    photocard11 = Photocard (
    user_id=4,
    listing_name='Prince Jake',
    price=15.00,
    description='Engene Zone, Manifesto Japan in Kyocera Dome',
    photocard_image='https://imgur.com/XyUtHRQ'
    )
    db.session.add(photocard11)

    photocard12 = Photocard (
    user_id=4,
    listing_name='Jake Half Heart',
    price=5.00,
    description='You Album, Limited B version',
    photocard_image='https://imgur.com/xGLJyE6'
    )
    db.session.add(photocard12)

    photocard13 = Photocard (
    user_id=1,
    listing_name='Sunghoon Message Card',
    price=7.00,
    description='Dark Blood New version, Message pc',
    photocard_image='https://imgur.com/xGLJyE6'
    )
    db.session.add(photocard13)

    photocard14 = Photocard (
    user_id=1,
    listing_name='Sunghoon Cookie',
    price=11.00,
    description='Manifesto:Day 1, Regurlar J version',
    photocard_image='https://imgur.com/d4VjpFh'
    )
    db.session.add(photocard14)

    photocard15 = Photocard (
    user_id=1,
    listing_name='Sunghoon Half Heart',
    price=15.00,
    description='Manifesto:Day 1, Weverse Global',
    photocard_image='https://imgur.com/j1hUc3j'
    )
    db.session.add(photocard15)

    photocard16 = Photocard (
    user_id=2,
    listing_name='Sunoo Finger Heart',
    price=15.00,
    description='Sunoo D:D Charybdis',
    photocard_image='https://imgur.com/gXGsRfT'
    )
    db.session.add(photocard16)

    photocard17 = Photocard (
    user_id=2,
    listing_name='Peace Sign Sunoo',
    price=5.00,
    description='You Era, HMV lucky draw',
    photocard_image='https://imgur.com/Rfa92hb'
    )
    db.session.add(photocard17)

    photocard18 = Photocard (
    user_id=2,
    listing_name='Dark Blood era Sunoo',
    price=5.00,
    description='Dark Blood Full version, Message pc',
    photocard_image='https://imgur.com/YMxTKfJ'
    )
    db.session.add(photocard18)

    photocard19 = Photocard (
    user_id=3,
    listing_name='Ni-Ki Peace Sign',
    price=12.00,
    description='Manifesto:Day1 Weverse version',
    photocard_image='https://imgur.com/wZVf6wH'
    )
    db.session.add(photocard19)

    photocard20 = Photocard (
    user_id=3,
    listing_name='Ni-Ki JPFC',
    price=65.00,
    description='2023 JPFC PC, 1000 copies',
    photocard_image='https://imgur.com/HJrhQSz'
    )
    db.session.add(photocard20)

    photocard21 = Photocard (
    user_id=3,
    listing_name='Red String Ni-Ki',
    price=7.00,
    description='You album, Weverse POB',
    photocard_image='https://imgur.com/Z6L4U8z'
    )
    db.session.add(photocard21)

    photocard22 = Photocard (
    user_id=4,
    listing_name='Enhypen D:D',
    price=25.00,
    description='Enhypen D:D era broadcast card',
    photocard_image='https://imgur.com/DYv9fDj'
    )
    db.session.add(photocard22)

    photocard23 = Photocard (
    user_id=4,
    listing_name='Enhypen Abib',
    price=2.00,
    description='Enhypen & Abib PC',
    photocard_image='https://imgur.com/7RPxa8o'
    )
    db.session.add(photocard23)

    photocard24 = Photocard (
    user_id=4,
    listing_name='Enhypen',
    price=2.00,
    description='Dimension: Answer era, Weverse Global pob, normal photocard',
    photocard_image='https://imgur.com/YJ5IgpR'
    )
    db.session.add(photocard24)




    db.session.commit()

def undo_photocard():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.photocard RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM photocard"))

    db.session.commit()
