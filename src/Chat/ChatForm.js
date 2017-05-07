import dom from '../core/dom';
import Message from './Message.js';

export default sendMessage => {
  const submitForm = event => {
    event.preventDefault();
    const formData = new FormData(event.target);
    sendMessage({ content: formData.get('message') });
  };

  return dom.form(
    { onsubmit: submitForm },
    dom.label({ for: 'message' }, 'Message :'),
    dom.input({ name: 'message', id: 'message' }),
    dom.button({}, 'Envoyer')
  );
};
