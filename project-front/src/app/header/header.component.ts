import { Component, OnInit } from '@angular/core';
import { Item } from '../shared/models/models';
import { ProviderService } from '../shared/services/provider.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public items: Item[] = [
    { title: 'Home', link: '' },
    { title: 'My Cart', link: '/tickets' },
  ];

  public isLogged = false;
  public isAdmin = false;

  public userName = '';

  constructor(private provider: ProviderService) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      this.isLogged = true;
      this.isAdmin = (localStorage.getItem('isAdmin') === 'True' ? true : false);
      this.userName = localStorage.getItem('name');
    }
  }

  logout() {
    this.isLogged = false;
    this.isAdmin = false;
    localStorage.clear();
    window.location.reload();
  }
}
