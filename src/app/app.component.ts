import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { firstValueFrom } from 'rxjs';

import { MatDialog } from '@angular/material/dialog';

import { MonacoEditorModule } from 'ngx-monaco-editor-v2';
import * as monaco from 'monaco-editor';

import { HelloComponent, HelloData } from './hello/hello.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MonacoEditorModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  private _editor?: monaco.editor.IStandaloneCodeEditor;

  constructor(private _dialog: MatDialog) {}

  public editorOptions = {
    theme: 'vs-light',
    language: 'markdown',
    wordWrap: 'on',
    // https://github.com/atularen/ngx-monaco-editor/issues/19
    automaticLayout: true,
  };

  private async promptName(name?: string): Promise<string | undefined> {
    const dialogRef = this._dialog.open(HelloComponent, {
      data: {
        name,
      },
    });
    const result: HelloData | undefined = await firstValueFrom(
      dialogRef.afterClosed()
    );
    return result?.name;
  }

  private async insertText() {
    if (!this._editor) {
      return;
    }
    const selection = this._editor.getSelection();
    const text = selection
      ? this._editor.getModel()?.getValueInRange(selection)
      : undefined;
    const name = await this.promptName(text);
    if (name && selection) {
      this._editor.executeEdits('my-source', [
        {
          range: selection,
          text: name,
          forceMoveMarkers: true,
        },
      ]);
    }
  }

  public onEditorInit(editor: monaco.editor.IStandaloneCodeEditor) {
    this._editor = editor;
    this._editor.addCommand(
      monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyP,
      async () => {
        await this.insertText();
      }
    );
  }
}
