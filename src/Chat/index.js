import { Observable } from 'rxjs';
import dom from '../core/dom';
import createEventHandler from '../core/createEventHandler';
import MessageList from './MessageList';
import ChatForm from './ChatForm';
import WindowManager from './WindowManager';
import fromWindow from '../utils/fromWindow';

export default () => {
  const { stream: openedWindow$, handler: openWindow } = createEventHandler();
  const { stream: sentMessage$, handler: sendMessage } = createEventHandler();

  const openedConnexions$ = openedWindow$
    .map(() => fromWindow(window.location.href))
    .share();

  const fromParentWindow$ = Observable.create(observer => {
    window.addEventListener(
      'message',
      event => {
        observer.next(event);
      },
      false
    );
  });

  const receivedMessage$ = openedConnexions$
    .map(({ message$ }) => message$)
    .startWith(fromParentWindow$)
    .flatMap(message$ => message$)
    .map(event => event.data)
    .filter(message => message.type === 'message');

  const emittedMessage$ = sentMessage$.withLatestFrom(
    openedConnexions$
      .map(({ sendMessage }) => sendMessage)
      .scan((connexionList, connexion) => [...connexionList, connexion], [])
      .startWith([]),
    (sentMessage, connexions) => {
      connexions.forEach(sendMessage => sendMessage(sentMessage));
      return sentMessage;
    }
  );

  const messages$ = Observable.merge(
    Observable.of({ content: 'Bienvenue' }),
    receivedMessage$,
    emittedMessage$
  )
    .scan((messageList, message) => [...messageList, message], [])
    .startWith([]);

  return dom.div(
    {},
    MessageList(messages$),
    ChatForm(sendMessage),
    WindowManager(openWindow)
  );
};
