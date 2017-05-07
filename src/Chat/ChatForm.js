import { Observable, Scheduler } from 'rxjs';
import dom from '../core/dom';
import createEventHandler from '../core/createEventHandler';
import Form from '../Form';
import Message from './Message.js';

export default sendMessage => {
  const { stream: typing$, handler: setTyping } = createEventHandler();

  const isTyping$ = Observable.merge(
    typing$.mapTo(true),
    typing$.debounceTime(1000).mapTo(false)
  )
    .distinctUntilChanged()
    .startWith(false);

  const { values$: formValues$, handlers: formHandlers } = Form({
    message: ''
  });

  return Observable.combineLatest(
    isTyping$,
    formValues$
  ).flatMap(([isTyping, formValues]) =>
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
        onkeyup: event => {
          formHandlers.setValueFromEvent(event);
          setTyping(true);
        }
      }),
      dom.p({}, isTyping ? 'Typing...' : '...'),
      dom.button({}, 'Envoyer')
    )
  );
};
