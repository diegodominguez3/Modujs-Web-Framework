import { User, UserProps } from '../../models/TestModel/User';
import { View } from '../View';

export class UserForm extends View<User, UserProps> {
  eventsMap(): { [key: string]: () => void } {
    return {
      'click:.set-age': this.onSetAgeClick,
      'click:.set-name': this.onSetNameClick,
      'click:.save-model': this.onSaveClick,
    };
  }

  onSaveClick(): void {
    this.model.save();
  }

  onSetAgeClick = (): void => {
    this.model.setRandomAge();
  };

  onSetNameClick = (): void => {
    const input = this.parent.querySelector('input');
    if (input) {
      const name = input.value;
      this.model.set({ name });
      this.model.save();
    }
  };

  template(): string {
    return `
      <form>
        <div class="form-group mx-sm-12 mb-2">
          <input placeholder="${this.model.get('name')}" class="form-control" />
          <button class="set-name btn btn-primary" style="margin-top:10px">Change Name</button>
        </div>
      </form>
     <button class="set-age btn btn-secondary"> Set Random Age </button>
    `;
  }
}
