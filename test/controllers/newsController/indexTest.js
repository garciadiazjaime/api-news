/* eslint-disable no-unused-expressions */

import sinon from 'sinon';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

import NewsController from '../../../src/controllers/newsController';
import NewsModel from '../../../src/models/newsModel';

chai.use(chaiAsPromised);
const expect = chai.expect;

describe('NewsController', () => {
  describe('promise resolved', () => {
    beforeEach(() => {
      sinon.stub(NewsModel, 'find').callsFake(() => ({
        where: () => ({
          gt: () => ({
            exec: () => Promise.resolve(),
          }),
        }),
      }));
    });

    afterEach(() => {
      NewsModel.find.restore();
    });

    it('#list', () => {
      expect(NewsController.list()).to.eventually.be.fulfilled;
    });
  });

  describe('promise rejected', () => {
    beforeEach(() => {
      sinon.stub(NewsModel, 'find').callsFake(() => ({
        where: () => ({
          gt: () => ({
            exec: () => Promise.reject(),
          }),
        }),
      }));
    });

    afterEach(() => {
      NewsModel.find.restore();
    });

    it('#list', () => {
      expect(NewsController.list()).to.eventually.be.rejected;
    });
  });
});
