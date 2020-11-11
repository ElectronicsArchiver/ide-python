"use strict"; // Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

Object.defineProperty(exports, "__esModule", {
  value: true
});

class ModuleNotInstalledError extends Error {
  constructor(moduleName) {
    super(`Module '${moduleName}' not installed.`);
  }

}

exports.ModuleNotInstalledError = ModuleNotInstalledError;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZU5vdEluc3RhbGxlZEVycm9yLmpzIl0sIm5hbWVzIjpbIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiZXhwb3J0cyIsInZhbHVlIiwiTW9kdWxlTm90SW5zdGFsbGVkRXJyb3IiLCJFcnJvciIsImNvbnN0cnVjdG9yIiwibW9kdWxlTmFtZSJdLCJtYXBwaW5ncyI6IkFBQUEsYSxDQUNBO0FBQ0E7O0FBQ0FBLE1BQU0sQ0FBQ0MsY0FBUCxDQUFzQkMsT0FBdEIsRUFBK0IsWUFBL0IsRUFBNkM7QUFBRUMsRUFBQUEsS0FBSyxFQUFFO0FBQVQsQ0FBN0M7O0FBQ0EsTUFBTUMsdUJBQU4sU0FBc0NDLEtBQXRDLENBQTRDO0FBQ3hDQyxFQUFBQSxXQUFXLENBQUNDLFVBQUQsRUFBYTtBQUNwQixVQUFPLFdBQVVBLFVBQVcsa0JBQTVCO0FBQ0g7O0FBSHVDOztBQUs1Q0wsT0FBTyxDQUFDRSx1QkFBUixHQUFrQ0EsdUJBQWxDIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XHJcbi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuY2xhc3MgTW9kdWxlTm90SW5zdGFsbGVkRXJyb3IgZXh0ZW5kcyBFcnJvciB7XHJcbiAgICBjb25zdHJ1Y3Rvcihtb2R1bGVOYW1lKSB7XHJcbiAgICAgICAgc3VwZXIoYE1vZHVsZSAnJHttb2R1bGVOYW1lfScgbm90IGluc3RhbGxlZC5gKTtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLk1vZHVsZU5vdEluc3RhbGxlZEVycm9yID0gTW9kdWxlTm90SW5zdGFsbGVkRXJyb3I7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1vZHVsZU5vdEluc3RhbGxlZEVycm9yLmpzLm1hcCJdfQ==