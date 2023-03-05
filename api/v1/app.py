#!/usr/bin/python3
""" Flask Application """
from api.v1.routes import app_routes
from os import environ
from flask import Flask, make_response, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import uuid


if environ.get('DATABASE_URI') == None:
    environ['DATABASE_URI'] = 'mysql+pymysql://tumbler:@localhost/tumbler_api'

app = Flask(__name__)
app.config['JSONIFY_PRETTYPRINT_REGULAR'] = True
app.config['SQLALCHEMY_DATABASE_URI'] = environ.get('DATABASE_URI')
app.register_blueprint(app_routes)
cors = CORS(app, resources={r"/api/v1/*": {"origins": "*"}})
db = SQLAlchemy(app)

class BaseModel(db.Model):
    __abstract__ = True
    id = db.Column(db.String(120), primary_key=True, default=lambda: str(uuid.uuid4()))

class Person(BaseModel):
    name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    gender = db.Column(db.String(20), nullable=False)
    age = db.Column(db.Integer, nullable=False)
    date_of_birth = db.Column(db.String(20), nullable=False)
    phone = db.Column(db.String(120), nullable=False)
    location = db.Column(db.String(120), nullable=False)
    password = db.Column(db.String(120), nullable=False)

    posts = db.relationship('Post', backref='poster', lazy=True)
    ratings_sent = db.relationship('Rating', backref='from_user', lazy=True)
    ratings_received = db.relationship('Rating', backref='to_user', lazy=True)

    def __repr__(self):
        return f'User {self.name}, {self.email}, {self.gender}, {self.age}, {self.date_of_birth}, {self.phone}, {self.location}, {self.password}'

class Post(BaseModel):
    skill = db.Column(db.String(120), nullable=False)
    description = db.Column(db.String(120), nullable=False)
    post_date = db.Column(db.String(120), nullable=False)
    pic_url = db.Column(db.String(250), nullable=False)
    poster_name = db.Column(db.String(120), nullable=False)
    deadline = db.Column(db.String(120), nullable=False)

    user_id = db.Column(db.String(120), db.ForeignKey('person.id'), nullable=False)

    chats = db.relationship('Chat', backref='post', lazy=True)

    def __repr__(self):
        return f'Post {self.skill}, {self.description}, {self.post_date}, {self.pic_url}, {self.poster_name}, {self.deadline}, {self.user_id}'

class Chat(BaseModel):
    from_user_email = db.Column(db.String(120), nullable=False)
    to_user_email = db.Column(db.String(120), nullable=False)
    message = db.Column(db.String(120), nullable=False)
    date_send = db.Column(db.String(120), nullable=False)

    user_id = db.Column(db.String(120), db.ForeignKey('person.id'), nullable=False)
    post_id = db.Column(db.String(120), db.ForeignKey('post.id'), nullable=False)

    def __repr__(self):
        return f'Chat {self.from_user_email}, {self.to_user_email}, {self.message}, {self.date_send}, {self.user_id}, {self.post_id}'

class Rating(BaseModel):
    from_user_email = db.Column(db.String(120), nullable=False)
    to_user_email = db.Column(db.String(120), nullable=False)
    rating = db.Column(db.Integer, nullable=False)

    user_id = db.Column(db.String(120), db.ForeignKey('person.id'), nullable=False)
    post_id = db.Column(db.String(120), db.ForeignKey('post.id'), nullable=False)

    def __repr__(self):
        return f'Rating {self.from_user_email}, {self.to_user_email}, {self.rating}, {self.user_id}, {self.post_id}'

@app.teardown_appcontext
def close_db(error):
    """ Close Storage """
    print('sommething is wrong') 


@app.errorhandler(404)
def not_found(error):
    """ 404 Error
    ---
    responses:
      404:
        description: a resource was not found
    """
    return make_response(jsonify({'error': "Not found"}), 404)

if __name__ == "__main__":
    """ Main Function """
    host = environ.get('TUMB_API_HOST')
    port = environ.get('TUMB_API_PORT')
    if not host:
        host = '0.0.0.0'
    if not port:
        port = '5000'
    with app.app_context():
        db.create_all()
    app.run(host=host, port=port, threaded=True)
