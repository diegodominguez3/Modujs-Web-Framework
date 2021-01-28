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
      const testId = document.getElementById('test-row');
      if (testId) {
        const userList = new UserList(testId, users).render();
      }
    });

    users.fetch();
  }
}
