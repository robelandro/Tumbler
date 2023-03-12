#!/usr/bin/python3
""" Flask Application """
from flask import jsonify, request
from api.v1.routes import app_routes
from api.v1.models import db, Intrested
from datetime import datetime


@app_routes.route('/intrested', methods=['POST'])
def create_intrested():
	"""
	It takes the data from the request, creates a new intrested object, adds it to the database, and returns
	the intrested object as a json object
	:return: The return value of the function is a tuple of the form (response, status, headers)
	"""
	try:
		intrested = Intrested(
			user_email=request.json.get('user_email'),
			post_id=request.json.get('post_id'),
			date_send=datetime.now()
		)
		db.session.add(intrested)
		db.session.commit()
		return jsonify(intrested.serialize()), 201
	except Exception as e:
		print(e)
		return jsonify({'error': str(e)}), 500

@app_routes.route('/intrested/<string:post_id>/<string:user_email>', methods=['DELETE'])
def delete_intrested(post_id, user_email):
	"""
	If the intrested exists, delete it, otherwise return an error
	:param intrested_id: The id of the intrested you want to delete
	:return: The intrested object is being returned as a JSON object.
	"""
	try:
		intrested = Intrested.query.filter_by(post_id=post_id, user_email=user_email).first()
		if intrested:
			db.session.delete(intrested)
			db.session.commit()
			return jsonify(intrested.serialize()), 200
		else:
			return jsonify({'error': 'intrested not found.'}), 404
	except Exception as e:
		print(e)
		return jsonify({'error': str(e)}), 500

@app_routes.route('/intrested/<string:post_id>/<string:user_email>', methods=['GET'])
def get_intrested(post_id, user_email):
	"""
	If the intrested exists, return it, otherwise return an error
	:param intrested_id: The id of the intrested you want to get
	:return: The intrested object is being returned as a JSON object.
	"""
	try:
		intrested = Intrested.query.filter_by(post_id=post_id, user_email=user_email).first()
		if intrested:
			return jsonify(intrested.serialize()), 200
		else:
			return jsonify({'error': 'intrested not found.'}), 404
	except Exception as e:
		print(e)
		return jsonify({'error': str(e)}), 500

@app_routes.route('/intrested/<string:post_id>', methods=['GET'])
def get_intrested_by_post_id(post_id):
	"""
	If the intrested exists, return it, otherwise return an error
	:param intrested_id: The id of the intrested you want to get
	:return: The intrested object is being returned as a JSON object.
	"""
	try:
		intrested = Intrested.query.filter_by(post_id=post_id).all()
		if intrested:
			return jsonify(len(intrested)), 200
		else:
			return jsonify({'error': 'intrested not found.'}), 404
	except Exception as e:
		print(e)
		return jsonify({'error': str(e)}), 500
