# Angular Monaco Issue Repro

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.3.

Repro for <https://stackoverflow.com/questions/78293918/loading-ttf-of-monaco-editor-in-angular-17> (and <https://stackoverflow.com/questions/78308770/angular-material-dialog-slow-with-broken-rendition-and-binding> for the popup).

1. `npm i` to restore packages.
2. `ng build`: this raises error:

```txt
✘ [ERROR] No loader is configured for ".ttf" files: node_modules/monaco-editor/esm/vs/base/browser/ui/codicons/codicon/codicon.ttf

    node_modules/monaco-editor/esm/vs/base/browser/ui/codicons/codicon/codicon.css:9:6:
      9 │   src: url(./codicon.ttf) format("truetype");
```
