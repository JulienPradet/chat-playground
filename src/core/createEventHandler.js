import { Observable } from 'rxjs';

export default () => {
  let subscribers = [];
  const stream = Observable.create(o => {
    subscribers.push(o);
  });
  return {
    stream: stream,
    handler: param => subscribers.forEach(observer => observer.next(param))
  };
};
