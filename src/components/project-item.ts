import Component from '../components/base-component'
import { Draggable } from '../models/drag-drop';
import { Project } from '../models/project'
import { autobind as Autobind } from '../decorators/autobind';

// Project Item Class
export class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable {
  private project: Project;

  get persons() {
    if (this.project.people === 1) {
      return '1 Person'
    } else {
      return `${this.project.people} Persons`
    }
  }

  constructor(hostId: string, project: Project) {
    super('single-project', hostId, false, project.id);
    
    this.project = project;

    this.configure();
    this.renderContent();
  }

  @Autobind
  dragStartHandler(evt: DragEvent): void {
    evt.dataTransfer!.setData('text/plain', this.project.id);
    evt.dataTransfer!.effectAllowed = 'move';
  }

  @Autobind
  dragEndHandler(_: DragEvent): void {
    console.log('DragEnd');
  }

  configure() {
    this.element.addEventListener('dragstart', this.dragStartHandler);
    this.element.addEventListener('dragend', this.dragEndHandler);
  }

  renderContent() {
    this.element.querySelector('h2')!.textContent = this.project.title;
    this.element.querySelector('h3')!.textContent = this.persons + ' assigned';
    this.element.querySelector('p')!.textContent = this.project.description;
  }
}