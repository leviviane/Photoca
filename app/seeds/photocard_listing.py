from app.models import db, Photocard_listing, environment, SCHEMA
from sqlalchemy.sql import text

def seed_photocard_listing():
    photocard1 = Photocard_listing (
        user_id=1,
        photocard_name='Heeseung D:D Charybdis',
        price='5.00',
        description='Heeseung Dimension: Dilemma Charybdis album version',
        photocard_image='https://cdn.discordapp.com/attachments/1154550284698263596/1169425070305849375/IMG_5642.png?ex=65555af7&is=6542e5f7&hm=da6d51cb47479cb1c43988b288804ac12d1c4f082cf8690056ad6c9f6afbad70&'
    )
    db.session.add(photocard1)

    photocard2 = Photocard_listing (
        user_id=1,
        photocard_name='Heeseung D:D Guitar',
        price='7.00',
        description='Heeseung hologram D:D',
        photocard_image='https://cdn.discordapp.com/attachments/1154550284698263596/1169426093325959219/IMG_5643.png?ex=65555beb&is=6542e6eb&hm=950340a4dc9e971bb88a11cd268e9710d871e0acb65d68e7eb6e14d7d4ef96dd&'
    )
    db.session.add(photocard2)

    photocard3 = Photocard_listing (
        user_id=2,
        photocard_name='Heeseung Darkblood Era',
        price='10.00',
        description='Heeseung Darkblood Weverse US album photocard',
        photocard_image='https://cdn.discordapp.com/attachments/1154550284698263596/1169427076714074253/IMG_5645.png?ex=65555cd5&is=6542e7d5&hm=ba2a08587ed1076712ff32a9bcf736d48fe5a3cd28183a37a1f01d5c757e327b&'
    )
    db.session.add(photocard3)

    photocard4 = Photocard_listing (
        user_id=2,
        photocard_name='Heeseung with Pink Rose',
        price='20.00',
        description='Darkblood era Heeseung Yizhiyu benefit lucky draw R2',
        photocard_image='https://cdn.discordapp.com/attachments/1154550284698263596/1169427064835805285/IMG_5646.png?ex=65555cd3&is=6542e7d3&hm=c7816ce66680bdc10aef927d439edbab2a11f76d522572ca57a154732f0fc221&'
    )
    db.session.add(photocard4)

    photocard5 = Photocard_listing (
        user_id=3,
        photocard_name='Specs Heeseung',
        price='50.00',
        description='Border:Hakanai Heeseung, solo jacket version',
        photocard_image='https://cdn.discordapp.com/attachments/1154550284698263596/1169428949210763364/IMG_5647.png?ex=65555e94&is=6542e994&hm=9231aa886b2c0faecafec38603644d7047ff7d6ffe4eab43321ce3c3b713e71b&'
    )
    db.session.add(photocard5)

    photocard6 = Photocard_listing (
        user_id=3,
        photocard_name='School Uniform Heeseung',
        price='10.00',
        description='Manifest:Day1 Lazada R2',
        photocard_image='https://cdn.discordapp.com/attachments/1154550284698263596/1169428955288309790/IMG_5648.png?ex=65555e95&is=6542e995&hm=7bf96f4d150f88cdaa71ce8174e99e59c8b03f9154dc2f02e1fc50c917bec7a6&'
    )
    db.session.add(photocard6)

    photocard7 = Photocard_listing (
    user_id=3,
    photocard_name='Holo Manifesto:Day1 Heeseung',
    price='15.00',
    description='Manifest:Day1 Weverse Global hologram photocard',
    photocard_image='https://cdn.discordapp.com/attachments/1154550284698263596/1169428961609130074/IMG_5650.png?ex=65555e97&is=6542e997&hm=82b23309266fa332a368299da7452af222ce63cb1e234448463ee438327d7b95&'
    )
    db.session.add(photocard7)

    photocard8 = Photocard_listing (
    user_id=3,
    photocard_name='Border:Carnival Broadcast Heeseung',
    price='150.00',
    description='Broadcast Heeseung from Border:Carnival era. Only 200 copies',
    photocard_image='https://cdn.discordapp.com/attachments/1154550284698263596/1169428967342743642/IMG_5651.png?ex=65555e98&is=6542e998&hm=e493996c6d76157ca520c624647b6dc991d34457e8ad80efceb001fd298448ba&'
    )
    db.session.add(photocard8)

    db.session.commit()

def undo_photocard_listing():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.photocard_listing RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM photocard_listing"))

    db.session.commit()
