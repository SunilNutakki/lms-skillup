import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from './api.constants';

export interface CourseModule {
  moduleId: string;
  courseId: string;
  moduleName: string;
  description: string;
  displayOrder: number;
  status: 'Published' | 'Draft';
}

@Injectable({
  providedIn: 'root'
})
export class ModuleService {
private readonly api =`http://localhost:8081/api/courses`;
private readonly moduleApi =`http://localhost:8081/api/modules`;


  constructor(
    private http: HttpClient
  ) {}


  getCourses() {
    return this.http.get(
      `${this.api}/getAllCourses`
    );
  }
// Get all modules
  getAllModules() {
    return this.http.get<any[]>(this.moduleApi);
  }

  // Get modules by course
  getModulesByCourse(courseId: any) {
    return this.http.get<any[]>(
      `${this.moduleApi}/course/${courseId}`
    );
  }

  // Get module by ID
  getModuleById(moduleId: string) {
    return this.http.get<any>(
      `${this.moduleApi}/${moduleId}`
    );
  }

  // Create module
  createModule(payload: any) {
    return this.http.post<any>(this.moduleApi, payload);
  }

  // Update module
  updateModule(moduleId: string, payload: any) {
    return this.http.put<any>(
      `${this.moduleApi}/${moduleId}`,
      payload
    );
  }

  // Delete module
  deleteModule(moduleId: string) {
    return this.http.delete<any>(
      `${this.moduleApi}/${moduleId}`
    );
  }
}