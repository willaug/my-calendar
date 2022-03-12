import { Component, Input } from '@angular/core';
import { LoadingService } from '@core/shared/loading/loading.service';
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

  public constructor(private loadingService: LoadingService) {
    this.title = 'Title';
    this.disabled = false;
    this.description = 'Description';

    this.loadingService.getLoading().subscribe((isLoading) => {
      this.disabled = isLoading;
    });
  }
}
