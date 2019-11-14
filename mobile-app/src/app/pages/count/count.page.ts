import { Component, OnInit } from '@angular/core';
import { CarCategory } from '../../models/CarCategory';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { GenericResponse } from '../../models/GenericResponse';
import { Count } from '../../models/Count';
import { NotificationTools } from '../../models/utils';
import { CountService } from '../../services/count.service';
import { Platform } from '@ionic/angular';
import { User } from '../../models/User';

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
  isSmallBreakPoint: boolean;

  constructor(
    private platform: Platform,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router,
    private notificationTools: NotificationTools,
    private countService: CountService,
  ) {
    this.platform.ready().then(() => {
      this.isSmallBreakPoint = this.platform.width() >= 576;
    });
  }

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
    const countData = JSON.parse(localStorage.getItem('countData')) as Count;
    const user = JSON.parse(localStorage.getItem('user')) as User;
    for (let index = 0; index < this.carCategories.length; index++) {
      this.counts[index] = new Count();
      this.counts[index].weather_id = countData.weather_id;
      this.counts[index].time_slot_id = countData.time_slot_id;
      this.counts[index].road_id = countData.road_id;
      this.counts[index].user_id = user.id;
      this.counts[index].counts = [0, 0, 0, 0, 0, 0];
    }
  }

  async startTimer() {
    this.interval = setInterval(async () => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
        if ((this.timeLeft % 3600) === 0) {
          const alert = await this.notificationTools.createAlert('Alert', '<p class="text-warning">Il vous reste 0'
            + (this.timeLeft / 3600) + ' heure(s) de comptage !</p>');
          alert.present();
        }
      } else {
        this.timeLeft = 0;
        this.onSaveCount();
      }
    }, 1000);
  }

  onGoBack() {
    this.location.back();
  }

  async onSaveCount() {
    if (this.timeLeft > 0) {
      // tslint:disable-next-line: max-line-length
      const alert0 = await this.notificationTools.createAlert('Alerte', '<p class="text-danger">Le temps imparti pour le comptage n\'est pas épuisé !</p>');
      alert0.present();
      return;
    }
    console.log(this.counts);

    const loading = await this.notificationTools.createLoading('Envoie des données de comptage en cours...');
    loading.present();
    const alert = await this.notificationTools.createAlert('Information', '<p class="text-success">Comptage enregistré avec succès !</p>');
    const alertError = await this.notificationTools.createAlert('Alerte', '<p class="text-danger">Une erreur est survenue, ' +
      'veuillez le notifier à l\'administrateur !</p>');
    this.countService.postCounts(this.counts).subscribe(
      data => {
        loading.dismiss();
        alert.present();
        this.router.navigate(['/count-success']);
      },
      error => {
        loading.dismiss();
        alertError.present();
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

  getValue(index: number) {
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
      if (this.counts[index].counts[0] > 0) {
        this.counts[index].counts[0]--;
      }
    }
    if (this.timeLeft > 14400 && this.timeLeft <= 18000) {
      if (this.counts[index].counts[1] > 0) {
        this.counts[index].counts[1]--;
      }
    }
    if (this.timeLeft > 10800 && this.timeLeft <= 14400) {
      if (this.counts[index].counts[2] > 0) {
        this.counts[index].counts[2]--;
      }
    }
    if (this.timeLeft > 7200 && this.timeLeft <= 10800) {
      if (this.counts[index].counts[3] > 0) {
        this.counts[index].counts[3]--;
      }
    }
    if (this.timeLeft > 3600 && this.timeLeft <= 7200) {
      if (this.counts[index].counts[4] > 0) {
        this.counts[index].counts[4]--;
      }
    }
    if (this.timeLeft > 0 && this.timeLeft <= 3600) {
      if (this.counts[index].counts[5] > 0) {
        this.counts[index].counts[5]--;
      }
    }
  }
}
