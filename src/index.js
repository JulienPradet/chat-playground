import { Observable } from 'rxjs';
import './index.css';
import { run } from '@cycle/rxjs-run';
import { makeDOMDriver, DOM, h1 } from '@cycle/dom';

function main(sources) {
  return Chat(sources);
}

const drivers = {
  DOM: makeDOMDriver('#root')
};

run(main, drivers);
