// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
'use strict';

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

const types_1 = require("../../common/types");

const types_2 = require("../../ioc/types");

const types_3 = require("./types");

var FilterKeys;

(function (FilterKeys) {
  FilterKeys["GlobalDiagnosticFilter"] = "GLOBAL_DIAGNOSTICS_FILTER";
  FilterKeys["WorkspaceDiagnosticFilter"] = "WORKSPACE_DIAGNOSTICS_FILTER";
})(FilterKeys = exports.FilterKeys || (exports.FilterKeys = {}));

let DiagnosticFilterService = class DiagnosticFilterService {
  constructor(serviceContainer) {
    this.serviceContainer = serviceContainer;
  }

  shouldIgnoreDiagnostic(code) {
    return __awaiter(this, void 0, void 0, function* () {
      const factory = this.serviceContainer.get(types_1.IPersistentStateFactory);
      const globalState = factory.createGlobalPersistentState(FilterKeys.GlobalDiagnosticFilter, []);
      const workspaceState = factory.createWorkspacePersistentState(FilterKeys.WorkspaceDiagnosticFilter, []);
      return globalState.value.indexOf(code) >= 0 || workspaceState.value.indexOf(code) >= 0;
    });
  }

  ignoreDiagnostic(code, scope) {
    return __awaiter(this, void 0, void 0, function* () {
      const factory = this.serviceContainer.get(types_1.IPersistentStateFactory);
      const state = scope === types_3.DiagnosticScope.Global ? factory.createGlobalPersistentState(FilterKeys.GlobalDiagnosticFilter, []) : factory.createWorkspacePersistentState(FilterKeys.WorkspaceDiagnosticFilter, []);
      const currentValue = state.value.slice();
      yield state.updateValue(currentValue.concat(code));
    });
  }

};
DiagnosticFilterService = __decorate([inversify_1.injectable(), __param(0, inversify_1.inject(types_2.IServiceContainer))], DiagnosticFilterService);
exports.DiagnosticFilterService = DiagnosticFilterService;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbHRlci5qcyJdLCJuYW1lcyI6WyJfX2RlY29yYXRlIiwiZGVjb3JhdG9ycyIsInRhcmdldCIsImtleSIsImRlc2MiLCJjIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwiciIsIk9iamVjdCIsImdldE93blByb3BlcnR5RGVzY3JpcHRvciIsImQiLCJSZWZsZWN0IiwiZGVjb3JhdGUiLCJpIiwiZGVmaW5lUHJvcGVydHkiLCJfX3BhcmFtIiwicGFyYW1JbmRleCIsImRlY29yYXRvciIsIl9fYXdhaXRlciIsInRoaXNBcmciLCJfYXJndW1lbnRzIiwiUCIsImdlbmVyYXRvciIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiZnVsZmlsbGVkIiwidmFsdWUiLCJzdGVwIiwibmV4dCIsImUiLCJyZWplY3RlZCIsInJlc3VsdCIsImRvbmUiLCJ0aGVuIiwiYXBwbHkiLCJleHBvcnRzIiwiaW52ZXJzaWZ5XzEiLCJyZXF1aXJlIiwidHlwZXNfMSIsInR5cGVzXzIiLCJ0eXBlc18zIiwiRmlsdGVyS2V5cyIsIkRpYWdub3N0aWNGaWx0ZXJTZXJ2aWNlIiwiY29uc3RydWN0b3IiLCJzZXJ2aWNlQ29udGFpbmVyIiwic2hvdWxkSWdub3JlRGlhZ25vc3RpYyIsImNvZGUiLCJmYWN0b3J5IiwiZ2V0IiwiSVBlcnNpc3RlbnRTdGF0ZUZhY3RvcnkiLCJnbG9iYWxTdGF0ZSIsImNyZWF0ZUdsb2JhbFBlcnNpc3RlbnRTdGF0ZSIsIkdsb2JhbERpYWdub3N0aWNGaWx0ZXIiLCJ3b3Jrc3BhY2VTdGF0ZSIsImNyZWF0ZVdvcmtzcGFjZVBlcnNpc3RlbnRTdGF0ZSIsIldvcmtzcGFjZURpYWdub3N0aWNGaWx0ZXIiLCJpbmRleE9mIiwiaWdub3JlRGlhZ25vc3RpYyIsInNjb3BlIiwic3RhdGUiLCJEaWFnbm9zdGljU2NvcGUiLCJHbG9iYWwiLCJjdXJyZW50VmFsdWUiLCJzbGljZSIsInVwZGF0ZVZhbHVlIiwiY29uY2F0IiwiaW5qZWN0YWJsZSIsImluamVjdCIsIklT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bEQsRUFBNkUsRUFBN0UsQ0FGSjtBQUdBLFlBQU1PLFlBQVksR0FBR0gsS0FBSyxDQUFDakMsS0FBTixDQUFZcUMsS0FBWixFQUFyQjtBQUNBLFlBQU1KLEtBQUssQ0FBQ0ssV0FBTixDQUFrQkYsWUFBWSxDQUFDRyxNQUFiLENBQW9CbkIsSUFBcEIsQ0FBbEIsQ0FBTjtBQUNILEtBUGUsQ0FBaEI7QUFRSDs7QUF0QnVELENBQTVEO0FBd0JBSix1QkFBdUIsR0FBRzVDLFVBQVUsQ0FBQyxDQUNqQ3NDLFdBQVcsQ0FBQzhCLFVBQVosRUFEaUMsRUFFakNwRCxPQUFPLENBQUMsQ0FBRCxFQUFJc0IsV0FBVyxDQUFDK0IsTUFBWixDQUFtQjVCLE9BQU8sQ0FBQzZCLGlCQUEzQixDQUFKLENBRjBCLENBQUQsRUFHakMxQix1QkFIaUMsQ0FBcEM7QUFJQVAsT0FBTyxDQUFDTyx1QkFBUixHQUFrQ0EsdUJBQWxDIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cclxuJ3VzZSBzdHJpY3QnO1xyXG52YXIgX19kZWNvcmF0ZSA9ICh0aGlzICYmIHRoaXMuX19kZWNvcmF0ZSkgfHwgZnVuY3Rpb24gKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59O1xyXG52YXIgX19wYXJhbSA9ICh0aGlzICYmIHRoaXMuX19wYXJhbSkgfHwgZnVuY3Rpb24gKHBhcmFtSW5kZXgsIGRlY29yYXRvcikge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIGtleSkgeyBkZWNvcmF0b3IodGFyZ2V0LCBrZXksIHBhcmFtSW5kZXgpOyB9XHJcbn07XHJcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn07XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuY29uc3QgaW52ZXJzaWZ5XzEgPSByZXF1aXJlKFwiaW52ZXJzaWZ5XCIpO1xyXG5jb25zdCB0eXBlc18xID0gcmVxdWlyZShcIi4uLy4uL2NvbW1vbi90eXBlc1wiKTtcclxuY29uc3QgdHlwZXNfMiA9IHJlcXVpcmUoXCIuLi8uLi9pb2MvdHlwZXNcIik7XHJcbmNvbnN0IHR5cGVzXzMgPSByZXF1aXJlKFwiLi90eXBlc1wiKTtcclxudmFyIEZpbHRlcktleXM7XHJcbihmdW5jdGlvbiAoRmlsdGVyS2V5cykge1xyXG4gICAgRmlsdGVyS2V5c1tcIkdsb2JhbERpYWdub3N0aWNGaWx0ZXJcIl0gPSBcIkdMT0JBTF9ESUFHTk9TVElDU19GSUxURVJcIjtcclxuICAgIEZpbHRlcktleXNbXCJXb3Jrc3BhY2VEaWFnbm9zdGljRmlsdGVyXCJdID0gXCJXT1JLU1BBQ0VfRElBR05PU1RJQ1NfRklMVEVSXCI7XHJcbn0pKEZpbHRlcktleXMgPSBleHBvcnRzLkZpbHRlcktleXMgfHwgKGV4cG9ydHMuRmlsdGVyS2V5cyA9IHt9KSk7XHJcbmxldCBEaWFnbm9zdGljRmlsdGVyU2VydmljZSA9IGNsYXNzIERpYWdub3N0aWNGaWx0ZXJTZXJ2aWNlIHtcclxuICAgIGNvbnN0cnVjdG9yKHNlcnZpY2VDb250YWluZXIpIHtcclxuICAgICAgICB0aGlzLnNlcnZpY2VDb250YWluZXIgPSBzZXJ2aWNlQ29udGFpbmVyO1xyXG4gICAgfVxyXG4gICAgc2hvdWxkSWdub3JlRGlhZ25vc3RpYyhjb2RlKSB7XHJcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICAgICAgY29uc3QgZmFjdG9yeSA9IHRoaXMuc2VydmljZUNvbnRhaW5lci5nZXQodHlwZXNfMS5JUGVyc2lzdGVudFN0YXRlRmFjdG9yeSk7XHJcbiAgICAgICAgICAgIGNvbnN0IGdsb2JhbFN0YXRlID0gZmFjdG9yeS5jcmVhdGVHbG9iYWxQZXJzaXN0ZW50U3RhdGUoRmlsdGVyS2V5cy5HbG9iYWxEaWFnbm9zdGljRmlsdGVyLCBbXSk7XHJcbiAgICAgICAgICAgIGNvbnN0IHdvcmtzcGFjZVN0YXRlID0gZmFjdG9yeS5jcmVhdGVXb3Jrc3BhY2VQZXJzaXN0ZW50U3RhdGUoRmlsdGVyS2V5cy5Xb3Jrc3BhY2VEaWFnbm9zdGljRmlsdGVyLCBbXSk7XHJcbiAgICAgICAgICAgIHJldHVybiBnbG9iYWxTdGF0ZS52YWx1ZS5pbmRleE9mKGNvZGUpID49IDAgfHxcclxuICAgICAgICAgICAgICAgIHdvcmtzcGFjZVN0YXRlLnZhbHVlLmluZGV4T2YoY29kZSkgPj0gMDtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGlnbm9yZURpYWdub3N0aWMoY29kZSwgc2NvcGUpIHtcclxuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgICAgICAgICBjb25zdCBmYWN0b3J5ID0gdGhpcy5zZXJ2aWNlQ29udGFpbmVyLmdldCh0eXBlc18xLklQZXJzaXN0ZW50U3RhdGVGYWN0b3J5KTtcclxuICAgICAgICAgICAgY29uc3Qgc3RhdGUgPSBzY29wZSA9PT0gdHlwZXNfMy5EaWFnbm9zdGljU2NvcGUuR2xvYmFsID9cclxuICAgICAgICAgICAgICAgIGZhY3RvcnkuY3JlYXRlR2xvYmFsUGVyc2lzdGVudFN0YXRlKEZpbHRlcktleXMuR2xvYmFsRGlhZ25vc3RpY0ZpbHRlciwgW10pIDpcclxuICAgICAgICAgICAgICAgIGZhY3RvcnkuY3JlYXRlV29ya3NwYWNlUGVyc2lzdGVudFN0YXRlKEZpbHRlcktleXMuV29ya3NwYWNlRGlhZ25vc3RpY0ZpbHRlciwgW10pO1xyXG4gICAgICAgICAgICBjb25zdCBjdXJyZW50VmFsdWUgPSBzdGF0ZS52YWx1ZS5zbGljZSgpO1xyXG4gICAgICAgICAgICB5aWVsZCBzdGF0ZS51cGRhdGVWYWx1ZShjdXJyZW50VmFsdWUuY29uY2F0KGNvZGUpKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufTtcclxuRGlhZ25vc3RpY0ZpbHRlclNlcnZpY2UgPSBfX2RlY29yYXRlKFtcclxuICAgIGludmVyc2lmeV8xLmluamVjdGFibGUoKSxcclxuICAgIF9fcGFyYW0oMCwgaW52ZXJzaWZ5XzEuaW5qZWN0KHR5cGVzXzIuSVNlcnZpY2VDb250YWluZXIpKVxyXG5dLCBEaWFnbm9zdGljRmlsdGVyU2VydmljZSk7XHJcbmV4cG9ydHMuRGlhZ25vc3RpY0ZpbHRlclNlcnZpY2UgPSBEaWFnbm9zdGljRmlsdGVyU2VydmljZTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZmlsdGVyLmpzLm1hcCJdfQ==