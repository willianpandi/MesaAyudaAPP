import { Component, OnInit } from '@angular/core';
import { TableColumn } from '../../components/table/interfaces/table-colum.interface';
import { FormControl } from '@angular/forms';
import { DistrictService } from '../../services/districts.service';
import { EstableishmentService } from '../../services/estableishments.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { District, SmallEstableishment } from '../../../dashboard/interfaces/districts';
import { switchMap } from 'rxjs';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { SubCategoryService } from '../../services/subcategories.service';
import { UserService } from '../../services/users.service';
import { TicketService } from '../../services/tickets.service';
import {MatDatepicker} from '@angular/material/datepicker';
import { SubCategoryReports, TicketsReports, UsersReports } from '../../interfaces/reports';


import * as moment from 'moment';
import {Moment} from 'moment';

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-reports',
  templateUrl: './reports-page.component.html',
  styleUrls: ['./reports-page.component.css'],
  providers: [{ provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }],

})
export class ReportsPageComponent implements OnInit {
  tableColumnsReportsSubCategory: TableColumn[] = [];
  tableColumnsTickets: TableColumn[] = [];
  tableColumnsTicketsReasig: TableColumn[] = [];

  subCategoryByEod: SubCategoryReports[] = [];
  subCategoryByEstableishment: SubCategoryReports[] = [];
  estableishmetsByDistrict: SmallEstableishment[] = [];
  subCategoryReportsList: SubCategoryReports[] = [];
  usersTicketsReports: UsersReports[]  = [];
  reasigTicketsReports: TicketsReports[]  = [];

  listEods: District[] = [];
  eods = new FormControl();
  formReport!: FormGroup;
  dateEod = new FormControl(moment());
  dateEsta = new FormControl(moment());
  dateCategory = new FormControl(moment());
  dateSupport = new FormControl(moment());
  dateReasig = new FormControl(moment());

  constructor(
    private districtService: DistrictService,
    private estableishmentService: EstableishmentService,
    private subCategoryService: SubCategoryService,
    private userService: UserService,
    private ticketService: TicketService,
    private fb: FormBuilder,
    private dateAdapter: DateAdapter<Date>,
  ) {
    this.dateAdapter.setLocale('es');
  }

  setMonthAndYearEod(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.dateEod.value!;
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.dateEod.setValue(ctrlValue);
    datepicker.close();
  }

  setMonthAndYearEsta(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.dateEsta.value!;
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.dateEsta.setValue(ctrlValue);
    datepicker.close();
  }

  setMonthAndYearCategory(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.dateCategory.value!;
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.dateCategory.setValue(ctrlValue);
    datepicker.close();
  }
  setMonthAndYearSupport(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.dateSupport.value!;
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.dateSupport.setValue(ctrlValue);
    datepicker.close();
  }

  setMonthAndYearReasig(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.dateReasig.value!;
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.dateReasig.setValue(ctrlValue);
    datepicker.close();
  }

  ngOnInit(): void {
    this.formReport = this.fb.group({
      district: ['', Validators.required],
      estableishment: ['', Validators.required],
    })
    this.setTableColumns();
    this.setDataReports();

    this.districtService.lista().subscribe(
      (data) => {
        this.listEods = data
      },
      (error) => {}
    );
    this.onEstableishmentsChanged();
  }

