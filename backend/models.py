from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Link(db.Model):
    # Dimension Table
    # Link can have many ClickEvents
    id = db.Column(db.String(50), primary_key=True)
    user_id = db.Column(db.String(50), nullable=False) # this would be foreign key to User Table
    title = db.Column(db.String(50), nullable=False)
    url = db.Column(db.String(255), nullable=False)
    count = db.Column(db.Integer)

    click_events = db.relationship('ClickEvent', backref='Link')

class ClickEvent(db.Model):
    # Fact Table
    # ClickEvent can have one link
    event_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    link_id = db.Column(db.String(50), db.ForeignKey('link.id'), nullable=False)
    datetime = db.Column(db.DateTime)