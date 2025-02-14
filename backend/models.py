
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Song(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200))
    artist = db.Column(db.String(200))
    imageUrl = db.Column(db.String(500))
    audioUrl = db.Column(db.String(500))
    duration = db.Column(db.String(10))
    lyrics = db.Column(db.Text, nullable=True)
    lyricsWithTiming = db.Column(db.Text) 

    def __repr__(self):
        return f"<Song {self.title} by {self.artist}>"

