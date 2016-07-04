/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { WelcomeComponent } from './welcome.component';

describe('Component: Welcome', () => {
  it('should create an instance', () => {
    let component = new WelcomeComponent();
    expect(component).toBeTruthy();
  });
});
