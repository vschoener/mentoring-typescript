# TypeScript Mentoring - Beginner

Welcome to this mentoring, this is the first episode called `Beginner` as more will come later.

Are you ready? So let's dive into.

## Requirements

### Docker

It's required to have docker and docker-compose installed on your machine.
Why...? Because it's better working on a clean environment.

`docker-compose` is configured to mount your folder inside the container. 
Means all file created/updated will be synchronized. So you can use
your own IDE.

### Makefile

A Makefile is present to manipulate the docker image, I advice you to have the command `make`
available, otherwise, you have to write the entire command to build and connect the container.

### IDE

I suggest you to use an IDE as Intellij or even VScode. 
TypeScript is nicely integrated and it makes your developer life easy.

If you won't, I recommend you to install your dedicated plugins.

## Building image and having access to it

```bash
 # This will build your docker image using docker-compose
 make build
 
 # This will provide you a shell from the container
 make shell
```

## TSC - TypeScript compilation

Once your image is ready, get a shell from the container and run the following command.

```bash
 npm init && npm install --save typescript
```

Installing `typescript` package will provide you the `tsc` binary allowing you to compile your `js` code.
And to improve our developer life, let's create a shortcut script in the `package.json`

```json
"scripts": {
    "tsc": "tsc",
  },
```

So let's create an `index.ts` file and display the famous `Hello World`.

Now, compile the code using `npm run build index.ts` and open the `index.js` file.

> So ...? o//

---

## EcmaScript Features and compilation

Now change your script to call an `async/await` function (part of the ES6 feature), compile and see the generated code

Once done, compile and open the generated file

> So ... What happened !?

---

## `tsconfig` to the rescue

Compiler is very sophisticated and we can customize it a lot. We can pass a ton of options to it but it will be a pain right?

TypeScript can load a config file, so let's create a `tsconfig.json` file using the following command and customize it.

```bash
npm run build -- --init
```

Using the documentation, I want you to compile the source files with the following settings:

- Target the supported EcmaScript according to our current supported Node version
- Build sources from `src` folder
- Put the compiled code in the `build` folder
- Support the last EcmaScript feature

Here is the doc we're gonna use https://www.typescriptlang.org/docs/handbook/compiler-options.html

Then compile the code and check your compiled file

> So ... What happened !?

## Types and advantages

### Basics

No we have seen the basics of the compilation, let's dive into the advantage of the language itself.

### Existing type

- Primary

  - `string`
  - `number`
  - `boolean`
  - `null`
  - `void`

- From JS World

  - `undefined`
  - `object` (but can have any definition while it stays)

- And common from other language / OOP design
  - `interface`
  - `class`
  - `enum`
  - `array`
  
- TypeScript
  - `keyof`
  - `type`

