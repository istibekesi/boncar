/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { UserProfileComponent } from './user-profile.component';

describe('Component: UserProfile', () => {
  it('should create an instance', () => {
    let component = new UserProfileComponent();
    expect(component).toBeTruthy();
  });
});
