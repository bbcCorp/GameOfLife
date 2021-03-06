import os
import bottle
from bottle import *

bottle.BaseTemplate.defaults['URL_PREFIX'] = ''

@route('/')
def index(section='home'):
    return template('index')

@route('/about')
def index(section='about'):
    return template('about')

@error(404)
def error404(error):
    return 'This is not the page you are looking for.'

@get('/static/<filepath:path>')
def static(filepath):
    return static_file(filepath, root='static')
    
@get('/bower_components/<filepath:path>')
def bower_files(filepath):
    return static_file(filepath, root='bower_components')

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 1337))
    run(host='0.0.0.0', port=port, debug=True, reloader=True)
