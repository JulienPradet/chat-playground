import createElement from 'virtual-dom/create-element';
import diff from 'virtual-dom/diff';
import patch from 'virtual-dom/patch';

const init = (domTree$, element) => {
  let rootNode, prevTree;
  domTree$
    .take(1)
    .do(tree => {
      rootNode = createElement(tree);
      element.appendChild(rootNode);
      prevTree = tree;
    })
    .concat(
      domTree$.skip(1).do(tree => {
        rootNode = patch(rootNode, diff(prevTree, tree));
        prevTree = tree;
      })
    )
    .subscribe(
      () => console.debug('DOM updated'),
      error => console.error(error),
      () => console.debug('Done.')
    );
};

export { init };
