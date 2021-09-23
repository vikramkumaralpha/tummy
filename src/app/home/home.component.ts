import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  modalWindow = null;
  openModal() {
    this.modalWindow.open('RegisterComponent')
  }

  ngOnDestroy() {
    if (this.modalWindow !== null) this.modalWindow.close()
  }

  constructor() { }

  ngOnInit() {
  }

}
