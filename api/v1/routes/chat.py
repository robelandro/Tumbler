#!/usr/bin/python3
""" Flask Application """
from flask import jsonify, request
from api.v1.routes import app_routes
from api.v1.models import db, Chat
from datetime import datetime

@app_routes.route('/chats', methods=['GET'])
def get_chats():
	"""
	It queries the database for all chats, serializes them, and returns them as a JSON object
	:return: A list of dictionaries.
	"""
	try:
		chats = Chat.query.all()
		return jsonify([chat.serialize() for chat in chats]), 200
	except Exception as e:
		print(e)
		return jsonify({'error': str(e)}), 500

@app_routes.route('/chat/<string:chat_id>', methods=['GET'])
def get_chat(chat_id):
	"""
	If the chat exists, return it, otherwise return an error
	
	:param chat_id: The id of the chat you want to get
	:return: The chat object is being returned as a JSON object.
	"""
	try:
		chat = Chat.query.filter_by(id=chat_id).first()
		if chat:
			return jsonify(chat.serialize()), 200
		else:
			return jsonify({'error': 'chat not found.'}), 404
	except Exception as e:
		print(e)
		return jsonify({'error': str(e)}), 500

@app_routes.route('/chat', methods=['POST'])
def create_chat():
	"""
	It takes the data from the request, creates a new chat object, adds it to the database, and returns
	the chat object as a json object
	:return: The return value of the function is a tuple of the form (response, status, headers)
	"""
	try:
		chat = Chat(
			from_user_email=request.json.get('from_user_email'),
			to_user_email=request.json.get('to_user_email'),
			messages=request.json.get('messages'),
			date_send=datetime.now()
		)
		db.session.add(chat)
		db.session.commit()
		return jsonify(chat.serialize()), 201
	except Exception as e:
		print(e)
		return jsonify({'error': str(e)}), 500

@app_routes.route('/chat/<string:chat_id>', methods=['PUT'])
def update_chat(chat_id):
	"""
	It updates the chat with the given chat_id with the data provided in the request body
	
	:param chat_id: The id of the chat to update
	:return: The return value of the function is a tuple of two values. The first value is the response
	object, and the second value is the status code.
	"""
	try:
		chat = Chat.query.filter_by(id=chat_id).first()
		if chat:
			data = request.get_json()
			chat.from_user_email = data.get('from_user_email', chat.from_user_email)
			chat.to_user_email = data.get('to_user_email', chat.to_user_email)
			chat.messages = data.get('messages', chat.messages)
			chat.date_send = data.get('date_send', chat.date_send)
			db.session.commit()
			return jsonify({'message': 'chat updated successfully.'}), 200
		else:
			return jsonify({'error': 'chat not found.'}), 404
	except Exception as e:
		print(e)
		return jsonify({'error': str(e)}), 500

@app_routes.route('/chat/<string:chat_id>', methods=['DELETE'])
def delete_chat(chat_id):
	"""
	It deletes a chat from the database if it exists, otherwise it returns an error
	
	:param chat_id: The id of the chat to be deleted
	:return: The return value of the function is a tuple of two values. The first value is a jsonified
	dictionary. The second value is the HTTP status code.
	"""
	try:
		chat = Chat.query.filter_by(id=chat_id).first()
		if chat:
			db.session.delete(chat)
			db.session.commit()
			return jsonify({'message': 'chat deleted successfully.'}), 200
		else:
			return jsonify({'error': 'chat not found.'}), 404
	except Exception as e:
		print(e)
		return jsonify({'error': str(e)}), 500

@app_routes.route('/chat/<string:from_user_email>/<string:to_user_email>', methods=['GET'])
def get_chat_by_from_user_email_and_to_user_email(from_user_email, to_user_email):
	"""
	It returns a list of chats between two users, ordered by date.
	
	:param from_user_email: the email of the user who sent the message
	:param to_user_email: the email of the user you want to send the message to
	:return: A list of chat objects
	"""
	try:
		chats = Chat.query.filter_by(from_user_email=from_user_email, to_user_email=to_user_email).order_by(Chat.date_send).all()
		if chats:
			return jsonify([chat.serialize() for chat in chats]), 200
		else:
			return jsonify({'error': 'chat not found.'}), 404
	except Exception as e:
		print(e)
		return jsonify({'error': str(e)}), 500
