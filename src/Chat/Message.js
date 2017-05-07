import dom from '../core/dom';

export default message$ => {
  return message$.flatMap(message => dom.div({}, message.content));
};
