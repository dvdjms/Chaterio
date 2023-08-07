// local
const clientPort = 'http://localhost:3000'
const serverPort = 'http://localhost:9000';
const peerjsHost = '/';

// ngrok
// const ngrok = '652e'
// const ngrokserver = 'f99f'

// const serverPort = `${ngrokserver}-92-1-199-163.ngrok-free.app`
// const peerjsHost = `${ngrok}-92-1-199-163.ngrok-free.app`


const config = {
      clientPort: clientPort,
      serverPort: serverPort,
      peerjsHost: peerjsHost,
};

export default config;