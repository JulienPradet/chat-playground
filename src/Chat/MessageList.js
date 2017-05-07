import { Observable } from 'rxjs';
import dom from '../core/dom';
import Message from './Message.js';

export default messageList$ => {
  return messageList$.flatMap(messageList =>
    dom.div({}, ...messageList.map(message => Message(Observable.of(message))))
  );
};