  setTableColumns() {
    this.tableColumnsReportsSubCategory = [
      { label: 'Departamento', def: 'subcategoria', dataKey: 'subcategoria', isSticky: true, },
      { label: 'Abiertos', def: 'ticketsAbiertos', dataKey: 'ticketsAbiertos' },
      { label: 'En Proceso', def: 'ticketsEnProceso', dataKey: 'ticketsEnProceso' },
      { label: 'Cerrados', def: 'ticketsCerrados', dataKey: 'ticketsCerrados' },
      { label: 'A Tiempo', def: 'ticketsATiempo', dataKey: 'ticketsATiempo' },
      { label: 'Atrasados', def: 'ticketsAtrasados', dataKey: 'ticketsAtrasados' },
      { label: 'Total Tickets', def: 'TotalTickets', dataKey: 'totalTickets' },
      { label: 'Nada Satisfactorio', def: 'ticketsNS', dataKey: 'ticketsNS' },
      { label: 'Poco Satisfactorio', def: 'ticketsAS', dataKey: 'ticketsAS' },
      { label: 'Satisfactorio', def: 'ticketsS', dataKey: 'ticketsS' },
      { label: 'Muy Satisfactorio', def: 'ticketsMS', dataKey: 'ticketsMS' },
      { label: 'Oportuno', def: 'ticketsOportuno', dataKey: 'ticketsOportuno' },
      { label: 'No Oportuno', def: 'ticketsNoOportuno', dataKey: 'ticketsNoOportuno' },
      { label: 'Solucionado', def: 'ticketsSolucionado', dataKey: 'ticketsSolucionado' },
      { label: 'No Solucionado', def: 'ticketsNoSolucionado', dataKey: 'ticketsNoSolucionado' },
    ];
    this.tableColumnsTickets = [
      { label: 'Nombre', def: 'nombre', dataKey: 'nombre', isSticky: true, },
      { label: 'Abiertos', def: 'ticketsAbiertos', dataKey: 'ticketsAbiertos' },
      { label: 'En Proceso', def: 'ticketsEnProceso', dataKey: 'ticketsEnProceso' },
      { label: 'Cerrados', def: 'ticketsCerrados', dataKey: 'ticketsCerrados' },
      { label: 'A Tiempo', def: 'ticketsATiempo', dataKey: 'ticketsATiempo' },
      { label: 'Atrasados', def: 'ticketsAtrasados', dataKey: 'ticketsAtrasados' },
      { label: 'Total', def: 'TotalTickets', dataKey: 'totalTickets' },
      { label: 'Nada Satisfactorio', def: 'ticketsNS', dataKey: 'ticketsNS' },
      { label: 'Poco Satisfactorio', def: 'ticketsAS', dataKey: 'ticketsAS' },
      { label: 'Satisfactorio', def: 'ticketsS', dataKey: 'ticketsS' },
      { label: 'Muy Satisfactorio', def: 'ticketsMS', dataKey: 'ticketsMS' },
      { label: 'Oportuno', def: 'ticketsOportuno', dataKey: 'ticketsOportuno' },
      { label: 'No Oportuno', def: 'ticketsNoOportuno', dataKey: 'ticketsNoOportuno' },
      { label: 'Solucionado', def: 'ticketsSolucionado', dataKey: 'ticketsSolucionado' },
      { label: 'No Solucionado', def: 'ticketsNoSolucionado', dataKey: 'ticketsNoSolucionado' },
    ];
    this.tableColumnsTicketsReasig = [
      { label: 'Nombre', def: 'nombreAsignado', dataKey: 'nombreAsignado', isSticky: true, },
      { label: 'Abiertos', def: 'ticketsAbiertos', dataKey: 'ticketsAbiertos' },
      { label: 'En Proceso', def: 'ticketsEnProceso', dataKey: 'ticketsEnProceso' },
      { label: 'Cerrados', def: 'ticketsCerrados', dataKey: 'ticketsCerrados' },
      { label: 'A Tiempo', def: 'ticketsATiempo', dataKey: 'ticketsATiempo' },
      { label: 'Atrasados', def: 'ticketsAtrasados', dataKey: 'ticketsAtrasados' },
      { label: 'Total Reasignados', def: 'TotalTickets', dataKey: 'totalTickets' },
      { label: 'Nada Satisfactorio', def: 'ticketsNS', dataKey: 'ticketsNS' },
      { label: 'Poco Satisfactorio', def: 'ticketsAS', dataKey: 'ticketsAS' },
      { label: 'Satisfactorio', def: 'ticketsS', dataKey: 'ticketsS' },
      { label: 'Muy Satisfactorio', def: 'ticketsMS', dataKey: 'ticketsMS' },
      { label: 'Oportuno', def: 'ticketsOportuno', dataKey: 'ticketsOportuno' },
      { label: 'No Oportuno', def: 'ticketsNoOportuno', dataKey: 'ticketsNoOportuno' },
      { label: 'Solucionado', def: 'ticketsSolucionado', dataKey: 'ticketsSolucionado' },
      { label: 'No Solucionado', def: 'ticketsNoSolucionado', dataKey: 'ticketsNoSolucionado' },
    ];

  }

