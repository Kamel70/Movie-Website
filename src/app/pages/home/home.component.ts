import { Component } from '@angular/core';
import { SegmentControlComponent } from '../../components/segment-control/segment-control.component';

@Component({
  selector: 'app-home',
  imports: [SegmentControlComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
