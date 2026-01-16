import { orders, products } from "./csv";
import { calculateBonus, calculateVolumeDiscount } from "./pricing/calculate";

// Fonction principale de génération du rapport refactoré
export function generateReport(): string {
   const reportLines = [];

   // Exemple de traitement minimal : un seul client pour demonstration
   const subtotal = 250;
   const volumeDiscount = calculateVolumeDiscount(subtotal);
   const bonus = calculateBonus(orders, products);

   reportLines.push(`Subtotal: ${subtotal}`);
   reportLines.push(`Discount: ${volumeDiscount + bonus}`);
   reportLines.push(`Total: ${subtotal - volumeDiscount - bonus}`);

   return reportLines.join("\n");
}
