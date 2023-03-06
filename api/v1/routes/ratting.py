#!/usr/bin/env python3
""" Flask Application """
from flask import jsonify, request
from api.v1.routes import app_routes
from api.v1.models import db, Rating

@app_routes.route('/ratings', methods=['GET'])
def get_ratings():
	try:
		ratings = Rating.query.all()
		return jsonify([rating.serialize() for rating in ratings]), 200
	except Exception as e:
		print(e)
		return jsonify({'error': str(e)}), 500

@app_routes.route('/rating/<string:rating_id>', methods=['GET'])
def get_rating(rating_id):
	try:
		rating = Rating.query.filter_by(id=rating_id).first()
		if rating:
			return jsonify(rating.serialize()), 200
		else:
			return jsonify({'error': 'rating not found.'}), 404
	except Exception as e:
		print(e)
		return jsonify({'error': str(e)}), 500
	
@app_routes.route('/rating', methods=['POST'])
def create_rating():
	try:
		rating = Rating(
			from_user_email=request.json.get('from_user_email'),
			to_user_email=request.json.get('to_user_email'),
			rating=request.json.get('rating'),
		)
		db.session.add(rating)
		db.session.commit()
		return jsonify(rating.serialize()), 201
	except Exception as e:
		print(e)
		return jsonify({'error': str(e)}), 500

@app_routes.route('/rating/<string:rating_id>', methods=['PUT'])
def update_rating(rating_id):
	try:
		rating = Rating.query.filter_by(id=rating_id).first()
		if rating:
			data = request.get_json()
			rating.from_user_email = data.get('from_user_email', rating.from_user_email)
			rating.to_user_email = data.get('to_user_email', rating.to_user_email)
			rating.rating = data.get('rating', rating.rating)
			rating.date_send = data.get('date_send', rating.date_send)
			db.session.commit()
			return jsonify({'message': 'rating updated successfully.'}), 200
		else:
			return jsonify({'error': 'rating not found.'}), 404
	except Exception as e:
		print(e)
		return jsonify({'error': str(e)}), 500

def get_average_rating(user_email):
	ratings = Rating.query.filter_by(to_user_email=user_email).all()
	if ratings:
		sum = 0
		for rating in ratings:
			sum += rating.rating
		return sum / len(ratings)
	else:
		return 0
# number of ratings for a user
def get_number_of_ratings(user_email):
	ratings = Rating.query.filter_by(to_user_email=user_email).all()
	if ratings:
		return len(ratings)
	else:
		return 0

@app_routes.route('/rating/<string:rating_id>', methods=['DELETE'])
def delete_rating(rating_id):
	try:
		rating = Rating.query.filter_by(id=rating_id).first()
		if rating:
			db.session.delete(rating)
			db.session.commit()
			return jsonify({'message': 'rating deleted successfully.'}), 200
		else:
			return jsonify({'error': 'rating not found.'}), 404
	except Exception as e:
		print(e)
		return jsonify({'error': str(e)}), 500

@app_routes.route('/rating/<string:to_user_email>', methods=['GET'])
def get_rating_by_user(to_user_email):
	try:
		ratings = Rating.query.filter_by(to_user_email=to_user_email).all()
		if ratings:
			return jsonify([rating.serialize() for rating in ratings]), 200
		else:
			return jsonify({'error': 'rating not found.'}), 404
	except Exception as e:
		print(e)
		return jsonify({'error': str(e)}), 500
