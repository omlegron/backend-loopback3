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

  it('should delete a members', (done) => {
    const membersData = {
      name: 'Member 1',
      description: 'Description Member 1',
    };

    Members.create(membersData, (err, member) => {
      request(app)
        .delete(`/api/members/${member.id}`)
        .expect(200)
        .end(done);
    });
  });
});
