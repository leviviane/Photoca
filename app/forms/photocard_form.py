from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateField, TextAreaField
from flask_wtf.file import FileRequired, FileAllowed, FileField
from wtforms.validators import DataRequired, Length
from ..api.aws_helpers import ALLOWED_EXTENSIONS

class PhotocardForm(FlaskForm):
    user_id = IntegerField('user_id', validators=[DataRequired()])
    listing_name = StringField('listing_name', validators=[DataRequired(message="This field is required and must be at least 3 characters")])
    price = IntegerField('price', validators=[DataRequired()] )
    description = TextAreaField('description', validators=[DataRequired()])
    photocard_image = FileField('photocard_image', validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
