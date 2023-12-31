import type { ComponentFixture } from '@angular/core/testing'
import { TestBed } from '@angular/core/testing'
import { FundTransferComponent } from './fund-transfer.component'

describe('FundTransferComponent', () => {
  let component: FundTransferComponent
  let fixture: ComponentFixture<FundTransferComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FundTransferComponent]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(FundTransferComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
