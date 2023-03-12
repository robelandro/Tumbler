#!/usr/bin/python3
from os import environ ,path, makedirs, path
from werkzeug.utils import secure_filename
from flask import Flask, make_response, jsonify, send_from_directory, request
from flask_cors import CORS
from api.v1.routes import app_routes
from api.v1.models import db

UPLOAD_FOLDER = '/data/upload'  # The folder where the images will be stored
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}  # The allowed file extensions

if environ.get('DATABASE_URI') == None:
    environ['DATABASE_URI'] = 'mysql+pymysql://tumbler:@localhost/tumbler_api'
if path.isdir(UPLOAD_FOLDER) == False:
    makedirs(UPLOAD_FOLDER)

app = Flask(__name__)
app.config['JSONIFY_PRETTYPRINT_REGULAR'] = True
app.config['SQLALCHEMY_DATABASE_URI'] = environ.get('DATABASE_URI')
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.register_blueprint(app_routes)
cors = CORS(app, resources={r"/*": {"origins": "*"}})
db.init_app(app)

@app.route('/upload_image', methods=['POST'])
def upload_image():
    """
    If the file is valid, save it to the uploads folder and return a success message
    :return: a jsonified response.
    """
    file = request.files['file']
    if file and '.' in file.filename and file.filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS:
        filename = secure_filename(file.filename)
        file_path = path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)
        return jsonify({'message': 'Image uploaded successfully.', 'filename': filename}), 201
    else:
        return jsonify({'error': 'Invalid file format.'}), 400

@app.route('/images/<path:filename>')
def get_image(filename):
    """
    It tries to return the image from the upload directory, and if it can't find it, it returns a 404
    error
    
    :param filename: The name of the file to be retrieved
    :return: The image is being returned as a response object.
    """
    try:
        return send_from_directory('/data/upload', filename, as_attachment=False)
    except FileNotFoundError:
        return jsonify({'error': 'Image not found.'}), 404

@app.teardown_appcontext
def close_db(error):
    """ Close Storage """
    db.session.close()
    print(f'sommething is wrong {error}') 


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
