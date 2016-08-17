var expect = require('chai').expect;
var Sequelize = require('sequelize');
var db = require('../../../server/db');
var supertest = require('supertest');

describe('Users Route', function () {

    var app, User, Order, user;

    beforeEach('Sync DB', function () {
        return db.sync({ force: true });
    });

    beforeEach('Create app', function () {
        app = require('../../../server/app')(db);
        User = db.model('user');
        Dashboard = db.model('dashboard');
    });

  beforeEach('create user', function () {
    return User.create({
      first_name: "foo",
      last_name: "bar",
      email: "foo@bar.com",
      password: "foobar"

    })
    .then(function(_user){
      user = _user;
    })
  });

  describe('All users request', function () {

    var agent;

    beforeEach('create agent', function () {
      agent = supertest.agent(app);
    });

    it('GET all', function (done) {
      agent.get('/api/users')
        .expect(200)
            .end(function (err, res) {
              if (err) return done(err);
              expect(res.body).to.be.instanceof(Array);
              expect(res.body).to.have.length(1);
              done();
            });
    });

  });
});
