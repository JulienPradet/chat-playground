import dom from '../core/dom';
import createEventHandler from '../core/createEventHandler';
import Form from '../Form';
import Message from './Message.js';

export default sendMessage => {
  const { values$: formValues$, handlers: formHandlers } = Form({
    message: ''
  });

  return formValues$.flatMap(formValues =>
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
        onkeyup: setValueFromEvent
      }),
      dom.button({}, 'Envoyer')
    )
  );
};
