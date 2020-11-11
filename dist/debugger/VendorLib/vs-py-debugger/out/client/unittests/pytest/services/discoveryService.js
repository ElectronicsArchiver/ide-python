"use strict"; // Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

var __decorate = void 0 && (void 0).__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var __param = void 0 && (void 0).__param || function (paramIndex, decorator) {
  return function (target, key) {
    decorator(target, key, paramIndex);
  };
};

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

const inversify_1 = require("inversify");

const vscode_1 = require("vscode");

const types_1 = require("../../../ioc/types");

const constants_1 = require("../../common/constants");

const types_2 = require("../../common/types");

const types_3 = require("../../types");

let TestDiscoveryService = class TestDiscoveryService {
  constructor(serviceContainer, testParser) {
    this.serviceContainer = serviceContainer;
    this.testParser = testParser;
    this.argsService = this.serviceContainer.get(types_3.IArgumentsService, constants_1.PYTEST_PROVIDER);
    this.helper = this.serviceContainer.get(types_2.ITestsHelper);
    this.runner = this.serviceContainer.get(types_2.ITestRunner);
  }

  discoverTests(options) {
    return __awaiter(this, void 0, void 0, function* () {
      const args = this.buildTestCollectionArgs(options); // Collect tests for each test directory separately and merge.

      const testDirectories = this.argsService.getTestFolders(options.args);

      if (testDirectories.length === 0) {
        const opts = Object.assign({}, options, {
          args
        });
        return this.discoverTestsInTestDirectory(opts);
      }

      const results = yield Promise.all(testDirectories.map(testDir => {
        // Add test directory as a positional argument.
        const opts = Object.assign({}, options, {
          args: [...args, testDir]
        });
        return this.discoverTestsInTestDirectory(opts);
      }));
      return this.helper.mergeTests(results);
    });
  }

  buildTestCollectionArgs(options) {
    // Remove unwnted arguments (which happen to be test directories & test specific args).
    const args = this.argsService.filterArguments(options.args, types_3.TestFilter.discovery);

    if (options.ignoreCache && args.indexOf('--cache-clear') === -1) {
      args.splice(0, 0, '--cache-clear');
    }

    if (args.indexOf('-s') === -1) {
      args.splice(0, 0, '-s');
    }

    args.splice(0, 0, '--collect-only');
    return args;
  }

  discoverTestsInTestDirectory(options) {
    return __awaiter(this, void 0, void 0, function* () {
      const token = options.token ? options.token : new vscode_1.CancellationTokenSource().token;
      const runOptions = {
        args: options.args,
        cwd: options.cwd,
        workspaceFolder: options.workspaceFolder,
        token,
        outChannel: options.outChannel
      };
      const data = yield this.runner.run(constants_1.PYTEST_PROVIDER, runOptions);

      if (options.token && options.token.isCancellationRequested) {
        return Promise.reject('cancelled');
      }

      return this.testParser.parse(data, options);
    });
  }

};
TestDiscoveryService = __decorate([inversify_1.injectable(), __param(0, inversify_1.inject(types_1.IServiceContainer)), __param(1, inversify_1.inject(types_2.ITestsParser)), __param(1, inversify_1.named(constants_1.PYTEST_PROVIDER))], TestDiscoveryService);
exports.TestDiscoveryService = TestDiscoveryService;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRpc2NvdmVyeVNlcnZpY2UuanMiXSwibmFtZXMiOlsiX19kZWNvcmF0ZSIsImRlY29yYXRvcnMiLCJ0YXJnZXQiLCJrZXkiLCJkZXNjIiwiYyIsImFyZ3VtZW50cyIsImxlbmd0aCIsInIiLCJPYmplY3QiLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IiLCJkIiwiUmVmbGVjdCIsImRlY29yYXRlIiwiaSIsImRlZmluZVByb3BlcnR5IiwiX19wYXJhbSIsInBhcmFtSW5kZXgiLCJkZWNvcmF0b3IiLCJfX2F3YWl0ZXIiLCJ0aGlzQXJnIiwiX2FyZ3VtZW50cyIsIlAiLCJnZW5lcmF0b3IiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImZ1bGZpbGxlZCIsInZhbHVlIiwic3RlcCIsIm5leHQiLCJlIiwicmVqZWN0ZWQiLCJyZXN1bHQiLCJkb25lIiwidGhlbiIsImFwcGx5IiwiZXhwb3J0cyIsImludmVyc2lmeV8xIiwicmVxdWlyZSIsInZzY29kZV8xIiwidHlwZXNfMSIsImNvbnN0YW50c18xIiwidHlwZXNfMiIsInR5cGVzXzMiLCJUZXN0RGlzY292ZXJ5U2VydmljZSIsImNvbnN0cnVjdG9yIiwic2VydmljZUNvbnRhaW5lciIsInRlc3RQYXJzZXIiLCJhcmdzU2VydmljZSIsImdldCIsIklBcmd1bWVudHNTZXJ2aWNlIiwiUFlURVNUX1BST1ZJREVSIiwiaGVscGVyIiwiSVRlc3RzSGVscGVyIiwicnVubmVyIiwiSVRlc3RSdW5uZXIiLCJkaXNjb3ZlclRlc3RzIiwib3B0aW9ucyIsImFyZ3MiLCJidWlsZFRlc3RDb2xsZWN0aW9uQXJncyIsInRlc3REaXJlY3RvcmllcyIsImdldFRlc3RGb2xkZXJzIiwib3B0cyIsImFzc2lnbiIsImRpc2NvdmVyVGVzdHNJblRlc3REaXJlY3RvcnkiLCJyZXN1bHRzIiwiYWxsIiwibWFwIiwidGVzdERpciIsIm1lcmdlVGVzdHMiLCJmaWx0ZXJBcmd1bWVudHMiLCJUZXN0RmlsdGVyIiwiZGlzY292ZXJ5IiwiaWdub3JlQ2FjaGUiLCJpbmRleE9mIiwic3BsaWNlIiwidG9rZW4iLCJDYW5jZWxsYXRpb25Ub2tlblNvdXJjZSIsInJ1bk9wdGlvbnMiLCJjd2QiLCJ3b3Jrc3BhY2VGb2xkZXIiLCJvdXRDaGFubmVsIiwiZGF0YSIsInJ1biIsImlzQ2FuY2VsbGF0aW9uUmVxdWVzdGVkIiwicGFyc2UiLCJpbmplY3RhYmxlIiwiaW5qZWN0IiwiSVNlcnZpY2VDb250YWluZXIiLCJJVGVzdHNQYXJzZXIiLCJuYW1lZCJdLCJtYXBwaW5ncyI6IkFBQUEsYSxDQUNBO0FBQ0E7O0FBQ0EsSUFBSUEsVUFBVSxHQUFJLFVBQVEsU0FBS0EsVUFBZCxJQUE2QixVQUFVQyxVQUFWLEVBQXNCQyxNQUF0QixFQUE4QkMsR0FBOUIsRUFBbUNDLElBQW5DLEVBQXlDO0FBQ25GLE1BQUlDLENBQUMsR0FBR0MsU0FBUyxDQUFDQyxNQUFsQjtBQUFBLE1BQTBCQyxDQUFDLEdBQUdILENBQUMsR0FBRyxDQUFKLEdBQVFILE1BQVIsR0FBaUJFLElBQUksS0FBSyxJQUFULEdBQWdCQSxJQUFJLEdBQUdLLE1BQU0sQ0FBQ0Msd0JBQVAsQ0FBZ0NSLE1BQWhDLEVBQXdDQyxHQUF4QyxDQUF2QixHQUFzRUMsSUFBckg7QUFBQSxNQUEySE8sQ0FBM0g7QUFDQSxNQUFJLE9BQU9DLE9BQVAsS0FBbUIsUUFBbkIsSUFBK0IsT0FBT0EsT0FBTyxDQUFDQyxRQUFmLEtBQTRCLFVBQS9ELEVBQTJFTCxDQUFDLEdBQUdJLE9BQU8sQ0FBQ0MsUUFBUixDQUFpQlosVUFBakIsRUFBNkJDLE1BQTdCLEVBQXFDQyxHQUFyQyxFQUEwQ0MsSUFBMUMsQ0FBSixDQUEzRSxLQUNLLEtBQUssSUFBSVUsQ0FBQyxHQUFHYixVQUFVLENBQUNNLE1BQVgsR0FBb0IsQ0FBakMsRUFBb0NPLENBQUMsSUFBSSxDQUF6QyxFQUE0Q0EsQ0FBQyxFQUE3QyxFQUFpRCxJQUFJSCxDQUFDLEdBQUdWLFVBQVUsQ0FBQ2EsQ0FBRCxDQUFsQixFQUF1Qk4sQ0FBQyxHQUFHLENB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QUosQ0FIdUIsRUFHd0IxRSxPQUFPLENBQUMsQ0FBRCxFQUFJc0IsV0FBVyxDQUFDcUQsS0FBWixDQUFrQmpELFdBQVcsQ0FBQ1UsZUFBOUIsQ0FBSixDQUgvQixDQUFELEVBSTlCUCxvQkFKOEIsQ0FBakM7QUFLQVIsT0FBTyxDQUFDUSxvQkFBUixHQUErQkEsb0JBQS9CIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XHJcbi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXHJcbnZhciBfX2RlY29yYXRlID0gKHRoaXMgJiYgdGhpcy5fX2RlY29yYXRlKSB8fCBmdW5jdGlvbiAoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcclxuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xyXG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcclxuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XHJcbn07XHJcbnZhciBfX3BhcmFtID0gKHRoaXMgJiYgdGhpcy5fX3BhcmFtKSB8fCBmdW5jdGlvbiAocGFyYW1JbmRleCwgZGVjb3JhdG9yKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwga2V5KSB7IGRlY29yYXRvcih0YXJnZXQsIGtleSwgcGFyYW1JbmRleCk7IH1cclxufTtcclxudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHJlc3VsdC52YWx1ZSk7IH0pLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5jb25zdCBpbnZlcnNpZnlfMSA9IHJlcXVpcmUoXCJpbnZlcnNpZnlcIik7XHJcbmNvbnN0IHZzY29kZV8xID0gcmVxdWlyZShcInZzY29kZVwiKTtcclxuY29uc3QgdHlwZXNfMSA9IHJlcXVpcmUoXCIuLi8uLi8uLi9pb2MvdHlwZXNcIik7XHJcbmNvbnN0IGNvbnN0YW50c18xID0gcmVxdWlyZShcIi4uLy4uL2NvbW1vbi9jb25zdGFudHNcIik7XHJcbmNvbnN0IHR5cGVzXzIgPSByZXF1aXJlKFwiLi4vLi4vY29tbW9uL3R5cGVzXCIpO1xyXG5jb25zdCB0eXBlc18zID0gcmVxdWlyZShcIi4uLy4uL3R5cGVzXCIpO1xyXG5sZXQgVGVzdERpc2NvdmVyeVNlcnZpY2UgPSBjbGFzcyBUZXN0RGlzY292ZXJ5U2VydmljZSB7XHJcbiAgICBjb25zdHJ1Y3RvcihzZXJ2aWNlQ29udGFpbmVyLCB0ZXN0UGFyc2VyKSB7XHJcbiAgICAgICAgdGhpcy5zZXJ2aWNlQ29udGFpbmVyID0gc2VydmljZUNvbnRhaW5lcjtcclxuICAgICAgICB0aGlzLnRlc3RQYXJzZXIgPSB0ZXN0UGFyc2VyO1xyXG4gICAgICAgIHRoaXMuYXJnc1NlcnZpY2UgPSB0aGlzLnNlcnZpY2VDb250YWluZXIuZ2V0KHR5cGVzXzMuSUFyZ3VtZW50c1NlcnZpY2UsIGNvbnN0YW50c18xLlBZVEVTVF9QUk9WSURFUik7XHJcbiAgICAgICAgdGhpcy5oZWxwZXIgPSB0aGlzLnNlcnZpY2VDb250YWluZXIuZ2V0KHR5cGVzXzIuSVRlc3RzSGVscGVyKTtcclxuICAgICAgICB0aGlzLnJ1bm5lciA9IHRoaXMuc2VydmljZUNvbnRhaW5lci5nZXQodHlwZXNfMi5JVGVzdFJ1bm5lcik7XHJcbiAgICB9XHJcbiAgICBkaXNjb3ZlclRlc3RzKG9wdGlvbnMpIHtcclxuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgICAgICAgICBjb25zdCBhcmdzID0gdGhpcy5idWlsZFRlc3RDb2xsZWN0aW9uQXJncyhvcHRpb25zKTtcclxuICAgICAgICAgICAgLy8gQ29sbGVjdCB0ZXN0cyBmb3IgZWFjaCB0ZXN0IGRpcmVjdG9yeSBzZXBhcmF0ZWx5IGFuZCBtZXJnZS5cclxuICAgICAgICAgICAgY29uc3QgdGVzdERpcmVjdG9yaWVzID0gdGhpcy5hcmdzU2VydmljZS5nZXRUZXN0Rm9sZGVycyhvcHRpb25zLmFyZ3MpO1xyXG4gICAgICAgICAgICBpZiAodGVzdERpcmVjdG9yaWVzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgb3B0cyA9IE9iamVjdC5hc3NpZ24oe30sIG9wdGlvbnMsIHsgYXJncyB9KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRpc2NvdmVyVGVzdHNJblRlc3REaXJlY3Rvcnkob3B0cyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc3QgcmVzdWx0cyA9IHlpZWxkIFByb21pc2UuYWxsKHRlc3REaXJlY3Rvcmllcy5tYXAodGVzdERpciA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyBBZGQgdGVzdCBkaXJlY3RvcnkgYXMgYSBwb3NpdGlvbmFsIGFyZ3VtZW50LlxyXG4gICAgICAgICAgICAgICAgY29uc3Qgb3B0cyA9IE9iamVjdC5hc3NpZ24oe30sIG9wdGlvbnMsIHsgYXJnczogWy4uLmFyZ3MsIHRlc3REaXJdIH0pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGlzY292ZXJUZXN0c0luVGVzdERpcmVjdG9yeShvcHRzKTtcclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5oZWxwZXIubWVyZ2VUZXN0cyhyZXN1bHRzKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGJ1aWxkVGVzdENvbGxlY3Rpb25BcmdzKG9wdGlvbnMpIHtcclxuICAgICAgICAvLyBSZW1vdmUgdW53bnRlZCBhcmd1bWVudHMgKHdoaWNoIGhhcHBlbiB0byBiZSB0ZXN0IGRpcmVjdG9yaWVzICYgdGVzdCBzcGVjaWZpYyBhcmdzKS5cclxuICAgICAgICBjb25zdCBhcmdzID0gdGhpcy5hcmdzU2VydmljZS5maWx0ZXJBcmd1bWVudHMob3B0aW9ucy5hcmdzLCB0eXBlc18zLlRlc3RGaWx0ZXIuZGlzY292ZXJ5KTtcclxuICAgICAgICBpZiAob3B0aW9ucy5pZ25vcmVDYWNoZSAmJiBhcmdzLmluZGV4T2YoJy0tY2FjaGUtY2xlYXInKSA9PT0gLTEpIHtcclxuICAgICAgICAgICAgYXJncy5zcGxpY2UoMCwgMCwgJy0tY2FjaGUtY2xlYXInKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGFyZ3MuaW5kZXhPZignLXMnKSA9PT0gLTEpIHtcclxuICAgICAgICAgICAgYXJncy5zcGxpY2UoMCwgMCwgJy1zJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGFyZ3Muc3BsaWNlKDAsIDAsICctLWNvbGxlY3Qtb25seScpO1xyXG4gICAgICAgIHJldHVybiBhcmdzO1xyXG4gICAgfVxyXG4gICAgZGlzY292ZXJUZXN0c0luVGVzdERpcmVjdG9yeShvcHRpb25zKSB7XHJcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICAgICAgY29uc3QgdG9rZW4gPSBvcHRpb25zLnRva2VuID8gb3B0aW9ucy50b2tlbiA6IG5ldyB2c2NvZGVfMS5DYW5jZWxsYXRpb25Ub2tlblNvdXJjZSgpLnRva2VuO1xyXG4gICAgICAgICAgICBjb25zdCBydW5PcHRpb25zID0ge1xyXG4gICAgICAgICAgICAgICAgYXJnczogb3B0aW9ucy5hcmdzLFxyXG4gICAgICAgICAgICAgICAgY3dkOiBvcHRpb25zLmN3ZCxcclxuICAgICAgICAgICAgICAgIHdvcmtzcGFjZUZvbGRlcjogb3B0aW9ucy53b3Jrc3BhY2VGb2xkZXIsXHJcbiAgICAgICAgICAgICAgICB0b2tlbixcclxuICAgICAgICAgICAgICAgIG91dENoYW5uZWw6IG9wdGlvbnMub3V0Q2hhbm5lbFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBjb25zdCBkYXRhID0geWllbGQgdGhpcy5ydW5uZXIucnVuKGNvbnN0YW50c18xLlBZVEVTVF9QUk9WSURFUiwgcnVuT3B0aW9ucyk7XHJcbiAgICAgICAgICAgIGlmIChvcHRpb25zLnRva2VuICYmIG9wdGlvbnMudG9rZW4uaXNDYW5jZWxsYXRpb25SZXF1ZXN0ZWQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdCgnY2FuY2VsbGVkJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMudGVzdFBhcnNlci5wYXJzZShkYXRhLCBvcHRpb25zKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufTtcclxuVGVzdERpc2NvdmVyeVNlcnZpY2UgPSBfX2RlY29yYXRlKFtcclxuICAgIGludmVyc2lmeV8xLmluamVjdGFibGUoKSxcclxuICAgIF9fcGFyYW0oMCwgaW52ZXJzaWZ5XzEuaW5qZWN0KHR5cGVzXzEuSVNlcnZpY2VDb250YWluZXIpKSxcclxuICAgIF9fcGFyYW0oMSwgaW52ZXJzaWZ5XzEuaW5qZWN0KHR5cGVzXzIuSVRlc3RzUGFyc2VyKSksIF9fcGFyYW0oMSwgaW52ZXJzaWZ5XzEubmFtZWQoY29uc3RhbnRzXzEuUFlURVNUX1BST1ZJREVSKSlcclxuXSwgVGVzdERpc2NvdmVyeVNlcnZpY2UpO1xyXG5leHBvcnRzLlRlc3REaXNjb3ZlcnlTZXJ2aWNlID0gVGVzdERpc2NvdmVyeVNlcnZpY2U7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRpc2NvdmVyeVNlcnZpY2UuanMubWFwIl19