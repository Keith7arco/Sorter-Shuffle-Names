import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { PersonService } from '../../services/person.service';

@Component({
  selector: 'app-shuffle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shuffle.component.html',
  styleUrls: ['./shuffle.component.scss']
})
export class ShuffleComponent implements OnInit {
  personService = inject(PersonService);
  headers = ['Acomodadores', 'Plataforma', 'Audio y Video'];
  column1: string[] = [];
  column2: string[] = [];
  column3: string[] = [];
  shuffledColumn1: string[] = [];
  shuffledColumn2: string[] = [];
  itemsPerPage = 8;
  isDataLoaded = {
    column1: false,
    column2: false,
    column3: false,
  };
  nameCounts: { [key: string]: number } = {};

  ngOnInit(): void {
    this.getPersonShuffle();
  }

  getPersonShuffle() {
    this.personService.getPersonShuffle('1').subscribe((data1: string[]) => {
      this.column1 = data1;
      this.isDataLoaded.column1 = true;
      this.checkCompletion();
    });

    this.personService.getPersonShuffle('2').subscribe((data2: string[]) => {
      this.column2 = data2;
      this.isDataLoaded.column2 = true;
      this.checkCompletion();
    });

    this.personService.getPersonShuffle('3').subscribe((data3: string[]) => {
      this.column3 = data3;
      this.isDataLoaded.column3 = true;
      this.checkCompletion();
    });
  }

  checkCompletion() {
    if (this.isDataLoaded.column1 && this.isDataLoaded.column2 && this.isDataLoaded.column3) {
      this.adjustColumns();
      this.countNameOccurrences();
    }
  }

  objectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  countNameOccurrences() {
    const allNames = [...this.column1, ...this.column2, ...this.column3];
    this.nameCounts = allNames.reduce((acc, name) => {
      acc[name] = (acc[name] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });
  }

  adjustColumns() {
    // Combinar datos de las columnas 1, 2 y los nombres restantes de la columna 3 para la columna 1
    const remainingColumn3 = [...this.column3];
    const combinedData1 = [...this.column1, ...this.column2, ...remainingColumn3];
    this.shuffledColumn1 = this.shuffleArray(combinedData1);
    this.column1 = this.shuffledColumn1.slice(0, this.itemsPerPage * 3);

    // Combinar datos de las columnas 2 y los nombres restantes de la columna 3 para la columna 2
    const combinedData2 = [...this.column2, ...this.shuffledColumn1.slice(this.itemsPerPage * 3)];
    this.shuffledColumn2 = this.shuffleArray(combinedData2);
    this.column2 = this.shuffledColumn2.slice(0, this.itemsPerPage * 2);

    // Mantener únicamente los nombres originales de la columna 3
    this.column3 = this.column3.slice(0, this.itemsPerPage * 2);
  }

  shuffleArray(array: string[]): string[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  getTableData() {
    const rows = [];
    for (let i = 0; i < this.itemsPerPage; i++) {
      rows.push({
        col1: this.column1.slice(i * 3, i * 3 + 3),
        col2: this.column2.slice(i * 2, i * 2 + 2),
        col3: this.column3.slice(i * 2, i * 2 + 2),
      });
    }
    return rows;
  }

  reloadTable() {
    this.isDataLoaded = { column1: false, column2: false, column3: false };
    this.getPersonShuffle();
  }
}
