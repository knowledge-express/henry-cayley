import test from 'ava';
import Henry from '../lib';

test('it exists', t => {
  t.not(Henry, undefined);
});

test('it accepts a config object', t => {
  const config = {};
  t.is(typeof Henry(config), 'object');
});
