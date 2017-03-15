const Cylon = require('cylon');
const readline = require('readline');

let bb9;
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function startBotControl(bb8) {
  rl.on('line', (input) => {
    const [ command, ...args ] = input.split(' ');
    botControl(bb8, command, args);
  });
}

function botControl(bb8, command, args) {
    switch(command) {
    case 'roll':
      bb8.roll(args[0]);
      break;
    case 'stop':
      bb8.roll(0);
      break;
    case 'color':
      bb8.color(parseInt(args[0], 16));
      break;
    case 'after':
      const time = args[0];
      const [ nextCommand, ...nextArgs ] = args.slice(1);
      after(time, () => botControl(bb8, nextCommand, nextArgs));
      break;
    }
}

Cylon.robot({
  connections: {
    bluetooth: { adaptor: 'central', uuid: '00a90ed8e2974ca79dad4ca4a26110e6', module: 'cylon-ble'}
  },

  devices: {
    bb8: { driver: 'ollie'},
  },

  work: function(bot) {
    bot.bb8.start(function(err, data){
      bot.bb8.color(0x00FFFF);
      startBotControl(bot.bb8)
    });
  }
}).start();
