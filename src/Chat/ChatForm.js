import { Observable, Scheduler } from 'rxjs';
import dom from '../core/dom';
import createEventHandler from '../core/createEventHandler';
import Form from '../Form';
import Message from './Message.js';

export default sendMessage => {
  const { values$: formValues$, handlers: formHandlers } = Form({
    message: ''
  });

  const messageChanged$ = formValues$
    .map(values => values.message)
    .bufferCount(2, 1)
    .map(([prevMessage, nextMessage]) => prevMessage !== nextMessage)
    .filter(hasChanged => hasChanged)
    .share();

  const isTyping$ = Observable.merge(
    messageChanged$.mapTo(true),
    messageChanged$.debounceTime(1000).mapTo(false)
  )
    .startWith(false)
    .do(isTyping => console.log(isTyping));

  return Observable.combineLatest(
    isTyping$,
    formValues$,
    (isTyping, formValues) => ({ isTyping, formValues })
  ).flatMap(({ isTyping, formValues }) =>
    dom.form(
      {
        onsubmit: event => {
          event.preventDefault();
          sendMessage({ content: formValues.message });
          formHandlers.setValue('message', '');
        }
      },
      dom.label({ for: 'message' }, 'Message :'),
      dom.input({
        name: 'message',
        id: 'message',
        value: formValues.message,
        onkeyup: formHandlers.setValueFromEvent
      }),
      dom.p({}, isTyping ? 'Typing...' : '...'),
      dom.button({}, 'Envoyer')
    )
  );
};