[Link of the basic Type](https://www.typescriptlang.org/docs/handbook/basic-types.html)

So, here is a few example to use them in the code

```ts
// Declare variable
const a: number = 42;
let b: string;

// function
function something(a: number, b: string): object {
  return {
    a,
    b
  };
}

// Array

// Bad - Because items will be `any`
const items = [];

items.push(1);
items.push("2");
items.push({});

//--

// Good - To enforce array
const items: number[] = [];

items.push(1);
items.push(2);
// Compilation failure
items.push("3");
```

Enforcing array is really nice as you can know in advance which items it hold. It fits really well with array of `interface` definition for example as your IDE will help you with.

#### Training time

Let's first try to declare new variables type in different way and see how your IDE perform (if you have one)

> Declare for example those variables and function to start

```js
function addNumber(a, b) {
  return a + b;
}

const a = 42;
const b = 8;
```

If you call the function with the following variable, everything will work. Right?

Ok now let's imagine in our production code we have this kind of method doing logic and we call it with the wrong args, let's say:

```js
const c = { ok: 1 };
const d = "ok";
```

And call the same function above, will it work? And will the result be good?

> So..

Now let's enforce the code with type from the last part, say we want to returns a string and try to compile.

> So..

Yeah the code won't compile anymore until the code is right and respect the type.

> Reminder, when you create variables, it uses `explicit` type, most of the time you don't
> need to explicitly tell which type to use.
> For `function`, it's better to explicitly tell which one we want as it can changes in time and let you avoid further error.

```ts
// Good
const a = 42;

// Bad
const a: number = 42;

// Good here if you need to create a default object for example
const obj: MyDefinition = { ... };

function getUser('123'): UserSchema {
  return { ... }
}

// Bad, to much enforcing
const user: UserSchema = getUser('123');

// Good
const user = getUser('123');

```

### Interface / Type

There is differences between `type` and `interface` I must go through now.

Both can have the same behavior with minor differences or error compile time if you abuse the Type Union when trying to implementing it or extending from a class

- [Here there is details about them](https://www.educba.com/typescript-type-vs-interface/)
- [Here some example from wrong statement of the article above](https://medium.com/@martin_hotell/interface-vs-type-alias-in-typescript-2-7-2a8f1777af4c)

Just to summarize the usage.

`interface` are mostly used to define the shape of the Object (API response, payload and so on) and it also used as a OOP `Interface` to have contract in your code.

```ts
// Interface used as definition object
interface ServiceDefinition {
  logger: Logger;
  metrics: Metrics;
  kenny: KennyClient;
  // ...
}

// Interface declared as OOP Interface and contract
// Best practice is to prefix it with `Interface`
interface ServiceContainerInterface {
  build(): ServiceDefinition;
  get(name: string): object;
  isBuild(): boolean;
  getContainer(): ServiceDefinition;
}
```

And if you need to define optional field or not known in advance

```ts
interface Contract {
  // Optional
  optionalField?: string;

  // Unknown
  [key: string]: any;
}
```

On the other side, `type` allows you to create custom type making the code more explicit to read.

```ts
// Simple usage
type Amount: number;

function displayAmount(amount: Amount) {
  // ...
}

/// --------------

// Union usage
type Style = 'bold' | 'italic' | 23;

let style: Style;

// later in the code
style = 'bold';

```

We also use them a lot to work with `Union` or `Tuple`. It's also used a lot in React when you need to declare your Props and State.

```ts
// Union
type MergedType = InterfaceA | InterfaceB;

// Example with Reducer and Action

interface State {
   firstname: string;
   lastname: string;
   age: number;
}

interface ActionA {
  type: 'a';
  payload: {
     firstname: string;
     lastname: string;
  }
}

interface ActionB {
  type: 'b';
  payload: {
     age: number;
  }
}

type Action = ActionA | ActionB;

function reducer(state: State, action: Action) {
  switch(action.type) {
      case ActionA.type: 
        const { firtname, lastname } = action.payload;
        return { ...state, name: `${firstname} ${lastname}` };
       case ActionB.type: 
        const { age } = action.payload;
        return { ...state, age };
      default:
        return state;
  }
}

```

```ts
// Tuple
type TupleDefinition = [string, string];
```

`Tuple` can be nice to use in some situation you need a specific array

```ts
// Declare the type
type Tuple = [number, boolean, string?];

// And create the associated variable
let tuple = [42, true];

tuple = [42, true, "hello"];
```

#### Training time - Interface as definition workshop

So let's reuse our `ServiceContainerInterface` and create a class implementing this one.
It will return the `ServiceDefinition` as the contract says.

- When done, try to get and use the service you create

Tips: We don't have the real Logger/Metrics and so on, just create Fake class

Tips2: `keyof` is used to get an union of possible choice from an object key -> value. (more detailed info later)

```ts
type ServiceName = keyof ServiceDefinition;
```

Tips3: `cast` to the rescue, we will see it together :)

> Correction and question !?

### Generics

Sometimes, you need to use type internally inside a class or function but you can't have this knowledge.

For example, here is a good example working with database interaction with a library that can't know the shape of your object

```ts
function update<T>(entity: T): T {
  // Updating entity in DB

  return entity;
}

interface Entity {
  firstname: string;
  lastname: string;
}

const entity: Entity = {
  firstname: "John",
  lastname: "Doe"
};

const updatedEntity = update<Entity>(entity);
```

Or another example still with database, if you need to request a list of `Entity`, you case use a generic and enforce your code usage

#### Extends, keyof ...

Usually, `extends` works with `class` and `inheritance`

```ts
class Animal {}

class Dog extends Animal {}
```

Extends can be a bit advanced but you might face situation where you need to work with unknown shape object but still enforce the behaviors.

```ts
// Entity is unknown but we can enforce the name of the attributes
// extending with the keyof of its attributes
function filterObject<T, U extends keyof T>(entity: T, attributes: U[]) {
  return attributes.map(attribute => entity[attribute]);
}

const person = {
  firstname: "John",
  lastname: "Doe"
};

const filteredObject = filterObject(person, ["firstname"]);

// Compiler error
const filteredObjectWrong = filterObject(person, ["age"]);

// Another real example with DI and Service Container

interface CoreDefinition {
  logger: object;
  metrics: object;
}

interface ContainerDefinition extends CoreDefinition {
  serviceA: object;
}

class Container<T extends CoreDefinition> {
  private container: T;

  /**
   * Set or override existing service in the container
   * @param name
   * @param service
   */
  public set<K extends keyof T>(name: K, service: T[K]): this {
    this.container[name] = service;

    return this;
  }
}

const container = new Container<ContainerDefinition>();
container.set("logger", { info: () => {} });
container.set("serviceA", {});

// Compilation error as the key 'serviceX' can't be found in the ContainerDefinition
container.set("serviceX", {});
```

You can find more information about its usage [Generics official doc](https://www.typescriptlang.org/docs/handbook/generics.html)

And [Advanced Usage type](https://www.typescriptlang.org/docs/handbook/advanced-types.html)

#### Training time

Create a function that merges 2 objects using generics.

> So...? :)


###### To REVIEW later


#### Training time - Type workshop

Now create 2 interface definition (`UserContract`, `ProContract`) and then merge them in one type (`ContractType`) and use them in the sendContract

> Correction and question !?

#### Training time - Interface as contract using class implementation

Now to finish this part, let's create a `ContractInterface` containing the definitions:

- format -> take `Contract` attribute and returns string;
- signIt -> take `Contract` attribute and returns boolean;
- revokeIt -> take `Contract` attribute and returns boolean;

Your child class should use the right `ContractType`

