import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CategoryService } from '../../../services/categories.service';
import { SmallSubCategory } from '../../../interfaces/category';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TicketService } from '../../../../dashboard/services/tickets.service';
import { Ticket } from '../../../../dashboard/interfaces/tickets';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-change-ticket',
  templateUrl: './change-ticket.component.html',
  styleUrls: ['./change-ticket.component.css']
})
export class ChangeTicketComponent implements OnInit {

  listSubCategories: SmallSubCategory[] = [];
  departamento = new FormControl();
  ticket!: Ticket;

  constructor(
    private categoryService: CategoryService,
    private ticketsService: TicketService,
    private dialogReferencia: MatDialogRef<ChangeTicketComponent>,
    @Inject(MAT_DIALOG_DATA) public dataTicket: string,

  ){}

  ngOnInit(): void {
    this.ticketsService.detail(this.dataTicket).subscribe(
      (data) =>{
        this.ticket = data;
        this.categoryService.findSubcategories(this.ticket.category.id).subscribe(
          (data) => {
            this.listSubCategories = data;
          },
          (error) => {}
        );
      },
      (error) => {}
    );
  }

  cambiarDepartamentoTicket(){
    const modelo = {
      subcategory: this.departamento.value,
    }
    this.ticketsService.updateDepartTicket(this.dataTicket, modelo).subscribe({
      next: (data) => {
        console.log(data);

        Swal.fire({
          position: 'bottom-end',
          icon: 'success',
          title: 'Departamento Cambiado',
          html: `Departamento de Ayuda del Ticket cambiado correctamente.`,
          showConfirmButton: false,
          timer: 2500,
        });
        this.dialogReferencia.close('cambiar');
      },
      error: (e) => {
        Swal.fire({
          position: 'bottom-end',
          icon: 'error',
          title: 'Departamento NO Cambiado',
          html: `No se pudo cambiar el Departamento de Ayuda del ticket correctamente. ` + e,
          showConfirmButton: false,
          timer: 2500,
        });
      },
    });
  }
}
