var assert = require('assert');

var ControlConnection = require('../../lib/control-connection.js');
var RoundRobinPolicy = require('../../lib/policies/load-balancing.js').RoundRobinPolicy;

describe('ControlConnection', function () {
  describe('#init()', function () {
    //CMM 2
    it('should retrieve local host and peers', function (done) {
      var options = {
        contactPoints: ['127.0.0.1'],
        policies: {
          loadBalancingPolicy: new RoundRobinPolicy()
        }};
      var cc = new ControlConnection(options);
      cc.init(function () {
        assert.equal(cc.hosts.length, 2);
        cc.hosts.forEach(function (h) {
          console.log(h);
          assert.ok(h.datacenter);
          assert.ok(h.rack);
        });
        done();
      });
    });
  });
});