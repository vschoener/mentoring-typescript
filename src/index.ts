async function helloWorld() {
  console.log("Hello world");
}

helloWorld();

// Create this function
function addNumber(a, b) {
  return a + b;
}

// Declare numbers and try to use it later
const a = 42;
const b = 8;

console.log(addNumber(a, b));
// -> 50

// Lets try with mistake using object
console.log(addNumber({ ok: 1 }, "ok"));
// -> '[object Object]ok'

// What did you noticed?
// -> Nothing complain

function addNumberType(a: number, b: number) {
  return a + b;
}

const c = { ok: 1 };
const d = "ok";

// Argument of type '{ ok: number; }' is not assignable to parameter of type 'number'.
addNumberType(c, d);

/// Interface / Type

interface UserContractDefinition {
  name: string;
  email: string;
  duration: number;
  type: "user";
  signed: boolean;
  revoked: boolean;
}

interface ProContractDefinition {
  name: string;
  email: string;
  duration: number;
  type: "pro";
  signed: boolean;
  revoked: boolean;
}

type Contract = UserContractDefinition | ProContractDefinition;

function sendContract(contract: Contract) {
  console.log(contract);

  return {
    name: contract.name,
    sent: true
  };
}

const userContractDefinition: UserContractDefinition = {
  name: "Name",
  email: "email@kpt.com",
  duration: 6,
  type: "user",
  signed: false,
  revoked: false
};

const result = sendContract(userContractDefinition);

console.log(result.name);

const proContractDefinition: ProContractDefinition = {
  name: "Name",
  email: "pro@kpt.com",
  duration: 6,
  type: "pro",
  signed: false,
  revoked: false
};

sendContract(proContractDefinition);

interface ContractInterface {
  format(contract: Contract): string;
  signIt(contract: Contract): Contract;
  revokeIt(contract: Contract): Contract;
}

class UserContract implements ContractInterface {
  format(contract: UserContractDefinition): string {
    return `
      Personal Contract: ${contract.name} - ${contract.email} - ${
      contract.duration
    }
    `;
  }

  signIt(contract: UserContractDefinition): Contract {
    return { ...contract, signed: true };
  }

  revokeIt(contract: UserContractDefinition): Contract {
    return { ...contract, revoked: true };
  }
}

class ProContract implements ContractInterface {
  format(contract: ProContractDefinition): string {
    return `
      Profesionnal Contract: ${contract.name} - ${contract.email} - ${
      contract.duration
    }
    `;
  }

  signIt(contract: ProContractDefinition): Contract {
    return { ...contract, signed: true };
  }

  revokeIt(contract: ProContractDefinition): Contract {
    return { ...contract, revoked: true };
  }
}

const proContract = new ProContract();
proContract.format(proContractDefinition);

const userContract = new UserContract();
userContract.format(userContractDefinition);
