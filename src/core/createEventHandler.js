import { Observable } from 'rxjs';

export default () => {
  let observer;
  const stream = Observable.create(o => {
    observer = o;
  });
  return {
    stream: stream,
    handler: param => observer.next(param)
  };
};
