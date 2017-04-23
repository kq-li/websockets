$(document).ready(function () {
    var socket = io();
    var name = null;
    
    $('#name-text').focus();
    
    $('#name-form').submit(function () {
        name = $('#name-text').val();
        
        if (name.length > 0) {
            socket.emit('new_user', {
                name: name
            });

            $('#name-container').fadeOut(500);
            $('#chat-text').focus();
        }
        
        return false;
    });

    $('#chat-form').submit(function () {
        var message = $('#chat-text').val();

        if (message.length > 0) {
            socket.emit('new_message', {
                name: name,
                message: message
            });
        }

        $('#chat-text').val('');
        
        return false;
    });

    var append = function (string) {
        $('#chat-log').append(string + '\n');
        $('#chat-log').scrollTop($('#chat-log')[0].scrollHeight);
    };
    
    socket.on('chat_message', function (data) {
        append(data['name'] + ': ' + data['message']);
    });

    socket.on('server_message', function (data) {
        append('[SERVER] ' + data['message']);
    });

    $(window).bind('beforeunload', function () {
        socket. emit('user_disconnect', {
            name: name
        });
    });
});
