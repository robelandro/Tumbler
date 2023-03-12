#!/usr/bin/python3
from flask import Flask, jsonify
from api.v1.routes import app_routes

@app_routes.route('/status')
def status_check():
    '''
    checks status of JSON
    '''
    return jsonify({"status": "OK"})
