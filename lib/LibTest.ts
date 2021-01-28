import { UserList } from './views/TestViews/UserList';
import { Collection } from './models/Collection';
import { User, UserProps } from './models/TestModel/User';

export class LibTest {
  testUserList() {
    const users = new Collection(
      'http://localhost:3000/users',
      (json: UserProps) => {
        return User.buildUser(json);
      }
    );

    users.on('change', () => {
      const root = document.getElementById('root');
      if (root) {
        const userList = new UserList(root, users).render();
      }
    });

    users.fetch();
  }
}
