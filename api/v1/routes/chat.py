#!/usr/bin/python3
""" Flask Application """
from flask import jsonify, request
from api.v1.routes import app_routes
from api.v1.models import db, Chat
from datetime import datetime

@app_routes.route('/chats', methods=['GET'])
def get_chats():
	try:
		chats = Chat.query.all()
		return jsonify([chat.serialize() for chat in chats]), 200
	except Exception as e:
		print(e)
		return jsonify({'error': str(e)}), 500

@app_routes.route('/chat/<string:chat_id>', methods=['GET'])
def get_chat(chat_id):
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
	try:
		chats = Chat.query.filter_by(from_user_email=from_user_email, to_user_email=to_user_email).order_by(Chat.date_send).all()
		if chats:
			return jsonify([chat.serialize() for chat in chats]), 200
		else:
			return jsonify({'error': 'chat not found.'}), 404
	except Exception as e:
		print(e)
		return jsonify({'error': str(e)}), 500
