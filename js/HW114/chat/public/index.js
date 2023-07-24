(function () {
  'use strict';
  
  const socketIo = io();

  const login_form = $('#chat_login');
  const message_display = $('#message_display');
  const chat_form = $('#chat_form')
  const chat_input = $('#chat_content');

  login_form.submit(e => {
    e.preventDefault();

    socketIo.emit('login', $('#chat_login input').val(), result => {
      if(result) {
        return undefined;
      } else {
        login_form.slideUp('fast');
        $('#chat_display').slideDown('slow');

        socketIo.on('info', info => {
          const message = info.join ? $(`<div class='info'>${info.join} has joined this chat</div>`) : $(`<div class='info'>${info.leave} has left this chat</div>`);
          message.appendTo(message_display)
        });

        socketIo.on('msg', msg => {
          $(`<div><span class='msg_name'>${msg.name}</span>:${msg.msg}</div>`).appendTo(message_display)
        });
      }
    });
  });

  chat_form.submit(e => {
    e.preventDefault();

    socketIo.emit('msg', chat_input.val());
    chat_input.val('');
  });
})();
