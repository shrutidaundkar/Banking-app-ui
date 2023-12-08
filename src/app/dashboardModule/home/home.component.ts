import { Component } from '@angular/core'
import type { OnInit } from '@angular/core'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  ngOnInit (): void {
    console.log('Home component')
  }
}
