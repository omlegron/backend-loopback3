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

  it('should get a members by id', (done) => {
    const membersData = {
      name: 'Member 1',
      description: 'Description Member 1',
    };

    Members.create(membersData, (err, team) => {
      request(app)
        .get(`/api/members/${team.id}`)
        .expect(200)
        .expect((res) => {
          expect(res.body).to.have.property('id');
          expect(res.body.name).to.equal(membersData.name);
          expect(res.body.description).to.equal(membersData.description);
        })
        .end(done);
    });
  });
});
