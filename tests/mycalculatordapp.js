const assert = require("assert");
const anchor = require("@project-serum/anchor");

const { SystemProgram } = anchor.web3;

describe("mycalculatordapp", () => {
  // Abstraction to connection to Solana
  const provider = anchor.Provider.local(); // create a provider for local environment
  anchor.setProvider(provider);

  const calculator = anchor.web3.Keypair.generate();
  const program = anchor.workspace.Mycalculatordapp;
  // This allows us to call RPC methods - abstraction of idl, programId and provider

  it("creates a calculator", async () => {
    const greeting =
      "Hi, initiating AI SuperBot capable enough to take over the humans.";
    await program.rpc.create(greeting, {
      accounts: {
        calculator: calculator.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [calculator],
    });

    const account = await program.account.calculator.fetch(
      calculator.publicKey
    );

    assert.ok(account.greeting === greeting);
  });

  it("adds two numbers", async () => {
    await program.rpc.addition(new anchor.BN(2), new anchor.BN(3), {
      accounts: {
        calculator: calculator.publicKey,
      },
    });

    const account = await program.account.calculator.fetch(
      calculator.publicKey
    );

    assert.ok(
      account.greeting ===
        "Hi, initiating AI SuperBot capable enough to take over the humans."
    );
    assert.ok(account.result.eq(new anchor.BN(5)));
  });

  it("subtracts two numbers", async () => {
    await program.rpc.subtract(new anchor.BN(3), new anchor.BN(1), {
      accounts: {
        calculator: calculator.publicKey,
      },
    });

    const account = await program.account.calculator.fetch(
      calculator.publicKey
    );

    assert.ok(
      account.greeting ===
        "Hi, initiating AI SuperBot capable enough to take over the humans."
    );
    assert.ok(account.result.eq(new anchor.BN(2)));
  });

  it("multiplies two numbers", async () => {
    await program.rpc.multiply(new anchor.BN(2), new anchor.BN(3), {
      accounts: {
        calculator: calculator.publicKey,
      },
    });

    const account = await program.account.calculator.fetch(
      calculator.publicKey
    );

    assert.ok(
      account.greeting ===
        "Hi, initiating AI SuperBot capable enough to take over the humans."
    );
    assert.ok(account.result.eq(new anchor.BN(6)));
  });

  it("divides two numbers", async () => {
    await program.rpc.divide(new anchor.BN(3), new anchor.BN(2), {
      accounts: {
        calculator: calculator.publicKey,
      },
    });

    const account = await program.account.calculator.fetch(
      calculator.publicKey
    );

    assert.ok(
      account.greeting ===
        "Hi, initiating AI SuperBot capable enough to take over the humans."
    );
    assert.ok(account.result.eq(new anchor.BN(1)));
    assert.ok(account.remainder.eq(new anchor.BN(1)));
  });
});
