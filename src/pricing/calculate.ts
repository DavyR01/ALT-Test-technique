import type { Order, Product } from "../models";

// Applique une remise fixe si le sous-total dépasse 200 €.
export function calculateVolumeDiscount(subtotal: number): number {
   return subtotal > 200 ? 200 : 0;
}

// Calcul d'un bonus de 5% sur les commandes passées avant 9h.
export function calculateBonus(orders: Order[], products: Product[]): number {
   return orders
      .filter((order) => new Date(order.date).getHours() < 9)
      .reduce((sum, order) => {
         const product = products.find((p) => p.id === order.productId);
         if (!product) return sum;
         return sum + product.price * order.quantity * 0.05;
      }, 0);
}

// Test local
if (require.main === module) {
   console.log("Test volume discount (250€):", calculateVolumeDiscount(250));

   const sampleOrders = [
      { id: "O1", customerId: "C1", productId: "P1", quantity: 2, date: "2023-10-21T08:00:00" }
   ];

   const sampleProducts = [
      { id: "P1", name: "Sample Product", price: 100, weight: 1 }
   ];

   console.log(
      "Test bonus:",
      calculateBonus(sampleOrders, sampleProducts)
   );
}