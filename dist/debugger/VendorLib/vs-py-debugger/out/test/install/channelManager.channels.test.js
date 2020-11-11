"use strict"; // Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : new P(function (resolve) {
        resolve(result.value);
      }).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const assert = require("assert");

const inversify_1 = require("inversify");

const TypeMoq = require("typemoq");

const types_1 = require("../../client/common/application/types");

const channelManager_1 = require("../../client/common/installer/channelManager");

const types_2 = require("../../client/common/installer/types");

const types_3 = require("../../client/common/types");

const platform_1 = require("../../client/common/utils/platform");

const contracts_1 = require("../../client/interpreter/contracts");

const container_1 = require("../../client/ioc/container");

const serviceManager_1 = require("../../client/ioc/serviceManager");

const info = {
  architecture: platform_1.Architecture.Unknown,
  companyDisplayName: '',
  displayName: '',
  envName: '',
  path: '',
  type: contracts_1.InterpreterType.Unknown,
  version: '',
  version_info: [0, 0, 0, 'alpha'],
  sysPrefix: '',
  sysVersion: ''
}; // tslint:disable-next-line:max-func-body-length

suite('Installation - installation channels', () => {
  let serviceManager;
  let serviceContainer;
  let pipEnv;
  setup(() => {
    const cont = new inversify_1.Container();
    serviceManager = new serviceManager_1.ServiceManager(cont);
    serviceContainer = new container_1.ServiceContainer(cont);
    pipEnv = TypeMoq.Mock.ofType();
    serviceManager.addSingletonInstance(contracts_1.IInterpreterLocatorService, pipEnv.object, contracts_1.PIPENV_SERVICE);
  });
  test('Single channel', () => __awaiter(void 0, void 0, void 0, function* () {
    const installer = mockInstaller(true, '');
    const cm = new channelManager_1.InstallationChannelManager(serviceContainer);
    const channels = yield cm.getInstallationChannels();
    assert.equal(channels.length, 1, 'Incorrect number of channels');
    assert.equal(channels[0], installer.object, 'Incorrect installer');
  }));
  test('Multiple channels', () => __awaiter(void 0, void 0, void 0, function* () {
    const installer1 = mockInstaller(true, '1');
    mockInstaller(false, '2');
    const installer3 = mockInstaller(true, '3');
    const cm = new channelManager_1.InstallationChannelManager(serviceContainer);
    const channels = yield cm.getInstallationChannels();
    assert.equal(channels.length, 2, 'Incorrect number of channels');
    assert.equal(channels[0], installer1.object, 'Incorrect installer 1');
    assert.equal(channels[1], installer3.object, 'Incorrect installer 2');
  }));
  test('pipenv channel', () => __awaiter(void 0, void 0, void 0, function* () {
    mockInstaller(true, '1');
    mockInstaller(false, '2');
    mockInstaller(true, '3');
    const pipenvInstaller = mockInstaller(true, 'pipenv', 10);
    const interpreter = Object.assign({}, info, {
      path: 'pipenv',
      type: contracts_1.InterpreterType.VirtualEnv
    });
    pipEnv.setup(x => x.getInterpreters(TypeMoq.It.isAny())).returns(() => Promise.resolve([interpreter]));
    const cm = new channelManager_1.InstallationChannelManager(serviceContainer);
    const channels = yield cm.getInstallationChannels();
    assert.equal(channels.length, 1, 'Incorrect number of channels');
    assert.equal(channels[0], pipenvInstaller.object, 'Installer must be pipenv');
  }));
  test('Select installer', () => __awaiter(void 0, void 0, void 0, function* () {
    const installer1 = mockInstaller(true, '1');
    const installer2 = mockInstaller(true, '2');
    const appShell = TypeMoq.Mock.ofType();
    serviceManager.addSingletonInstance(types_1.IApplicationShell, appShell.object); // tslint:disable-next-line:no-any

    let items;
    appShell.setup(x => x.showQuickPick(TypeMoq.It.isAny(), TypeMoq.It.isAny())).callback((i, o) => {
      items = i;
    }).returns(() => new Promise((resolve, reject) => resolve(undefined)));
    installer1.setup(x => x.displayName).returns(() => 'Name 1');
    installer2.setup(x => x.displayName).returns(() => 'Name 2');
    const cm = new channelManager_1.InstallationChannelManager(serviceContainer);
    yield cm.getInstallationChannel(types_3.Product.pylint);
    assert.notEqual(items, undefined, 'showQuickPick not called');
    assert.equal(items.length, 2, 'Incorrect number of installer shown');
    assert.notEqual(items[0].label.indexOf('Name 1'), -1, 'Incorrect first installer name');
    assert.notEqual(items[1].label.indexOf('Name 2'), -1, 'Incorrect second installer name');
  }));

  function mockInstaller(supported, name, priority) {
    const installer = TypeMoq.Mock.ofType();
    installer.setup(x => x.isSupported(TypeMoq.It.isAny())).returns(() => new Promise(resolve => resolve(supported)));
    installer.setup(x => x.priority).returns(() => priority ? priority : 0);
    serviceManager.addSingletonInstance(types_2.IModuleInstaller, installer.object, name);
    return installer;
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNoYW5uZWxNYW5hZ2VyLmNoYW5uZWxzLnRlc3QuanMiXSwibmFtZXMiOlsiX19hd2FpdGVyIiwidGhpc0FyZyIsIl9hcmd1bWVudHMiLCJQIiwiZ2VuZXJhdG9yIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJmdWxmaWxsZWQiLCJ2YWx1ZSIsInN0ZXAiLCJuZXh0IiwiZSIsInJlamVjdGVkIiwicmVzdWx0IiwiZG9uZSIsInRoZW4iLCJhcHBseSIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiZXhwb3J0cyIsImFzc2VydCIsInJlcXVpcmUiLCJpbnZlcnNpZnlfMSIsIlR5cGVNb3EiLCJ0eXBlc18xIiwiY2hhbm5lbE1hbmFnZXJfMSIsInR5cGVzXzIiLCJ0eXBlc18zIiwicGxhdGZvcm1fMSIsImNvbnRyYWN0c18xIiwiY29udGFpbmVyXzEiLCJzZXJ2aWNlTWFuYWdlcl8xIiwiaW5mbyIsImFyY2hpdGVjdHVyZSIsIkFyY2hpdGVjdHVyZSIsIlVua25vd24iLCJjb21wYW55RGlzcGxheU5hbWUiLCJkaXNwbGF5TmFtZSIsImVudk5hbWUiLCJwYXRoIiwidHlwZSIsIkludGVycHJldGVyVHlwZSIsInZlcnNpb24iLCJ2ZXJzaW9uX2luZm8iLCJzeXNQcmVmaXgiLCJzeXNWZXJzaW9uIiwic3VpdGUiLCJzZXJ2aWNlTWFuYWdlciIsInNlcnZpY2VDb250YWluZXIiLCJwaXBFbnYiLCJzZXR1cCIsImNvbnQiLCJDb250YWluZXIiLCJTZXJ2aWNlTWFuYWdlciIsIlNlcnZpY2VDb250YWluZXIiLCJNb2NrIiwib2ZUeXBlIiwiYWRkU2luZ2xldG9uSW5zdGFuY2UiLCJJSW50ZXJwcmV0ZXJMb2NhdG9yU2VydmljZSIsIm9iamVjdCIsIlBJUEVOVl9TRVJWSUNFIiwidGVzdCIsImluc3RhbGxlciIsIm1vY2tJbnN0YWxsZXIiLCJjbSIsIkluc3RhbGxhdGlvbkNoYW5uZWxNYW5hZ2VyIiwiY2hhbm5lbHMiLCJnZXRJbnN0YWxsYXRpb25DaGFubmVscyIsImVxdWFsIiwibGVuZ3RoIiwiaW5zdGFsbGVyMSIsImluc3RhbGxlcjMiLCJwaXBlbnZJbnN0YWxsZXIiLCJpbnRlcnByZXRlciIsImFzc2lnbiIsIlZpcnR1YWxFbnYiLCJ4IiwiZ2V0SW50ZXJwcmV0ZXJzIiwiSXQiLCJpc0FueSIsInJldHVybnMiLCJpbnN0YWxsZXIyIiwiYXBwU2hlbGwiLCJJQXBwbGljYXRpb25TaGVsbCIsIml0ZW1zIiwic2hvd1F1aWNrUGljayIsImNhbGxiYWNrIiwiaSIsIm8iLCJ1bmRlZmluZWQiLCJnZXRJbnN0YWxsYXRpb25DaGFubmVsIiwiUHJvZHVjdCIsInB5bGludCIsIm5vdEVxdWFsIiwibGFiZWwiLCJpbmRleE9mIiwic3VwcG9ydGVkIiwibmFtZSIsInByaW9yaXR5IiwiaXNTdXBwb3J0ZWQiLCJJTW9kdWxlSW5zdGFsbGVyIl0sIm1hcHBpbmdzIjoiQUFBQSxhLENBQ0E7QUFDQTs7QUFDQSxJQUFJQSxTQUFTLEdBQUksVUFBUSxTQUFLQSxTQUFkLElBQTRCLFVBQVVDLE9BQVYsRUFBbUJDLFVBQW5CLEVBQStCQyxDQUEvQixFQUFrQ0MsU0FBbEMsRUFBNkM7QUFDckYsU0FBTyxLQUFLRCxDQUFDLEtBQUtBLENBQUMsR0FBR0UsT0FBVCxDQUFOLEVBQXlCLFVBQVVDLE9BQVYsRUFBbUJDLE1BQW5CLEVBQTJCO0FBQ3ZELGFBQVNDLFNBQVQsQ0FBbUJDLEtBQW5CLEVBQTBCO0FBQUUsVUFBSTtBQUFFQyxRQUFBQSxJQUFJLENBQUNOLFNBQVMsQ0FBQ08sSUFBVixDQUFlRixLQUFmLENBQUQsQ0FBSjtBQUE4QixPQUFwQyxDQUFxQyxPQUFPRyxDQUFQLEVBQVU7QUFBRUwsUUFBQUEsTUFBTSxDQUFDSyxDQUFELENBQU47QUFBWTtBQUFFOztBQUMzRixhQUFTQyxRQUFULENBQWtCSixLQUFsQixFQUF5QjtBQUFFLFVBQUk7QUFBRUMsUUFBQUEsSUFBSSxDQUFDTixTQUFTLENBQUMsT0FBRCxDQUFULENBQW1CSyxLQUFuQixDQUFELENBQUo7QUFBa0MsT0FBeEMsQ0FBeUMsT0FBT0csQ0FBUCxFQUFVO0FBQUVMLFFBQUFBLE1BQU0sQ0FBQ0ssQ0FBRCxDQUFOO0FBQVk7QUFBRTs7QUFDOUYsYUFBU0YsSUFBVCxDQUFjSSxNQUFkLEVBQXNCO0FBQUVBLE1BQUFBLE1BQU0sQ0FBQ0MsSUFBUCxHQUFjVCxPQUFPLENBQUNRLE1BQU0sQ0FBQ0wsS0FBUixDQUFyQixHQUFzQyxJQUFJTixDQUFKLENBQU0sVUFBVUcsT0FBVixFQUFtQjtBQUFFQSxRQUFBQSxPQUFPLENBQUNRLE1BQU0sQ0FBQ0wsS0FBUixDQUFQO0FBQXdCLE9BQW5ELEVBQXFETyxJQUFyRCxDQUEwRFIsU0FBMUQsRUFBcUVLLFFBQXJFLENBQXRDO0FBQXVIOztBQUMvSUgsSUFBQUEsSUFBSSxDQUFDLENBQUNOLFNBQVMsR0FBR0EsU0FBUyxDQUFDYSxLQUFWLENBQWdCaEIsT0FBaEIsRUFBeUJDLFVBQVUsSUFBSSxFQUF2QyxDQUFiLEVBQXlEUyxJQUF6RCxFQUFELENBQUo7QUFDSCxHQUxNLENBQVA7QUFNSCxDQVBEOztBQVFBTyxNQUFNLENBQUNDLGNBQVAsQ0FBc0JDLE9BQXRCLEVBQStCLFlBQS9CLEVBQTZDO0FBQUVYLEVBQUFBLEtBQUssRUFBRTtBQUFULENBQTdDOztBQUNBLE1BQU1ZLE1BQU0sR0FBR0MsT0FBTyxDQUFDLFFBQUQsQ0FBdEI7O0FBQ0EsTUFBTUMsV0FBVyxHQUFHRCxPQUFPLENBQUMsV0FBRCxDQUEzQjs7QUFDQSxNQUFNRSxPQUFPLEdBQUdGLE9BQU8sQ0FBQyxTQUFELENBQXZCOztBQUNBLE1BQU1HLE9BQU8sR0FBR0gsT0FBTyxDQUFDLHVDQUFELENBQXZCOztBQUNBLE1BQU1JLGdCQUFnQixHQUFHSixPQUFPLENBQUMsOENBQUQsQ0FBaEM7O0FBQ0EsTUFBTUssT0FBTyxHQUFHTCxPQUFPLENBQUMscUNBQUQsQ0FBdkI7O0FBQ0EsTUFBTU0sT0FBTyxHQUFHTixPQUFPLENBQUMsMkJBQUQsQ0FBdkI7O0FBQ0EsTUFBTU8sVUFBVSxHQUFHUCxPQUFPLENBQUMsb0NBQUQsQ0FBMUI7O0FBQ0EsTUFBTVEsV0FBVyxHQUFHUixPQUFPLENBQUMsb0NBQUQsQ0FBM0I7O0FBQ0EsTUFBTVMsV0FBVyxHQUFHVCxPQUFPLENBQUMsNEJBQUQsQ0FBM0I7O0FBQ0EsTUFBTVUsZ0JBQWdCLEdBQUdWLE9BQU8sQ0FBQyxpQ0FBRCxDQUFoQzs7QUFDQSxNQUFNVyxJQUFJLEdBQUc7QUFDVEMsRUFBQUEsWUFBWSxFQUFFTCxVQUFVLENBQUNNLFlBQVgsQ0FBd0JDLE9BRDdCO0FBRVRDLEVBQUFBLGtCQUFrQixFQUFFLEVBRlg7QUFHVEMsRUFBQUEsV0FBVyxFQUFFLEVBSEo7QUFJVEMsRUFBQUEsT0FBTyxFQUFFLEVBSkE7QUFLVEMsRUFBQUEsSUFBSSxFQUFFLEVBTEc7QUFNVEMsRUFBQUEsSUFBSSxFQUFFWCxXQUFXLENBQUNZLGVBQVosQ0FBNEJOLE9BTnpCO0FBT1RPLEVBQUFBLE9BQU8sRUFBRSxFQVBBO0FBUVRDLEVBQUFBLFlBQVksRUFBRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLE9BQVYsQ0FSTDtBQVNUQyxFQUFBQSxTQUFTLEVBQUUsRUFURjtBQVVUQyxFQUFBQSxVQUFVLEVBQUU7QUFWSCxDQUFiLEMsQ0FZQTs7QUFDQUMsS0FBSyxDQUFDLHNDQUFELEVBQXlDLE1BQU07QUFDaEQsTUFBSUMsY0FBSjtBQUNBLE1BQUlDLGdCQUFKO0FBQ0EsTUFBSUMsTUFBSjtBQUNBQyxFQUFBQSxLQUFLLENBQUMsTUFBTTtBQUNSLFVBQU1DLElBQUksR0FBRyxJQUFJN0IsV0FBVyxDQUFDOEIsU0FBaEIsRUFBYjtBQUNBTCxJQUFBQSxjQUFjLEdBQUcsSUFBSWhCLGdCQUFnQixDQUFDc0IsY0FBckIsQ0FBb0NGLElBQXBDLENBQWpCO0FBQ0FILElBQUFBLGdCQUFnQixHQUFHLElBQUlsQixXQUFXLENBQUN3QixnQkFBaEIsQ0FBaUNILElBQWpDLENBQW5CO0FBQ0FGLElBQUFBLE1BQU0sR0FBRzFCLE9BQU8sQ0FBQ2dDLElBQVIsQ0FBYUMsTUFBYixFQUFUO0FBQ0FULElBQUFBLGNBQWMsQ0FBQ1Usb0JBQWYsQ0FBb0M1QixXQUFXLENBQUM2QiwwQkFBaEQsRUFBNEVULE1BQU0sQ0FBQ1UsTUFBbkYsRUFBMkY5QixXQUFXLENBQUMrQixjQUF2RztBQUNILEdBTkksQ0FBTDtBQU9BQyxFQUFBQSxJQUFJLENBQUMsZ0JBQUQsRUFBbUIsTUFBTTlELFNBQVMsU0FBTyxLQUFLLENBQVosRUFBZSxLQUFLLENBQXBCLEVBQXVCLGFBQWE7QUFDdEUsVUFBTStELFNBQVMsR0FBR0MsYUFBYSxDQUFDLElBQUQsRUFBTyxFQUFQLENBQS9CO0FBQ0EsVUFBTUMsRUFBRSxHQUFHLElBQUl2QyxnQkFBZ0IsQ0FBQ3dDLDBCQUFyQixDQUFnRGpCLGdCQUFoRCxDQUFYO0FBQ0EsVUFBTWtCLFFBQVEsR0FBRyxNQUFNRixFQUFFLENBQUNHLHVCQUFILEVBQXZCO0FBQ0EvQyxJQUFBQSxNQUFNLENBQUNnRCxLQUFQLENBQWFGLFFBQVEsQ0FBQ0csTUFBdEIsRUFBOEIsQ0FBOUIsRUFBaUMsOEJBQWpDO0FBQ0FqRCxJQUFBQSxNQUFNLENBQUNnRCxLQUFQLENBQWFGLFFBQVEsQ0FBQyxDQUFELENBQXJCLEVBQTBCSixTQUFTLENBQUNILE1BQXBDLEVBQTRDLHFCQUE1QztBQUNILEdBTnFDLENBQWxDLENBQUo7QUFPQUUsRUFBQUEsSUFBSSxDQUFDLG1CQUFELEVBQXNCLE1BQU05RCxTQUFTLFNBQU8sS0FBSyxDQUFaLEVBQWUsS0FBSyxDQUFwQixFQUF1QixhQUFhO0FBQ3pFLFVBQU11RSxVQUFVLEdBQUdQLGFBQWEsQ0FBQyxJQUFELEVBQU8sR0FBUCxDQUFoQztBQUNBQSxJQUFBQSxhQUFhLENBQUMsS0FBRCxFQUFRLEdBQVIsQ0FBYjtBQUNBLFVBQU1RLFVBQVUsR0FBR1IsYUFBYSxDQUFDLElBQUQsRUFBTyxHQUFQLENBQWhDO0FBQ0EsVUFBTUMsRUFBRSxHQUFHLElBQUl2QyxnQkFBZ0IsQ0FBQ3dDLDBCQUFyQixDQUFnRGpCLGdCQUFoRCxDQUFYO0FBQ0EsVUFBTWtCLFFBQVEsR0FBRyxNQUFNRixFQUFFLENBQUNHLHVCQUFILEVBQXZCO0FBQ0EvQyxJQUFBQSxNQUFNLENBQUNnRCxLQUFQLENBQWFGLFFBQVEsQ0FBQ0csTUFBdEIsRUFBOEIsQ0FBOUIsRUFBaUMsOEJBQWpDO0FBQ0FqRCxJQUFBQSxNQUFNLENBQUNnRCxLQUFQLENBQWFGLFFBQVEsQ0FBQyxDQUFELENBQXJCLEVBQTBCSSxVQUFVLENBQUNYLE1BQXJDLEVBQTZDLHVCQUE3QztBQUNBdkMsSUFBQUEsTUFBTSxDQUFDZ0QsS0FBUCxDQUFhRixRQUFRLENBQUMsQ0FBRCxDQUFyQixFQUEwQkssVUFBVSxDQUFDWixNQUFyQyxFQUE2Qyx1QkFBN0M7QUFDSCxHQVR3QyxDQUFyQyxDQUFKO0FBVUFFLEVBQUFBLElBQUksQ0FBQyxnQkFBRCxFQUFtQixNQUFNOUQsU0FBUyxTQUFPLEtBQUssQ0FBWixFQUFlLEtBQUssQ0FBcEIsRUFBdUIsYUFBYTtBQUN0RWdFLElBQUFBLGFBQWEsQ0FBQyxJQUFELEVBQU8sR0FBUCxDQUFiO0FBQ0FBLElBQUFBLGFBQWEsQ0FBQyxLQUFELEVBQVEsR0FBUixDQUFiO0FBQ0FBLElBQUFBLGFBQWEsQ0FBQyxJQUFELEVBQU8sR0FBUCxDQUFiO0FBQ0EsVUFBTVMsZUFBZSxHQUFHVCxhQUFhLENBQUMsSUFBRCxFQUFPLFFBQVAsRUFBaUIsRUFBakIsQ0FBckM7QUFDQSxVQUFNVSxXQUFXLEdBQUd4RCxNQUFNLENBQUN5RCxNQUFQLENBQWMsRUFBZCxFQUFrQjFDLElBQWxCLEVBQXdCO0FBQUVPLE1BQUFBLElBQUksRUFBRSxRQUFSO0FBQWtCQyxNQUFBQSxJQUFJLEVBQUVYLFdBQVcsQ0FBQ1ksZUFBWixDQUE0QmtDO0FBQXBELEtBQXhCLENBQXBCO0FBQ0ExQixJQUFBQSxNQUFNLENBQUNDLEtBQVAsQ0FBYTBCLENBQUMsSUFBSUEsQ0FBQyxDQUFDQyxlQUFGLENBQWtCdEQsT0FBTyxDQUFDdUQsRUFBUixDQUFXQyxLQUFYLEVBQWxCLENBQWxCLEVBQXlEQyxPQUF6RCxDQUFpRSxNQUFNNUUsT0FBTyxDQUFDQyxPQUFSLENBQWdCLENBQUNvRSxXQUFELENBQWhCLENBQXZFO0FBQ0EsVUFBTVQsRUFBRSxHQUFHLElBQUl2QyxnQkFBZ0IsQ0FBQ3dDLDBCQUFyQixDQUFnRGpCLGdCQUFoRCxDQUFYO0FBQ0EsVUFBTWtCLFFBQVEsR0FBRyxNQUFNRixFQUFFLENBQUNHLHVCQUFILEVBQXZCO0FBQ0EvQyxJQUFBQSxNQUFNLENBQUNnRCxLQUFQLENBQWFGLFFBQVEsQ0FBQ0csTUFBdEIsRUFBOEIsQ0FBOUIsRUFBaUMsOEJBQWpDO0FBQ0FqRCxJQUFBQSxNQUFNLENBQUNnRCxLQUFQLENBQWFGLFFBQVEsQ0FBQyxDQUFELENBQXJCLEVBQTBCTSxlQUFlLENBQUNiLE1BQTFDLEVBQWtELDBCQUFsRDtBQUNILEdBWHFDLENBQWxDLENBQUo7QUFZQUUsRUFBQUEsSUFBSSxDQUFDLGtCQUFELEVBQXFCLE1BQU05RCxTQUFTLFNBQU8sS0FBSyxDQUFaLEVBQWUsS0FBSyxDQUFwQixFQUF1QixhQUFhO0FBQ3hFLFVBQU11RSxVQUFVLEdBQUdQLGFBQWEsQ0FBQyxJQUFELEVBQU8sR0FBUCxDQUFoQztBQUNBLFVBQU1rQixVQUFVLEdBQUdsQixhQUFhLENBQUMsSUFBRCxFQUFPLEdBQVAsQ0FBaEM7QUFDQSxVQUFNbUIsUUFBUSxHQUFHM0QsT0FBTyxDQUFDZ0MsSUFBUixDQUFhQyxNQUFiLEVBQWpCO0FBQ0FULElBQUFBLGNBQWMsQ0FBQ1Usb0JBQWYsQ0FBb0NqQyxPQUFPLENBQUMyRCxpQkFBNUMsRUFBK0RELFFBQVEsQ0FBQ3ZCLE1BQXhFLEVBSndFLENBS3hFOztBQUNBLFFBQUl5QixLQUFKO0FBQ0FGLElBQUFBLFFBQVEsQ0FDSGhDLEtBREwsQ0FDVzBCLENBQUMsSUFBSUEsQ0FBQyxDQUFDUyxhQUFGLENBQWdCOUQsT0FBTyxDQUFDdUQsRUFBUixDQUFXQyxLQUFYLEVBQWhCLEVBQW9DeEQsT0FBTyxDQUFDdUQsRUFBUixDQUFXQyxLQUFYLEVBQXBDLENBRGhCLEVBRUtPLFFBRkwsQ0FFYyxDQUFDQyxDQUFELEVBQUlDLENBQUosS0FBVTtBQUNwQkosTUFBQUEsS0FBSyxHQUFHRyxDQUFSO0FBQ0gsS0FKRCxFQUtLUCxPQUxMLENBS2EsTUFBTSxJQUFJNUUsT0FBSixDQUFZLENBQUNDLE9BQUQsRUFBVUMsTUFBVixLQUFxQkQsT0FBTyxDQUFDb0YsU0FBRCxDQUF4QyxDQUxuQjtBQU1BbkIsSUFBQUEsVUFBVSxDQUFDcEIsS0FBWCxDQUFpQjBCLENBQUMsSUFBSUEsQ0FBQyxDQUFDdkMsV0FBeEIsRUFBcUMyQyxPQUFyQyxDQUE2QyxNQUFNLFFBQW5EO0FBQ0FDLElBQUFBLFVBQVUsQ0FBQy9CLEtBQVgsQ0FBaUIwQixDQUFDLElBQUlBLENBQUMsQ0FBQ3ZDLFdBQXhCLEVBQXFDMkMsT0FBckMsQ0FBNkMsTUFBTSxRQUFuRDtBQUNBLFVBQU1oQixFQUFFLEdBQUcsSUFBSXZDLGdCQUFnQixDQUFDd0MsMEJBQXJCLENBQWdEakIsZ0JBQWhELENBQVg7QUFDQSxVQUFNZ0IsRUFBRSxDQUFDMEIsc0JBQUgsQ0FBMEIvRCxPQUFPLENBQUNnRSxPQUFSLENBQWdCQyxNQUExQyxDQUFOO0FBQ0F4RSxJQUFBQSxNQUFNLENBQUN5RSxRQUFQLENBQWdCVCxLQUFoQixFQUF1QkssU0FBdkIsRUFBa0MsMEJBQWxDO0FBQ0FyRSxJQUFBQSxNQUFNLENBQUNnRCxLQUFQLENBQWFnQixLQUFLLENBQUNmLE1BQW5CLEVBQTJCLENBQTNCLEVBQThCLHFDQUE5QjtBQUNBakQsSUFBQUEsTUFBTSxDQUFDeUUsUUFBUCxDQUFnQlQsS0FBSyxDQUFDLENBQUQsQ0FBTCxDQUFTVSxLQUFULENBQWVDLE9BQWYsQ0FBdUIsUUFBdkIsQ0FBaEIsRUFBa0QsQ0FBQyxDQUFuRCxFQUFzRCxnQ0FBdEQ7QUFDQTNFLElBQUFBLE1BQU0sQ0FBQ3lFLFFBQVAsQ0FBZ0JULEtBQUssQ0FBQyxDQUFELENBQUwsQ0FBU1UsS0FBVCxDQUFlQyxPQUFmLENBQXVCLFFBQXZCLENBQWhCLEVBQWtELENBQUMsQ0FBbkQsRUFBc0QsaUNBQXREO0FBQ0gsR0FyQnVDLENBQXBDLENBQUo7O0FBc0JBLFdBQVNoQyxhQUFULENBQXVCaUMsU0FBdkIsRUFBa0NDLElBQWxDLEVBQXdDQyxRQUF4QyxFQUFrRDtBQUM5QyxVQUFNcEMsU0FBUyxHQUFHdkMsT0FBTyxDQUFDZ0MsSUFBUixDQUFhQyxNQUFiLEVBQWxCO0FBQ0FNLElBQUFBLFNBQVMsQ0FDSlosS0FETCxDQUNXMEIsQ0FBQyxJQUFJQSxDQUFDLENBQUN1QixXQUFGLENBQWM1RSxPQUFPLENBQUN1RCxFQUFSLENBQVdDLEtBQVgsRUFBZCxDQURoQixFQUVLQyxPQUZMLENBRWEsTUFBTSxJQUFJNUUsT0FBSixDQUFhQyxPQUFELElBQWFBLE9BQU8sQ0FBQzJGLFNBQUQsQ0FBaEMsQ0FGbkI7QUFHQWxDLElBQUFBLFNBQVMsQ0FBQ1osS0FBVixDQUFnQjBCLENBQUMsSUFBSUEsQ0FBQyxDQUFDc0IsUUFBdkIsRUFBaUNsQixPQUFqQyxDQUF5QyxNQUFNa0IsUUFBUSxHQUFHQSxRQUFILEdBQWMsQ0FBckU7QUFDQW5ELElBQUFBLGNBQWMsQ0FBQ1Usb0JBQWYsQ0FBb0MvQixPQUFPLENBQUMwRSxnQkFBNUMsRUFBOER0QyxTQUFTLENBQUNILE1BQXhFLEVBQWdGc0MsSUFBaEY7QUFDQSxXQUFPbkMsU0FBUDtBQUNIO0FBQ0osQ0F2RUksQ0FBTCIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xyXG4vLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxyXG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59O1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmNvbnN0IGFzc2VydCA9IHJlcXVpcmUoXCJhc3NlcnRcIik7XHJcbmNvbnN0IGludmVyc2lmeV8xID0gcmVxdWlyZShcImludmVyc2lmeVwiKTtcclxuY29uc3QgVHlwZU1vcSA9IHJlcXVpcmUoXCJ0eXBlbW9xXCIpO1xyXG5jb25zdCB0eXBlc18xID0gcmVxdWlyZShcIi4uLy4uL2NsaWVudC9jb21tb24vYXBwbGljYXRpb24vdHlwZXNcIik7XHJcbmNvbnN0IGNoYW5uZWxNYW5hZ2VyXzEgPSByZXF1aXJlKFwiLi4vLi4vY2xpZW50L2NvbW1vbi9pbnN0YWxsZXIvY2hhbm5lbE1hbmFnZXJcIik7XHJcbmNvbnN0IHR5cGVzXzIgPSByZXF1aXJlKFwiLi4vLi4vY2xpZW50L2NvbW1vbi9pbnN0YWxsZXIvdHlwZXNcIik7XHJcbmNvbnN0IHR5cGVzXzMgPSByZXF1aXJlKFwiLi4vLi4vY2xpZW50L2NvbW1vbi90eXBlc1wiKTtcclxuY29uc3QgcGxhdGZvcm1fMSA9IHJlcXVpcmUoXCIuLi8uLi9jbGllbnQvY29tbW9uL3V0aWxzL3BsYXRmb3JtXCIpO1xyXG5jb25zdCBjb250cmFjdHNfMSA9IHJlcXVpcmUoXCIuLi8uLi9jbGllbnQvaW50ZXJwcmV0ZXIvY29udHJhY3RzXCIpO1xyXG5jb25zdCBjb250YWluZXJfMSA9IHJlcXVpcmUoXCIuLi8uLi9jbGllbnQvaW9jL2NvbnRhaW5lclwiKTtcclxuY29uc3Qgc2VydmljZU1hbmFnZXJfMSA9IHJlcXVpcmUoXCIuLi8uLi9jbGllbnQvaW9jL3NlcnZpY2VNYW5hZ2VyXCIpO1xyXG5jb25zdCBpbmZvID0ge1xyXG4gICAgYXJjaGl0ZWN0dXJlOiBwbGF0Zm9ybV8xLkFyY2hpdGVjdHVyZS5Vbmtub3duLFxyXG4gICAgY29tcGFueURpc3BsYXlOYW1lOiAnJyxcclxuICAgIGRpc3BsYXlOYW1lOiAnJyxcclxuICAgIGVudk5hbWU6ICcnLFxyXG4gICAgcGF0aDogJycsXHJcbiAgICB0eXBlOiBjb250cmFjdHNfMS5JbnRlcnByZXRlclR5cGUuVW5rbm93bixcclxuICAgIHZlcnNpb246ICcnLFxyXG4gICAgdmVyc2lvbl9pbmZvOiBbMCwgMCwgMCwgJ2FscGhhJ10sXHJcbiAgICBzeXNQcmVmaXg6ICcnLFxyXG4gICAgc3lzVmVyc2lvbjogJydcclxufTtcclxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm1heC1mdW5jLWJvZHktbGVuZ3RoXHJcbnN1aXRlKCdJbnN0YWxsYXRpb24gLSBpbnN0YWxsYXRpb24gY2hhbm5lbHMnLCAoKSA9PiB7XHJcbiAgICBsZXQgc2VydmljZU1hbmFnZXI7XHJcbiAgICBsZXQgc2VydmljZUNvbnRhaW5lcjtcclxuICAgIGxldCBwaXBFbnY7XHJcbiAgICBzZXR1cCgoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgY29udCA9IG5ldyBpbnZlcnNpZnlfMS5Db250YWluZXIoKTtcclxuICAgICAgICBzZXJ2aWNlTWFuYWdlciA9IG5ldyBzZXJ2aWNlTWFuYWdlcl8xLlNlcnZpY2VNYW5hZ2VyKGNvbnQpO1xyXG4gICAgICAgIHNlcnZpY2VDb250YWluZXIgPSBuZXcgY29udGFpbmVyXzEuU2VydmljZUNvbnRhaW5lcihjb250KTtcclxuICAgICAgICBwaXBFbnYgPSBUeXBlTW9xLk1vY2sub2ZUeXBlKCk7XHJcbiAgICAgICAgc2VydmljZU1hbmFnZXIuYWRkU2luZ2xldG9uSW5zdGFuY2UoY29udHJhY3RzXzEuSUludGVycHJldGVyTG9jYXRvclNlcnZpY2UsIHBpcEVudi5vYmplY3QsIGNvbnRyYWN0c18xLlBJUEVOVl9TRVJWSUNFKTtcclxuICAgIH0pO1xyXG4gICAgdGVzdCgnU2luZ2xlIGNoYW5uZWwnLCAoKSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgICAgY29uc3QgaW5zdGFsbGVyID0gbW9ja0luc3RhbGxlcih0cnVlLCAnJyk7XHJcbiAgICAgICAgY29uc3QgY20gPSBuZXcgY2hhbm5lbE1hbmFnZXJfMS5JbnN0YWxsYXRpb25DaGFubmVsTWFuYWdlcihzZXJ2aWNlQ29udGFpbmVyKTtcclxuICAgICAgICBjb25zdCBjaGFubmVscyA9IHlpZWxkIGNtLmdldEluc3RhbGxhdGlvbkNoYW5uZWxzKCk7XHJcbiAgICAgICAgYXNzZXJ0LmVxdWFsKGNoYW5uZWxzLmxlbmd0aCwgMSwgJ0luY29ycmVjdCBudW1iZXIgb2YgY2hhbm5lbHMnKTtcclxuICAgICAgICBhc3NlcnQuZXF1YWwoY2hhbm5lbHNbMF0sIGluc3RhbGxlci5vYmplY3QsICdJbmNvcnJlY3QgaW5zdGFsbGVyJyk7XHJcbiAgICB9KSk7XHJcbiAgICB0ZXN0KCdNdWx0aXBsZSBjaGFubmVscycsICgpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICBjb25zdCBpbnN0YWxsZXIxID0gbW9ja0luc3RhbGxlcih0cnVlLCAnMScpO1xyXG4gICAgICAgIG1vY2tJbnN0YWxsZXIoZmFsc2UsICcyJyk7XHJcbiAgICAgICAgY29uc3QgaW5zdGFsbGVyMyA9IG1vY2tJbnN0YWxsZXIodHJ1ZSwgJzMnKTtcclxuICAgICAgICBjb25zdCBjbSA9IG5ldyBjaGFubmVsTWFuYWdlcl8xLkluc3RhbGxhdGlvbkNoYW5uZWxNYW5hZ2VyKHNlcnZpY2VDb250YWluZXIpO1xyXG4gICAgICAgIGNvbnN0IGNoYW5uZWxzID0geWllbGQgY20uZ2V0SW5zdGFsbGF0aW9uQ2hhbm5lbHMoKTtcclxuICAgICAgICBhc3NlcnQuZXF1YWwoY2hhbm5lbHMubGVuZ3RoLCAyLCAnSW5jb3JyZWN0IG51bWJlciBvZiBjaGFubmVscycpO1xyXG4gICAgICAgIGFzc2VydC5lcXVhbChjaGFubmVsc1swXSwgaW5zdGFsbGVyMS5vYmplY3QsICdJbmNvcnJlY3QgaW5zdGFsbGVyIDEnKTtcclxuICAgICAgICBhc3NlcnQuZXF1YWwoY2hhbm5lbHNbMV0sIGluc3RhbGxlcjMub2JqZWN0LCAnSW5jb3JyZWN0IGluc3RhbGxlciAyJyk7XHJcbiAgICB9KSk7XHJcbiAgICB0ZXN0KCdwaXBlbnYgY2hhbm5lbCcsICgpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICBtb2NrSW5zdGFsbGVyKHRydWUsICcxJyk7XHJcbiAgICAgICAgbW9ja0luc3RhbGxlcihmYWxzZSwgJzInKTtcclxuICAgICAgICBtb2NrSW5zdGFsbGVyKHRydWUsICczJyk7XHJcbiAgICAgICAgY29uc3QgcGlwZW52SW5zdGFsbGVyID0gbW9ja0luc3RhbGxlcih0cnVlLCAncGlwZW52JywgMTApO1xyXG4gICAgICAgIGNvbnN0IGludGVycHJldGVyID0gT2JqZWN0LmFzc2lnbih7fSwgaW5mbywgeyBwYXRoOiAncGlwZW52JywgdHlwZTogY29udHJhY3RzXzEuSW50ZXJwcmV0ZXJUeXBlLlZpcnR1YWxFbnYgfSk7XHJcbiAgICAgICAgcGlwRW52LnNldHVwKHggPT4geC5nZXRJbnRlcnByZXRlcnMoVHlwZU1vcS5JdC5pc0FueSgpKSkucmV0dXJucygoKSA9PiBQcm9taXNlLnJlc29sdmUoW2ludGVycHJldGVyXSkpO1xyXG4gICAgICAgIGNvbnN0IGNtID0gbmV3IGNoYW5uZWxNYW5hZ2VyXzEuSW5zdGFsbGF0aW9uQ2hhbm5lbE1hbmFnZXIoc2VydmljZUNvbnRhaW5lcik7XHJcbiAgICAgICAgY29uc3QgY2hhbm5lbHMgPSB5aWVsZCBjbS5nZXRJbnN0YWxsYXRpb25DaGFubmVscygpO1xyXG4gICAgICAgIGFzc2VydC5lcXVhbChjaGFubmVscy5sZW5ndGgsIDEsICdJbmNvcnJlY3QgbnVtYmVyIG9mIGNoYW5uZWxzJyk7XHJcbiAgICAgICAgYXNzZXJ0LmVxdWFsKGNoYW5uZWxzWzBdLCBwaXBlbnZJbnN0YWxsZXIub2JqZWN0LCAnSW5zdGFsbGVyIG11c3QgYmUgcGlwZW52Jyk7XHJcbiAgICB9KSk7XHJcbiAgICB0ZXN0KCdTZWxlY3QgaW5zdGFsbGVyJywgKCkgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgICAgIGNvbnN0IGluc3RhbGxlcjEgPSBtb2NrSW5zdGFsbGVyKHRydWUsICcxJyk7XHJcbiAgICAgICAgY29uc3QgaW5zdGFsbGVyMiA9IG1vY2tJbnN0YWxsZXIodHJ1ZSwgJzInKTtcclxuICAgICAgICBjb25zdCBhcHBTaGVsbCA9IFR5cGVNb3EuTW9jay5vZlR5cGUoKTtcclxuICAgICAgICBzZXJ2aWNlTWFuYWdlci5hZGRTaW5nbGV0b25JbnN0YW5jZSh0eXBlc18xLklBcHBsaWNhdGlvblNoZWxsLCBhcHBTaGVsbC5vYmplY3QpO1xyXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1hbnlcclxuICAgICAgICBsZXQgaXRlbXM7XHJcbiAgICAgICAgYXBwU2hlbGxcclxuICAgICAgICAgICAgLnNldHVwKHggPT4geC5zaG93UXVpY2tQaWNrKFR5cGVNb3EuSXQuaXNBbnkoKSwgVHlwZU1vcS5JdC5pc0FueSgpKSlcclxuICAgICAgICAgICAgLmNhbGxiYWNrKChpLCBvKSA9PiB7XHJcbiAgICAgICAgICAgIGl0ZW1zID0gaTtcclxuICAgICAgICB9KVxyXG4gICAgICAgICAgICAucmV0dXJucygoKSA9PiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiByZXNvbHZlKHVuZGVmaW5lZCkpKTtcclxuICAgICAgICBpbnN0YWxsZXIxLnNldHVwKHggPT4geC5kaXNwbGF5TmFtZSkucmV0dXJucygoKSA9PiAnTmFtZSAxJyk7XHJcbiAgICAgICAgaW5zdGFsbGVyMi5zZXR1cCh4ID0+IHguZGlzcGxheU5hbWUpLnJldHVybnMoKCkgPT4gJ05hbWUgMicpO1xyXG4gICAgICAgIGNvbnN0IGNtID0gbmV3IGNoYW5uZWxNYW5hZ2VyXzEuSW5zdGFsbGF0aW9uQ2hhbm5lbE1hbmFnZXIoc2VydmljZUNvbnRhaW5lcik7XHJcbiAgICAgICAgeWllbGQgY20uZ2V0SW5zdGFsbGF0aW9uQ2hhbm5lbCh0eXBlc18zLlByb2R1Y3QucHlsaW50KTtcclxuICAgICAgICBhc3NlcnQubm90RXF1YWwoaXRlbXMsIHVuZGVmaW5lZCwgJ3Nob3dRdWlja1BpY2sgbm90IGNhbGxlZCcpO1xyXG4gICAgICAgIGFzc2VydC5lcXVhbChpdGVtcy5sZW5ndGgsIDIsICdJbmNvcnJlY3QgbnVtYmVyIG9mIGluc3RhbGxlciBzaG93bicpO1xyXG4gICAgICAgIGFzc2VydC5ub3RFcXVhbChpdGVtc1swXS5sYWJlbC5pbmRleE9mKCdOYW1lIDEnKSwgLTEsICdJbmNvcnJlY3QgZmlyc3QgaW5zdGFsbGVyIG5hbWUnKTtcclxuICAgICAgICBhc3NlcnQubm90RXF1YWwoaXRlbXNbMV0ubGFiZWwuaW5kZXhPZignTmFtZSAyJyksIC0xLCAnSW5jb3JyZWN0IHNlY29uZCBpbnN0YWxsZXIgbmFtZScpO1xyXG4gICAgfSkpO1xyXG4gICAgZnVuY3Rpb24gbW9ja0luc3RhbGxlcihzdXBwb3J0ZWQsIG5hbWUsIHByaW9yaXR5KSB7XHJcbiAgICAgICAgY29uc3QgaW5zdGFsbGVyID0gVHlwZU1vcS5Nb2NrLm9mVHlwZSgpO1xyXG4gICAgICAgIGluc3RhbGxlclxyXG4gICAgICAgICAgICAuc2V0dXAoeCA9PiB4LmlzU3VwcG9ydGVkKFR5cGVNb3EuSXQuaXNBbnkoKSkpXHJcbiAgICAgICAgICAgIC5yZXR1cm5zKCgpID0+IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiByZXNvbHZlKHN1cHBvcnRlZCkpKTtcclxuICAgICAgICBpbnN0YWxsZXIuc2V0dXAoeCA9PiB4LnByaW9yaXR5KS5yZXR1cm5zKCgpID0+IHByaW9yaXR5ID8gcHJpb3JpdHkgOiAwKTtcclxuICAgICAgICBzZXJ2aWNlTWFuYWdlci5hZGRTaW5nbGV0b25JbnN0YW5jZSh0eXBlc18yLklNb2R1bGVJbnN0YWxsZXIsIGluc3RhbGxlci5vYmplY3QsIG5hbWUpO1xyXG4gICAgICAgIHJldHVybiBpbnN0YWxsZXI7XHJcbiAgICB9XHJcbn0pO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1jaGFubmVsTWFuYWdlci5jaGFubmVscy50ZXN0LmpzLm1hcCJdfQ==