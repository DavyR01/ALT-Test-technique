import { describe, expect, it } from '@jest/globals';
import { calculateVolumeDiscount } from '../src/pricing/calculate';

describe("calculateVolumeDiscount", () => {
   it("should return 0 if subtotal is 200 or less", () => {
      expect(calculateVolumeDiscount(150)).toBe(0);
      expect(calculateVolumeDiscount(200)).toBe(0);
   });

   it("should return 200 if subtotal is greater than 200", () => {
      expect(calculateVolumeDiscount(201)).toBe(200);
      expect(calculateVolumeDiscount(300)).toBe(200);
   });
});
