import { CommonModule } from '@angular/common';
import { Component, Inject, Optional } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

export interface HelloData {
  name?: string;
}

@Component({
  selector: 'app-hello',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
  ],
  templateUrl: './hello.component.html',
  styleUrl: './hello.component.css',
})
export class HelloComponent {
  public inputName: FormControl<string | null>;
  public form: FormGroup;

  constructor(
    formBuilder: FormBuilder,
    @Optional()
    public dialogRef?: MatDialogRef<HelloComponent>,
    @Optional()
    @Inject(MAT_DIALOG_DATA)
    public data?: HelloData
  ) {
    this.inputName = formBuilder.control(data?.name || null);
    this.form = formBuilder.group({
      name: this.inputName,
    });
  }

  public save(): void {
    this.dialogRef?.close(this.inputName.value);
  }
}
