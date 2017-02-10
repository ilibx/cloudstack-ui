import { Component, OnInit, Inject } from '@angular/core';
import { MdlDialogReference } from 'angular2-mdl';

import { OsType, Zone } from '../../shared/models';
import { ZoneService } from '../../shared/services';
import { OsTypeService } from '../../shared/services/os-type.service';


@Component({
  selector: 'cs-template-creation',
  templateUrl: 'template-creation.component.html',
  styleUrls: ['template-creation.component.scss']
})
export class TemplateCreationComponent implements OnInit {
  public name: string;
  public displayText: string;
  public osTypeId: string;
  public url: string;
  public zoneId: string;

  public extractable: boolean;
  public passwordEnabled: boolean;
  public dynamicallyScalable: boolean;

  public osTypes: Array<OsType>;
  public zones: Array<Zone>;

  constructor(
    private dialog: MdlDialogReference,
    private osTypeService: OsTypeService,
    private zoneService: ZoneService,
    @Inject('mode') private mode: 'Template' | 'Iso'
  ) { }

  public ngOnInit(): void {
    this.osTypes = [];
    this.zones = [];
    this.osTypeService
      .getList()
      .subscribe(osTypes => {
        this.osTypes = osTypes;
        this.osTypeId = this.osTypes[0].id;
      });
    this.zoneService
      .getList()
      .subscribe(zones => {
        this.zones = zones;
        this.zoneId = this.zones[0].id;
      });
  }

  public onCancel(): void {
    this.dialog.hide();
  }

  public onCreate(): void {
    const params = {
      name: this.name,
      displayText: this.displayText,
      osTypeId: this.osTypeId,
      url: this.url,
      zoneId: this.zoneId
    };

    if (this.mode === 'Template') {
      params['extractable'] = this.extractable;
      params['passwordenabled'] = this.extractable;
      params['isdynamicallyscalable'] = this.extractable;
    }
    this.dialog.hide(params);
  }
}
