import { TestBed } from '@angular/core/testing'
import { FundTransferService } from './fundTransfer.service'

describe('FundtransferService', () => {
  let service: FundTransferService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(FundTransferService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
