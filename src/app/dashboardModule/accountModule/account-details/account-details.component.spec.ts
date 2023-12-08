import type { ComponentFixture } from '@angular/core/testing'
import { TestBed } from '@angular/core/testing'
import { AccountDetailsComponent } from './account-details.component'

describe('AccountDetailsComponent', () => {
  let component: AccountDetailsComponent
  let fixture: ComponentFixture<AccountDetailsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccountDetailsComponent]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountDetailsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
