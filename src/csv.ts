import fs from "fs";
import path from "path";
import { Customer, Order, Product, Promotion, ShippingZone } from "./models";

const dataPath = path.join(__dirname, "../legacy/data");

export const customers: Customer[] = fs.readFileSync(path.join(dataPath, "customers.csv"), "utf8")
   .trim()
   .split("\n")
   .slice(1)
   .map((line) => {
      const [id, fullName, level, zone, currency] = line.split(",");
      return { id, fullName, level, zone, currency };
   });

export const orders: Order[] = fs.readFileSync(path.join(dataPath, "orders.csv"), "utf8")
   .trim()
   .split("\n")
   .slice(1)
   .map((line) => {
      const [id, customerId, productId, quantity, date] = line.split(",");
      return { id, customerId, productId, quantity: parseInt(quantity), date };
   });

export const products: Product[] = fs.readFileSync(path.join(dataPath, "products.csv"), "utf8")
   .trim()
   .split("\n")
   .slice(1)
   .map((line) => {
      const [id, name, price, weight] = line.split(",");
      return { id, name, price: parseFloat(price), weight: parseFloat(weight) };
   });

export const promotions: Promotion[] = fs.readFileSync(path.join(dataPath, "promotions.csv"), "utf8")
   .trim()
   .split("\n")
   .slice(1)
   .map((line) => {
      const [id, type, value, startDate, endDate] = line.split(",");
      return { id, type, value: parseFloat(value), startDate, endDate };
   });

export const shippingZones: ShippingZone[] = fs.readFileSync(path.join(dataPath, "shipping_zones.csv"), "utf8")
   .trim()
   .split("\n")
   .slice(1)
   .map((line) => {
      const [zone, weightMin, weightMax, cost] = line.split(",");
      return {
         zone,
         weightMin: parseFloat(weightMin),
         weightMax: parseFloat(weightMax),
         cost: parseFloat(cost),
      };
   });



if (require.main === module) {
   console.log("CSV parsing test:");
   console.log("Customers:", customers.length);
   console.log("Orders:", orders.length);
   console.log("Products:", products.length);
   console.log("Promotions:", promotions.length);
   console.log("Shipping Zones:", shippingZones.length);
}
