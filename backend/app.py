from flask import Flask, request, jsonify
from models import db, Song
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

# Database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///./data/songs.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

@app.route('/api/songs', methods=['GET'])
def get_songs():
    songs = Song.query.all()
    songs_data = []
    for song in songs:
        song_data = {
            'id': song.id,
            'title': song.title,
            'artist': song.artist,
            'imageUrl': song.imageUrl,
            'audioUrl': song.audioUrl,
            'duration': song.duration,
            'lyricsWithTiming': json.loads(song.lyricsWithTiming) if song.lyricsWithTiming else []  # Safely handling missing field
        }
        songs_data.append(song_data)
    return jsonify(songs_data)

@app.route('/api/songs', methods=['POST'])
def add_song():
    data = request.get_json()
    title = data.get('title')
    artist = data.get('artist')
    imageUrl = data.get('imageUrl')
    audioUrl = data.get('audioUrl')
    duration = data.get('duration')
    lyrics = data.get('lyrics')
    lyricsWithTiming = data.get('lyricsWithTiming')

    if not all([title, artist, imageUrl, audioUrl, duration]):
        return jsonify({'error': 'All fields are required'}), 400

    new_song = Song(
        title=title,
        artist=artist,
        imageUrl=imageUrl,
        audioUrl=audioUrl,
        duration=duration,
        lyrics=lyrics,
        lyricsWithTiming=lyricsWithTiming  # Add this field too
    )

    try:
        db.session.add(new_song)
        db.session.commit()
        return jsonify({
            'id': new_song.id,
            'title': new_song.title,
            'artist': new_song.artist,
            'imageUrl': new_song.imageUrl,
            'audioUrl': new_song.audioUrl,
            'duration': new_song.duration,
            'lyrics': new_song.lyrics,
            'lyricsWithTiming': new_song.lyricsWithTiming
        }), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

with app.app_context():
    db.create_all()

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5001)
