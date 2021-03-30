// Copyright 2014 The Oppia Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.


/**
 * @fileoverview Component for the header of the response tiles.
 */


import { StateEditorService } from 'components/state-editor/state-editor-properties-services/state-editor.service';
import { StateInteractionIdService } from 'components/state-editor/state-editor-properties-services/state-interaction-id.service';
import { EditabilityService } from 'services/editability.service';
import { Component, Input } from '@angular/core';
import INTERACTION_SPECS from 'interactions/interaction_specs.json';
import { downgradeComponent } from '@angular/upgrade/static';
import { AppConstants } from 'app.constants';

@Component({
  selector: 'response-header',
  templateUrl: './response-header.component.html'
})
export class ResponseHeaderComponent {
  @Input() index: string;
  @Input() outcome: { labelledAsCorrect: void, dest: string };
  @Input() summary: string;
  @Input() shortSummary: string;
  @Input() isActive: boolean;
  @Input() onDeleteFn: string;
  @Input() numRules: boolean;
  @Input() isResponse: boolean;
  @Input() showWarning: string;
  @Input() navigateToState: string;
  editabilityService: EditabilityService;
  constructor(
    private stateEditorService: StateEditorService,
    private stateInteractionIdService: StateInteractionIdService,
  ) {}

  isInQuestionMode(): boolean {
    return this.stateEditorService.isInQuestionMode();
  }

  getCurrentInteractionId(): string {
    return this.stateInteractionIdService.savedMemento;
  }

  isCorrectnessFeedbackEnabled(): boolean {
    return this.stateEditorService.getCorrectnessFeedbackEnabled();
  }
  // This returns false if the current interaction ID is null.
  isCurrentInteractionLinear(): void {
    var interactionId = this.getCurrentInteractionId();
    return interactionId && INTERACTION_SPECS[interactionId].is_linear;
  }

  isCorrect(): void {
    return this.outcome && this.outcome.labelledAsCorrect;
  }

  isOutcomeLooping(): boolean {
    var outcome = this.outcome;
    var activeStateName = this.stateEditorService.getActiveStateName();
    return outcome && (outcome.dest === activeStateName);
  }

  isCreatingNewState(): boolean {
    var outcome = this.outcome;
    return outcome && outcome.dest === AppConstants.PLACEHOLDER_OUTCOME_DEST;
  }

  deleteResponse(evt: Event): void {
    this.onDeleteFn(this.index, evt);
  }
  ngOnInit(): void {
    this.editabilityService = new EditabilityService;
  }
}

angular.module('oppia').directive(
  'responseHeader', downgradeComponent(
    {component: ResponseHeaderComponent}));

