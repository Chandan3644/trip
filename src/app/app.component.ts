import { Component } from '@angular/core';

interface Trip {
  start: string;
  end: string;
  level: number;
  continued: boolean;
  arrow: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'TripFlow';
  trips: Trip[] = [];
  startPoint = '';
  endPoint = '';

  addTrip() {
    const start = this.startPoint.trim();
    const end = this.endPoint.trim();

    if (!start || !end) return;

    let level = 1;
    let continued = false;
    let arrow = false;

    const lastTrip = this.trips[this.trips.length - 1];

    if (lastTrip) {
      if (lastTrip.end.toLowerCase() === start.toLowerCase()) {
        continued = true;
        arrow = false;
        level = 1;
      } else if (
        lastTrip.start.toLowerCase() === start.toLowerCase() &&
        lastTrip.end.toLowerCase() === end.toLowerCase()
      ) {
        level = 2;
        arrow = false;
      } else {
        arrow = true;
        level = 1;
      }
    }

    this.trips.push({ start, end, level, continued, arrow });

    this.startPoint = '';
    this.endPoint = '';
  }

  get svgHeight(): number {
    const maxLevel = Math.max(...this.trips.map(t => t.level), 1);
    return (maxLevel + 1) * 60;
  }
}
