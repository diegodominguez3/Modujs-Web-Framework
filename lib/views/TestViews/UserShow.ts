import { View } from '../View';
import { User, UserProps } from '../../models/TestModel/User';

export class UserShow extends View<User, UserProps> {
  template(): string {
    return `
    <h5 class="card-title">User Detail</h5>
    <div class="card-text"><b>User Name:</b> ${this.model.get('name')}</div>
    <div class="card-text"><b>User Age:</b> ${this.model.get('age')}</div>
    `;
  }
}
