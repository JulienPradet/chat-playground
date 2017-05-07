import dom from '../core/dom';
import createEventHandler from '../core/createEventHandler';
import Form from '../Form';
import Message from './Message.js';

export default sendMessage => {
  const { stream: message$, handler: updateMessage } = createEventHandler();

  return Form(({ setValue, setValueFromEvent }) => values =>
    dom.form(
      {
        onsubmit: event => {
          event.preventDefault();
          sendMessage({ content: values.message });
          setValue('message', '');
        }
      },
      dom.label({ for: 'message' }, 'Message :'),
      dom.input({
        name: 'message',
        id: 'message',
        value: values.message,
        onkeyup: setValueFromEvent
      }),
      dom.button({}, 'Envoyer')
    ));
};
