import { Observable } from 'rxjs';
import h from 'virtual-dom/h';

const domElement = (name, attributes = {}, ...children) => {
  const cleanChildren = children.map(child => {
    if (typeof child === 'string') {
      return Observable.of(child);
    } else {
      return child;
    }
  });
  if (cleanChildren.length === 0) {
    return Observable.of(h(name, attributes));
  } else {
    return Observable.combineLatest(cleanChildren).map(trees =>
      h(name, attributes, trees)
    );
  }
};

export default new Proxy(
  {},
  {
    get: function(taget, name) {
      return domElement.bind(null, name);
    }
  }
);
