'use strict';

const app = require('../server/server');
const request = require('supertest');
const Team = app.models.Team;
const Members = app.models.Members;
const chai = require('chai');
const expect = chai.expect;

describe('Member  API', () => {
  beforeEach((done) => {
    Team.destroyAll({}, () => {
      done();
    });
  });

  beforeEach((done) => {
    Members.destroyAll({}, () => {
      done();
    });
  });

  it('should get all members', (done) => {
    const membersData1 = {
      name: 'Member 1',
      description: 'Description Member 1',
    };

    const membersData2 = {
      name: 'Member 2',
      description: 'Description Member 2',
    };

    Members.create(membersData1, () => {
      Members.create(membersData2, () => {
        request(app)
          .get('/api/members')
          .expect(200)
          .expect((res) => {
            expect(res.body).to.be.an('array');
            expect(res.body.length).to.equal(2);
          })
          .end(done);
      });
    });
  });
});
