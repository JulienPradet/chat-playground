import createElement from 'virtual-dom/create-element';
import diff from 'virtual-dom/diff';
import patch from 'virtual-dom/patch';

const init = (domTree$, element) => {
  let rootNode;

  domTree$
    .take(1)
    .do(tree => {
      rootNode = createElement(tree);
      element.appendChild(rootNode);
    })
    .concat(domTree$.skip(1))
    .bufferCount(2, 1)
    .do(([prevTree, nextTree]) => {
      rootNode = patch(rootNode, diff(prevTree, nextTree));
    })
    .subscribe(
      () => console.debug('DOM updated'),
      error => console.error(error),
      () => console.debug('Done.')
    );
};

export { init };
