import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, provideRouter } from '@angular/router';
import { MessageService } from 'primeng/api';
import { of } from 'rxjs';
import { CommonService } from '../../../core/services/common.service';
import { ModuleService } from '../../../core/services/module.service';

import { AddModulesComponent } from './add-modules.component';

describe('AddModulesComponent', () => {
  let component: AddModulesComponent;
  let fixture: ComponentFixture<AddModulesComponent>;

  const moduleService = {
    getCourses: jasmine.createSpy('getCourses').and.returnValue(of([]))
  };
  const commonService = {
    onRefresh: jasmine.createSpy('onRefresh').and.returnValue(of()),
    getObject: jasmine.createSpy('getObject'),
    setObject: jasmine.createSpy('setObject'),
    refresh: jasmine.createSpy('refresh')
  };
  const messageService = {
    add: jasmine.createSpy('add')
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddModulesComponent],
      providers: [
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: {
            queryParamMap: of(convertToParamMap({})),
            parent: null
          }
        },
        { provide: ModuleService, useValue: moduleService },
        { provide: CommonService, useValue: commonService },
        { provide: MessageService, useValue: messageService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddModulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
