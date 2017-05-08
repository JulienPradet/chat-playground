import dom from '../core/dom';
import createEventHandler from '../core/createEventHandler';

export default openWindow => {
  return dom.div(
    {},
    dom.button(
      { onclick: openWindow },
      'Ouvrir une nouvelle fenêtre de discussion'
    )
  );
};
