import { Observable } from 'rxjs';

export default url => {
  const ref = window.open(url, '_blank');

  const message$ = Observable.create(observer => {
    window.addEventListener('message', event => {
      observer.next(event);
    });
  }).share();

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
    message$,
    sendMessage
  };
};
