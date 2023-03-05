#!/usr/bin/python3
""" Flask Application """
from api.v1.routes import app_routes
from api.v1.app import db, Person
from flask import Flask, jsonify, request

@app_routes.route('/users', methods=['GET'])
def get_users():
	try:
		users = Person.query.all()
		return jsonify([user.serialize() for user in users]), 200
	except Exception as e:
		print(e)
		return jsonify({'error': str(e)}), 500

@app_routes.route('/add_user', methods=['POST'])
def add_user():
    try:
        data = request.get_json()
        print(data)
        user = Person(
            name=data['name'],
            email=data['email'],
			gender=data['gender'],
			age=data['gender'],
			date_of_birth=data['date_of_birth'],
			phone=data['phone'],
			location=data['location'],
			password=data['password']
        )
        db.session.add(user)
        db.session.commit()
        return jsonify({'message': 'User added successfully.'}), 201
    except Exception as e:
        print(e)
        return jsonify({'error': str(e)}), 500

@app_routes.route('/delete_user/<string:user_id>', methods=['DELETE'])
def delete_user(user_id):
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
