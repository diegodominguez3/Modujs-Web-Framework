import { CollectionView } from '../CollectionView';
import { User, UserProps } from '../../models/TestModel/User';
import { UserEdit } from './UserEdit';

export class UserList extends CollectionView<User, UserProps> {
  renderItem(model: User, itemParent: Element): void {
    itemParent.className = 'col-sm-4';
    new UserEdit(itemParent, model).render();
  }
}
