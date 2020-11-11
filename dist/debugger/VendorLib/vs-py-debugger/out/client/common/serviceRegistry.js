"use strict"; // Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

Object.defineProperty(exports, "__esModule", {
  value: true
});

const types_1 = require("../activation/types");

const applicationEnvironment_1 = require("./application/applicationEnvironment");

const applicationShell_1 = require("./application/applicationShell");

const commandManager_1 = require("./application/commandManager");

const debugService_1 = require("./application/debugService");

const documentManager_1 = require("./application/documentManager");

const extensions_1 = require("./application/extensions");

const terminalManager_1 = require("./application/terminalManager");

const types_2 = require("./application/types");

const workspace_1 = require("./application/workspace");

const service_1 = require("./configuration/service");

const editor_1 = require("./editor");

const featureDeprecationManager_1 = require("./featureDeprecationManager");

const productInstaller_1 = require("./installer/productInstaller");

const logger_1 = require("./logger");

const browser_1 = require("./net/browser");

const httpClient_1 = require("./net/httpClient");

const nugetService_1 = require("./nuget/nugetService");

const types_3 = require("./nuget/types");

const persistentState_1 = require("./persistentState");

const constants_1 = require("./platform/constants");

const pathUtils_1 = require("./platform/pathUtils");

const currentProcess_1 = require("./process/currentProcess");

const activator_1 = require("./terminal/activator");

const powershellFailedHandler_1 = require("./terminal/activator/powershellFailedHandler");

const bash_1 = require("./terminal/environmentActivationProviders/bash");

const commandPrompt_1 = require("./terminal/environmentActivationProviders/commandPrompt");

const pyenvActivationProvider_1 = require("./terminal/environmentActivationProviders/pyenvActivationProvider");

const factory_1 = require("./terminal/factory");

const helper_1 = require("./terminal/helper");

const types_4 = require("./terminal/types");

const types_5 = require("./types");

const random_1 = require("./utils/random");

function registerTypes(serviceManager) {
  serviceManager.addSingletonInstance(types_5.IsWindows, constants_1.IS_WINDOWS);
  serviceManager.addSingletonInstance(types_5.Is64Bit, constants_1.IS_64_BIT);
  serviceManager.addSingleton(types_5.IExtensions, extensions_1.Extensions);
  serviceManager.addSingleton(types_5.IRandom, random_1.Random);
  serviceManager.addSingleton(types_5.IPersistentStateFactory, persistentState_1.PersistentStateFactory);
  serviceManager.addSingleton(types_5.ILogger, logger_1.Logger);
  serviceManager.addSingleton(types_4.ITerminalServiceFactory, factory_1.TerminalServiceFactory);
  serviceManager.addSingleton(types_5.IPathUtils, pathUtils_1.PathUtils);
  serviceManager.addSingleton(types_2.IApplicationShell, applicationShell_1.ApplicationShell);
  serviceManager.addSingleton(types_5.ICurrentProcess, currentProcess_1.CurrentProcess);
  serviceManager.addSingleton(types_5.IInstaller, productInstaller_1.ProductInstaller);
  serviceManager.addSingleton(types_2.ICommandManager, commandManager_1.CommandManager);
  serviceManager.addSingleton(types_5.IConfigurationService, service_1.ConfigurationService);
  serviceManager.addSingleton(types_2.IWorkspaceService, workspace_1.WorkspaceService);
  serviceManager.addSingleton(types_2.IDocumentManager, documentManager_1.DocumentManager);
  serviceManager.addSingleton(types_2.ITerminalManager, terminalManager_1.TerminalManager);
  serviceManager.addSingleton(types_2.IDebugService, debugService_1.DebugService);
  serviceManager.addSingleton(types_2.IApplicationEnvironment, applicationEnvironment_1.ApplicationEnvironment);
  serviceManager.addSingleton(types_5.IBrowserService, browser_1.BrowserService);
  serviceManager.addSingleton(types_1.IHttpClient, httpClient_1.HttpClient);
  serviceManager.addSingleton(types_5.IEditorUtils, editor_1.EditorUtils);
  serviceManager.addSingleton(types_3.INugetService, nugetService_1.NugetService);
  serviceManager.addSingleton(types_4.ITerminalActivator, activator_1.TerminalActivator);
  serviceManager.addSingleton(types_4.ITerminalActivationHandler, powershellFailedHandler_1.PowershellTerminalActivationFailedHandler);
  serviceManager.addSingleton(types_4.ITerminalHelper, helper_1.TerminalHelper);
  serviceManager.addSingleton(types_4.ITerminalActivationCommandProvider, bash_1.Bash, 'bashCShellFish');
  serviceManager.addSingleton(types_4.ITerminalActivationCommandProvider, commandPrompt_1.CommandPromptAndPowerShell, 'commandPromptAndPowerShell');
  serviceManager.addSingleton(types_4.ITerminalActivationCommandProvider, pyenvActivationProvider_1.PyEnvActivationCommandProvider, 'pyenv');
  serviceManager.addSingleton(types_5.IFeatureDeprecationManager, featureDeprecationManager_1.FeatureDeprecationManager);
}

