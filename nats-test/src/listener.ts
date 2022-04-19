import nats,{Message, Stan} from "node-nats-streaming";
import {randomBytes} from 'crypto'
import { TicketCreatedListener } from "./events/ticket-created-listener";
console.clear();

const stan = nats.connect('ticketing',randomBytes(4).toString('hex'),{
  url : 'http://localhost:4222'
});

stan.on('connect',()=>{
  console.log(`Listener Connected to NATS`);

  stan.on('close',()=>{
    console.log(`NATS connection closed!`);
    process.exit();
  });

  // const options = stan
  //   .subscriptionOptions()
  //   .setManualAckMode(true)
  //   .setDeliverAllAvailable()
  //   .setDurableName('accounting-service');

  // const subscribtion = stan.subscribe('ticket:created',`queue-group-name`,options);

  // subscribtion.on('message',(msg:Message)=>{

  //   const data = msg.getData();

  //   if(typeof data == 'string')
  //   {
  //     console.log(`Recived Data #${msg.getSequence()}, with data: ${data} `)
  //   }
  //   // console.log(`Message recieved`)
  //   msg.ack();
  // })

  new TicketCreatedListener(stan).listen();
});

process.on(`SIGINT`, ()=>stan.close());
process.on(`SIGTERM`, ()=>stan.close());


