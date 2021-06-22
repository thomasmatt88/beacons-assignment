from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from models import db, Link, ClickEvent

# APP and DB Configuration
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
db.init_app(app)
with app.app_context():
    db.create_all() # creates database.db

#API
@app.route('/api/v1/links', methods=['GET'])
def all_links():
    links_list = Link.query.all()
    links = []
    for link in links_list:
        links.append({"id":link.id, "title": link.title, "url": link.url, "count": link.count})
    return jsonify({'links':links})

@app.route('/api/v1/links/<link_id>', methods=['GET', 'POST', 'DELETE', 'PUT'])
def link(link_id):
    if request.method == "POST":
        content = request.json
        new_link = Link(id=link_id, user_id="test", title=content['title'], url=content['url'], count=0)
        db.session.add(new_link)
        db.session.commit()
        resp = jsonify(success=True)
        return resp
    if request.method == "DELETE":
        Link.query.filter_by(id=link_id).delete()
        db.session.commit()
        resp = jsonify(success=True)
        return resp
    if request.method == "PUT":
        content = request.json
        link = Link.query.filter_by(id=link_id).first()
        link.title = content['title']
        link.url = content['url']
        db.session.commit()
        resp = jsonify(success=True)
        return resp

@app.route('/api/v1/click_events', methods=['GET'])
def all_click_events():
    click_events_list = ClickEvent.query.all()
    click_events = []
    for click_event in click_events_list:
        click_events.append({"link_id":click_event.link_id, "datetime": click_event.datetime})
    return jsonify({'click_events':click_events})

@app.route('/api/v1/counts/<link_id>', methods=['GET', 'PUT'])
def count(link_id):
    if request.method == 'PUT':
        link = Link.query.filter_by(id=link_id).first()
        link.count += 1
        new_click_event = ClickEvent(link_id=link_id, datetime=datetime.now())
        db.session.add(new_click_event)
        db.session.commit()
        resp = jsonify(success=True)
        return resp


