import test from 'ava';
import { graphql } from '../lib/graphql';
import nock from 'nock';

test('it exists', t => {
  t.not(graphql, undefined);
});

test('it accepts a config object', t => {
  const config = {};
  t.is(typeof graphql(config), 'function');
});

test('it should make a request to the host with the queryBody and return the data', t => {
  const host = 'http://fake-host';
  const config = {
    host
  };

  const data = { test: 'bla' };
  nock(host)
    .post('/api/v1/query/graphql')
    .reply(200, {
      data
     });

  const queryBody = 'fakeQuery';
  return graphql(config)({ queryBody })
    .then((d) => t.is(JSON.stringify(d), JSON.stringify(data)), (err) => t.fail(err));
});

test('it should throw an error if the result contains the `errors` key', t => {
  const host = 'http://fake-host';
  const config = {
    host
  };

  const errors = []
  nock(host)
    .post('/api/v1/query/graphql')
    .reply(200, {
      errors
     });

  const queryBody = 'fakeQuery';
  return graphql(config)({ queryBody })
    .then(() => t.fail(false), (err) => t.pass(err));
});
