import os
import sys
from bottle import *


game = Bottle()
@game.route('/test')
def test():
    return "Alive"

@error(404)
def error404(error):
    return 'This is not the page you are looking for.'

@get('/static/<filepath:path>')
def static(filepath):
    return static_file(filepath, root='static')
    
@get('/bower_components/<filepath:path>')
def bower_files(filepath):
    return static_file(filepath, root='bower_components')


# Set syspath and add application specific routes
curpath = os.path.dirname(os.path.abspath(__file__))
sys.path.append(curpath)
sys.path.append( os.path.abspath( os.path.join(curpath, "../views")) )

@game.route('/')
def index(section='home'):
    return template('index')

@game.route('/about')
def index(section='about'):
    return template('about')

application = game
application.debug=True
application.root_path = os.path.abspath( os.path.join(curpath, "../"))
