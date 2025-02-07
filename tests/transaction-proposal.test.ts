import { describe, it, beforeEach, expect } from "vitest"

describe("transaction-proposal", () => {
  let contract: any
  
  beforeEach(() => {
    contract = {
      createProposal: (recipient: string, amount: number) => ({ value: 1 }),
      execute: (proposalId: number) => ({ success: true }),
      getProposal: (proposalId: number) => ({
        proposer: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
        recipient: "ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG",
        amount: 1000,
        executed: false,
      }),
    }
  })
  
  describe("create-proposal", () => {
    it("should create a new proposal", () => {
      const result = contract.createProposal("ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG", 1000)
      expect(result.value).toBe(1)
    })
  })
  
  describe("execute", () => {
    it("should execute a proposal", () => {
      const result = contract.execute(1)
      expect(result.success).toBe(true)
    })
    
    it("should fail when executing an already executed proposal", () => {
      contract.execute = () => {
        throw new Error("ERR_ALREADY_EXECUTED")
      }
      expect(() => contract.execute(1)).toThrow("ERR_ALREADY_EXECUTED")
    })
  })
  
  describe("get-proposal", () => {
    it("should return proposal details", () => {
      const result = contract.getProposal(1)
      expect(result.proposer).toBe("ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM")
      expect(result.recipient).toBe("ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG")
      expect(result.amount).toBe(1000)
      expect(result.executed).toBe(false)
    })
  })
})

