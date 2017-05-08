import { Subject } from 'rxjs';

export default () => {
  const subject = new Subject();
  return {
    stream: subject,
    handler: param => subject.next(param)
  };
};
