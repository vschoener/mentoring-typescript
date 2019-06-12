# TypeScript Mentoring

## First step

Checkout `first_step` branch

### Basics

```bash
 npm init && npm install --save typescript
```

Once installed, you will give the access to use the `tsc` binary to compile your code.
Let's create a shortcut script in the `package.json`

```json
"scripts": {
    // Add this entry
    "build": "tsc",
  },
```

So let's create an `index.ts` file and display the famous `Hello World`.

Now, compile the code using `npm run build index.ts` and open the `index.js` file.

> So ...? o//

---

### EcmaScript Features

Ok another example, let's try to create an `async/await` function (part of the ES6 feature) and see the generated code

Once done, compile and open the generated file

> So ... What happened !?

---

### tsconfig to the rescue

Compiler is very sophisticated and we can customize it a lot. We can pass a ton of options to it but it will be a pain right?

TypeScript can load a config file, so let's create a `tsconfig.json` file and customize it.

Using the documentation, I want you to compile the file with the following settings:

- Target the supported EcmaScript according to our current supported Node version
- Build sources from `src` folder
- Put the compiled code in the `build` folder
- Support the last EcmaScript feature

Here is the doc we're gonna use https://www.typescriptlang.org/docs/handbook/compiler-options.html

Then compile the code and check your compiled file

> So ... What happened !?

### TypeScript Type advantages

#### Basics

No wee see the basics of the compilation, let's dive into the advantage of the language itself.

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

> ..

Now let's enforce the code with type from the last part and try to compile.

> So..

Yeah the code won't compile anymore until the code is right and respect the type.

We have different primary type (system) as:

- string
- number
- boolean
- null
- void

From JS World

- undefined
- object (but can be anything while it stay object)

And common from other language / OOP design

- interface
- class
- enum
- array
- type

[Link of the basic Type](https://www.typescriptlang.org/docs/handbook/basic-types.html)

#### Interface / Type

There is differences between `type` and `interface` I must go through now.

Both can have the same behavior with minor differences or error compile time if you abuse the Type Union when trying to implementing it from a class

- [Here there is details about them](https://www.educba.com/typescript-type-vs-interface/)
- [Here some example from wrong statement of the article above](https://medium.com/@martin_hotell/interface-vs-type-alias-in-typescript-2-7-2a8f1777af4c)

Just to summarize the usage.

`interface` are mostly used to define the shape of the Object (API response, payload and so on) and it also used as a OOP `Interface` to have contract in your code.

```ts
// interface declared as OOP Interface and contract
interface SomeInterface {
  format(): string;
  signIt(): boolean;
  revokeIt(): boolean;
}

// interface used as definition object
interface Contract {
  signed: boolean;
  revoked: boolean;
}
```

On the other side, `type` are mostly used to work with Union or tuple. It's also used a lot in React when you need to declare your Props and State.

Union works like this:

```ts
type MergedType = InterfaceA | InterfaceB;
```

And Tuple

```ts
type TupleDefinition = [string, string];
```

##### Interface as definition workshop

First, let's define an object with the following attributes and use it in the code:

- name -> string
- email -> string
- duration -> number

Create a function sendContract taking this defined contract

- Try to access to the attributes and see what is shown

> Correction and question !?

##### Type workshop

Now create 2 interface definition (`UserContract`, `ProContract`) and then merge them in one type (`ContractType`) and use them in the sendContract

> Correction and question !?

##### Interface as contract using class implementation

Now to finish this part, let's create a `ContractInterface` containing the definitions:

- format -> take `Contract` attribute and returns string;
- signIt -> take `Contract` attribute and returns boolean;
- revokeIt -> take `Contract` attribute and returns boolean;

Your child class should use the right `ContractType`
