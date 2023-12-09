import { Component } from '@angular/core'
import type { OnInit } from '@angular/core'

/**
 * Component for displaying the side navigation of the application.
 */
@Component({
  selector: 'app-side-navigation',
  templateUrl: './side-navigation.component.html',
  styleUrls: ['./side-navigation.component.css']
})
export class SideNavigationComponent implements OnInit {
  ngOnInit (): void {
    console.log('Side nav component')
  }
}