  setDataReports(): void {
    this.subCategoryService.reports().subscribe(
      (data) => {
        this.subCategoryReportsList = data;
      },
      (err) => {}
    );
    this.userService.reports().subscribe(
      (data) => {
        this.usersTicketsReports = data;
      },
      (err) => {}
    );
    this.ticketService.reports().subscribe(
      (data) => {
        this.reasigTicketsReports = data;
      },
      (err) => {}
    );
  }

  searchByEods(){
    this.estableishmentService.reportsEod(this.eods.value).subscribe(
      (data) => {
        this.subCategoryByEod = data
      },
      (err) => {}
    )
  }

  filterDateEod(){
    const fechaSeleccionada = this.dateEod.value;
    const mes = fechaSeleccionada ? fechaSeleccionada.format('MM') : null;
    const anio = fechaSeleccionada ? fechaSeleccionada.format('YYYY') : null;
    this.estableishmentService.reportsEod(this.eods.value, mes, anio).subscribe(
      (data) => {
        this.subCategoryByEod = data;
      },
      (err) => {}
    )
  }

  onEstableishmentsChanged(): void{
    this.formReport.get('district')?.valueChanges
      .pipe(
        switchMap( district => this.districtService.findEstableishments(district)),
      )
      .subscribe((estableishments) => {
        this.estableishmetsByDistrict = estableishments;
      });
  };

  searchByEstableishment() {
    this.estableishmentService.reports(this.formReport.value.estableishment).subscribe(
      (data) => {
        this.subCategoryByEstableishment = data;
      },
      (err) => {}
    )
  }

  filterDateEsta(){
    const fechaSeleccionada = this.dateEsta.value;
    const mes = fechaSeleccionada ? fechaSeleccionada.format('MM') : null;
    const anio = fechaSeleccionada ? fechaSeleccionada.format('YYYY') : null;
    this.estableishmentService.reports(this.formReport.value.estableishment, mes, anio).subscribe(
      (data) => {
        this.subCategoryByEstableishment = data;
      },
      (err) => {}
    )
  }


  searchReasig() {
    const fechaSeleccionada = this.dateReasig.value;
    const mes = fechaSeleccionada ? fechaSeleccionada.format('MM') : null;
    const anio = fechaSeleccionada ? fechaSeleccionada.format('YYYY') : null;
    this.ticketService.reports(mes, anio).subscribe(
      (data) => {
        this.reasigTicketsReports = data;
      },
      (err) => {}
    )

  }

  searchUser() {
    const fechaSeleccionada = this.dateSupport.value;
    const mes = fechaSeleccionada ? fechaSeleccionada.format('MM') : null;
    const anio = fechaSeleccionada ? fechaSeleccionada.format('YYYY') : null;
    console.log(mes);

    this.userService.reports(mes, anio).subscribe(
      (data) => {
        this.usersTicketsReports = data;
      },
      (err) => {}
    )

  }

  searchCategory() {
    const fechaSeleccionada = this.dateCategory.value;
    const mes = fechaSeleccionada ? fechaSeleccionada.format('MM') : null;
    const anio = fechaSeleccionada ? fechaSeleccionada.format('YYYY') : null;
    this.subCategoryService.reports(mes, anio).subscribe(
      (data) => {
        this.subCategoryReportsList = data;
      },
      (err) => {}
    )
  }

  removefilterDate1(){
    this.estableishmentService.reportsEod(this.eods.value).subscribe(
      (data) => {
        this.subCategoryByEod = data;
      },
      (err) => {}
    );
  }

  removefilterDate2(){
    this.estableishmentService.reports(this.formReport.value.estableishment).subscribe(
      (data) => {
        this.subCategoryByEstableishment = data;
      },
      (err) => {}
    )
  }
  removefilterDate3(){
    this.subCategoryService.reports().subscribe(
      (data) => {
        this.subCategoryReportsList = data;
      },
      (err) => {}
    )
  }
  removefilterDate4(){
    this.userService.reports().subscribe(
      (data) => {
        this.usersTicketsReports = data;
      },
      (err) => {}
    )
  }
  removefilterDate5(){
    this.ticketService.reports().subscribe(
      (data) => {
        this.reasigTicketsReports = data;
      },
      (err) => {}
    )
  }

}
