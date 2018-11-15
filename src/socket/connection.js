const socketIO = require('socket.io');

const io = new socketIO();

const passwordAdmin = '123456789';

io.on('connection', (socket) => {
  console.log('New connection openned: ', socket.id);

  // Event when a user disconnect
  socket.on('disconnect', () => {
    console.log(`User with the socket id "${socket.id}" has been disconnected`);
  });

  // Event to "login" like admin
  socket.on('connect_admin', (data) => {
    if(data.password === passwordAdmin) {
      // Join to room admin
      socket.join('admin', async(err) => {
        if(err) console.log('Error adding socket to room admin');
        console.log('Added socket to room admin');
      });
    }
  });
});

io.listen(process.env.WSPORT);

module.exports = io;