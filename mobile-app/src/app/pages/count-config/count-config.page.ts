import { Component, OnInit } from '@angular/core';
import { Road } from '../../models/Road';
import { DepartmentCouple } from '../../models/DepartmentCouple';
import { TimeSlot } from '../../models/TimeSlot';
import { Weather } from '../../models/Weather';
import { CountService } from '../../services/count.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GenericResponse } from '../../models/GenericResponse';
import { NotificationTools, setItemInLocalStorage } from '../../models/utils';
import { Count } from '../../models/Count';

@Component({
  selector: 'app-count-config',
  templateUrl: './count-config.page.html',
  styleUrls: ['./count-config.page.scss'],
})
export class CountConfigPage implements OnInit {
  countForm: FormGroup;
  weathers: Weather[] = [];
  timeSlots: TimeSlot[] = [];
  departmentCouples: DepartmentCouple[] = [];
  roads: Road[] = [];
  departmentCoupleChoosed = false;
  roadsLoaded = false;

  constructor(
    private countService: CountService,
    private router: Router,
    private formBuilder: FormBuilder,
    private notificationTools: NotificationTools,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.data
      .subscribe((data: { data: GenericResponse }) => {
        this.weathers = data.data.weathers;
        this.timeSlots = data.data.time_slots;
        this.departmentCouples = data.data.department_couples;
        this.filterTimeSlots();
      });
    this.buildForm();
  }

  filterTimeSlots() {
    const hour = (new Date()).getHours();
    this.timeSlots = this.timeSlots.filter((value, index, array) => {
      return value.start >= hour;
    });
  }

  buildForm() {
    this.countForm = this.formBuilder.group({
      weather_id: ['', Validators.required],
      time_slot_id: ['', Validators.required],
      department_couple_id: ['', Validators.required],
      road_id: ['', Validators.required],
    });
  }

  onCount() {
    const counData = new Count();
    counData.weather_id = parseInt(this.countForm.get('weather_id').value, 10);
    counData.time_slot_id = parseInt(this.countForm.get('time_slot_id').value, 10);
    counData.road_id = parseInt(this.countForm.get('road_id').value, 10);
    setItemInLocalStorage('countData', counData);
    this.router.navigate(['/count']);
  }

  fetchRoads() {
    this.departmentCoupleChoosed = false;
    this.roadsLoaded = false;
    this.notificationTools.presentLoading('Veuillez patienter svp ! Chargement des routes du département choisi en cours...');
    this.countService.getDepartmentCoupleRoads(parseInt(this.countForm.get('department_couple_id').value, 10)).subscribe(
      (data: GenericResponse) => {
        this.roads = data.roads;
        this.roadsLoaded = true;
        this.departmentCoupleChoosed = true;
        this.notificationTools.dismissLoading();
      },
      error => {
        this.notificationTools.dismissLoading();
        this.notificationTools.presentAlert('Alerte', '<p class="text-danger">Une erreur est survenue, ' +
        'veuillez le notifier à l\'administrateur !</p>');
      }
    );
  }
}
