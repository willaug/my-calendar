import { Component, Input } from '@angular/core';
import { fadeInAnimation } from '@core/animations/fade-in.animation';

@Component({
  selector: 'app-settings-expansion-panel',
  templateUrl: './settings-expansion-panel.component.html',
  styleUrls: ['./settings-expansion-panel.component.scss'],
  animations: [fadeInAnimation],
})
export class SettingsExpansionPanelComponent {
  @Input() public title: string;
  @Input() public disabled: boolean;
  @Input() public description: string;

  public constructor() {
    this.title = 'Title';
    this.disabled = false;
    this.description = 'Description';
  }
}
