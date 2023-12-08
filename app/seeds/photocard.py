from app.models import db, Photocard, environment, SCHEMA
from sqlalchemy.sql import text

def seed_photocard():
    photocard1 = Photocard (
        user_id=1,
        listing_name='Heeseung D:D Charybdis',
        price=5.00,
        description='Heeseung Dimension: Dilemma Charybdis album version',
        photocard_image='https://cdn.discordapp.com/attachments/1154550284698263596/1169425070305849375/IMG_5642.png?ex=65555af7&is=6542e5f7&hm=da6d51cb47479cb1c43988b288804ac12d1c4f082cf8690056ad6c9f6afbad70&'
    )
    db.session.add(photocard1)

    photocard2 = Photocard (
        user_id=1,
        listing_name='Heeseung Darkblood Era',
        price=10.00,
        description='Heeseung Darkblood Weverse US album photocard',
        photocard_image='https://cdn.discordapp.com/attachments/1154550284698263596/1169427076714074253/IMG_5645.png?ex=65555cd5&is=6542e7d5&hm=ba2a08587ed1076712ff32a9bcf736d48fe5a3cd28183a37a1f01d5c757e327b&'
    )
    db.session.add(photocard2)

    photocard3 = Photocard (
        user_id=1,
        listing_name='Specs Heeseung',
        price=50.00,
        description='Border:Hakanai Heeseung, solo jacket version',
        photocard_image='https://cdn.discordapp.com/attachments/1154550284698263596/1169428949210763364/IMG_5647.png?ex=65555e94&is=6542e994&hm=9231aa886b2c0faecafec38603644d7047ff7d6ffe4eab43321ce3c3b713e71b&'
    )
    db.session.add(photocard3)

    photocard4 = Photocard (
    user_id=2,
    listing_name='Peace sign Jungwon',
    price=50.00,
    description='Border:Hakanai Jungwon, solo jacket version',
    photocard_image='https://media.discordapp.net/attachments/1154550284698263596/1182460434834530364/IMG_6108.png?ex=6584c718&is=65725218&hm=f83a3a52391e101647072e43a32c9e4ec88b4191a4fc7586913c4cb704342ffe&=&width=635&height=1007'
    )
    db.session.add(photocard4)

    photocard5 = Photocard (
    user_id=2,
    listing_name='Teddywon',
    price=25.00,
    description='Border:Carnival Jungwon, hybe version',
    photocard_image='https://media.discordapp.net/attachments/1154550284698263596/1182460435157483610/IMG_6109.png?ex=6584c718&is=65725218&hm=d6f4885bc21bd712d4c0d0a6b7ffa0b52a6d423e69bfb4cbf9160258a874d2b5&=&width=624&height=1005'
    )
    db.session.add(photocard5)

    photocard6 = Photocard (
    user_id=2,
    listing_name='Dark Blood Jungwon',
    price=5.00,
    description='Dark Blood Weverse Global POB',
    photocard_image='https://media.discordapp.net/attachments/1154550284698263596/1182460435488849950/IMG_6111.png?ex=6584c718&is=65725218&hm=3881c7f1989541e6cac1518dea1441bbf8f64a2d68373aacac844276fe5dd4b0&=&width=629&height=1007'
    )
    db.session.add(photocard6)

    photocard7 = Photocard (
    user_id=3,
    listing_name='Piston Jersey Jay',
    price=65.00,
    description='2023 JPFC PC, 1000 copies',
    photocard_image='https://media.discordapp.net/attachments/1154550284698263596/1182460473174655096/IMG_6115.png?ex=6584c721&is=65725221&hm=424b0c87ef854920993fea12ff05dc8940f78597a335babc4afc5c8e78d22325&=&width=629&height=1007'
    )
    db.session.add(photocard7)

    photocard8 = Photocard (
    user_id=3,
    listing_name='Jay with Pink Rose',
    price=15.00,
    description='Darkblood era Jay Yizhiyu benefit lucky draw R2',
    photocard_image='https://media.discordapp.net/attachments/1154550284698263596/1182460473493434528/IMG_6116.png?ex=6584c721&is=65725221&hm=4ce8c6c49fb557f3fb5c25d85802847b98f12391bf0968d83e3e9978564db37b&=&width=616&height=1007'
    )
    db.session.add(photocard8)

    photocard9 = Photocard (
    user_id=3,
    listing_name='Hybe Insight Jay',
    price=30.00,
    description='Hybe Insight lucky draw Jay',
    photocard_image='https://media.discordapp.net/attachments/1154550284698263596/1182460473828970627/IMG_6118.png?ex=6584c722&is=65725222&hm=5f2254c96c748628204487c5cf2f5f95c2204246cb35bd94651de6f716187fad&=&width=490&height=787'
    )
    db.session.add(photocard9)

    photocard10 = Photocard (
    user_id=4,
    listing_name='Skateboard Jake',
    price=20.00,
    description='Memories: Step 2 Weverse POB, translucent card',
    photocard_image='https://media.discordapp.net/attachments/1154550284698263596/1182460490165796984/IMG_6124.png?ex=6584c725&is=65725225&hm=ac3cfac53cf02f2e8aa1d0357b33362bbb35390adf13309e29ddf29a7f7463a0&=&width=622&height=1007'
    )
    db.session.add(photocard10)

    photocard11 = Photocard (
    user_id=4,
    listing_name='Prince Jake',
    price=15.00,
    description='Engene Zone, Manifesto Japan in Kyocera Dome',
    photocard_image='https://media.discordapp.net/attachments/1154550284698263596/1182460490908184646/IMG_6126.png?ex=6584c726&is=65725226&hm=41645f8989fca0ce0e71bc3439301b4af53ee379ecd3f1a3d9a246ccd6c77df7&=&width=622&height=1007'
    )
    db.session.add(photocard11)

    photocard12 = Photocard (
    user_id=4,
    listing_name='Jake Half Heart',
    price=5.00,
    description='You Album, Limited B version',
    photocard_image='https://media.discordapp.net/attachments/1154550284698263596/1182460490492940419/IMG_6125.png?ex=6584c725&is=65725225&hm=1597f6f0477404f344d44a0c129e4b212486e58d1b63a41e7ed1cfddc774ab50&=&width=629&height=1005'
    )
    db.session.add(photocard12)

    photocard13 = Photocard (
    user_id=1,
    listing_name='Sunghoon Message Card',
    price=7.00,
    description='Dark Blood New version, Message pc',
    photocard_image='https://media.discordapp.net/attachments/1154550284698263596/1182460503272996955/IMG_6130.png?ex=6584c729&is=65725229&hm=a497f0168e2f04ad318dde680e2c40e4a6e540c45dd9a1172626ae0ee25dc07f&=&width=633&height=1007'
    )
    db.session.add(photocard13)

    photocard14 = Photocard (
    user_id=1,
    listing_name='Sunghoon Cookie',
    price=11.00,
    description='Manifesto:Day 1, Regurlar J version',
    photocard_image='https://media.discordapp.net/attachments/1154550284698263596/1182460503612723300/IMG_6131.png?ex=6584c729&is=65725229&hm=65aa8a8468844fc4d144475a7439ec8b94b32bf5572b8f173986678b37b1b0fe&=&width=499&height=787'
    )
    db.session.add(photocard14)

    photocard15 = Photocard (
    user_id=1,
    listing_name='Sunghoon Half Heart',
    price=15.00,
    description='Manifesto:Day 1, Weverse Global',
    photocard_image='https://media.discordapp.net/attachments/1154550284698263596/1182460503956664470/IMG_6132.png?ex=6584c729&is=65725229&hm=884d2a2ab4bd4346e02330ce2b6f99ba780d3d11f0f2e8a515bd998bab14509f&=&width=609&height=1005'
    )
    db.session.add(photocard15)

    photocard16 = Photocard (
    user_id=2,
    listing_name='Sunoo Finger Heart',
    price=15.00,
    description='Sunoo D:D Charybdis',
    photocard_image='https://media.discordapp.net/attachments/1154550284698263596/1182460514899611708/IMG_6136.png?ex=6584c72b&is=6572522b&hm=7b3e68c20b73e5bbad8cb2cbc1af428d0622e2dad6af22cc5d7cedf5ca6ba3a0&=&width=633&height=1007'
    )
    db.session.add(photocard16)

    photocard17 = Photocard (
    user_id=2,
    listing_name='Peace Sign Sunoo',
    price=5.00,
    description='You Era, HMV lucky draw',
    photocard_image='https://media.discordapp.net/attachments/1154550284698263596/1182460515654570095/IMG_6138.png?ex=6584c72b&is=6572522b&hm=4966cb11ac8edd67be5501b543d049d5eba64e68d9509adbdacb6b3b57a2f2c7&=&width=629&height=1007'
    )
    db.session.add(photocard17)

    photocard18 = Photocard (
    user_id=2,
    listing_name='Dark Blood era Sunoo',
    price=5.00,
    description='Dark Blood Full version, Message pc',
    photocard_image='https://media.discordapp.net/attachments/1154550284698263596/1182460515264503868/IMG_6137.png?ex=6584c72b&is=6572522b&hm=c64eea60206d11cf4300ff966bdfaafbfeed354f01cc819bf550e9b06f4311f3&=&width=631&height=1005'
    )
    db.session.add(photocard18)

    photocard19 = Photocard (
    user_id=3,
    listing_name='Ni-Ki Peace Sign',
    price=12.00,
    description='Manifesto:Day1 Weverse version',
    photocard_image='https://media.discordapp.net/attachments/1154550284698263596/1182460526069030942/IMG_6142.png?ex=6584c72e&is=6572522e&hm=9134508cb23fe5520de76e1d873f0184600ee5bc9ef1379eba34da4aa99c7005&=&width=633&height=1007'
    )
    db.session.add(photocard19)

    photocard20 = Photocard (
    user_id=3,
    listing_name='Ni-Ki JPFC',
    price=65.00,
    description='2023 JPFC PC, 1000 copies',
    photocard_image='https://media.discordapp.net/attachments/1154550284698263596/1182460526513631313/IMG_6143.png?ex=6584c72e&is=6572522e&hm=8a7c30db8d004adb3b7ce949aa89a1e52d833712df33b06c0e00b31440f85320&=&width=622&height=1007'
    )
    db.session.add(photocard20)

    photocard21 = Photocard (
    user_id=3,
    listing_name='Red String Ni-Ki',
    price=7.00,
    description='You album, Weverse POB',
    photocard_image='https://media.discordapp.net/attachments/1154550284698263596/1182460527058886748/IMG_6144.png?ex=6584c72e&is=6572522e&hm=a445f3af109c7e6f910a74eaddb1d3932fd99fe12a2f63601988f2a1424f8a71&=&width=629&height=1007'
    )
    db.session.add(photocard21)

    photocard22 = Photocard (
    user_id=4,
    listing_name='Enhypen D:D',
    price=25.00,
    description='Enhypen D:D era broadcast card',
    photocard_image='https://media.discordapp.net/attachments/1154550284698263596/1182474061952065536/IMG_6148.png?ex=6584d3c9&is=65725ec9&hm=a7d71bad9f03e3f6f113da421e9f27e9c52230f93756b689c50c6fb085f70960&=&width=642&height=1007'
    )
    db.session.add(photocard22)

    photocard23 = Photocard (
    user_id=4,
    listing_name='Enhypen Abib',
    price=2.00,
    description='Enhypen & Abib PC',
    photocard_image='https://media.discordapp.net/attachments/1154550284698263596/1182474062337937439/IMG_6147.png?ex=6584d3c9&is=65725ec9&hm=e33fc4d1a4a1c406deb8688a261cd7c0b548d841f9c1d34484f094f573f4b484&=&width=655&height=1007'
    )
    db.session.add(photocard23)

    photocard24 = Photocard (
    user_id=4,
    listing_name='Enhypen',
    price=2.00,
    description='Dimension: Answer era, Weverse Global pob, normal photocard',
    photocard_image='https://media.discordapp.net/attachments/1154550284698263596/1182474062665089095/IMG_6146.png?ex=6584d3c9&is=65725ec9&hm=48b5c9ae09504c3f490c0400ddc90da1e79784c206c2f158115cae76ab6cf22f&=&width=649&height=1007'
    )
    db.session.add(photocard24)




    db.session.commit()

def undo_photocard():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.photocard RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM photocard"))

    db.session.commit()
