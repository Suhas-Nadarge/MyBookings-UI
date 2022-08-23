import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-dialog",
  template: `
    <h1 mat-dialog-title>{{ data.success ? "Congratulations!" : "Error" }}</h1>
    <div mat-dialog-content>
      {{ data.success ? "Payment collected successfully" : data.error }}
    </div>
    <div mat-dialog-actions>
      <button mat-button mat-dialog-close>Close</button>
    </div>
  `
})
export class DialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { success: boolean; error?: string }
  ) {}
}
