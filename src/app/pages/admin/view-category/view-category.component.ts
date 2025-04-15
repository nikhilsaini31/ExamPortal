import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-category',
  standalone: false,
  templateUrl: './view-category.component.html',
  styleUrls: ['./view-category.component.css']  // ✅ Fixed plural issue
})
export class ViewCategoryComponent implements OnInit {

  categories = [
    { cid: 23, title: 'Programmingg', description: 'This is a testing category' }, //  default value if value not present in database
    { cid: 24, title: 'GK', description: 'This is a testing category' },
    { cid: 25, title: 'Math', description: 'This is a testing category' }  
  ];

  constructor(private categoryservice: CategoryService) {}

  ngOnInit(): void {
    this.categoryservice.categories().subscribe(
      (data: any) => {
        this.categories = data;
        console.log('Fetched Categories:', this.categories);
      },
      (error) => {
        console.error('Error fetching categories:', error);  
        Swal.fire('Error !!', `Error in loading data: ${error.message}`, 'error');  
      }
    );
  }
}
