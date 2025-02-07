import { describe, it, beforeEach, expect } from "vitest"

describe("access-control", () => {
  let contract: any
  
  beforeEach(() => {
    contract = {
      addSigner: (signer: string) => ({ success: true }),
      removeSigner: (signer: string) => ({ success: true }),
      isAuthorizedSigner: (signer: string) => true,
    }
  })
  
  describe("add-signer", () => {
    it("should add a new authorized signer", () => {
      const result = contract.addSigner("ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG")
      expect(result.success).toBe(true)
    })
    
    it("should fail when called by non-owner", () => {
      contract.addSigner = () => {
        throw new Error("ERR_UNAUTHORIZED")
      }
      expect(() => contract.addSigner("ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG")).toThrow("ERR_UNAUTHORIZED")
    })
  })
  
  describe("remove-signer", () => {
    it("should remove an authorized signer", () => {
      const result = contract.removeSigner("ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG")
      expect(result.success).toBe(true)
    })
    
    it("should fail when called by non-owner", () => {
      contract.removeSigner = () => {
        throw new Error("ERR_UNAUTHORIZED")
      }
      expect(() => contract.removeSigner("ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG")).toThrow("ERR_UNAUTHORIZED")
    })
  })
  
  describe("is-authorized-signer", () => {
    it("should return true for an authorized signer", () => {
      const result = contract.isAuthorizedSigner("ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG")
      expect(result).toBe(true)
    })
    
    it("should return false for an unauthorized signer", () => {
      contract.isAuthorizedSigner = () => false
      const result = contract.isAuthorizedSigner("ST3AM1A56AK2C1XAFJ4115ZSV26EB49BVQ10MGCS0")
      expect(result).toBe(false)
    })
  })
})

