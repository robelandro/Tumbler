#!/usr/bin/python3
from flask_sqlalchemy import SQLAlchemy
import uuid

db = SQLAlchemy()

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

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'gender': self.gender,
            'age': self.age,
            'date_of_birth': self.date_of_birth,
            'phone': self.phone,
            'location': self.location
        }
    def __repr__(self):
        return f'User {self.name}, {self.email}, {self.gender}, {self.age}, {self.date_of_birth}, {self.phone}, {self.location}, {self.password}'

class Post(BaseModel):
    skill = db.Column(db.String(120), nullable=False)
    description = db.Column(db.String(120), nullable=False)
    post_date = db.Column(db.String(120), nullable=False)
    pic_url = db.Column(db.String(250), nullable=False)
    poster_name = db.Column(db.String(120), nullable=False)
    intrested_count = db.Column(db.Integer, nullable=False)
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
