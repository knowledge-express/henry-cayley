import test from 'ava';
import { gephi } from '../lib/gephi';

test('it exists', t => {
  t.not(gephi, undefined);
});

test('it accepts a config object', t => {
  const config = {};
  t.is(typeof gephi(config), 'function');
});
