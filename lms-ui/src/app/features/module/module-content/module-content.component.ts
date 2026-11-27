import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TableModule } from 'primeng/table';

type ContentType = 'Video' | 'PDF / Notes' | 'Practice' | 'Interview';
type ContentStatus = 'Published' | 'Draft';

interface ModuleContent {
  id: number;
  title: string;
  type: ContentType;
  description: string;
  link: string;
  order: number;
  status: ContentStatus;
}

@Component({
  selector: 'app-module-content',
  standalone: true,
  imports: [CommonModule, FormsModule, TableModule],
  templateUrl: './module-content.component.html',
  styleUrl: './module-content.component.scss'
})
export class ModuleContentComponent {
  readonly moduleId: string;
  readonly courseName = 'Java Full Stack';
  readonly courseDescription = 'Learn Core Java, Spring Boot, Microservices, and Angular with hands-on examples.';
  readonly moduleName = 'OOP Concepts';

  constructor(private route: ActivatedRoute, private router: Router) {
    this.moduleId = this.route.snapshot.paramMap.get('moduleId') ?? 'MOD003';
  }

  contents: ModuleContent[] = [
    { id: 1, title: 'OOP Introduction', type: 'Video', description: 'Introduction to OOP concepts', link: 'oop-introduction.mp4', order: 1, status: 'Published' },
    { id: 2, title: 'OOP Notes', type: 'PDF / Notes', description: 'OOP Concepts Notes PDF', link: 'oop-notes.pdf', order: 2, status: 'Published' },
    { id: 3, title: 'OOP Practice Exercises', type: 'Practice', description: 'Coding exercises for OOP', link: 'practice-exercises', order: 3, status: 'Published' },
    { id: 4, title: 'OOP Interview Questions', type: 'Interview', description: 'Common interview questions', link: 'interview-questions', order: 4, status: 'Draft' },
    { id: 5, title: 'Polymorphism Video', type: 'Video', description: 'Polymorphism explanation', link: 'polymorphism.mp4', order: 5, status: 'Published' }
  ];

  readonly types: ContentType[] = ['Video', 'PDF / Notes', 'Practice', 'Interview'];
  readonly tabs = ['All Content', 'Videos', 'Notes / PDFs', 'Practice', 'Interview Questions'];
  activeTab = 'All Content';
  searchText = '';
  selectedStatus = '';
  formOpen = false;
  editMode = false;
  selectedFile = '';
  form = this.emptyForm();

  get filteredContents(): ModuleContent[] {
    const term = this.searchText.trim().toLowerCase();
    return this.contents.filter(item => {
      const matchesSearch = !term || item.title.toLowerCase().includes(term);
      const matchesStatus = !this.selectedStatus || item.status === this.selectedStatus;
      const matchesTab = this.activeTab === 'All Content' ||
        (this.activeTab === 'Videos' && item.type === 'Video') ||
        (this.activeTab === 'Notes / PDFs' && item.type === 'PDF / Notes') ||
        (this.activeTab === 'Practice' && item.type === 'Practice') ||
        (this.activeTab === 'Interview Questions' && item.type === 'Interview');
      return matchesSearch && matchesStatus && matchesTab;
    });
  }

  countFor(tab: string): number {
    if (tab === 'All Content') return this.contents.length;
    if (tab === 'Videos') return this.contents.filter(item => item.type === 'Video').length;
    if (tab === 'Notes / PDFs') return this.contents.filter(item => item.type === 'PDF / Notes').length;
    if (tab === 'Practice') return this.contents.filter(item => item.type === 'Practice').length;
    return this.contents.filter(item => item.type === 'Interview').length;
  }

  setTab(tab: string): void { this.activeTab = tab; }

  openAdd(): void {
    this.editMode = false;
    this.form = this.emptyForm();
    this.form.order = this.contents.length + 1;
    this.formOpen = true;
  }

  editContent(item: ModuleContent): void {
    this.editMode = true;
    this.form = { ...item };
    this.selectedFile = item.link;
    this.formOpen = true;
  }

  saveContent(): void {
    if (!this.form.title.trim() || !this.form.description.trim() || !this.form.type || !this.form.status) return;
    if (this.editMode) {
      this.contents = this.contents.map(item => item.id === this.form.id ? { ...this.form, title: this.form.title.trim(), description: this.form.description.trim() } : item);
    } else {
      this.contents = [...this.contents, { ...this.form, id: Math.max(0, ...this.contents.map(item => item.id)) + 1, title: this.form.title.trim(), description: this.form.description.trim(), link: this.selectedFile || 'No file attached' }];
    }
    this.closeForm();
  }

  deleteContent(item: ModuleContent): void {
    if (window.confirm(`Delete "${item.title}"?`)) this.contents = this.contents.filter(content => content.id !== item.id);
  }

  viewContent(item: ModuleContent): void { window.alert(`${item.title}\n${item.description}\n${item.link}`); }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) this.selectedFile = file.name;
  }

  closeForm(): void { this.formOpen = false; this.form = this.emptyForm(); this.selectedFile = ''; }
  goBack(): void { this.router.navigate(['/tutor/dashboard/courses/modules'], { queryParams: { courseId: 'CRS001' } }); }

  private emptyForm(): ModuleContent {
    return { id: 0, title: '', type: 'Video', description: '', link: '', order: 1, status: 'Draft' };
  }
}
