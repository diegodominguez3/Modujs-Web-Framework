<img align="left" width="80" height="80" src="https://github.com/diegodominguez3/Modujs-Web-Framework/blob/master/src/modu-icon.svg" alt="icon"/>

# Modu.js Web Framework

Give Structure to your javascript/typescript web applications! <br>
Basic Backbone.js/Marionette.js like web framework built with typescript.

### Get Started

1. Get parcel to start your local server.<br>
`npm install -g parcel-bundler`
2. Clone repo and run `parcel index.html` in the root directory.
3. Open http://localhost:1234
4. Start coding your application in src folder!

### Dependencies
- Parcel Bundler | https://www.npmjs.com/package/parcel-bundler
- Axios | https://www.npmjs.com/package/axios

### Model
Add Attributes, Eventing, Collections and API syncing! <br>
#### Build your model: <br>
```typescript
import { Model } from '../lib/models/Model';
import { Attributes } from '../lib/models/Attributes';
import { ApiSync } from '../lib/models/ApiSync';
import { Eventing } from '../lib/models/Eventing';
import { Collection } from '../lib/models/Collection';

/*User properties */
export interface UserProps {
  id?: number;
  name?: string;
  age?: number;
}

export class User extends Model<UserProps> {
  static buildUser(attrs: UserProps): User {
    return new User(
      new Attributes<UserProps>(attrs),
      new Eventing(),
      new ApiSync<UserProps>(rootUrl)
    );
  }
}
```

#### Build a collection of your model: <br>
```typescript
static buildUserCollection(): Collection<User, UserProps> {
    return new Collection<User, UserProps>(rootUrl, (json: UserProps) =>
      User.buildUser(json)
    );
 }
```
### Attributes
- **get:** Access defined attributes from your model. <br>
```typescript
const user = new User();
const name = user.get('name'); 
const age = user.get('age');
```
- **set:** Set a new value to your model data. <br>
```typescript
const user = new User();
const name = 'Josh';
user.set({name}); 
```

### Eventing
Bind and trigger events!<br>
- **on:** Bind a callback function to an object. The callback will be invoked whenever the event is triggered.
```typescript 
const user = new User();  
user.on('change', () => {
  console.log('Changed!');
});
```
- **trigger:** Trigger events of objects when theres is a on('event') in stack.
```typescript 
user.trigger('change');
```
- **Events Map:** Map what events will trigger your functions.
```typescript
eventsMap(): { [key: string]: () => void } {
    return {
      'click:.set-age': this.onSetAgeClick,
      'click:.set-name': this.onSetNameClick,
      'click:.save-model': this.onSaveClick,
    };
 }
```
### Views 
- **Template:** Create template for your view and interact with data.
```typescript
import { User, UserProps } from '../../models/TestModel/User';
import { View } from '../View';

export class UserForm extends View<User, UserProps> {
  template(): string {
    return `
      <div>
        <input placeholder="${this.model.get('name')}" />
        <button class="set-name">Change Name</button>
        <button class="set-age"> Set Random Age </button>
        <button class="save-model"> Save User </button>
      </div>
    `;
  }
}
```
- **on Render:** Trigger other view renderings on another view. 
```typescript
onRender(): void {
    new UserShow(this.regions.userShow, this.model).render();
    new UserForm(this.regions.userForm, this.model).render();
 }
```
- **Regions Map:** Nest views inside other views.
```typescript
export class UserEdit extends View<User, UserProps> {
  regionsMap(): { [key: string]: string } {
    return {
      userShow: '.user-show',
      userForm: '.user-form',
    };
  }

  onRender(): void {
    new UserShow(this.regions.userShow, this.model).render();
    new UserForm(this.regions.userForm, this.model).render();
  }

  template(): string {
    return `
      <div>
        <div class="user-show"></div>
        <div class="user-form"></div>
      </div>
    `;
  }
}
```

### API Sync
When creating models with API syncing you can define a API url to acess your data.
- **fetch:** Fetch data from an API.
```typescript
const users = new Collection(
      'http://localhost:3000/users',
      (json: UserProps) => {
        return User.buildUser(json);
      }
    );

users.fetch();
```
- **save** Save data to an API.
```typescript
onSaveClick(): void {
  this.user.save();
}
```
