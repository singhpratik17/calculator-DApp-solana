use anchor_lang::prelude::*;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod mycalculatordapp {
    use super::*;

    // Public Function FunctionName (ctx: Solana accounts array and program id)
    // RPC request handlers -> Can be called from a client application
    pub fn create(ctx:Context<Create>, init_message: String) -> ProgramResult {
        let calculator = &mut ctx.accounts.calculator;
        calculator.greeting = init_message;
        Ok(()) // Error handling
    }

    pub fn addition(ctx:Context<Addition>, num1: i64, num2: i64) -> ProgramResult {

    }

    pub fn multiply(ctx:Context<Multiplication>, num1: i64, num2: i64) -> ProgramResult {

    }

    pub fn subtract(ctx: Context<Subtraction>, num1: i64, num2: i64) -> ProgramResult {

    }

    pub fn divide(ctx: Context<Division>, num1: i64, num2: i64) -> ProgramResult {

    }
}
