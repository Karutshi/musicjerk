from flask import Blueprint, jsonify, make_response, redirect, request
from .reader import Reader

api_blueprint = Blueprint('api', __name__)
reader = Reader()

@api_blueprint.route('/api/albums')
def albums():
    data = []
    albums = reader.albums
    for i in range(len(albums) - 1, 0, -2):
        mand = albums[i - 1]
        opt = albums[i]
        data.append((
            {'name': mand.title, 'artist': mand.artist, 'url' : mand.url, 'image' : mand.image_url},
            {'name': opt.title, 'artist': opt.artist, 'url' : opt.url, 'image' : opt.image_url}))
    mand = albums[0]
    data.append(({'name': mand.title, 'artist': mand.artist, 'url' : mand.url, 'image' : mand.image_url}, None))
    return jsonify(data)

@api_blueprint.route('/api/this-week')
def this_week():
    mand, opt = reader.albums[-2:]
    data = (
        {'name': mand.title, 'artist': mand.artist, 'url' : mand.url, 'image' : mand.image_url},
        {'name': opt.title, 'artist': opt.artist, 'url' : opt.url, 'image' : opt.image_url})
    return jsonify(data)


@api_blueprint.route('/api/members')
def members():
    return jsonify([name for name in reader.people.keys()])

@api_blueprint.route('/api/albums/<albumname>/')
def album(albumname):
    album = reader.album_dict[albumname];
    data = {
        'name' : album.title,
        'artist' : album.artist,
        'summary' : album.summary,
        'genres' : album.genres,
        'styles' : album.styles,
        'spotify_id' : album.spotify_id,
        'image' : album.image_url
    }
    print(data)
    return jsonify(data)

@api_blueprint.route('/api/login', methods = ['POST'])
def login():
    error = None
    if request.method == "POST":
        username = request.form.get('username')
        password = request.form.get('password')
        print(username, password)
    response = jsonify(True)
    return response