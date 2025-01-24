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

  it('should update a member', (done) => {
    const membersData = {
      name: 'Member 1',
      description: 'Update Description Member 1',
    };

    Members.create(membersData, (err, team) => {
      const udMemberData = {
        name: 'Member 2',
        description: 'Update Description Member 2',
      };

      request(app)
        .patch(`/api/members/${team.id}`)
        .send(udMemberData)
        .expect(200)
        .expect((res) => {
          expect(res.body).to.have.property('id');
          expect(res.body.name).to.equal(udMemberData.name);
          expect(res.body.description).to.equal(udMemberData.description);
        })
        .end(done);
    });
  });
});
