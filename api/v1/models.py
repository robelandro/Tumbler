#!/usr/bin/python3
from flask_sqlalchemy import SQLAlchemy
import uuid

db = SQLAlchemy()

# It creates a unique id for each row in the database.
class BaseModel(db.Model):
    __abstract__ = True
    id = db.Column(db.String(120), primary_key=True, default=lambda: str(uuid.uuid4()))

# It creates a class called Person that inherits from BaseModel. It also creates a table called person
# in the database.
class Person(BaseModel):
    name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    gender = db.Column(db.String(20), nullable=False)
    date_of_birth = db.Column(db.String(20), nullable=False)
    phone = db.Column(db.String(120), nullable=False)
    location = db.Column(db.String(120), nullable=False)
    password = db.Column(db.String(120), nullable=False)

    posts = db.relationship('Post', backref='poster', lazy=True)
    ratings_sent = db.relationship('Rating', backref='from_user', lazy=True)
    ratings_received = db.relationship('Rating', backref='to_user', lazy=True)

    def serialize(self):
        """
        It takes a dictionary and returns a dictionary
        """
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'gender': self.gender,
            'date_of_birth': self.date_of_birth,
            'phone': self.phone,
            'location': self.location
        }
    def __repr__(self):
        """
        The __repr__ function is a built-in function that returns the printable representation of the given
        object
        :return: The user's name, email, gender, age, date of birth, phone, location, and password.
        """
        return f'User {self.name}, {self.email}, {self.gender}, {self.age}, {self.date_of_birth}, {self.phone}, {self.location}, {self.password}'

# The Post class is a model that represents a post. It has a one-to-many relationship with the Chat
# class
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
        """
        The __repr__ function is a special function that returns a string representation of the object
        :return: The Post object is being returned.
        """
        return f'Post {self.skill}, {self.description}, {self.post_date}, {self.pic_url}, {self.poster_name}, {self.deadline}, {self.user_id}'

# Chat is a class that inherits from BaseModel and has the following attributes: from_user_email,
# to_user_email, messages, date_send, user_id, and post_id
class Chat(BaseModel):
    from_user_email = db.Column(db.String(120), nullable=False)
    to_user_email = db.Column(db.String(120), nullable=False)
    messages = db.Column(db.String(120), nullable=False)
    date_send = db.Column(db.String(120), nullable=False)

    user_id = db.Column(db.String(120), db.ForeignKey('person.id'), nullable=False)
    post_id = db.Column(db.String(120), db.ForeignKey('post.id'), nullable=False)

    def __repr__(self):
        """
        The __repr__ function is used to return a string representation of the object
        :return: The Chat class is being returned.
        """
        return f'Chat {self.from_user_email}, {self.to_user_email}, {self.message}, {self.date_send}, {self.user_id}, {self.post_id}'

# The Rating class is a model that represents a rating of a post by a user
class Rating(BaseModel):
    from_user_email = db.Column(db.String(120), nullable=False)
    to_user_email = db.Column(db.String(120), nullable=False)
    rating = db.Column(db.Integer, nullable=False)

    user_id = db.Column(db.String(120), db.ForeignKey('person.id'), nullable=False)
    post_id = db.Column(db.String(120), db.ForeignKey('post.id'), nullable=False)

    def __repr__(self):
        """
        The __repr__ function is a special function that is used to return a string representation of the
        object
        :return: The Rating object is being returned.
        """
        return f'Rating {self.from_user_email}, {self.to_user_email}, {self.rating}, {self.user_id}, {self.post_id}'

class Intrested(BaseModel):
    post_id = db.Column(db.String(120), db.ForeignKey('post.id'), nullable=False)
    user_email = db.Column(db.String(120), nullable=False)
    date_send = db.Column(db.String(120), nullable=False)

    def __repr__(self):
        """
        The __repr__ function is a special function that is used to return a string representation of the
        object
        :return: The Intrested object is being returned.
        """
        return f'Intrested {self.post_id}, {self.user_email}'
