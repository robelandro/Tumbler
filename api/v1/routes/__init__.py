#!/usr/bin/python3
from flask import Blueprint

app_routes = Blueprint('app_routes', __name__)

from api.v1.routes.person import *
from api.v1.routes.index import *
from api.v1.routes.post import *
from api.v1.routes.ratting import *
from api.v1.routes.chat import *
