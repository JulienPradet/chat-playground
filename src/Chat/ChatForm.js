import dom from '../core/dom';
import createEventHandler from '../core/createEventHandler';
import Message from './Message.js';

export default sendMessage => {
  const { stream: message$, handler: updateMessage } = createEventHandler();

  const submitForm = event => {
    event.preventDefault();
    const formData = new FormData(event.target);
    sendMessage({ content: formData.get('message') });
    updateMessage('');
  };

  const onChange = event => {
    updateMessage(event.target.value);
  };

  return message$.startWith('').flatMap(messaveValue =>
    dom.form(
      { onsubmit: submitForm },
      dom.label({ for: 'message' }, 'Message :'),
      dom.input({
        name: 'message',
        id: 'message',
        value: messaveValue,
        onchange: onChange
      }),
      dom.button({}, 'Envoyer')
    )
  );
};
