import { Observable, Subject } from 'rxjs';

export default url => {
  const ref = window.open(url, '_blank');

  const subject = new Subject();

  window.addEventListener('message', event => {
    subject.next(event);
  });

  const sendMessage = message => {
    ref.postMessage(
      Object.assign(message, {
        type: 'message',
        meta: {
          author: 1
        }
      }),
      '*'
    );
  };

  return {
    message$: subject,
    sendMessage
  };
};
