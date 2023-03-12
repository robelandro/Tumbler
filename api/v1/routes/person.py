#!/usr/bin/python3
""" Flask Application """
from flask import jsonify, request
from api.v1.routes import app_routes
from api.v1.models import db, Person

@app_routes.route('/users', methods=['GET'])
def get_users():
    """
    It takes a request, queries the database for all users, and returns a JSON response with the users
    :return: A list of users in JSON format.
    """
    try:
        users = Person.query.all()
        return jsonify([user.serialize() for user in users]), 200
    except Exception as e:
        print(e)
        return jsonify({'error': str(e)}), 500

@app_routes.route('/add_user', methods=['POST'])
def add_user():
    """
    It takes a JSON object from the request, creates a new Person object with the data from the JSON
    object, and then adds the new Person object to the database
    :return: The return value of the function is a tuple. The first element of the tuple is the response
    object, and the second element is the status code.
    """
    try:
        data = request.get_json()
        user = Person(
            name=data['name'],
            email=data['email'],
			gender=data['gender'],
			date_of_birth=data['dob'],
			phone=data['phone'],
			location=data['address'],
			password=data['password'],
        )
        db.session.add(user)
        db.session.commit()
        return jsonify({'message': 'User added successfully.','token':user.id}), 201
    except Exception as e:
        print(e)
        return jsonify({'error': str(e)}), 500

@app_routes.route('/delete_user/<string:user_id>', methods=['DELETE'])
def delete_user(user_id):
    """
    It deletes a user from the database if the user exists, otherwise it returns an error message
    
    :param user_id: The id of the user to be deleted
    :return: A JSON object with a message and a status code.
    """
    try:
        user = Person.query.filter_by(id=user_id).first()
        if user:
            db.session.delete(user)
            db.session.commit()
            return jsonify({'message': 'User deleted successfully.'}), 200
        else:
            return jsonify({'error': 'User not found.'}), 404
    except Exception as e:
        print(e)
        return jsonify({'error': str(e)}), 500

@app_routes.route('/update_user/<string:user_id>', methods=['PUT'])
def update_user(user_id):
    """
    It updates the user's information in the database
    
    :param user_id: The id of the user to be updated
    :return: A JSON object with a message and a status code.
    """
    try:
        user = Person.query.filter_by(id=user_id).first()
        if user:
            data = request.get_json()
            user.name = data.get('name', user.name)
            user.email = data.get('email', user.email)
            user.location = data.get('location', user.location)
            user.phone = data.get('phone', user.phone)
            user.password = data.get('password', user.password)
            db.session.commit()
            return jsonify({'message': 'User updated successfully.'}), 200
        else:
            return jsonify({'error': 'User not found.'}), 404
    except Exception as e:
        print(e)
        return jsonify({'error': str(e)}), 500

@app_routes.route('/get_user/<string:token>', methods=['GET'])
def get_user(token):
    """
    It takes a token from the request, queries the database for the user with the email in the token,
    and returns a JSON response with the user's information.
    :return: A list of users in JSON format.
    """
    try:
        user = Person.query.filter_by(id=token).first()
        if user:
            return jsonify(user.serialize()), 200
        else:
            return jsonify({'error': 'User not found.'}), 200
    except Exception as e:
        # print(e)
        return jsonify({'error': str(e)}), 500

@app_routes.route('/login', methods=['POST'])
def login():
    """
    It takes a JSON object from the request, creates a new Person object with the data from the JSON
    """
    try:
        data = request.get_json()
        user = Person.query.filter_by(email=data['email']).first()
        if user:
            if user.password == data['password']:
                return jsonify({'message': 'Login successfully.','token':user.id}), 200
            else:
                return jsonify({'error': 'Incorrect password.'}), 404
        else:
            return jsonify({'error': 'User not found.'}), 404
    except Exception as e:
        print(e)
        return jsonify({'error': str(e)}), 500
