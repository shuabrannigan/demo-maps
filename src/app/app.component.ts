import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { appLoaded } from './store/app-store/app.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private store: Store) {}
  ngOnInit() {
    // initalize app store
    this.store.dispatch(appLoaded());
  }
}
