import { Injectable } from '@angular/core';
import { Category } from '../../types/category.type';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.prod';

@Injectable()
export class CategoryService {
  // private baseUrl = 'http://localhost:8085/estore';

  private baseUrl = environment.url + '/estore';

  constructor(private httpClient: HttpClient) {}

  getAllCategories(): Observable<Category[]> {
    return this.httpClient.get<any[]>(`${this.baseUrl}/getCategories`).pipe(
      map((data) =>
        data.map((item) => ({
          id: item.id,
          category: item.categoryName,
          parent_category_id: item.parentCategoryId,
        }))
      )
    );
  }
}
