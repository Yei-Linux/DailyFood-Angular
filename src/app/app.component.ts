import { Component, Renderer2, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <router-outlet>
    </router-outlet>
  `,
})
export class AppComponent implements AfterViewInit {
  constructor(private renderer: Renderer2) {}

  ngAfterViewInit() {
  }
}