exports.registerTypes = registerTypes;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZpY2VSZWdpc3RyeS5qcyJdLCJuYW1lcyI6WyJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImV4cG9ydHMiLCJ2YWx1ZSIsInR5cGVzXzEiLCJyZXF1aXJlIiwiYXBwbGljYXRpb25FbnZpcm9ubWVudF8xIiwiYXBwbGljYXRpb25TaGVsbF8xIiwiY29tbWFuZE1hbmFnZXJfMSIsImRlYnVnU2VydmljZV8xIiwiZG9jdW1lbnRNYW5hZ2VyXzEiLCJleHRlbnNpb25zXzEiLCJ0ZXJtaW5hbE1hbmFnZXJfMSIsInR5cGVzXzIiLCJ3b3Jrc3BhY2VfMSIsInNlcnZpY2VfMSIsImVkaXRvcl8xIiwiZmVhdHVyZURlcHJlY2F0aW9uTWFuYWdlcl8xIiwicHJvZHVjdEluc3RhbGxlcl8xIiwibG9nZ2VyXzEiLCJicm93c2VyXzEiLCJodHRwQ2xpZW50XzEiLCJudWdldFNlcnZpY2VfMSIsInR5cGVzXzMiLCJwZXJzaXN0ZW50U3RhdGVfMSIsImNvbnN0YW50c18xIiwicGF0aFV0aWxzXzEiLCJjdXJyZW50UHJvY2Vzc18xIiwiYWN0aXZhdG9yXzEiLCJwb3dlcnNoZWxsRmFpbGVkSGFuZGxlcl8xIiwiYmFzaF8xIiwiY29tbWFuZFByb21wdF8xIiwicHllbnZBY3RpdmF0aW9uUHJvdmlkZXJfMSIsImZhY3RvcnlfMSIsImhlbHBlcl8xIiwidHlwZXNfNCIsInR5cGVzXzUiLCJyYW5kb21fMSIsInJlZ2lzdGVyVHlwZXMiLCJzZXJ2aWNlTWFuYWdlciIsImFkZFNpbmdsZXRvbkluc3RhbmNlIiwiSXNXaW5kb3dzIiwiSVNfV0lORE9XUyIsIklzNjRCaXQiLCJJU182NF9CSVQiLCJhZGRTaW5nbGV0b24iLCJJRXh0ZW5zaW9ucyIsIkV4dGVuc2lvbnMiLCJJUmFuZG9tIiwiUmFuZG9tIiwiSVBlcnNpc3RlbnRTdGF0ZUZhY3RvcnkiLCJQZXJzaXN0ZW50U3RhdGVGYWN0b3J5IiwiSUxvZ2dlciIsIkxvZ2dlciIsIklUZXJtaW5hbFNlcnZpY2VGYWN0b3J5IiwiVGVybWluYWxTZXJ2aWNlRmFjdG9yeSIsIklQYXRoVXRpbHMiLCJQYXRoVXRpbHMiLCJJQXBwbGljYXRpb25TaGVsbCIsIkFwcGxpY2F0aW9uU2hlbGwiLCJJQ3VycmVudFByb2Nlc3MiLCJDdXJyZW50UHJvY2VzcyIsIklJbnN0YWxsZXIiLCJQcm9kdWN0SW5zdGFsbGVyIiwiSUNvbW1hbmRNYW5hZ2VyIiwiQ29tbWFuZE1hbmFnZXIiLCJJQ29uZmlndXJhdGlvblNlcnZpY2UiLCJDb25maWd1cmF0aW9uU2VydmljZSIsIklXb3Jrc3BhY2VTZXJ2aWNlIiwiV29ya3NwYWNlU2VydmljZSIsIklEb2N1bWVudE1hbmFnZXIiLCJEb2N1bWVudE1hbmFnZXIiLCJJVGVybWluYWxNYW5hZ2VyIiwiVGVybWluYWxNYW5hZ2VyIiwiSURlYnVnU2VydmljZSIsIkRlYnVnU2VydmljZSIsIklBcHBsaWNhdGlvbkVudmlyb25tZW50IiwiQXBwbGljYXRpb25FbnZpcm9ubWVudCIsIklCcm93c2VyU2VydmljZSIsIkJyb3dzZXJTZXJ2aWNlIiwiSUh0dHBDbGllbnQiLCJIdHRwQ2xpZW50IiwiSUVkaXRvclV0aWxzIiwiRWRpdG9yVXRpbHMiLCJJTnVnZXRTZXJ2aWNlIiwiTnVnZXRTZXJ2aWNlIiwiSVRlcm1pbmFsQWN0aXZhdG9yIiwiVGVybWluYWxBY3RpdmF0b3IiLCJJVGVybWluYWxBY3RpdmF0aW9uSGFuZGxlciIsIlBvd2Vyc2hlbGxUZXJtaW5hbEFjdGl2YXRpb25GYWlsZWRIYW5kbGVyIiwiSVRlcm1pbmFsSGVscGVyIiwiVGVybWluYWxIZWxwZXIiLCJJVGVybWluYWxBY3RpdmF0aW9uQ29tbWFuZFByb3ZpZGVyIiwiQmFzaCIsIkNvbW1hbmRQcm9tcHRBbmRQb3dlclNoZWxsIiwiUHlFbnZBY3RpdmF0aW9uQ29tbWFuZFByb3ZpZGVyIiwiSUZlYXR1cmVEZXByZWNhdGlvbk1hbmFnZXIiLCJGZWF0dXJlRGVwcmVjYXRpb25NYW5hZ2VyIl0sIm1hcHBpbmdzIjoiQUFBQSxhLENBQ0E7QUFDQTs7QUFD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QzRELHlDQUExRjtBQUNBbEQsRUFBQUEsY0FBYyxDQUFDTSxZQUFmLENBQTRCVixPQUFPLENBQUN1RCxlQUFwQyxFQUFxRHhELFFBQVEsQ0FBQ3lELGNBQTlEO0FBQ0FwRCxFQUFBQSxjQUFjLENBQUNNLFlBQWYsQ0FBNEJWLE9BQU8sQ0FBQ3lELGtDQUFwQyxFQUF3RTlELE1BQU0sQ0FBQytELElBQS9FLEVBQXFGLGdCQUFyRjtBQUNBdEQsRUFBQUEsY0FBYyxDQUFDTSxZQUFmLENBQTRCVixPQUFPLENBQUN5RCxrQ0FBcEMsRUFBd0U3RCxlQUFlLENBQUMrRCwwQkFBeEYsRUFBb0gsNEJBQXBIO0FBQ0F2RCxFQUFBQSxjQUFjLENBQUNNLFlBQWYsQ0FBNEJWLE9BQU8sQ0FBQ3lELGtDQUFwQyxFQUF3RTVELHlCQUF5QixDQUFDK0QsOEJBQWxHLEVBQWtJLE9BQWxJO0FBQ0F4RCxFQUFBQSxjQUFjLENBQUNNLFlBQWYsQ0FBNEJULE9BQU8sQ0FBQzRELDBCQUFwQyxFQUFnRS9FLDJCQUEyQixDQUFDZ0YseUJBQTVGO0FBQ0g7O0FBQ0QvRixPQUFPLENBQUNvQyxhQUFSLEdBQXdCQSxhQUF4QiIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xyXG4vLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmNvbnN0IHR5cGVzXzEgPSByZXF1aXJlKFwiLi4vYWN0aXZhdGlvbi90eXBlc1wiKTtcclxuY29uc3QgYXBwbGljYXRpb25FbnZpcm9ubWVudF8xID0gcmVxdWlyZShcIi4vYXBwbGljYXRpb24vYXBwbGljYXRpb25FbnZpcm9ubWVudFwiKTtcclxuY29uc3QgYXBwbGljYXRpb25TaGVsbF8xID0gcmVxdWlyZShcIi4vYXBwbGljYXRpb24vYXBwbGljYXRpb25TaGVsbFwiKTtcclxuY29uc3QgY29tbWFuZE1hbmFnZXJfMSA9IHJlcXVpcmUoXCIuL2FwcGxpY2F0aW9uL2NvbW1hbmRNYW5hZ2VyXCIpO1xyXG5jb25zdCBkZWJ1Z1NlcnZpY2VfMSA9IHJlcXVpcmUoXCIuL2FwcGxpY2F0aW9uL2RlYnVnU2VydmljZVwiKTtcclxuY29uc3QgZG9jdW1lbnRNYW5hZ2VyXzEgPSByZXF1aXJlKFwiLi9hcHBsaWNhdGlvbi9kb2N1bWVudE1hbmFnZXJcIik7XHJcbmNvbnN0IGV4dGVuc2lvbnNfMSA9IHJlcXVpcmUoXCIuL2FwcGxpY2F0aW9uL2V4dGVuc2lvbnNcIik7XHJcbmNvbnN0IHRlcm1pbmFsTWFuYWdlcl8xID0gcmVxdWlyZShcIi4vYXBwbGljYXRpb24vdGVybWluYWxNYW5hZ2VyXCIpO1xyXG5jb25zdCB0eXBlc18yID0gcmVxdWlyZShcIi4vYXBwbGljYXRpb24vdHlwZXNcIik7XHJcbmNvbnN0IHdvcmtzcGFjZV8xID0gcmVxdWlyZShcIi4vYXBwbGljYXRpb24vd29ya3NwYWNlXCIpO1xyXG5jb25zdCBzZXJ2aWNlXzEgPSByZXF1aXJlKFwiLi9jb25maWd1cmF0aW9uL3NlcnZpY2VcIik7XHJcbmNvbnN0IGVkaXRvcl8xID0gcmVxdWlyZShcIi4vZWRpdG9yXCIpO1xyXG5jb25zdCBmZWF0dXJlRGVwcmVjYXRpb25NYW5hZ2VyXzEgPSByZXF1aXJlKFwiLi9mZWF0dXJlRGVwcmVjYXRpb25NYW5hZ2VyXCIpO1xyXG5jb25zdCBwcm9kdWN0SW5zdGFsbGVyXzEgPSByZXF1aXJlKFwiLi9pbnN0YWxsZXIvcHJvZHVjdEluc3RhbGxlclwiKTtcclxuY29uc3QgbG9nZ2VyXzEgPSByZXF1aXJlKFwiLi9sb2dnZXJcIik7XHJcbmNvbnN0IGJyb3dzZXJfMSA9IHJlcXVpcmUoXCIuL25ldC9icm93c2VyXCIpO1xyXG5jb25zdCBodHRwQ2xpZW50XzEgPSByZXF1aXJlKFwiLi9uZXQvaHR0cENsaWVudFwiKTtcclxuY29uc3QgbnVnZXRTZXJ2aWNlXzEgPSByZXF1aXJlKFwiLi9udWdldC9udWdldFNlcnZpY2VcIik7XHJcbmNvbnN0IHR5cGVzXzMgPSByZXF1aXJlKFwiLi9udWdldC90eXBlc1wiKTtcclxuY29uc3QgcGVyc2lzdGVudFN0YXRlXzEgPSByZXF1aXJlKFwiLi9wZXJzaXN0ZW50U3RhdGVcIik7XHJcbmNvbnN0IGNvbnN0YW50c18xID0gcmVxdWlyZShcIi4vcGxhdGZvcm0vY29uc3RhbnRzXCIpO1xyXG5jb25zdCBwYXRoVXRpbHNfMSA9IHJlcXVpcmUoXCIuL3BsYXRmb3JtL3BhdGhVdGlsc1wiKTtcclxuY29uc3QgY3VycmVudFByb2Nlc3NfMSA9IHJlcXVpcmUoXCIuL3Byb2Nlc3MvY3VycmVudFByb2Nlc3NcIik7XHJcbmNvbnN0IGFjdGl2YXRvcl8xID0gcmVxdWlyZShcIi4vdGVybWluYWwvYWN0aXZhdG9yXCIpO1xyXG5jb25zdCBwb3dlcnNoZWxsRmFpbGVkSGFuZGxlcl8xID0gcmVxdWlyZShcIi4vdGVybWluYWwvYWN0aXZhdG9yL3Bvd2Vyc2hlbGxGYWlsZWRIYW5kbGVyXCIpO1xyXG5jb25zdCBiYXNoXzEgPSByZXF1aXJlKFwiLi90ZXJtaW5hbC9lbnZpcm9ubWVudEFjdGl2YXRpb25Qcm92aWRlcnMvYmFzaFwiKTtcclxuY29uc3QgY29tbWFuZFByb21wdF8xID0gcmVxdWlyZShcIi4vdGVybWluYWwvZW52aXJvbm1lbnRBY3RpdmF0aW9uUHJvdmlkZXJzL2NvbW1hbmRQcm9tcHRcIik7XHJcbmNvbnN0IHB5ZW52QWN0aXZhdGlvblByb3ZpZGVyXzEgPSByZXF1aXJlKFwiLi90ZXJtaW5hbC9lbnZpcm9ubWVudEFjdGl2YXRpb25Qcm92aWRlcnMvcHllbnZBY3RpdmF0aW9uUHJvdmlkZXJcIik7XHJcbmNvbnN0IGZhY3RvcnlfMSA9IHJlcXVpcmUoXCIuL3Rlcm1pbmFsL2ZhY3RvcnlcIik7XHJcbmNvbnN0IGhlbHBlcl8xID0gcmVxdWlyZShcIi4vdGVybWluYWwvaGVscGVyXCIpO1xyXG5jb25zdCB0eXBlc180ID0gcmVxdWlyZShcIi4vdGVybWluYWwvdHlwZXNcIik7XHJcbmNvbnN0IHR5cGVzXzUgPSByZXF1aXJlKFwiLi90eXBlc1wiKTtcclxuY29uc3QgcmFuZG9tXzEgPSByZXF1aXJlKFwiLi91dGlscy9yYW5kb21cIik7XHJcbmZ1bmN0aW9uIHJlZ2lzdGVyVHlwZXMoc2VydmljZU1hbmFnZXIpIHtcclxuICAgIHNlcnZpY2VNYW5hZ2VyLmFkZFNpbmdsZXRvbkluc3RhbmNlKHR5cGVzXzUuSXNXaW5kb3dzLCBjb25zdGFudHNfMS5JU19XSU5ET1dTKTtcclxuICAgIHNlcnZpY2VNYW5hZ2VyLmFkZFNpbmdsZXRvbkluc3RhbmNlKHR5cGVzXzUuSXM2NEJpdCwgY29uc3RhbnRzXzEuSVNfNjRfQklUKTtcclxuICAgIHNlcnZpY2VNYW5hZ2VyLmFkZFNpbmdsZXRvbih0eXBlc181LklFeHRlbnNpb25zLCBleHRlbnNpb25zXzEuRXh0ZW5zaW9ucyk7XHJcbiAgICBzZXJ2aWNlTWFuYWdlci5hZGRTaW5nbGV0b24odHlwZXNfNS5JUmFuZG9tLCByYW5kb21fMS5SYW5kb20pO1xyXG4gICAgc2VydmljZU1hbmFnZXIuYWRkU2luZ2xldG9uKHR5cGVzXzUuSVBlcnNpc3RlbnRTdGF0ZUZhY3RvcnksIHBlcnNpc3RlbnRTdGF0ZV8xLlBlcnNpc3RlbnRTdGF0ZUZhY3RvcnkpO1xyXG4gICAgc2VydmljZU1hbmFnZXIuYWRkU2luZ2xldG9uKHR5cGVzXzUuSUxvZ2dlciwgbG9nZ2VyXzEuTG9nZ2VyKTtcclxuICAgIHNlcnZpY2VNYW5hZ2VyLmFkZFNpbmdsZXRvbih0eXBlc180LklUZXJtaW5hbFNlcnZpY2VGYWN0b3J5LCBmYWN0b3J5XzEuVGVybWluYWxTZXJ2aWNlRmFjdG9yeSk7XHJcbiAgICBzZXJ2aWNlTWFuYWdlci5hZGRTaW5nbGV0b24odHlwZXNfNS5JUGF0aFV0aWxzLCBwYXRoVXRpbHNfMS5QYXRoVXRpbHMpO1xyXG4gICAgc2VydmljZU1hbmFnZXIuYWRkU2luZ2xldG9uKHR5cGVzXzIuSUFwcGxpY2F0aW9uU2hlbGwsIGFwcGxpY2F0aW9uU2hlbGxfMS5BcHBsaWNhdGlvblNoZWxsKTtcclxuICAgIHNlcnZpY2VNYW5hZ2VyLmFkZFNpbmdsZXRvbih0eXBlc181LklDdXJyZW50UHJvY2VzcywgY3VycmVudFByb2Nlc3NfMS5DdXJyZW50UHJvY2Vzcyk7XHJcbiAgICBzZXJ2aWNlTWFuYWdlci5hZGRTaW5nbGV0b24odHlwZXNfNS5JSW5zdGFsbGVyLCBwcm9kdWN0SW5zdGFsbGVyXzEuUHJvZHVjdEluc3RhbGxlcik7XHJcbiAgICBzZXJ2aWNlTWFuYWdlci5hZGRTaW5nbGV0b24odHlwZXNfMi5JQ29tbWFuZE1hbmFnZXIsIGNvbW1hbmRNYW5hZ2VyXzEuQ29tbWFuZE1hbmFnZXIpO1xyXG4gICAgc2VydmljZU1hbmFnZXIuYWRkU2luZ2xldG9uKHR5cGVzXzUuSUNvbmZpZ3VyYXRpb25TZXJ2aWNlLCBzZXJ2aWNlXzEuQ29uZmlndXJhdGlvblNlcnZpY2UpO1xyXG4gICAgc2VydmljZU1hbmFnZXIuYWRkU2luZ2xldG9uKHR5cGVzXzIuSVdvcmtzcGFjZVNlcnZpY2UsIHdvcmtzcGFjZV8xLldvcmtzcGFjZVNlcnZpY2UpO1xyXG4gICAgc2VydmljZU1hbmFnZXIuYWRkU2luZ2xldG9uKHR5cGVzXzIuSURvY3VtZW50TWFuYWdlciwgZG9jdW1lbnRNYW5hZ2VyXzEuRG9jdW1lbnRNYW5hZ2VyKTtcclxuICAgIHNlcnZpY2VNYW5hZ2VyLmFkZFNpbmdsZXRvbih0eXBlc18yLklUZXJtaW5hbE1hbmFnZXIsIHRlcm1pbmFsTWFuYWdlcl8xLlRlcm1pbmFsTWFuYWdlcik7XHJcbiAgICBzZXJ2aWNlTWFuYWdlci5hZGRTaW5nbGV0b24odHlwZXNfMi5JRGVidWdTZXJ2aWNlLCBkZWJ1Z1NlcnZpY2VfMS5EZWJ1Z1NlcnZpY2UpO1xyXG4gICAgc2VydmljZU1hbmFnZXIuYWRkU2luZ2xldG9uKHR5cGVzXzIuSUFwcGxpY2F0aW9uRW52aXJvbm1lbnQsIGFwcGxpY2F0aW9uRW52aXJvbm1lbnRfMS5BcHBsaWNhdGlvbkVudmlyb25tZW50KTtcclxuICAgIHNlcnZpY2VNYW5hZ2VyLmFkZFNpbmdsZXRvbih0eXBlc181LklCcm93c2VyU2VydmljZSwgYnJvd3Nlcl8xLkJyb3dzZXJTZXJ2aWNlKTtcclxuICAgIHNlcnZpY2VNYW5hZ2VyLmFkZFNpbmdsZXRvbih0eXBlc18xLklIdHRwQ2xpZW50LCBodHRwQ2xpZW50XzEuSHR0cENsaWVudCk7XHJcbiAgICBzZXJ2aWNlTWFuYWdlci5hZGRTaW5nbGV0b24odHlwZXNfNS5JRWRpdG9yVXRpbHMsIGVkaXRvcl8xLkVkaXRvclV0aWxzKTtcclxuICAgIHNlcnZpY2VNYW5hZ2VyLmFkZFNpbmdsZXRvbih0eXBlc18zLklOdWdldFNlcnZpY2UsIG51Z2V0U2VydmljZV8xLk51Z2V0U2VydmljZSk7XHJcbiAgICBzZXJ2aWNlTWFuYWdlci5hZGRTaW5nbGV0b24odHlwZXNfNC5JVGVybWluYWxBY3RpdmF0b3IsIGFjdGl2YXRvcl8xLlRlcm1pbmFsQWN0aXZhdG9yKTtcclxuICAgIHNlcnZpY2VNYW5hZ2VyLmFkZFNpbmdsZXRvbih0eXBlc180LklUZXJtaW5hbEFjdGl2YXRpb25IYW5kbGVyLCBwb3dlcnNoZWxsRmFpbGVkSGFuZGxlcl8xLlBvd2Vyc2hlbGxUZXJtaW5hbEFjdGl2YXRpb25GYWlsZWRIYW5kbGVyKTtcclxuICAgIHNlcnZpY2VNYW5hZ2VyLmFkZFNpbmdsZXRvbih0eXBlc180LklUZXJtaW5hbEhlbHBlciwgaGVscGVyXzEuVGVybWluYWxIZWxwZXIpO1xyXG4gICAgc2VydmljZU1hbmFnZXIuYWRkU2luZ2xldG9uKHR5cGVzXzQuSVRlcm1pbmFsQWN0aXZhdGlvbkNvbW1hbmRQcm92aWRlciwgYmFzaF8xLkJhc2gsICdiYXNoQ1NoZWxsRmlzaCcpO1xyXG4gICAgc2VydmljZU1hbmFnZXIuYWRkU2luZ2xldG9uKHR5cGVzXzQuSVRlcm1pbmFsQWN0aXZhdGlvbkNvbW1hbmRQcm92aWRlciwgY29tbWFuZFByb21wdF8xLkNvbW1hbmRQcm9tcHRBbmRQb3dlclNoZWxsLCAnY29tbWFuZFByb21wdEFuZFBvd2VyU2hlbGwnKTtcclxuICAgIHNlcnZpY2VNYW5hZ2VyLmFkZFNpbmdsZXRvbih0eXBlc180LklUZXJtaW5hbEFjdGl2YXRpb25Db21tYW5kUHJvdmlkZXIsIHB5ZW52QWN0aXZhdGlvblByb3ZpZGVyXzEuUHlFbnZBY3RpdmF0aW9uQ29tbWFuZFByb3ZpZGVyLCAncHllbnYnKTtcclxuICAgIHNlcnZpY2VNYW5hZ2VyLmFkZFNpbmdsZXRvbih0eXBlc181LklGZWF0dXJlRGVwcmVjYXRpb25NYW5hZ2VyLCBmZWF0dXJlRGVwcmVjYXRpb25NYW5hZ2VyXzEuRmVhdHVyZURlcHJlY2F0aW9uTWFuYWdlcik7XHJcbn1cclxuZXhwb3J0cy5yZWdpc3RlclR5cGVzID0gcmVnaXN0ZXJUeXBlcztcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c2VydmljZVJlZ2lzdHJ5LmpzLm1hcCJdfQ==