#!/usr/bin/python3
""" Blueprint for API """
from flask import Blueprint

app_routes = Blueprint('app_routes', __name__, url_prefix='/api/v1')

from api.v1.routes.index import *
from api.v1.routes.post import *
from api.v1.routes.ratting import *
from api.v1.routes.chat import *
