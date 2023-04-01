import { Component } from "@angular/core";
import { GeoJSONInputService } from "./geojson-input.service";
import { Observable } from "rxjs";

@Component({
    selector: 'app-geojson-input',
    template: `
    <div data-test="interface" class="interface">
    <p class="error-message" *ngIf="error$ | async">Error</p>
    <button data-test="loadFileButton" mat-flat-button color="primary" (click)="this.inputService.loadDataFromFile()">Load</button>
    <ngx-codemirror
    class="codemirror"
    [ngModel]="formInput | async"
    (ngModelChange)="this.inputService.setDataFromInput($event)"
    [options]="codeMirrorOptions"
    ></ngx-codemirror>
</div>`,
    styles: [`    
    .interface {
        background-color: #ddd;
        width: 100%;
        height: 100%;
        position: relative;

        button {
            display: flex;
            margin: 0.5rem auto;
        }

        .error-message {
            text-align: center;
            color: #f00;
            padding: 1rem;
            font-weight: bold;
        }

        .codemirror {
            width: -webkit-fill-available;
            height: -webkit-fill-available;
            
        }
    }`],
    providers: [GeoJSONInputService]
})
export class GeoJSONInputComponent {
    constructor(public inputService: GeoJSONInputService) {}

    formInput: Observable<string> =  this.inputService.getData$()
    error$: Observable<boolean> = this.inputService.error$

    codeMirrorOptions: any = {
        theme: 'idea',
        mode: 'application/geo+json',
        lineNumbers: true,
        lineWrapping: true,
        foldGutter: true,
        gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter', 'CodeMirror-lint-markers'],
        autoCloseBrackets: true,
        matchBrackets: true,
        lint: true
      };
}