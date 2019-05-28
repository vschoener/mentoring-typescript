# TypeScript Mentoring

## First step

Checkout `first_step` branch

### Basics

```bash
 npm install -g typescript
 tsc -v
```

`tsc` is the binary used by TypeScript to compile your code

So let's create an `index.ts` file and display the famous `Hello World`.

Now, compile the code using `tsc index.ts` and open the `index.js` file.

So ...?

> Nothing change right? ... o//

----

### EcmaScript Features

Ok another example, let's try to create an `async/await` function and see the generated code

Once done, compile and open the generated file

So ... What happened !?

> ES3 is used by default, yeah it generates a ton of code... o//

----

### tsconfig to the rescue

Compiler is very sophisticated and we can customize it a lot. We can pass a top of options to it but it will be a pain right?

TypeScript can load a config file, so let's create a `tsconfig.json` file and customize it.

Using the documentation, I want you to compile the file with the following settings:
 - Target the supported EcmaScript according to our current supported Node version
 - Build from `src`
 - Put the generated code to `build`
 - Support the last EcmaScript feature


Here is the doc we're gonna use https://www.typescriptlang.org/docs/handbook/compiler-options.html

Then compile the code and check your compiled file

> The huge amount of code generated before disappeared, Thanks you compiler
