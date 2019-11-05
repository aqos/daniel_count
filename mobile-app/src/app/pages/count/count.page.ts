import { Component, OnInit } from '@angular/core';
import { CarCategory } from '../../models/CarCategory';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { GenericResponse } from '../../models/GenericResponse';
import { Count } from '../../models/Count';
import { NotificationTools, getItemFromLocalStorage } from '../../models/utils';
import { CountService } from '../../services/count.service';

@Component({
  selector: 'app-count',
  templateUrl: './count.page.html',
  styleUrls: ['./count.page.scss'],
})
export class CountPage implements OnInit {
  carCategories: CarCategory[] = [];
  lastCarCategory: CarCategory;
  counts: Count[] = [];
  timeLeft = 21600;
  interval;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private router: Router,
    private notificationTools: NotificationTools,
    private countService: CountService
  ) { }

  ngOnInit() {
    this.route.data
      .subscribe((data: { data: GenericResponse }) => {
        this.carCategories = data.data.car_categories;
        this.initializeCounts();
        this.carCategories.forEach((value, index, array) => {
          this.counts[index].car_category_id = value.id;
        });
        this.startTimer();
      }
    );
  }

  initializeCounts() {
    const countData = getItemFromLocalStorage('countData') as Count;
    for (let index = 0; index < this.counts.length; index++) {
      this.counts[index] = new Count();
      this.counts[index].weather_id = countData.weather_id;
      this.counts[index].time_slot_id = countData.time_slot_id;
      this.counts[index].road_id = countData.road_id;
      this.counts[index].counts = [0, 0, 0, 0, 0, 0];
    }
  }

  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
        if ((this.timeLeft % 3600) === 0) {
          this.notificationTools.presentAlert('Alert', '<p class="text-warning">Il vous reste 0'
            + (this.timeLeft / 3600) + ' heure(s) de comptage !</p>');
        }
      } else {
        this.timeLeft = 0;
        this.notificationTools.presentLoading('L\'envoi des données de comptage a débuté...');
        this.onSaveCount();
      }
    }, 1000);
  }

  onGoBack() {
    this.location.back();
  }

  onSaveCount() {
    if (this.timeLeft > 0) {
      this.notificationTools.presentAlert('Alerte', '<p class="text-danger">Le temps imparti pour le comptage n\'est pas épuisé !</p>');
      return;
    }
    this.notificationTools.presentLoading('Envoie des données de comptage en cours...');
    this.countService.postCounts(this.counts).subscribe(
      data => {
        this.notificationTools.dismissLoading();
        this.notificationTools.presentAlert('Information', '<p class="text-success">Comptage enregistré avec succès !</p>');
        this.router.navigate(['/count-success']);
      },
      error => {
        this.notificationTools.dismissLoading();
        this.notificationTools.presentAlert('Alerte', '<p class="text-danger">Une erreur est survenue, ' +
          'veuillez le notifier à l\'administrateur !</p>');
      }
    );
  }

  increment(index: number) {
    if (this.timeLeft > 18000 && this.timeLeft <= 21600) {
      this.counts[index].counts[0]++;
    }
    if (this.timeLeft > 14400 && this.timeLeft <= 18000) {
      this.counts[index].counts[1]++;
    }
    if (this.timeLeft > 10800 && this.timeLeft <= 14400) {
      this.counts[index].counts[2]++;
    }
    if (this.timeLeft > 7200 && this.timeLeft <= 10800) {
      this.counts[index].counts[3]++;
    }
    if (this.timeLeft > 3600 && this.timeLeft <= 7200) {
      this.counts[index].counts[4]++;
    }
    if (this.timeLeft > 0 && this.timeLeft <= 3600) {
      this.counts[index].counts[5]++;
    }
  }

  getModel(index: number) {
    if (this.timeLeft > 18000 && this.timeLeft <= 21600) {
      return this.counts[index].counts[0];
    }
    if (this.timeLeft > 14400 && this.timeLeft <= 18000) {
      return this.counts[index].counts[1];
    }
    if (this.timeLeft > 10800 && this.timeLeft <= 14400) {
      return this.counts[index].counts[2];
    }
    if (this.timeLeft > 7200 && this.timeLeft <= 10800) {
      return this.counts[index].counts[3];
    }
    if (this.timeLeft > 3600 && this.timeLeft <= 7200) {
      return this.counts[index].counts[4];
    }
    if (this.timeLeft > 0 && this.timeLeft <= 3600) {
      return this.counts[index].counts[5];
    }
  }

  decrement(index: number) {
    if (this.timeLeft > 18000 && this.timeLeft <= 21600) {
      this.counts[index].counts[0]--;
    }
    if (this.timeLeft > 14400 && this.timeLeft <= 18000) {
      this.counts[index].counts[1]--;
    }
    if (this.timeLeft > 10800 && this.timeLeft <= 14400) {
      this.counts[index].counts[2]--;
    }
    if (this.timeLeft > 7200 && this.timeLeft <= 10800) {
      this.counts[index].counts[3]--;
    }
    if (this.timeLeft > 3600 && this.timeLeft <= 7200) {
      this.counts[index].counts[4]--;
    }
    if (this.timeLeft > 0 && this.timeLeft <= 3600) {
      this.counts[index].counts[5]--;
    }
  }
}
