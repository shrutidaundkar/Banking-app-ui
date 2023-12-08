import { Component } from '@angular/core'
import type { OnInit } from '@angular/core'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  ngOnInit (): void {
    console.log('Dashboard loaded')
  }
}
