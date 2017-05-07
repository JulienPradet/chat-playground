import { Observable } from 'rxjs';
import dom from '../core/dom';
import createEventHandler from '../core/createEventHandler';
import MessageList from './MessageList';
import ChatForm from './ChatForm';

export default () => {
  const { stream: sentMessage$, handler: sendMessage } = createEventHandler();

  const messages$ = Observable.merge(
    Observable.of({ content: 'Bienvenue' }),
    sentMessage$.do(message => console.log(message))
  )
    .scan((messageList, message) => [...messageList, message], [])
    .startWith([]);

  return dom.div({}, MessageList(messages$), ChatForm(sendMessage));
};
