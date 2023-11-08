from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField
from wtforms.validators import DataRequired, Length
from ..api.aws_helpers import ALLOWED_EXTENSIONS

class ReviewForm(FlaskForm):
    photocard_id = IntegerField('photocard_id', validators=[DataRequired()])
    user_id = IntegerField('user_id', validators=[DataRequired()])
    text =  TextAreaField('text', validators=[DataRequired()])
