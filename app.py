from flask import Flask, render_template, redirect, url_for
from flask_socketio import SocketIO
import json
import os

app = Flask(__name__)
socketio = SocketIO(app)

def run():
    port = int(os.environ.get('PORT', 5000))
    socketio.run(app, host = '0.0.0.0', port = port)

@app.route('/')
def root():
    return redirect(url_for('chat'))

@app.route('/chat/')
def chat():
    return render_template('chat.html')
    
@socketio.on('new_user')
def new_user(data):
    socketio.emit('server_message', {
        'message': data['name'] + ' joined'
    })

@socketio.on('new_message')
def new_message(data):
    socketio.emit('chat_message', data)

@socketio.on('user_disconnect')
def user_disconnect(data):
    socketio.emit('server_message', {
        'message': data['name'] + ' left'
    })

if __name__ == '__main__':
    run()
