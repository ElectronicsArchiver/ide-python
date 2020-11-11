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
}); // tslint:disable:no-multiline-string no-trailing-whitespace

const chai_1 = require("chai");

const path = require("path");

const TypeMoq = require("typemoq");

const vscode_1 = require("vscode");

const djangoShellCodeExecution_1 = require("../../../client/terminals/codeExecution/djangoShellCodeExecution");

const common_1 = require("../../common"); // tslint:disable-next-line:max-func-body-length


suite('Terminal - Django Shell Code Execution', () => {
  let executor;
  let terminalSettings;
  let terminalService;
  let workspace;
  let platform;
  let settings;
  let disposables = [];
  setup(() => {
    const terminalFactory = TypeMoq.Mock.ofType();
    terminalSettings = TypeMoq.Mock.ofType();
    terminalService = TypeMoq.Mock.ofType();
    const configService = TypeMoq.Mock.ofType();
    workspace = TypeMoq.Mock.ofType();
    workspace.setup(c => c.onDidChangeWorkspaceFolders(TypeMoq.It.isAny(), TypeMoq.It.isAny(), TypeMoq.It.isAny())).returns(() => {
      return {
        dispose: () => void 0
      };
    });
    platform = TypeMoq.Mock.ofType();
    const documentManager = TypeMoq.Mock.ofType();
    const commandManager = TypeMoq.Mock.ofType();
    const fileSystem = TypeMoq.Mock.ofType();
    executor = new djangoShellCodeExecution_1.DjangoShellCodeExecutionProvider(terminalFactory.object, configService.object, workspace.object, documentManager.object, platform.object, commandManager.object, fileSystem.object, disposables);
    terminalFactory.setup(f => f.getTerminalService(TypeMoq.It.isAny())).returns(() => terminalService.object);
    settings = TypeMoq.Mock.ofType();
    settings.setup(s => s.terminal).returns(() => terminalSettings.object);
    configService.setup(c => c.getSettings(TypeMoq.It.isAny())).returns(() => settings.object);
  });
  teardown(() => {
    disposables.forEach(disposable => {
      if (disposable) {
        disposable.dispose();
      }
    });
    disposables = [];
  });

  function testReplCommandArguments(isWindows, pythonPath, expectedPythonPath, terminalArgs, expectedTerminalArgs, resource) {
    platform.setup(p => p.isWindows).returns(() => isWindows);
    settings.setup(s => s.pythonPath).returns(() => pythonPath);
    terminalSettings.setup(t => t.launchArgs).returns(() => terminalArgs);
    const replCommandArgs = executor.getReplCommandArgs(resource);
    chai_1.expect(replCommandArgs).not.to.be.an('undefined', 'Command args is undefined');
    chai_1.expect(replCommandArgs.command).to.be.equal(expectedPythonPath, 'Incorrect python path');
    chai_1.expect(replCommandArgs.args).to.be.deep.equal(expectedTerminalArgs, 'Incorrect arguments');
  }

  test('Ensure fully qualified python path is escaped when building repl args on Windows', () => __awaiter(void 0, void 0, void 0, function* () {
    const pythonPath = 'c:\\program files\\python\\python.exe';
    const terminalArgs = ['-a', 'b', 'c'];
    const expectedTerminalArgs = terminalArgs.concat('manage.py', 'shell');
    testReplCommandArguments(true, pythonPath, 'c:/program files/python/python.exe', terminalArgs, expectedTerminalArgs);
  }));
  test('Ensure fully qualified python path is returned as is, when building repl args on Windows', () => __awaiter(void 0, void 0, void 0, function* () {
    const pythonPath = 'c:/program files/python/python.exe';
    const terminalArgs = ['-a', 'b', 'c'];
    const expectedTerminalArgs = terminalArgs.concat('manage.py', 'shell');
    testReplCommandArguments(true, pythonPath, pythonPath, terminalArgs, expectedTerminalArgs);
  }));
  test('Ensure python path is returned as is, when building repl args on Windows', () => __awaiter(void 0, void 0, void 0, function* () {
    const pythonPath = common_1.PYTHON_PATH;
    const terminalArgs = ['-a', 'b', 'c'];
    const expectedTerminalArgs = terminalArgs.concat('manage.py', 'shell');
    testReplCommandArguments(true, pythonPath, pythonPath, terminalArgs, expectedTerminalArgs);
  }));
  test('Ensure fully qualified python path is returned as is, on non Windows', () => __awaiter(void 0, void 0, void 0, function* () {
    const pythonPath = 'usr/bin/python';
    const terminalArgs = ['-a', 'b', 'c'];
    const expectedTerminalArgs = terminalArgs.concat('manage.py', 'shell');
    testReplCommandArguments(true, pythonPath, pythonPath, terminalArgs, expectedTerminalArgs);
  }));
  test('Ensure python path is returned as is, on non Windows', () => __awaiter(void 0, void 0, void 0, function* () {
    const pythonPath = common_1.PYTHON_PATH;
    const terminalArgs = ['-a', 'b', 'c'];
    const expectedTerminalArgs = terminalArgs.concat('manage.py', 'shell');
    testReplCommandArguments(true, pythonPath, pythonPath, terminalArgs, expectedTerminalArgs);
  }));
  test('Ensure current workspace folder (containing spaces) is used to prefix manage.py', () => __awaiter(void 0, void 0, void 0, function* () {
    const pythonPath = 'python1234';
    const terminalArgs = ['-a', 'b', 'c'];
    const workspaceUri = vscode_1.Uri.file(path.join('c', 'usr', 'program files'));
    const workspaceFolder = {
      index: 0,
      name: 'blah',
      uri: workspaceUri
    };
    workspace.setup(w => w.getWorkspaceFolder(TypeMoq.It.isAny())).returns(() => workspaceFolder);
    const expectedTerminalArgs = terminalArgs.concat(`${path.join(workspaceUri.fsPath, 'manage.py').fileToCommandArgument()}`, 'shell');
    testReplCommandArguments(true, pythonPath, pythonPath, terminalArgs, expectedTerminalArgs, vscode_1.Uri.file('x'));
  }));
  test('Ensure current workspace folder (without spaces) is used to prefix manage.py', () => __awaiter(void 0, void 0, void 0, function* () {
    const pythonPath = 'python1234';
    const terminalArgs = ['-a', 'b', 'c'];
    const workspaceUri = vscode_1.Uri.file(path.join('c', 'usr', 'programfiles'));
    const workspaceFolder = {
      index: 0,
      name: 'blah',
      uri: workspaceUri
    };
    workspace.setup(w => w.getWorkspaceFolder(TypeMoq.It.isAny())).returns(() => workspaceFolder);
    const expectedTerminalArgs = terminalArgs.concat(path.join(workspaceUri.fsPath, 'manage.py').fileToCommandArgument(), 'shell');
    testReplCommandArguments(true, pythonPath, pythonPath, terminalArgs, expectedTerminalArgs, vscode_1.Uri.file('x'));
  }));
  test('Ensure default workspace folder (containing spaces) is used to prefix manage.py', () => __awaiter(void 0, void 0, void 0, function* () {
    const pythonPath = 'python1234';
    const terminalArgs = ['-a', 'b', 'c'];
    const workspaceUri = vscode_1.Uri.file(path.join('c', 'usr', 'program files'));
    const workspaceFolder = {
      index: 0,
      name: 'blah',
      uri: workspaceUri
    };
    workspace.setup(w => w.getWorkspaceFolder(TypeMoq.It.isAny())).returns(() => undefined);
    workspace.setup(w => w.workspaceFolders).returns(() => [workspaceFolder]);
    const expectedTerminalArgs = terminalArgs.concat(`${path.join(workspaceUri.fsPath, 'manage.py').fileToCommandArgument()}`, 'shell');
    testReplCommandArguments(true, pythonPath, pythonPath, terminalArgs, expectedTerminalArgs, vscode_1.Uri.file('x'));
  }));
  test('Ensure default workspace folder (without spaces) is used to prefix manage.py', () => __awaiter(void 0, void 0, void 0, function* () {
    const pythonPath = 'python1234';
    const terminalArgs = ['-a', 'b', 'c'];
    const workspaceUri = vscode_1.Uri.file(path.join('c', 'usr', 'programfiles'));
    const workspaceFolder = {
      index: 0,
      name: 'blah',
      uri: workspaceUri
    };
    workspace.setup(w => w.getWorkspaceFolder(TypeMoq.It.isAny())).returns(() => undefined);
    workspace.setup(w => w.workspaceFolders).returns(() => [workspaceFolder]);
    const expectedTerminalArgs = terminalArgs.concat(path.join(workspaceUri.fsPath, 'manage.py').fileToCommandArgument(), 'shell');
    testReplCommandArguments(true, pythonPath, pythonPath, terminalArgs, expectedTerminalArgs, vscode_1.Uri.file('x'));
  }));
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRqYW5nb1NoZWxsQ29kZUV4ZWN0LnVuaXQudGVzdC5qcyJdLCJuYW1lcyI6WyJfX2F3YWl0ZXIiLCJ0aGlzQXJnIiwiX2FyZ3VtZW50cyIsIlAiLCJnZW5lcmF0b3IiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImZ1bGZpbGxlZCIsInZhbHVlIiwic3RlcCIsIm5leHQiLCJlIiwicmVqZWN0ZWQiLCJyZXN1bHQiLCJkb25lIiwidGhlbiIsImFwcGx5IiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJleHBvcnRzIiwiY2hhaV8xIiwicmVxdWlyZSIsInBhdGgiLCJUeXBlTW9xIiwidnNjb2RlXzEiLCJkamFuZ29TaGVsbENvZGVFeGVjdXRpb25fMSIsImNvbW1vbl8xIiwic3VpdGUiLCJleGVjdXRvciIsInRlcm1pbmFsU2V0dGluZ3MiLCJ0ZXJtaW5hbFNlcnZpY2UiLCJ3b3Jrc3BhY2UiLCJwbGF0Zm9ybSIsInNldHRpbmdzIiwiZGlzcG9zYWJsZXMiLCJzZXR1cCIsInRlcm1pbmFsRmFjdG9yeSIsIk1vY2siLCJvZlR5cGUiLCJjb25maWdTZXJ2aWNlIiwiYyIsIm9uRGlkQ2hhbmdlV29ya3NwYWNlRm9sZGVycyIsIkl0IiwiaXNBbnkiLCJyZXR1cm5zIiwiZGlzcG9zZSIsImRvY3VtZW50TWFuYWdlciIsImNvbW1hbmRNYW5hZ2VyIiwiZmlsZVN5c3RlbSIsIkRqYW5nb1NoZWxsQ29kZUV4ZWN1dGlvblByb3ZpZGVyIiwib2JqZWN0IiwiZiIsImdldFRlcm1pbmFsU2VydmljZSIsInMiLCJ0ZXJtaW5hbCIsImdldFNldHRpbmdzIiwidGVhcmRvd24iLCJmb3JFYWNoIiwiZGlzcG9zYWJsZSIsInRlc3RSZXBsQ29tbWFuZEFyZ3VtZW50cyIsImlzV2luZG93cyIsInB5dGhvblBhdGgiLCJleHBlY3RlZFB5dGhvblBhdGgiLCJ0ZXJtaW5hbEFyZ3MiLCJleHBlY3RlZFRlcm1pbmFsQXJncyIsInJlc291cmNlIiwicCIsInQiLCJsYXVuY2hBcmdzIiwicmVwbENvbW1hbmRBcmdzIiwiZ2V0UmVwbENvbW1hbmRBcmdzIiwiZXhwZWN0Iiwibm90IiwidG8iLCJiZSIsImFuIiwiY29tbWFuZCIsImVxdWFsIiwiYXJncyIsImRlZXAiLCJ0ZXN0IiwiY29uY2F0IiwiUFlUSE9OX1BBVEgiLCJ3b3Jrc3BhY2VVcmkiLCJVcmkiLCJmaWxlIiwiam9pbiIsIndvcmtzcGFjZUZvbGRlciIsImluZGV4IiwibmFtZSIsInVyaSIsInciLCJnZXRXb3Jrc3BhY2VGb2xkZXIiLCJmc1BhdGgiLCJmaWxlVG9Db21tYW5kQXJndW1lbnQiLCJ1bmRlZmluZWQiLCJ3b3Jrc3BhY2VGb2xkZXJzIl0sIm1hcHBpbmdzIjoiQUFBQSxhLENBQ0E7QUFDQTs7QUFDQSxJQUFJQSxTQUFTLEdBQUksVUFBUSxTQUFLQSxTQUFkLElBQTRCLFVBQVVDLE9BQVYsRUFBbUJDLFVBQW5CLEVBQStCQyxDQUEvQixFQUFrQ0MsU0FBbEMsRUFBNkM7QUFDckYsU0FBTyxLQUFLRCxDQUFDLEtBQUtBLENBQUMsR0FBR0UsT0FBVCxDQUFOLEVBQXlCLFVBQVVDLE9BQVYsRUFBbUJDLE1BQW5CLEVBQTJCO0FBQ3ZELGFBQVNDLFNBQVQsQ0FBbUJDLEtBQW5CLEVBQTBCO0FBQUUsVUFBSTtBQUFFQyxRQUFBQSxJQUFJLENBQUNOLFNBQVMsQ0FBQ08sSUFBVixDQUFlRixLQUFmLENBQUQsQ0FBSjtBQUE4QixPQUFwQyxDQUFxQyxPQUFPRyxDQUFQLEVBQVU7QUFBRUwsUUFBQUEsTUFBTSxDQUFDSyxDQUFELENBQU47QUFBWTtBQUFFOztBQUMzRixhQUFTQyxRQUFULENBQWtCSixLQUFsQixFQUF5QjtBQUFFLFVBQUk7QUFBRUMsUUFBQUEsSUFBSSxDQUFDTixTQUFTLENBQUMsT0FBRCxDQUFULENBQW1CSyxLQUFuQixDQUFELENBQUo7QUFBa0MsT0FBeEMsQ0FBeUMsT0FBT0csQ0FBUCxFQUFVO0FBQUVMLFFBQUFBLE1BQU0sQ0FBQ0ssQ0FBRCxDQUFOO0FBQVk7QUFBRTs7QUFDOUYsYUFBU0Ys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cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxyXG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59O1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbi8vIHRzbGludDpkaXNhYmxlOm5vLW11bHRpbGluZS1zdHJpbmcgbm8tdHJhaWxpbmctd2hpdGVzcGFjZVxyXG5jb25zdCBjaGFpXzEgPSByZXF1aXJlKFwiY2hhaVwiKTtcclxuY29uc3QgcGF0aCA9IHJlcXVpcmUoXCJwYXRoXCIpO1xyXG5jb25zdCBUeXBlTW9xID0gcmVxdWlyZShcInR5cGVtb3FcIik7XHJcbmNvbnN0IHZzY29kZV8xID0gcmVxdWlyZShcInZzY29kZVwiKTtcclxuY29uc3QgZGphbmdvU2hlbGxDb2RlRXhlY3V0aW9uXzEgPSByZXF1aXJlKFwiLi4vLi4vLi4vY2xpZW50L3Rlcm1pbmFscy9jb2RlRXhlY3V0aW9uL2RqYW5nb1NoZWxsQ29kZUV4ZWN1dGlvblwiKTtcclxuY29uc3QgY29tbW9uXzEgPSByZXF1aXJlKFwiLi4vLi4vY29tbW9uXCIpO1xyXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bWF4LWZ1bmMtYm9keS1sZW5ndGhcclxuc3VpdGUoJ1Rlcm1pbmFsIC0gRGphbmdvIFNoZWxsIENvZGUgRXhlY3V0aW9uJywgKCkgPT4ge1xyXG4gICAgbGV0IGV4ZWN1dG9yO1xyXG4gICAgbGV0IHRlcm1pbmFsU2V0dGluZ3M7XHJcbiAgICBsZXQgdGVybWluYWxTZXJ2aWNlO1xyXG4gICAgbGV0IHdvcmtzcGFjZTtcclxuICAgIGxldCBwbGF0Zm9ybTtcclxuICAgIGxldCBzZXR0aW5ncztcclxuICAgIGxldCBkaXNwb3NhYmxlcyA9IFtdO1xyXG4gICAgc2V0dXAoKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHRlcm1pbmFsRmFjdG9yeSA9IFR5cGVNb3EuTW9jay5vZlR5cGUoKTtcclxuICAgICAgICB0ZXJtaW5hbFNldHRpbmdzID0gVHlwZU1vcS5Nb2NrLm9mVHlwZSgpO1xyXG4gICAgICAgIHRlcm1pbmFsU2VydmljZSA9IFR5cGVNb3EuTW9jay5vZlR5cGUoKTtcclxuICAgICAgICBjb25zdCBjb25maWdTZXJ2aWNlID0gVHlwZU1vcS5Nb2NrLm9mVHlwZSgpO1xyXG4gICAgICAgIHdvcmtzcGFjZSA9IFR5cGVNb3EuTW9jay5vZlR5cGUoKTtcclxuICAgICAgICB3b3Jrc3BhY2Uuc2V0dXAoYyA9PiBjLm9uRGlkQ2hhbmdlV29ya3NwYWNlRm9sZGVycyhUeXBlTW9xLkl0LmlzQW55KCksIFR5cGVNb3EuSXQuaXNBbnkoKSwgVHlwZU1vcS5JdC5pc0FueSgpKSkucmV0dXJucygoKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBkaXNwb3NlOiAoKSA9PiB2b2lkIDBcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBwbGF0Zm9ybSA9IFR5cGVNb3EuTW9jay5vZlR5cGUoKTtcclxuICAgICAgICBjb25zdCBkb2N1bWVudE1hbmFnZXIgPSBUeXBlTW9xLk1vY2sub2ZUeXBlKCk7XHJcbiAgICAgICAgY29uc3QgY29tbWFuZE1hbmFnZXIgPSBUeXBlTW9xLk1vY2sub2ZUeXBlKCk7XHJcbiAgICAgICAgY29uc3QgZmlsZVN5c3RlbSA9IFR5cGVNb3EuTW9jay5vZlR5cGUoKTtcclxuICAgICAgICBleGVjdXRvciA9IG5ldyBkamFuZ29TaGVsbENvZGVFeGVjdXRpb25fMS5EamFuZ29TaGVsbENvZGVFeGVjdXRpb25Qcm92aWRlcih0ZXJtaW5hbEZhY3Rvcnkub2JqZWN0LCBjb25maWdTZXJ2aWNlLm9iamVjdCwgd29ya3NwYWNlLm9iamVjdCwgZG9jdW1lbnRNYW5hZ2VyLm9iamVjdCwgcGxhdGZvcm0ub2JqZWN0LCBjb21tYW5kTWFuYWdlci5vYmplY3QsIGZpbGVTeXN0ZW0ub2JqZWN0LCBkaXNwb3NhYmxlcyk7XHJcbiAgICAgICAgdGVybWluYWxGYWN0b3J5LnNldHVwKGYgPT4gZi5nZXRUZXJtaW5hbFNlcnZpY2UoVHlwZU1vcS5JdC5pc0FueSgpKSkucmV0dXJucygoKSA9PiB0ZXJtaW5hbFNlcnZpY2Uub2JqZWN0KTtcclxuICAgICAgICBzZXR0aW5ncyA9IFR5cGVNb3EuTW9jay5vZlR5cGUoKTtcclxuICAgICAgICBzZXR0aW5ncy5zZXR1cChzID0+IHMudGVybWluYWwpLnJldHVybnMoKCkgPT4gdGVybWluYWxTZXR0aW5ncy5vYmplY3QpO1xyXG4gICAgICAgIGNvbmZpZ1NlcnZpY2Uuc2V0dXAoYyA9PiBjLmdldFNldHRpbmdzKFR5cGVNb3EuSXQuaXNBbnkoKSkpLnJldHVybnMoKCkgPT4gc2V0dGluZ3Mub2JqZWN0KTtcclxuICAgIH0pO1xyXG4gICAgdGVhcmRvd24oKCkgPT4ge1xyXG4gICAgICAgIGRpc3Bvc2FibGVzLmZvckVhY2goZGlzcG9zYWJsZSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChkaXNwb3NhYmxlKSB7XHJcbiAgICAgICAgICAgICAgICBkaXNwb3NhYmxlLmRpc3Bvc2UoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGRpc3Bvc2FibGVzID0gW107XHJcbiAgICB9KTtcclxuICAgIGZ1bmN0aW9uIHRlc3RSZXBsQ29tbWFuZEFyZ3VtZW50cyhpc1dpbmRvd3MsIHB5dGhvblBhdGgsIGV4cGVjdGVkUHl0aG9uUGF0aCwgdGVybWluYWxBcmdzLCBleHBlY3RlZFRlcm1pbmFsQXJncywgcmVzb3VyY2UpIHtcclxuICAgICAgICBwbGF0Zm9ybS5zZXR1cChwID0+IHAuaXNXaW5kb3dzKS5yZXR1cm5zKCgpID0+IGlzV2luZG93cyk7XHJcbiAgICAgICAgc2V0dGluZ3Muc2V0dXAocyA9PiBzLnB5dGhvblBhdGgpLnJldHVybnMoKCkgPT4gcHl0aG9uUGF0aCk7XHJcbiAgICAgICAgdGVybWluYWxTZXR0aW5ncy5zZXR1cCh0ID0+IHQubGF1bmNoQXJncykucmV0dXJucygoKSA9PiB0ZXJtaW5hbEFyZ3MpO1xyXG4gICAgICAgIGNvbnN0IHJlcGxDb21tYW5kQXJncyA9IGV4ZWN1dG9yLmdldFJlcGxDb21tYW5kQXJncyhyZXNvdXJjZSk7XHJcbiAgICAgICAgY2hhaV8xLmV4cGVjdChyZXBsQ29tbWFuZEFyZ3MpLm5vdC50by5iZS5hbigndW5kZWZpbmVkJywgJ0NvbW1hbmQgYXJncyBpcyB1bmRlZmluZWQnKTtcclxuICAgICAgICBjaGFpXzEuZXhwZWN0KHJlcGxDb21tYW5kQXJncy5jb21tYW5kKS50by5iZS5lcXVhbChleHBlY3RlZFB5dGhvblBhdGgsICdJbmNvcnJlY3QgcHl0aG9uIHBhdGgnKTtcclxuICAgICAgICBjaGFpXzEuZXhwZWN0KHJlcGxDb21tYW5kQXJncy5hcmdzKS50by5iZS5kZWVwLmVxdWFsKGV4cGVjdGVkVGVybWluYWxBcmdzLCAnSW5jb3JyZWN0IGFyZ3VtZW50cycpO1xyXG4gICAgfVxyXG4gICAgdGVzdCgnRW5zdXJlIGZ1bGx5IHF1YWxpZmllZCBweXRob24gcGF0aCBpcyBlc2NhcGVkIHdoZW4gYnVpbGRpbmcgcmVwbCBhcmdzIG9uIFdpbmRvd3MnLCAoKSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgICAgY29uc3QgcHl0aG9uUGF0aCA9ICdjOlxcXFxwcm9ncmFtIGZpbGVzXFxcXHB5dGhvblxcXFxweXRob24uZXhlJztcclxuICAgICAgICBjb25zdCB0ZXJtaW5hbEFyZ3MgPSBbJy1hJywgJ2InLCAnYyddO1xyXG4gICAgICAgIGNvbnN0IGV4cGVjdGVkVGVybWluYWxBcmdzID0gdGVybWluYWxBcmdzLmNvbmNhdCgnbWFuYWdlLnB5JywgJ3NoZWxsJyk7XHJcbiAgICAgICAgdGVzdFJlcGxDb21tYW5kQXJndW1lbnRzKHRydWUsIHB5dGhvblBhdGgsICdjOi9wcm9ncmFtIGZpbGVzL3B5dGhvbi9weXRob24uZXhlJywgdGVybWluYWxBcmdzLCBleHBlY3RlZFRlcm1pbmFsQXJncyk7XHJcbiAgICB9KSk7XHJcbiAgICB0ZXN0KCdFbnN1cmUgZnVsbHkgcXVhbGlmaWVkIHB5dGhvbiBwYXRoIGlzIHJldHVybmVkIGFzIGlzLCB3aGVuIGJ1aWxkaW5nIHJlcGwgYXJncyBvbiBXaW5kb3dzJywgKCkgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgICAgIGNvbnN0IHB5dGhvblBhdGggPSAnYzovcHJvZ3JhbSBmaWxlcy9weXRob24vcHl0aG9uLmV4ZSc7XHJcbiAgICAgICAgY29uc3QgdGVybWluYWxBcmdzID0gWyctYScsICdiJywgJ2MnXTtcclxuICAgICAgICBjb25zdCBleHBlY3RlZFRlcm1pbmFsQXJncyA9IHRlcm1pbmFsQXJncy5jb25jYXQoJ21hbmFnZS5weScsICdzaGVsbCcpO1xyXG4gICAgICAgIHRlc3RSZXBsQ29tbWFuZEFyZ3VtZW50cyh0cnVlLCBweXRob25QYXRoLCBweXRob25QYXRoLCB0ZXJtaW5hbEFyZ3MsIGV4cGVjdGVkVGVybWluYWxBcmdzKTtcclxuICAgIH0pKTtcclxuICAgIHRlc3QoJ0Vuc3VyZSBweXRob24gcGF0aCBpcyByZXR1cm5lZCBhcyBpcywgd2hlbiBidWlsZGluZyByZXBsIGFyZ3Mgb24gV2luZG93cycsICgpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICBjb25zdCBweXRob25QYXRoID0gY29tbW9uXzEuUFlUSE9OX1BBVEg7XHJcbiAgICAgICAgY29uc3QgdGVybWluYWxBcmdzID0gWyctYScsICdiJywgJ2MnXTtcclxuICAgICAgICBjb25zdCBleHBlY3RlZFRlcm1pbmFsQXJncyA9IHRlcm1pbmFsQXJncy5jb25jYXQoJ21hbmFnZS5weScsICdzaGVsbCcpO1xyXG4gICAgICAgIHRlc3RSZXBsQ29tbWFuZEFyZ3VtZW50cyh0cnVlLCBweXRob25QYXRoLCBweXRob25QYXRoLCB0ZXJtaW5hbEFyZ3MsIGV4cGVjdGVkVGVybWluYWxBcmdzKTtcclxuICAgIH0pKTtcclxuICAgIHRlc3QoJ0Vuc3VyZSBmdWxseSBxdWFsaWZpZWQgcHl0aG9uIHBhdGggaXMgcmV0dXJuZWQgYXMgaXMsIG9uIG5vbiBXaW5kb3dzJywgKCkgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgICAgIGNvbnN0IHB5dGhvblBhdGggPSAndXNyL2Jpbi9weXRob24nO1xyXG4gICAgICAgIGNvbnN0IHRlcm1pbmFsQXJncyA9IFsnLWEnLCAnYicsICdjJ107XHJcbiAgICAgICAgY29uc3QgZXhwZWN0ZWRUZXJtaW5hbEFyZ3MgPSB0ZXJtaW5hbEFyZ3MuY29uY2F0KCdtYW5hZ2UucHknLCAnc2hlbGwnKTtcclxuICAgICAgICB0ZXN0UmVwbENvbW1hbmRBcmd1bWVudHModHJ1ZSwgcHl0aG9uUGF0aCwgcHl0aG9uUGF0aCwgdGVybWluYWxBcmdzLCBleHBlY3RlZFRlcm1pbmFsQXJncyk7XHJcbiAgICB9KSk7XHJcbiAgICB0ZXN0KCdFbnN1cmUgcHl0aG9uIHBhdGggaXMgcmV0dXJuZWQgYXMgaXMsIG9uIG5vbiBXaW5kb3dzJywgKCkgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgICAgIGNvbnN0IHB5dGhvblBhdGggPSBjb21tb25fMS5QWVRIT05fUEFUSDtcclxuICAgICAgICBjb25zdCB0ZXJtaW5hbEFyZ3MgPSBbJy1hJywgJ2InLCAnYyddO1xyXG4gICAgICAgIGNvbnN0IGV4cGVjdGVkVGVybWluYWxBcmdzID0gdGVybWluYWxBcmdzLmNvbmNhdCgnbWFuYWdlLnB5JywgJ3NoZWxsJyk7XHJcbiAgICAgICAgdGVzdFJlcGxDb21tYW5kQXJndW1lbnRzKHRydWUsIHB5dGhvblBhdGgsIHB5dGhvblBhdGgsIHRlcm1pbmFsQXJncywgZXhwZWN0ZWRUZXJtaW5hbEFyZ3MpO1xyXG4gICAgfSkpO1xyXG4gICAgdGVzdCgnRW5zdXJlIGN1cnJlbnQgd29ya3NwYWNlIGZvbGRlciAoY29udGFpbmluZyBzcGFjZXMpIGlzIHVzZWQgdG8gcHJlZml4IG1hbmFnZS5weScsICgpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICBjb25zdCBweXRob25QYXRoID0gJ3B5dGhvbjEyMzQnO1xyXG4gICAgICAgIGNvbnN0IHRlcm1pbmFsQXJncyA9IFsnLWEnLCAnYicsICdjJ107XHJcbiAgICAgICAgY29uc3Qgd29ya3NwYWNlVXJpID0gdnNjb2RlXzEuVXJpLmZpbGUocGF0aC5qb2luKCdjJywgJ3VzcicsICdwcm9ncmFtIGZpbGVzJykpO1xyXG4gICAgICAgIGNvbnN0IHdvcmtzcGFjZUZvbGRlciA9IHsgaW5kZXg6IDAsIG5hbWU6ICdibGFoJywgdXJpOiB3b3Jrc3BhY2VVcmkgfTtcclxuICAgICAgICB3b3Jrc3BhY2Uuc2V0dXAodyA9PiB3LmdldFdvcmtzcGFjZUZvbGRlcihUeXBlTW9xLkl0LmlzQW55KCkpKS5yZXR1cm5zKCgpID0+IHdvcmtzcGFjZUZvbGRlcik7XHJcbiAgICAgICAgY29uc3QgZXhwZWN0ZWRUZXJtaW5hbEFyZ3MgPSB0ZXJtaW5hbEFyZ3MuY29uY2F0KGAke3BhdGguam9pbih3b3Jrc3BhY2VVcmkuZnNQYXRoLCAnbWFuYWdlLnB5JykuZmlsZVRvQ29tbWFuZEFyZ3VtZW50KCl9YCwgJ3NoZWxsJyk7XHJcbiAgICAgICAgdGVzdFJlcGxDb21tYW5kQXJndW1lbnRzKHRydWUsIHB5dGhvblBhdGgsIHB5dGhvblBhdGgsIHRlcm1pbmFsQXJncywgZXhwZWN0ZWRUZXJtaW5hbEFyZ3MsIHZzY29kZV8xLlVyaS5maWxlKCd4JykpO1xyXG4gICAgfSkpO1xyXG4gICAgdGVzdCgnRW5zdXJlIGN1cnJlbnQgd29ya3NwYWNlIGZvbGRlciAod2l0aG91dCBzcGFjZXMpIGlzIHVzZWQgdG8gcHJlZml4IG1hbmFnZS5weScsICgpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICBjb25zdCBweXRob25QYXRoID0gJ3B5dGhvbjEyMzQnO1xyXG4gICAgICAgIGNvbnN0IHRlcm1pbmFsQXJncyA9IFsnLWEnLCAnYicsICdjJ107XHJcbiAgICAgICAgY29uc3Qgd29ya3NwYWNlVXJpID0gdnNjb2RlXzEuVXJpLmZpbGUocGF0aC5qb2luKCdjJywgJ3VzcicsICdwcm9ncmFtZmlsZXMnKSk7XHJcbiAgICAgICAgY29uc3Qgd29ya3NwYWNlRm9sZGVyID0geyBpbmRleDogMCwgbmFtZTogJ2JsYWgnLCB1cmk6IHdvcmtzcGFjZVVyaSB9O1xyXG4gICAgICAgIHdvcmtzcGFjZS5zZXR1cCh3ID0+IHcuZ2V0V29ya3NwYWNlRm9sZGVyKFR5cGVNb3EuSXQuaXNBbnkoKSkpLnJldHVybnMoKCkgPT4gd29ya3NwYWNlRm9sZGVyKTtcclxuICAgICAgICBjb25zdCBleHBlY3RlZFRlcm1pbmFsQXJncyA9IHRlcm1pbmFsQXJncy5jb25jYXQocGF0aC5qb2luKHdvcmtzcGFjZVVyaS5mc1BhdGgsICdtYW5hZ2UucHknKS5maWxlVG9Db21tYW5kQXJndW1lbnQoKSwgJ3NoZWxsJyk7XHJcbiAgICAgICAgdGVzdFJlcGxDb21tYW5kQXJndW1lbnRzKHRydWUsIHB5dGhvblBhdGgsIHB5dGhvblBhdGgsIHRlcm1pbmFsQXJncywgZXhwZWN0ZWRUZXJtaW5hbEFyZ3MsIHZzY29kZV8xLlVyaS5maWxlKCd4JykpO1xyXG4gICAgfSkpO1xyXG4gICAgdGVzdCgnRW5zdXJlIGRlZmF1bHQgd29ya3NwYWNlIGZvbGRlciAoY29udGFpbmluZyBzcGFjZXMpIGlzIHVzZWQgdG8gcHJlZml4IG1hbmFnZS5weScsICgpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICBjb25zdCBweXRob25QYXRoID0gJ3B5dGhvbjEyMzQnO1xyXG4gICAgICAgIGNvbnN0IHRlcm1pbmFsQXJncyA9IFsnLWEnLCAnYicsICdjJ107XHJcbiAgICAgICAgY29uc3Qgd29ya3NwYWNlVXJpID0gdnNjb2RlXzEuVXJpLmZpbGUocGF0aC5qb2luKCdjJywgJ3VzcicsICdwcm9ncmFtIGZpbGVzJykpO1xyXG4gICAgICAgIGNvbnN0IHdvcmtzcGFjZUZvbGRlciA9IHsgaW5kZXg6IDAsIG5hbWU6ICdibGFoJywgdXJpOiB3b3Jrc3BhY2VVcmkgfTtcclxuICAgICAgICB3b3Jrc3BhY2Uuc2V0dXAodyA9PiB3LmdldFdvcmtzcGFjZUZvbGRlcihUeXBlTW9xLkl0LmlzQW55KCkpKS5yZXR1cm5zKCgpID0+IHVuZGVmaW5lZCk7XHJcbiAgICAgICAgd29ya3NwYWNlLnNldHVwKHcgPT4gdy53b3Jrc3BhY2VGb2xkZXJzKS5yZXR1cm5zKCgpID0+IFt3b3Jrc3BhY2VGb2xkZXJdKTtcclxuICAgICAgICBjb25zdCBleHBlY3RlZFRlcm1pbmFsQXJncyA9IHRlcm1pbmFsQXJncy5jb25jYXQoYCR7cGF0aC5qb2luKHdvcmtzcGFjZVVyaS5mc1BhdGgsICdtYW5hZ2UucHknKS5maWxlVG9Db21tYW5kQXJndW1lbnQoKX1gLCAnc2hlbGwnKTtcclxuICAgICAgICB0ZXN0UmVwbENvbW1hbmRBcmd1bWVudHModHJ1ZSwgcHl0aG9uUGF0aCwgcHl0aG9uUGF0aCwgdGVybWluYWxBcmdzLCBleHBlY3RlZFRlcm1pbmFsQXJncywgdnNjb2RlXzEuVXJpLmZpbGUoJ3gnKSk7XHJcbiAgICB9KSk7XHJcbiAgICB0ZXN0KCdFbnN1cmUgZGVmYXVsdCB3b3Jrc3BhY2UgZm9sZGVyICh3aXRob3V0IHNwYWNlcykgaXMgdXNlZCB0byBwcmVmaXggbWFuYWdlLnB5JywgKCkgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgICAgIGNvbnN0IHB5dGhvblBhdGggPSAncHl0aG9uMTIzNCc7XHJcbiAgICAgICAgY29uc3QgdGVybWluYWxBcmdzID0gWyctYScsICdiJywgJ2MnXTtcclxuICAgICAgICBjb25zdCB3b3Jrc3BhY2VVcmkgPSB2c2NvZGVfMS5VcmkuZmlsZShwYXRoLmpvaW4oJ2MnLCAndXNyJywgJ3Byb2dyYW1maWxlcycpKTtcclxuICAgICAgICBjb25zdCB3b3Jrc3BhY2VGb2xkZXIgPSB7IGluZGV4OiAwLCBuYW1lOiAnYmxhaCcsIHVyaTogd29ya3NwYWNlVXJpIH07XHJcbiAgICAgICAgd29ya3NwYWNlLnNldHVwKHcgPT4gdy5nZXRXb3Jrc3BhY2VGb2xkZXIoVHlwZU1vcS5JdC5pc0FueSgpKSkucmV0dXJucygoKSA9PiB1bmRlZmluZWQpO1xyXG4gICAgICAgIHdvcmtzcGFjZS5zZXR1cCh3ID0+IHcud29ya3NwYWNlRm9sZGVycykucmV0dXJucygoKSA9PiBbd29ya3NwYWNlRm9sZGVyXSk7XHJcbiAgICAgICAgY29uc3QgZXhwZWN0ZWRUZXJtaW5hbEFyZ3MgPSB0ZXJtaW5hbEFyZ3MuY29uY2F0KHBhdGguam9pbih3b3Jrc3BhY2VVcmkuZnNQYXRoLCAnbWFuYWdlLnB5JykuZmlsZVRvQ29tbWFuZEFyZ3VtZW50KCksICdzaGVsbCcpO1xyXG4gICAgICAgIHRlc3RSZXBsQ29tbWFuZEFyZ3VtZW50cyh0cnVlLCBweXRob25QYXRoLCBweXRob25QYXRoLCB0ZXJtaW5hbEFyZ3MsIGV4cGVjdGVkVGVybWluYWxBcmdzLCB2c2NvZGVfMS5VcmkuZmlsZSgneCcpKTtcclxuICAgIH0pKTtcclxufSk7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRqYW5nb1NoZWxsQ29kZUV4ZWN0LnVuaXQudGVzdC5qcy5tYXAiXX0=