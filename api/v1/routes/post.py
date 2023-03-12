#!/usr/bin/python3
""" Flask Application """
from flask import jsonify, request
from api.v1.routes import app_routes
from api.v1.models import db, Post
import requests
import os
from datetime import datetime

@app_routes.route('/posts', methods=['GET'])
def get_posts():
    try:
        posts = Post.query.all()
        return jsonify([post.serialize() for post in posts]), 200
    except Exception as e:
        print(e)
        return jsonify({'error': str(e)}), 500

@app_routes.route('/add_post', methods=['POST'])
def add_post():
    try:
        data = request.get_json()
        image_url = 'http://api.nftalem.tech/upload_image'
        files = {'file': open('/data/upload', 'rb')}
        response = requests.post(image_url, files=files)
        if response.status_code == 201:
            filename = response.json()['filename']
            now = datetime.now()
            post = Post(
                skill=data['skill'],
                description=data['description'],
                post_date=now.strftime("%Y-%m-%d %H:%M:%S"),
                pic_url=os.path.join('/data/upload', filename),  # Save the full path to the image in the database
                poster_name=data['poster_name'],
                deadline=data['deadline']
            )
            db.session.add(post)
            db.session.commit()
            return jsonify({'message': 'post added successfully.'}), 201
        else:
            return jsonify({'error': 'Failed to upload image.'}), 500
    except Exception as e:
        print(e)
        return jsonify({'error': str(e)}), 500

@app_routes.route('/delete_post/<string:post_id>', methods=['DELETE'])
def delete_post(post_id):
    try:
        post = Post.query.filter_by(id=post_id).first()
        if post:
            db.session.delete(post)
            db.session.commit()
            return jsonify({'message': 'post deleted successfully.'}), 200
        else:
            return jsonify({'error': 'post not found.'}), 404
    except Exception as e:
        print(e)
        return jsonify({'error': str(e)}), 500

@app_routes.route('/update_post/<string:post_id>', methods=['PUT'])
def update_post(post_id):
    try:
        post = Post.query.filter_by(id=post_id).first()
        if post:
            data = request.get_json()
            post.skill = data.get('skill', post.skill)
            post.description = data.get('description', post.description)
            post.poster_name = data.get('poster_name', post.poster_name)
            post.intrested_count = data.get('intrested_count', post.intrested_count)
            post.deadline = data.get('deadline', post.deadline)
            db.session.commit()
            return jsonify({'message': 'post updated successfully.'}), 200
        else:
            return jsonify({'error': 'post not found.'}), 404
    except Exception as e:
        print(e)
        return jsonify({'error': str(e)}), 500

""" Get posts by different parameters """
@app_routes.route('/get_post/<string:post_id>', methods=['GET'])
def get_post(post_id):
    try:
        post = Post.query.filter_by(id=post_id).first()
        if post:
            return jsonify(post.serialize()), 200
        else:
            return jsonify({'error': 'post not found.'}), 404
    except Exception as e:
        print(e)
        return jsonify({'error': str(e)}), 500

@app_routes.route('/get_posts_by_skill/<string:skill>', methods=['GET'])
def get_posts_by_skill(skill):
    try:
        posts = Post.query.filter_by(skill=skill).all()
        if posts:
            return jsonify([post.serialize() for post in posts]), 200
        else:
            return jsonify({'error': 'post not found.'}), 404
    except Exception as e:
        print(e)
        return jsonify({'error': str(e)}), 500

@app_routes.route('/get_posts_by_user/<string:poster_name>', methods=['GET'])
def get_posts_by_user(poster_name):
    try:
        posts = Post.query.filter_by(poster_name=poster_name).all()
        if posts:
            return jsonify([post.serialize() for post in posts]), 200
        else:
            return jsonify({'error': 'post not found.'}), 404
    except Exception as e:
        print(e)
        return jsonify({'error': str(e)}), 500

@app_routes.route('/get_posts_by_date/<string:post_date>', methods=['GET'])
def get_posts_by_date(post_date):
    try:
        posts = Post.query.filter_by(post_date=post_date).all()
        if posts:
            return jsonify([post.serialize() for post in posts]), 200
        else:
            return jsonify({'error': 'post not found.'}), 404
    except Exception as e:
        print(e)
        return jsonify({'error': str(e)}), 500

@app_routes.route('/get_posts_by_deadline/<string:deadline>', methods=['GET'])
def get_posts_by_deadline(deadline):
    try:
        posts = Post.query.filter_by(deadline=deadline).all()
        if posts:
            return jsonify([post.serialize() for post in posts]), 200
        else:
            return jsonify({'error': 'post not found.'}), 404
    except Exception as e:
        print(e)
        return jsonify({'error': str(e)}), 500
    
""" intrested Count process """
@app_routes.route('/intrested/<string:post_id>', methods=['PUT'])
def intrested(post_id):
    """
    If the post exists, increment the intrested_count by 1 and commit the changes to the database
    
    :param post_id: The id of the post to be updated
    :return: The return value is a tuple of the response object and the HTTP status code.
    """
    try:
        post = Post.query.filter_by(id=post_id).first()
        if post:
            post.intrested_count += 1
            db.session.commit()
            return jsonify({'message': 'post updated successfully.'}), 200
        else:
            return jsonify({'error': 'post not found.'}), 404
    except Exception as e:
        print(e)
        return jsonify({'error': str(e)}), 500

@app_routes.route('/unintrested/<string:post_id>', methods=['PUT'])
def unintrested(post_id):
    """
    It takes a post_id as an argument, finds the post in the database, and then subtracts 1 from the
    intrested_count column
    
    :param post_id: The id of the post to be updated
    :return: The return value is a tuple of the response object and the HTTP status code.
    """
    try:
        post = Post.query.filter_by(id=post_id).first()
        if post:
            post.intrested_count -= 1
            db.session.commit()
            return jsonify({'message': 'post updated successfully.'}), 200
        else:
            return jsonify({'error': 'post not found.'}), 404
    except Exception as e:
        print(e)
        return jsonify({'error': str(e)}), 500
