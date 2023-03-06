#!/usr/bin/python3
from os import environ
from flask import Flask, make_response, jsonify
from flask_cors import CORS
from api.v1.routes import app_routes
from api.v1.models import db

if environ.get('DATABASE_URI') == None:
    environ['DATABASE_URI'] = 'mysql+pymysql://tumbler:@localhost/tumbler_api'

app = Flask(__name__)
app.config['JSONIFY_PRETTYPRINT_REGULAR'] = True
app.config['SQLALCHEMY_DATABASE_URI'] = environ.get('DATABASE_URI')
app.register_blueprint(app_routes)
cors = CORS(app, resources={r"/api/v1/*": {"origins": "*"}})
db.init_app(app)

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
