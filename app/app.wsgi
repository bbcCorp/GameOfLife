import os
import sys
import bottle
from bottle import *

# Set syspath and add application specific routes
curpath = os.path.dirname(os.path.abspath(__file__))
sys.path.append(curpath)

app_root_path = os.path.abspath( os.path.join(curpath, "../"))
sys.path.append( app_root_path )
print "app_root_path", app_root_path

game = Bottle()
@game.route('/test')
def test():
    return "Alive"

@error(404)
def error404(error):
    return 'This is not the page you are looking for.'

@game.get('/static/<filepath:path>')
def static(filepath):
    _path = os.path.abspath( os.path.join(app_root_path, "./static"))
    return static_file(filepath, root= _path)
    
@game.get('/bower_components/<filepath:path>')
def bower_files(filepath):
    _path = os.path.abspath( os.path.join(app_root_path, "./bower_components"))
    return static_file(filepath, root=_path)

template_path = os.path.abspath( os.path.join(app_root_path, "./views"))
bottle.TEMPLATE_PATH.insert(0,template_path)


# If we are hosting the app under a subdomain, we can set this
bottle.BaseTemplate.defaults['URL_PREFIX'] = '/gameoflife'

@game.route('/')
def index(section='home'):
    return template('index')

@game.route('/about')
def index(section='about'):
    return template('about')

application = game
application.debug=True
application.root_path = os.path.abspath( os.path.join(curpath, "../"))
