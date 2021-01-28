import { CollectionView } from '../CollectionView';
import { User, UserProps } from '../../models/TestModel/User';
import { UserShow } from './UserShow';

export class UserList extends CollectionView<User, UserProps> {
  renderItem(model: User, itemParent: Element): void {
    new UserShow(itemParent, model).render();
  }
}
