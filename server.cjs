var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_http = require("http");
var import_ws = require("ws");
var import_vite = require("vite");
var import_path = __toESM(require("path"), 1);
var import_url = require("url");
var import_genai = require("@google/genai");

// src/constants.ts
var INITIAL_PRODUCTS = [
  {
    id: "mobiles-new-1",
    name: "IPhone 16 PRO MAX",
    description: " . ",
    price: 1200,
    quantity: 45,
    category: "mobiles",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.8,
    reviewsCount: 124
  },
  {
    id: "mobiles-new-2",
    name: "Samsung ULTRA 26",
    description: " . ",
    price: 1200,
    quantity: 55,
    category: "mobiles",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.4,
    reviewsCount: 110
  },
  {
    id: "mobiles-new-3",
    name: "Xiaomi Redmi Note 14 Pro Plus 5G",
    description: " . ",
    price: 299,
    quantity: 65,
    category: "mobiles",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.5,
    reviewsCount: 132
  },
  {
    id: "mobiles-new-4",
    name: "Xiaomi 15 Ultra",
    description: " . ",
    price: 1200,
    quantity: 65,
    category: "mobiles",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.7,
    reviewsCount: 122
  },
  {
    id: "mobiles-new-5",
    name: "iPhone 15 Pro Max",
    description: " . ",
    price: 1099,
    quantity: 75,
    category: "mobiles",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.9,
    reviewsCount: 155
  },
  {
    id: "mobiles-new-6",
    name: "Apple iPhone 16 Pro Max",
    description: " . ",
    price: 1099,
    quantity: 35,
    category: "mobiles",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.9,
    reviewsCount: 129
  },
  {
    id: "mobiles-new-7",
    name: "Xiaomi 17 Pro Max",
    description: " . ",
    price: 980,
    quantity: 45,
    category: "mobiles",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.7,
    reviewsCount: 154
  },
  {
    id: "mobiles-new-8",
    name: "Samsung Galaxy S22 Ultra",
    description: " . ",
    price: 650,
    quantity: 75,
    category: "mobiles",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.8,
    reviewsCount: 174
  },
  {
    id: "tvs-new-1",
    name: 'Sony BRAVIA XR-48A90K 48" A90K Smart OLED 4K UHD TV with HDR',
    description: " . ",
    price: 1299,
    quantity: 45,
    category: "tvs",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4,
    reviewsCount: 174
  },
  {
    id: "tvs-new-2",
    name: 'Sony BRAVIA 8 (K55XR80) Smart OLED 4K TV with HDR (55")',
    description: " . ",
    price: 1500,
    quantity: 45,
    category: "tvs",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4,
    reviewsCount: 174
  },
  {
    id: "tvs-new-3",
    name: 'LG OLED55C5PUA OLED Evo AI C5 Smart 4K TV (55")',
    description: " . ",
    price: 1199,
    quantity: 45,
    category: "tvs",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4,
    reviewsCount: 174
  },
  {
    id: "tvs-new-4",
    name: 'LG C6 OLED Evo AI Smart 4K TV (55")',
    description: " . ",
    price: 1199,
    quantity: 65,
    category: "tvs",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.4,
    reviewsCount: 105
  },
  {
    id: "tvs-new-5",
    name: 'Samsung S95H OLED Vision AI Smart 4K TV (55")',
    description: " . ",
    price: 2200,
    quantity: 35,
    category: "tvs",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.5,
    reviewsCount: 74
  },
  {
    id: "tvs-new-6",
    name: "Samsung S90H",
    description: " . ",
    price: 1799,
    quantity: 65,
    category: "tvs",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.6,
    reviewsCount: 155
  },
  {
    id: "tvs-new-7",
    name: "Samsung S85H",
    description: " . ",
    price: 1399,
    quantity: 55,
    category: "tvs",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.2,
    reviewsCount: 100
  },
  {
    id: "tvs-new-8",
    name: "Samsung Neo QLED AI \u0628\u062F\u0642\u0629 8K",
    description: " . ",
    price: 700,
    quantity: 75,
    category: "tvs",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.6,
    reviewsCount: 115
  },
  {
    id: "elec-new-1",
    name: 'Samsung Odyssey G9 G91F 49" Dual 1440p HDR',
    description: " . ",
    price: 700,
    quantity: 55,
    category: "computer_world",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.8,
    reviewsCount: 145
  },
  {
    id: "elec-new-2",
    name: "HP EliteStudio 8 27 G1i All in One AI PC",
    description: " . ",
    price: 4600,
    quantity: 45,
    category: "computer_world",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.6,
    reviewsCount: 145
  },
  {
    id: "elec-new-3",
    name: "Redragon S101-3 PRO Gaming Keyboard and Mouse",
    description: " . ",
    price: 40,
    quantity: 25,
    category: "computer_world",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.2,
    reviewsCount: 155
  },
  {
    id: "elec-new-4",
    name: "Dowinx Big and Tall Gaming Chair",
    description: " . ",
    price: 160,
    quantity: 55,
    category: "computer_world",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.7,
    reviewsCount: 135
  },
  {
    id: "elec-new-5",
    name: "Samsung Neo QLED AI \u0628\u062F\u0642\u0629 8K",
    description: " . ",
    price: 700,
    quantity: 35,
    category: "computer_world",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.2,
    reviewsCount: 155
  },
  {
    id: "elec-new-6",
    name: "NUBWO Wireless Gaming Headset with Mic for Ps5 Ps4 PC, Zero Interference",
    description: " . ",
    price: 30,
    quantity: 25,
    category: "computer_world",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.5,
    reviewsCount: 125
  },
  {
    id: "elec-new-7",
    name: "Ultrawide Curved Gaming Monitor",
    description: " . ",
    price: 600,
    quantity: 35,
    category: "computer_world",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.3,
    reviewsCount: 105
  },
  {
    id: "elec-new-8",
    name: "PS5 - Sony PlayStation 5",
    description: " . ",
    price: 600,
    quantity: 65,
    category: "computer_world",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.4,
    reviewsCount: 100
  },
  {
    id: "headphones-new-1",
    name: "Active Noise Cancelling Headphones",
    description: " . ",
    price: 42,
    quantity: 65,
    category: "headphones",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4,
    reviewsCount: 26
  },
  {
    id: "headphones-new-2",
    name: "Anker Noise Cancelling Earbuds",
    description: " . ",
    price: 28,
    quantity: 65,
    category: "headphones",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.1,
    reviewsCount: 100
  },
  {
    id: "headphones-new-3",
    name: "Wireless Earbuds",
    description: " . ",
    price: 14,
    quantity: 75,
    category: "headphones",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.7,
    reviewsCount: 150
  },
  {
    id: "headphones-new-4",
    name: "TOZO A1 Wireless Earbuds",
    description: " . ",
    price: 14,
    quantity: 55,
    category: "headphones",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.6,
    reviewsCount: 140
  },
  {
    id: "headphones-new-5",
    name: "Razer BlackShark V2 X Gaming Headset",
    description: " . ",
    price: 40,
    quantity: 35,
    category: "headphones",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.7,
    reviewsCount: 160
  },
  {
    id: "headphones-new-6",
    name: "Logitech G432 Wired Gaming Headset",
    description: " . ",
    price: 40,
    quantity: 75,
    category: "headphones",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.5,
    reviewsCount: 130
  },
  {
    id: "headphones-new-7",
    name: "Apple AirPods 4 Wireless Earbuds",
    description: " . ",
    price: 99,
    quantity: 45,
    category: "headphones",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.9,
    reviewsCount: 160
  },
  {
    id: "headphones-new-8",
    name: "Apple AirPods Pro 3 Wireless Earbuds",
    description: " . ",
    price: 200,
    quantity: 35,
    category: "headphones",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.5,
    reviewsCount: 100
  },
  {
    id: "smartwatches-new-1",
    name: "Smart Watch iPhone Samsung Android",
    description: " . ",
    price: 20,
    quantity: 35,
    category: "smartwatches",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.5,
    reviewsCount: 110
  },
  {
    id: "smartwatches-new-2",
    name: "Google Pixel Watch",
    description: " . ",
    price: 400,
    quantity: 25,
    category: "smartwatches",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.1,
    reviewsCount: 120
  },
  {
    id: "smartwatches-new-3",
    name: 'Sports Modes Smartwatch with 1.83" HD',
    description: " . ",
    price: 20,
    quantity: 25,
    category: "smartwatches",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.6,
    reviewsCount: 130
  },
  {
    id: "smartwatches-new-4",
    name: "Blackview 2026 Smart Watch",
    description: " . ",
    price: 25,
    quantity: 65,
    category: "smartwatches",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.9,
    reviewsCount: 140
  },
  {
    id: "smartwatches-new-5",
    name: "Tracker with Stress Management",
    description: " . ",
    price: 65,
    quantity: 65,
    category: "smartwatches",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.2,
    reviewsCount: 110
  },
  {
    id: "smartwatches-new-6",
    name: "Smart Watch for Women, Answer/Make Call",
    description: " . ",
    price: 30,
    quantity: 45,
    category: "smartwatches",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.8,
    reviewsCount: 105
  },
  {
    id: "smartwatches-new-7",
    name: "Health Fitness Tracker",
    description: " . ",
    price: 40,
    quantity: 55,
    category: "smartwatches",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.4,
    reviewsCount: 130
  },
  {
    id: "smartwatches-new-8",
    name: "Smart Watch with Alexa",
    description: " . ",
    price: 30,
    quantity: 35,
    category: "smartwatches",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.2,
    reviewsCount: 140
  },
  {
    id: "laptops-new-1",
    name: "Apple 2026 MacBook Pro Laptop",
    description: " . ",
    price: 2375,
    quantity: 45,
    category: "laptops",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.8,
    reviewsCount: 130
  },
  {
    id: "laptops-new-2",
    name: "Apple 2026 MacBook Air",
    description: " . ",
    price: 1400,
    quantity: 35,
    category: "laptops",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.7,
    reviewsCount: 140
  },
  {
    id: "laptops-new-3",
    name: "Apple 2026 MacBook Neo",
    description: " . ",
    price: 650,
    quantity: 25,
    category: "laptops",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.8,
    reviewsCount: 100
  },
  {
    id: "laptops-new-4",
    name: "HP OmniBook 5 16 inch Next Gen AI PC",
    description: " . ",
    price: 800,
    quantity: 25,
    category: "laptops",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.9,
    reviewsCount: 120
  },
  {
    id: "laptops-new-5",
    name: "HP OmniBook 3 16 inch Laptop PC",
    description: " . ",
    price: 550,
    quantity: 55,
    category: "laptops",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.6,
    reviewsCount: 180
  },
  {
    id: "laptops-new-6",
    name: "HP OmniBook 3 17.3 inch Laptop PC",
    description: " . ",
    price: 450,
    quantity: 65,
    category: "laptops",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.8,
    reviewsCount: 140
  },
  {
    id: "laptops-new-7",
    name: 'Samsung 14" Galaxy Chromebook Go Laptop PC',
    description: " . ",
    price: 200,
    quantity: 85,
    category: "laptops",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.9,
    reviewsCount: 170
  },
  {
    id: "laptops-new-8",
    name: "ASUS 15.6\u201D Vivobook Go Slim Laptop",
    description: " . ",
    price: 300,
    quantity: 65,
    category: "laptops",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.7,
    reviewsCount: 180
  },
  {
    id: "speakers-new-1",
    name: "Floorstanding Speaker",
    description: " . ",
    price: 999,
    quantity: 65,
    category: "speakers",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.7,
    reviewsCount: 180
  },
  {
    id: "speakers-new-2",
    name: "KEF R3 Meta (Black Gloss, Pair)",
    description: " . ",
    price: 2500,
    quantity: 35,
    category: "speakers",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.7,
    reviewsCount: 160
  },
  {
    id: "speakers-new-3",
    name: "Floorstanding Speaker, Black Textured Wood Grain Vinyl",
    description: " . ",
    price: 550,
    quantity: 75,
    category: "speakers",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.9,
    reviewsCount: 140
  },
  {
    id: "speakers-new-4",
    name: "Polk Monitor XT70 Large Tower Speaker",
    description: " . ",
    price: 320,
    quantity: 65,
    category: "speakers",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.6,
    reviewsCount: 130
  },
  {
    id: "speakers-new-5",
    name: "Polk Signature Elite ES10 Surround Sound Speakers",
    description: " . ",
    price: 250,
    quantity: 85,
    category: "speakers",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.8,
    reviewsCount: 150
  },
  {
    id: "speakers-new-6",
    name: "Polk Audio OWM3 Wall and Bookshelf Speakers",
    description: " . ",
    price: 200,
    quantity: 55,
    category: "speakers",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.6,
    reviewsCount: 170
  },
  {
    id: "speakers-new-7",
    name: "Pair of Bookshelf or Surround Sound Speakers",
    description: " . ",
    price: 150,
    quantity: 75,
    category: "speakers",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.5,
    reviewsCount: 120
  },
  {
    id: "speakers-new-8",
    name: "Klipsch R-51M Bookshelf Speaker (Pair), Black",
    description: " . ",
    price: 290,
    quantity: 45,
    category: "speakers",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.3,
    reviewsCount: 130
  },
  {
    id: "mobile_accessories-new-1",
    name: "Fast iPhone Charger, iPhone Charger Fast Charging",
    description: " . ",
    price: 19,
    quantity: 95,
    category: "mobile_accessories",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.7,
    reviewsCount: 150
  },
  {
    id: "mobile_accessories-new-2",
    name: "iPhone Fast Charger Apple Certified",
    description: " . ",
    price: 29,
    quantity: 55,
    category: "mobile_accessories",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.5,
    reviewsCount: 170
  },
  {
    id: "mobile_accessories-new-3",
    name: "USB C Cable 60W Fast Charging 2 Pack 6FT",
    description: " . ",
    price: 16,
    quantity: 15,
    category: "mobile_accessories",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.9,
    reviewsCount: 120
  },
  {
    id: "mobile_accessories-new-4",
    name: "Durcord USB C Cable",
    description: " . ",
    price: 13,
    quantity: 45,
    category: "mobile_accessories",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.1,
    reviewsCount: 110
  },
  {
    id: "mobile_accessories-new-5",
    name: "JETech Case for iPhone 16",
    description: " . ",
    price: 19,
    quantity: 35,
    category: "mobile_accessories",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.8,
    reviewsCount: 160
  },
  {
    id: "mobile_accessories-new-6",
    name: "TAURI for iPhone 16 Case",
    description: " . ",
    price: 29,
    quantity: 25,
    category: "mobile_accessories",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.2,
    reviewsCount: 130
  },
  {
    id: "mobile_accessories-new-7",
    name: "FNTCASE for iPhone 16 Case",
    description: " . ",
    price: 10,
    quantity: 25,
    category: "mobile_accessories",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.4,
    reviewsCount: 160
  },
  {
    id: "mobile_accessories-new-8",
    name: "FNTCASE for iPhone 16 Case",
    description: " . ",
    price: 15,
    quantity: 55,
    category: "mobile_accessories",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.8,
    reviewsCount: 120
  },
  {
    id: "printer_supplies-new-1",
    name: "HP Laserjet Pro 3001dw Wireless Black & White Printer",
    description: " . ",
    price: 199,
    quantity: 65,
    category: "printer_supplies",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.1,
    reviewsCount: 100
  },
  {
    id: "printer_supplies-new-2",
    name: "HP LaserJet M209dw Wireless Printer",
    description: " . ",
    price: 160,
    quantity: 55,
    category: "printer_supplies",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.4,
    reviewsCount: 110
  },
  {
    id: "printer_supplies-new-3",
    name: "Brother HL-L2405W Wireless Compact Monochrome Laser Printer",
    description: " . ",
    price: 140,
    quantity: 35,
    category: "printer_supplies",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.7,
    reviewsCount: 180
  },
  {
    id: "printer_supplies-new-4",
    name: "Compact Monochrome Multi-Function Laser Printe",
    description: " . ",
    price: 210,
    quantity: 75,
    category: "printer_supplies",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.5,
    reviewsCount: 130
  },
  {
    id: "printer_supplies-new-5",
    name: "Monochrome Laser Printer with Mobile Printing",
    description: " . ",
    price: 140,
    quantity: 25,
    category: "printer_supplies",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.6,
    reviewsCount: 160
  },
  {
    id: "printer_supplies-new-6",
    name: "HP LaserJet Wireless Black & White Printer",
    description: " . ",
    price: 130,
    quantity: 45,
    category: "printer_supplies",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.6,
    reviewsCount: 140
  },
  {
    id: "printer_supplies-new-7",
    name: "HP Laserjet MFP M140w Wireless Black & White Printer",
    description: " . ",
    price: 140,
    quantity: 35,
    category: "printer_supplies",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.3,
    reviewsCount: 140
  },
  {
    id: "printer_supplies-new-8",
    name: "HP LaserJet MFP M234sdw Wireless Printer",
    description: " . ",
    price: 220,
    quantity: 25,
    category: "printer_supplies",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.4,
    reviewsCount: 110
  },
  {
    id: "cameras-new-1",
    name: "Vlogging Cameras with 1 CMOS & 4K/120fps Vlog Camera",
    description: " . ",
    price: 440,
    quantity: 55,
    category: "cameras",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.6,
    reviewsCount: 150
  },
  {
    id: "cameras-new-2",
    name: "Xtra Muse, Vlogging Camera",
    description: " . ",
    price: 420,
    quantity: 55,
    category: "cameras",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.8,
    reviewsCount: 170
  },
  {
    id: "cameras-new-3",
    name: "Canon EOS Rebel T7 DSLR Camera",
    description: " . ",
    price: 480,
    quantity: 75,
    category: "cameras",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.9,
    reviewsCount: 130
  },
  {
    id: "cameras-new-4",
    name: "Canon EOS R100 Mirrorless Camera",
    description: " . ",
    price: 490,
    quantity: 65,
    category: "cameras",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.9,
    reviewsCount: 170
  },
  {
    id: "cameras-new-5",
    name: "Canon EOS RP Full-Frame Mirrorless Interchangeable",
    description: " . ",
    price: 1099,
    quantity: 45,
    category: "cameras",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.7,
    reviewsCount: 160
  },
  {
    id: "cameras-new-6",
    name: "Sony a7 III Full-Frame Mirrorless",
    description: " . ",
    price: 1899,
    quantity: 25,
    category: "cameras",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.9,
    reviewsCount: 130
  },
  {
    id: "cameras-new-7",
    name: "Sony Alpha 7 IV Full-Frame Mirrorless Interchangeable",
    description: " . ",
    price: 1299,
    quantity: 75,
    category: "cameras",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.7,
    reviewsCount: 140
  },
  {
    id: "cameras-new-8",
    name: "Sony Alpha 7 V Full-Frame Hybrid Mirrorless Camera",
    description: " . ",
    price: 3099,
    quantity: 35,
    category: "cameras",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.2,
    reviewsCount: 110
  },
  {
    id: "men-new-1",
    name: "COOFANDY Mens Button Down Short",
    description: " . ",
    price: 18,
    quantity: 65,
    category: "men",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.4,
    reviewsCount: 120
  },
  {
    id: "men-new-2",
    name: "J.VER Mens Dress Shirts Solid Long",
    description: " . ",
    price: 20,
    quantity: 65,
    category: "men",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.7,
    reviewsCount: 120
  },
  {
    id: "men-new-3",
    name: "Mens Linen Shirts Short Sleeve Casual Shirts",
    description: " . ",
    price: 31,
    quantity: 25,
    category: "men",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.5,
    reviewsCount: 100
  },
  {
    id: "men-new-4",
    name: "Sailwind Mens Muscle Henley Shirts Lightweight",
    description: " . ",
    price: 15,
    quantity: 35,
    category: "men",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.6,
    reviewsCount: 170
  },
  {
    id: "men-new-5",
    name: "Mens Henley Shirt Casual Button Short Sleeve",
    description: " . ",
    price: 15,
    quantity: 65,
    category: "men",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.7,
    reviewsCount: 110
  },
  {
    id: "men-new-6",
    name: "Shirts Short Sleeve Button Cotton T Shirts | Summer",
    description: " . ",
    price: 18,
    quantity: 55,
    category: "men",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.6,
    reviewsCount: 150
  },
  {
    id: "men-new-7",
    name: "Mens Casual Button Down Shirts Short Sleeve Textured Summer",
    description: " . ",
    price: 25,
    quantity: 35,
    category: "men",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.7,
    reviewsCount: 160
  },
  {
    id: "men-new-8",
    name: "Mens Polo Shirts Short Sleeve Casual Summer",
    description: " . ",
    price: 29,
    quantity: 45,
    category: "men",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.9,
    reviewsCount: 140
  },
  {
    id: "women-new-1",
    name: "khalat Muslim Prayer Dress Abaya Solid",
    description: " . ",
    price: 40,
    quantity: 65,
    category: "women",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.4,
    reviewsCount: 160
  },
  {
    id: "women-new-2",
    name: "Prien Prayer Dress For Women Cotton Muslim Abaya",
    description: " . ",
    price: 39,
    quantity: 65,
    category: "women",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.8,
    reviewsCount: 190
  },
  {
    id: "women-new-3",
    name: "Womens Solid Muslim One-Piece",
    description: " . ",
    price: 38,
    quantity: 35,
    category: "women",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.5,
    reviewsCount: 110
  },
  {
    id: "women-new-4",
    name: "Muslim Abaya Dress for Women",
    description: " . ",
    price: 34,
    quantity: 35,
    category: "women",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.2,
    reviewsCount: 110
  },
  {
    id: "women-new-5",
    name: "Muslim Dress for Women Pakistani Kaftan",
    description: " . ",
    price: 37,
    quantity: 55,
    category: "women",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.7,
    reviewsCount: 140
  },
  {
    id: "women-new-6",
    name: "Muslim Prayer Abaya Women Jilbab with Hijab",
    description: " . ",
    price: 39,
    quantity: 25,
    category: "women",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.3,
    reviewsCount: 170
  },
  {
    id: "women-new-7",
    name: "Women Prayer Clothes with Hijab Muslim Outfits Long",
    description: " . ",
    price: 23,
    quantity: 35,
    category: "women",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.5,
    reviewsCount: 130
  },
  {
    id: "women-new-8",
    name: "Muslim Abayas Dress with Hijabs Long Sleeve Modest",
    description: " . ",
    price: 40,
    quantity: 45,
    category: "women",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.8,
    reviewsCount: 120
  },
  {
    id: "girls-new-1",
    name: "\u0641\u0633\u0627\u062A\u064A\u0646 \u0635\u064A\u0641\u064A\u0629 \u0644\u0644\u0628\u0646\u0627\u062A",
    description: " . ",
    price: 15,
    quantity: 35,
    category: "girls",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.4,
    reviewsCount: 110
  },
  {
    id: "girls-new-2",
    name: "\u0641\u0633\u062A\u0627\u0646 \u0635\u064A\u0641\u064A \u0644\u0644\u0623\u0645\u064A\u0631\u0627\u062A \u0644\u0644\u0628\u0646\u0627\u062A)",
    description: " . ",
    price: 15,
    quantity: 65,
    category: "girls",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.6,
    reviewsCount: 180
  },
  {
    id: "girls-new-3",
    name: "\u0641\u0633\u062A\u0627\u0646 \u0645\u0643\u0634\u0643\u0634 \u0644\u0644\u0628\u0646\u0627\u062A \u0627\u0644\u0635\u063A\u064A\u0631\u0627\u062A",
    description: " . ",
    price: 16,
    quantity: 45,
    category: "girls",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.5,
    reviewsCount: 140
  },
  {
    id: "girls-new-4",
    name: "\u0641\u0633\u0627\u062A\u064A\u0646 \u062F\u0627\u0646\u062A\u064A\u0644 \u0628\u0623\u0643\u0645\u0627\u0645 \u0645\u0643\u0634\u0643\u0634\u0629 \u0644\u0644\u0623\u0637\u0641\u0627\u0644 \u0627\u0644\u0635\u063A\u0627\u0631",
    description: " . ",
    price: 14,
    quantity: 65,
    category: "girls",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.7,
    reviewsCount: 120
  },
  {
    id: "girls-new-5",
    name: "\u0641\u0633\u062A\u0627\u0646 \u0635\u064A\u0641\u064A \u0628\u0644\u0627 \u0623\u0643\u0645\u0627\u0645 \u0648\u0645\u0632\u064A\u0646 \u0628\u0643\u0634\u0643\u0634\u0629 \u0644\u0644\u0637\u0641\u0644\u0627\u062A \u0627\u0644\u0635\u063A\u064A\u0631\u0627\u062A",
    description: " . ",
    price: 17,
    quantity: 25,
    category: "girls",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.5,
    reviewsCount: 170
  },
  {
    id: "girls-new-6",
    name: "\u0645\u0644\u0627\u0628\u0633 \u0635\u064A\u0641\u064A\u0629 \u0644\u0644\u0628\u0646\u0627\u062A \u0627\u0644\u0635\u063A\u064A\u0631\u0627\u062A",
    description: " . ",
    price: 15,
    quantity: 55,
    category: "girls",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.9,
    reviewsCount: 140
  },
  {
    id: "girls-new-7",
    name: "\u0623\u0632\u064A\u0627\u0621 \u0645\u0644\u0627\u0628\u0633 \u0627\u0644\u0628\u0646\u0627\u062A: \u062A\u064A\u0634\u064A\u0631\u062A\u0627\u062A \u0645\u0637\u0628\u0648\u0639\u0629 \u0648\u062A\u0635\u0627\u0645\u064A\u0645 \u0643\u0627\u062C\u0648\u0627\u0644",
    description: " . ",
    price: 35,
    quantity: 75,
    category: "girls",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.2,
    reviewsCount: 150
  },
  {
    id: "girls-new-8",
    name: "\u0637\u0642\u0645 \u0645\u0644\u0627\u0628\u0633 \u0644\u0644\u0628\u0646\u0627\u062A \u0628\u0644\u0648\u0632\u0629 \u0628\u0623\u0643\u0645\u0627\u0645 \u0642\u0635\u064A\u0631\u0629",
    description: " . ",
    price: 25,
    quantity: 35,
    category: "girls",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.8,
    reviewsCount: 100
  },
  {
    id: "travel_essentials-new-1",
    name: "\u062D\u0642\u064A\u0628\u0629 \u0627\u0644\u062A\u0646\u0642\u0644 \u0627\u0644\u064A\u0648\u0645\u064A",
    description: " . ",
    price: 250,
    quantity: 45,
    category: "travel_essentials",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.4,
    reviewsCount: 120
  },
  {
    id: "travel_essentials-new-2",
    name: "\u062D\u0642\u064A\u0628\u0629 \u0638\u0647\u0631 \u0628\u0639\u062C\u0644\u0627\u062A \u0642\u0627\u0628\u0644\u0629 \u0644\u0644\u0641\u0635\u0644 \u0648\u0645\u0646\u0627\u0633\u0628\u0629 \u0644\u0644\u0645\u0642\u0635\u0648\u0631\u0629",
    description: " . ",
    price: 130,
    quantity: 35,
    category: "travel_essentials",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.1,
    reviewsCount: 140
  },
  {
    id: "travel_essentials-new-3",
    name: "\u062D\u0642\u064A\u0628\u0629 \u0638\u0647\u0631 \u0644\u0644\u0633\u0641\u0631 \u0628\u0639\u062C\u0644\u0627\u062A \u0642\u0627\u0628\u0644\u0629 \u0644\u0644\u062A\u0648\u0633\u064A\u0639",
    description: " . ",
    price: 67,
    quantity: 45,
    category: "travel_essentials",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.8,
    reviewsCount: 110
  },
  {
    id: "travel_essentials-new-4",
    name: "\u062D\u0642\u064A\u0628\u0629 \u0638\u0647\u0631 \u0628\u0639\u062C\u0644\u0627\u062A \u0644\u0644\u0646\u0633\u0627\u0621",
    description: " . ",
    price: 65,
    quantity: 65,
    category: "travel_essentials",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.5,
    reviewsCount: 100
  },
  {
    id: "travel_essentials-new-5",
    name: "\u062D\u0642\u064A\u0628\u0629 \u0630\u0648 \u063A\u0644\u0627\u0641 \u0635\u0644\u0628 \u0648\u062E\u0641\u064A\u0641\u0629 \u0627\u0644\u0648\u0632\u0646",
    description: " . ",
    price: 70,
    quantity: 35,
    category: "travel_essentials",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.3,
    reviewsCount: 120
  },
  {
    id: "travel_essentials-new-6",
    name: "\u062D\u0642\u064A\u0628\u0629 \u0633\u0641\u0631 \u0635\u063A\u064A\u0631\u0629",
    description: " . ",
    price: 85,
    quantity: 55,
    category: "travel_essentials",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4,
    reviewsCount: 150
  },
  {
    id: "travel_essentials-new-7",
    name: "\u062D\u0642\u064A\u0628\u0629 \u0633\u0641\u0631 \u062C\u0644\u062F\u064A\u0629 \u0643\u0628\u064A\u0631\u0629",
    description: " . ",
    price: 95,
    quantity: 65,
    category: "travel_essentials",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.9,
    reviewsCount: 140
  },
  {
    id: "travel_essentials-new-8",
    name: "\u062D\u0642\u064A\u0628\u0629 \u0633\u0641\u0631 \u0635\u063A\u064A\u0631\u0629 \u0644\u0644\u0631\u062D\u0644\u0627\u062A \u0627\u0644\u0633\u064A\u0627\u062D\u064A\u0629",
    description: " . ",
    price: 75,
    quantity: 35,
    category: "travel_essentials",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.7,
    reviewsCount: 130
  },
  {
    id: "shoes-new-1",
    name: "\u062D\u0630\u0627\u0621 \u0631\u062C\u0627\u0644\u064A \u0644\u0644\u0645\u0646\u0627\u0633\u0628\u0627\u062A",
    description: " . ",
    price: 95,
    quantity: 75,
    category: "shoes",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.7,
    reviewsCount: 140
  },
  {
    id: "shoes-new-1",
    name: "\u062D\u0630\u0627\u0621 \u0631\u062C\u0627\u0644\u064A \u0644\u0644\u0645\u0646\u0627\u0633\u0628\u0627\u062A",
    description: " . ",
    price: 75,
    quantity: 45,
    category: "shoes",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.6,
    reviewsCount: 140
  },
  {
    id: "shoes-new-2",
    name: "\u062C\u0632\u0645\u0629 \u0646\u0633\u0627\u0626\u064A\u0629 \u0639\u0635\u0631\u064A\u0629",
    description: " . ",
    price: 75,
    quantity: 35,
    category: "shoes",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.8,
    reviewsCount: 150
  },
  {
    id: "shoes-new-3",
    name: "\u062E\u0641\u0627\u0641\u0629 \u0631\u062C\u0627\u0644\u064A\u0629 \u0639\u0635\u0631\u064A\u0629",
    description: " . ",
    price: 45,
    quantity: 25,
    category: "shoes",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.4,
    reviewsCount: 110
  },
  {
    id: "shoes-new-4",
    name: "\u0643\u0639\u0628 \u0646\u0633\u0627\u0626\u064A \u0644\u0644\u0645\u0646\u0627\u0633\u0628\u0627\u062A",
    description: " . ",
    price: 95,
    quantity: 45,
    category: "shoes",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.8,
    reviewsCount: 100
  },
  {
    id: "shoes-new-5",
    name: "\u062D\u0630\u0627\u0621 \u0646\u0633\u0627\u0626\u064A \u0631\u064A\u0627\u0636\u064A",
    description: " . ",
    price: 75,
    quantity: 75,
    category: "shoes",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.7,
    reviewsCount: 140
  },
  {
    id: "shoes-new-6",
    name: "\u0643\u0644\u0627\u0634 \u0628\u0646\u0627\u062A\u064A \u062C\u0645\u064A\u0644",
    description: " . ",
    price: 25,
    quantity: 55,
    category: "shoes",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.5,
    reviewsCount: 140
  },
  {
    id: "shoes-new-7",
    name: "\u0628\u0648\u062A \u0648\u0644\u0627\u062F\u064A ",
    description: " . ",
    price: 55,
    quantity: 45,
    category: "shoes",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.3,
    reviewsCount: 120
  },
  {
    id: "shoes-new-8",
    name: "\u062D\u0630\u0627\u0621 \u0631\u062C\u0627\u0644\u064A \u0631\u064A\u0627\u0636\u064A",
    description: " . ",
    price: 35,
    quantity: 25,
    category: "shoes",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4,
    reviewsCount: 130
  },
  {
    id: "watches_fashion-new-1",
    name: "\u0633\u0627\u0639\u0629 \u064A\u062F \u0646\u0633\u0627\u0626\u064A\u0629 \u0630\u0647\u0628\u064A\u0629 ",
    description: " . ",
    price: 365,
    quantity: 25,
    category: "watches_fashion",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.5,
    reviewsCount: 110
  },
  {
    id: "watches_fashion-new-2",
    name: "\u0633\u0627\u0639\u0629 \u064A\u062F \u0645\u0646 \u0634\u0631\u0643\u0629 Rolex ",
    description: " . ",
    price: 7500,
    quantity: 55,
    category: "watches_fashion",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.6,
    reviewsCount: 130
  },
  {
    id: "watches_fashion-new-3",
    name: "\u0633\u0627\u0639\u0629 \u064A\u062F \u0634\u0628\u0627\u0628\u064A\u0629 \u0645\u0646 ROLEX ",
    description: " . ",
    price: 9500,
    quantity: 45,
    category: "watches_fashion",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.9,
    reviewsCount: 120
  },
  {
    id: "watches_fashion-new-4",
    name: "\u0633\u0627\u0639\u0629 \u064A\u062F \u0648\u0644\u0627\u062F\u064A\u0629 \u0630\u0643\u064A\u0629 ",
    description: " . ",
    price: 65,
    quantity: 35,
    category: "watches_fashion",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.6,
    reviewsCount: 100
  },
  {
    id: "watches_fashion-new-5",
    name: "\u0633\u0627\u0639\u0629 \u064A\u062F \u0628\u0646\u0627\u062A\u064A\u0629 \u0630\u0643\u064A\u0629 ",
    description: " . ",
    price: 65,
    quantity: 25,
    category: "watches_fashion",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.5,
    reviewsCount: 110
  },
  {
    id: "watches_fashion-new-6",
    name: "\u0633\u0627\u0639\u0629 \u064A\u062F \u0631\u062C\u0627\u0644\u064A\u0629 \u0645\u0646 \u0634\u0631\u0643\u0629 OVLES ",
    description: " . ",
    price: 95,
    quantity: 45,
    category: "watches_fashion",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.8,
    reviewsCount: 100
  },
  {
    id: "watches_fashion-new-7",
    name: "\u0633\u0627\u0639\u0629 \u064A\u062F \u0631\u062C\u0627\u0644\u064A\u0629 \u0645\u0646 \u0634\u0631\u0643\u0629 LN LENQIN ",
    description: " . ",
    price: 200,
    quantity: 55,
    category: "watches_fashion",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.7,
    reviewsCount: 140
  },
  {
    id: "watches_fashion-new-8",
    name: "\u0633\u0627\u0639\u0629 \u064A\u062F \u0646\u0633\u0627\u0626\u064A\u0629 \u0645\u0631\u0635\u0639\u0629 \u0628\u0627\u0644\u062C\u0648\u0627\u0647\u0631 ",
    description: " . ",
    price: 565,
    quantity: 35,
    category: "watches_fashion",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.6,
    reviewsCount: 140
  },
  {
    id: "sportswear-new-1",
    name: "\u062C\u0627\u0643\u064A\u062A \u0631\u064A\u0627\u0636\u064A \u0645\u0646 \u0634\u0631\u0643\u0629 adidas ",
    description: " . ",
    price: 565,
    quantity: 45,
    category: "sportswear",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.8,
    reviewsCount: 140
  },
  {
    id: "sportswear-new-2",
    name: "\u0637\u0642\u0645 \u0631\u064A\u0627\u0636\u064A \u0642\u0637\u0646\u064A \u0645\u0646 \u0634\u0631\u0643\u0629 Puma",
    description: " . ",
    price: 65,
    quantity: 45,
    category: "sportswear",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.2,
    reviewsCount: 110
  },
  {
    id: "sportswear-new-3",
    name: "\u0637\u0627\u0642\u064A\u0629 \u0631\u064A\u0627\u0636\u064A\u0629 \u0645\u0646 \u0634\u0631\u0643\u0629 Nike",
    description: " . ",
    price: 50,
    quantity: 65,
    category: "sportswear",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.9,
    reviewsCount: 110
  },
  {
    id: "sportswear-new-4",
    name: "\u0637\u0642\u0645 \u0631\u064A\u0627\u0636\u064A \u0643\u0627\u0645\u0644 \u0645\u0646 \u0634\u0631\u0643\u0629 adidas",
    description: " . ",
    price: 500,
    quantity: 25,
    category: "sportswear",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.3,
    reviewsCount: 120
  },
  {
    id: "sportswear-new-5",
    name: "\u0627\u0633\u0648\u0627\u0631\u0629 \u0642\u0645\u0627\u0634\u064A\u0629 \u0642\u0637\u0646\u064A\u0629 \u0631\u064A\u0627\u0636\u064A\u0629 \u0645\u0646 \u0634\u0631\u0643\u0629 Nike",
    description: " . ",
    price: 50,
    quantity: 35,
    category: "sportswear",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.7,
    reviewsCount: 100
  },
  {
    id: "sportswear-new-6",
    name: "\u0628\u064A\u062C\u0627\u0645\u0629 \u0631\u064A\u0627\u0636\u064A\u0629 \u0645\u0646 \u0634\u0631\u0643\u0629 Nike ",
    description: " . ",
    price: 565,
    quantity: 45,
    category: "sportswear",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.8,
    reviewsCount: 140
  },
  {
    id: "sportswear-new-7",
    name: "\u0634\u0648\u0631\u062A \u0631\u064A\u0627\u0636\u064A \u0645\u0646 \u0634\u0631\u0643\u0629 adidas ",
    description: " . ",
    price: 65,
    quantity: 35,
    category: "sportswear",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.4,
    reviewsCount: 120
  },
  {
    id: "sportswear-new-8",
    name: "\u0633\u062A\u0631\u0629 \u0631\u064A\u0627\u0636\u064A\u0629 \u0645\u0646 \u0634\u0631\u0643\u0629 adidas ",
    description: " . ",
    price: 500,
    quantity: 65,
    category: "sportswear",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4,
    reviewsCount: 130
  },
  {
    id: "bedding-new-1",
    name: "\u0648\u0633\u0627\u062F\u0629 \u0642\u0637\u0646\u064A\u0629 \u0646\u0627\u0639\u0645\u0629 \u0645\u0646 \u0634\u0631\u0643\u0629 Saatva",
    description: " . ",
    price: 50,
    quantity: 65,
    category: "bedding",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.6,
    reviewsCount: 110
  },
  {
    id: "bedding-new-2",
    name: "\u0645\u0641\u0631\u0634 \u0645\u0632\u062F\u0648\u062C \u0648\u0644\u0627\u062F\u064A \u0642\u0637\u0646\u064A \u0645\u0646 \u0634\u0631\u0643\u0629 Anichini",
    description: " . ",
    price: 40,
    quantity: 65,
    category: "bedding",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.4,
    reviewsCount: 100
  },
  {
    id: "bedding-new-3",
    name: "\u0645\u0641\u0631\u0634 \u0648\u0644\u0627\u062F\u064A \u0635\u063A\u064A\u0631 \u0645\u0646 \u0634\u0631\u0643\u0629 Anichini",
    description: " . ",
    price: 90,
    quantity: 75,
    category: "bedding",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.9,
    reviewsCount: 110
  },
  {
    id: "bedding-new-4",
    name: "\u0645\u0641\u0631\u0634 \u0645\u0632\u062F\u0648\u062C \u0642\u0637\u0646\u064A \u0646\u0627\u0639\u0645 \u0645\u0646 \u0634\u0631\u0643\u0629 Welspun Group",
    description: " . ",
    price: 200,
    quantity: 25,
    category: "bedding",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4,
    reviewsCount: 100
  },
  {
    id: "bedding-new-5",
    name: "\u0645\u0641\u0631\u0634 \u062A\u062E\u062A \u0645\u0632\u062F\u0648\u062C \u0645\u0646 \u0634\u0631\u0643\u0629 Tempur-Sealy",
    description: " . ",
    price: 99,
    quantity: 65,
    category: "bedding",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.7,
    reviewsCount: 190
  },
  {
    id: "bedding-new-6",
    name: "\u0645\u0641\u0631\u0634 \u0642\u0637\u0646\u064A 100% \u0645\u0646 \u0634\u0631\u0643\u0629 Frette",
    description: " . ",
    price: 60,
    quantity: 95,
    category: "bedding",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.5,
    reviewsCount: 140
  },
  {
    id: "bedding-new-7",
    name: "\u0648\u0633\u0627\u062F\u0629 \u0642\u0637\u0646\u064A\u0629 \u0646\u0627\u0639\u0645\u0629 \u0645\u0646 \u0634\u0631\u0643\u0629 Coop Sleep Goods",
    description: " . ",
    price: 50,
    quantity: 45,
    category: "bedding",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.8,
    reviewsCount: 140
  },
  {
    id: "bedding-new-8",
    name: "\u0637\u0642\u0645 \u0648\u0633\u0627\u0626\u062F \u0645\u0646 \u0634\u0631\u0643\u0629  CozyLux \u0648\u0633\u0627\u0626\u062F \u0633\u0631\u064A\u0631 \u0646\u0627\u0639\u0645\u0629 \u0648\u062F\u0627\u0639\u0645\u0629 \u0628\u062D\u0634\u0648\u0629 \u0628\u062F\u064A\u0644\u0629 \u0644\u0644\u0631\u064A\u0634",
    description: " . ",
    price: 40,
    quantity: 35,
    category: "bedding",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.9,
    reviewsCount: 130
  },
  {
    id: "storage_organization-new-1",
    name: "\u0637\u0642\u0645 \u0645\u0646\u0638\u0645\u0627\u062A \u0623\u062F\u0631\u0627\u062C \u0627\u0644\u0645\u0637\u0628\u062E",
    description: " . ",
    price: 32,
    quantity: 55,
    category: "storage_organization",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.4,
    reviewsCount: 130
  },
  {
    id: "storage_organization-new-2",
    name: "\u0637\u0642\u0645 \u0644\u062A\u062E\u0632\u064A\u0646 \u0627\u0644\u0645\u0644\u0627\u0628\u0633 \u0644\u0644\u0623\u0637\u0641\u0627\u0644",
    description: " . ",
    price: 20,
    quantity: 35,
    category: "storage_organization",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.8,
    reviewsCount: 110
  },
  {
    id: "storage_organization-new-3",
    name: "\u0645\u062E\u0632\u0646 \u0623\u062F\u0631\u0627\u062C \u0644\u0644\u0623\u062D\u0630\u064A\u0629",
    description: " . ",
    price: 65,
    quantity: 65,
    category: "storage_organization",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.7,
    reviewsCount: 170
  },
  {
    id: "storage_organization-new-4",
    name: "\u0637\u0642\u0645 \u0631\u0641\u0648\u0641 \u0644\u0644\u0632\u0631\u0639",
    description: " . ",
    price: 39,
    quantity: 45,
    category: "storage_organization",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.2,
    reviewsCount: 130
  },
  {
    id: "storage_organization-new-5",
    name: "\u0637\u0642\u0645 \u0623\u062F\u0631\u0627\u062C \u062A\u062E\u0632\u064A\u0646 \u0627\u0644\u0645\u0644\u0627\u0628\u0633",
    description: " . ",
    price: 45,
    quantity: 35,
    category: "storage_organization",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.2,
    reviewsCount: 150
  },
  {
    id: "storage_organization-new-6",
    name: "\u0637\u0642\u0645 \u0631\u0641\u0648\u0641 \u0644\u0644\u062D\u0645\u0627\u0645",
    description: " . ",
    price: 29,
    quantity: 25,
    category: "storage_organization",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.7,
    reviewsCount: 140
  },
  {
    id: "storage_organization-new-7",
    name: "\u0637\u0642\u0645 \u0623\u062F\u0631\u0627\u062C \u0644\u0644\u0645\u0646\u0638\u0641\u0627\u062A",
    description: " . ",
    price: 50,
    quantity: 35,
    category: "storage_organization",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.3,
    reviewsCount: 120
  },
  {
    id: "storage_organization-new-8",
    name: "\u0637\u0642\u0645 \u0623\u062F\u0631\u0627\u062C \u0645\u0646\u0627\u0634\u0641",
    description: " . ",
    price: 40,
    quantity: 25,
    category: "storage_organization",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.5,
    reviewsCount: 100
  },
  {
    id: "home_appliances-new-1",
    name: "\u063A\u0633\u0627\u0644\u0629 LG \u062D\u0648\u0636 \u0643\u0628\u064A\u0631",
    description: " . ",
    price: 400,
    quantity: 25,
    category: "home_appliances",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.5,
    reviewsCount: 100
  },
  {
    id: "home_appliances-new-2",
    name: "\u062E\u0644\u0627\u0637 \u0645\u0646\u0632\u0644\u064A \u0643\u0628\u064A\u0631 \u0645\u0646 \u0634\u0631\u0643\u0629 Samsung",
    description: " . ",
    price: 400,
    quantity: 25,
    category: "home_appliances",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.5,
    reviewsCount: 100
  },
  {
    id: "home_appliances-new-3",
    name: "\u0627\u0644\u0645\u064A\u0643\u0631\u0648\u0648\u064A\u0641 \u0627\u0644\u0645\u0646\u0632\u0644\u064A \u0645\u0646 \u0634\u0631\u0643\u0629 LG",
    description: " . ",
    price: 200,
    quantity: 25,
    category: "home_appliances",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.5,
    reviewsCount: 140
  },
  {
    id: "home_appliances-new-4",
    name: "\u0645\u0643\u0646\u0633\u0629 \u0643\u0647\u0631\u0628\u0627\u0626\u064A\u0629 \u0645\u0646\u0632\u0644\u064A\u0629 \u0645\u0646 \u0634\u0631\u0643\u0629 LG",
    description: " . ",
    price: 100,
    quantity: 35,
    category: "home_appliances",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.6,
    reviewsCount: 130
  },
  {
    id: "home_appliances-new-5",
    name: "\u0641\u0631\u0646 \u0645\u0646\u0632\u0644\u064A \u0645\u0646 6 \u0631\u0624\u0648\u0633 \u0645\u0646 \u0634\u0631\u0643\u0629 LG",
    description: " . ",
    price: 300,
    quantity: 45,
    category: "home_appliances",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.9,
    reviewsCount: 170
  },
  {
    id: "home_appliances-new-6",
    name: "\u0641\u0631\u0646 \u0645\u0646\u0632\u0644\u064A 5 \u0631\u0624\u0648\u0633 \u0645\u0646 \u0634\u0631\u0643\u0629 Frigidaire",
    description: " . ",
    price: 100,
    quantity: 45,
    category: "home_appliances",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.3,
    reviewsCount: 120
  },
  {
    id: "home_appliances-new-7",
    name: "\u0628\u0631\u0627\u062F \u0645\u0643\u062A\u0628\u064A \u0645\u0646 \u0634\u0631\u0643\u0629 LG",
    description: " . ",
    price: 200,
    quantity: 45,
    category: "home_appliances",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.7,
    reviewsCount: 110
  },
  {
    id: "home_appliances-new-8",
    name: "\u0628\u0631\u0627\u062F \u0645\u0646\u0632\u0644\u064A \u0645\u0646 \u0634\u0631\u0643\u0629 LG ",
    description: " . ",
    price: 500,
    quantity: 35,
    category: "home_appliances",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.6,
    reviewsCount: 130
  },
  {
    id: "waste_recycling-new-1",
    name: "\u0633\u0644\u0629 \u0645\u0647\u0645\u0644\u0627\u062A \u0630\u0643\u064A\u0629 \u0645\u0646 \u0634\u0631\u0643\u0629 Samsung",
    description: " . ",
    price: 50,
    quantity: 35,
    category: "waste_recycling",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.8,
    reviewsCount: 110
  },
  {
    id: "waste_recycling-new-2",
    name: "\u0639\u0644\u0628\u0629 \u0642\u0641\u0627\u0632\u0627\u062A \u0630\u0648 \u0627\u0644\u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0644\u0645\u0631\u0629 \u0648\u0627\u062D\u062F\u0629",
    description: " . ",
    price: 0.5,
    quantity: 65,
    category: "waste_recycling",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4,
    reviewsCount: 10
  },
  {
    id: "waste_recycling-new-3",
    name: "\u0642\u0641\u0627\u0632\u0627\u062A \u0645\u0639\u0642\u0651\u0645\u0629",
    description: " . ",
    price: 4,
    quantity: 25,
    category: "waste_recycling",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.4,
    reviewsCount: 40
  },
  {
    id: "waste_recycling-new-4",
    name: "\u062D\u0627\u0641\u0638\u0627\u062A \u0627\u0644\u0632\u062C\u0627\u062C \u0627\u0644\u0645\u0643\u0633\u0648\u0631",
    description: " . ",
    price: 1.99,
    quantity: 95,
    category: "waste_recycling",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.8,
    reviewsCount: 90
  },
  {
    id: "waste_recycling-new-5",
    name: "\u0623\u0643\u064A\u0627\u0633 \u0645\u0647\u0645\u0644\u0627\u062A \u0644\u0644\u0633\u0644\u0627\u062A \u0627\u0644\u0635\u063A\u064A\u0631\u0629",
    description: " . ",
    price: 0.5,
    quantity: 25,
    category: "waste_recycling",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4,
    reviewsCount: 10
  },
  {
    id: "waste_recycling-new-6",
    name: "\u0633\u0644\u0629 \u0645\u0647\u0645\u0644\u0627\u062A \u0645\u0646\u0632\u0644\u064A\u0629",
    description: " . ",
    price: 1,
    quantity: 55,
    category: "waste_recycling",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.5,
    reviewsCount: 140
  },
  {
    id: "waste_recycling-new-7",
    name: "\u0633\u0644\u0629 \u0645\u0647\u0645\u0644\u0627\u062A \u0645\u0643\u062A\u0628\u064A\u0629 \u0630\u0643\u064A\u0629 \u0645\u0646 \u0634\u0631\u0643\u0629 LG",
    description: " . ",
    price: 50,
    quantity: 45,
    category: "waste_recycling",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.3,
    reviewsCount: 120
  },
  {
    id: "waste_recycling-new-8",
    name: "\u0623\u0643\u064A\u0627\u0633 \u0646\u0627\u064A\u0644\u0648\u0646 \u0644\u0644\u0646\u0641\u0627\u064A\u0627\u062A",
    description: " . ",
    price: 0.5,
    quantity: 25,
    category: "waste_recycling",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.4,
    reviewsCount: 130
  },
  {
    id: "home_decor-new-1",
    name: "\u0633\u062C\u0627\u062F\u0629 \u0623\u0631\u0636\u064A\u0629 \u0643\u0628\u064A\u0631\u0629 \u0644\u063A\u0631\u0641\u0629 \u0627\u0644\u062C\u0644\u0648\u0633",
    description: " . ",
    price: 25,
    quantity: 45,
    category: "home_decor",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.6,
    reviewsCount: 110
  },
  {
    id: "home_decor-new-2",
    name: "\u0644\u0648\u062D\u0629 \u0641\u0646\u064A\u0629 \u0643\u0628\u064A\u0631\u0629",
    description: " . ",
    price: 5,
    quantity: 55,
    category: "home_decor",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.5,
    reviewsCount: 120
  },
  {
    id: "home_decor-new-3",
    name: "\u0628\u0631\u0627\u062F\u064A \u063A\u0631\u0641 \u0627\u0644\u062C\u0644\u0648\u0633",
    description: " . ",
    price: 20,
    quantity: 25,
    category: "home_decor",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.6,
    reviewsCount: 110
  },
  {
    id: "home_decor-new-4",
    name: "\u0643\u0631\u0633\u064A \u0647\u0632\u0627\u0632 \u0645\u062F\u0648\u0631",
    description: " . ",
    price: 15,
    quantity: 25,
    category: "home_decor",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.8,
    reviewsCount: 170
  },
  {
    id: "home_decor-new-5",
    name: "\u0639\u0627\u0631\u0636\u0629 \u062E\u0634\u0628 \u0644\u0648\u0636\u0639 \u0627\u0644\u0642\u0637\u0639 \u0627\u0644\u0645\u0635\u0645\u0648\u062F\u0629",
    description: " . ",
    price: 45,
    quantity: 35,
    category: "home_decor",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.6,
    reviewsCount: 130
  },
  {
    id: "home_decor-new-6",
    name: "\u0645\u0632\u0647\u0631\u064A\u0629 \u0641\u0627\u062E\u0631\u0629 \u0630\u0648 \u062A\u0635\u0645\u064A\u0645 \u0639\u0631\u0628\u064A",
    description: " . ",
    price: 25,
    quantity: 45,
    category: "home_decor",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.7,
    reviewsCount: 100
  },
  {
    id: "home_decor-new-7",
    name: "\u0633\u062C\u0627\u062F\u0629 \u0623\u0631\u0636\u064A\u0629 \u0643\u0628\u064A\u0631\u0629 \u0644\u063A\u0631\u0641\u0629 \u0627\u0644\u0636\u064A\u0627\u0641\u0629",
    description: " . ",
    price: 45,
    quantity: 25,
    category: "home_decor",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.3,
    reviewsCount: 120
  },
  {
    id: "home_decor-new-8",
    name: "\u0633\u062C\u0627\u062F\u0629 \u0623\u0631\u0636\u064A\u0629 \u0635\u063A\u064A\u0631\u0629 \u0644\u063A\u0631\u0641\u0629 \u0627\u0644\u0623\u0637\u0641\u0627\u0644",
    description: " . ",
    price: 35,
    quantity: 35,
    category: "home_decor",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.4,
    reviewsCount: 130
  },
  {
    id: "bee-creams-new-1",
    name: "\u0643\u0631\u064A\u0645 \u0645\u0631\u0637\u0628 \u0637\u0628\u064A\u0639\u064A",
    description: " . ",
    price: 10,
    quantity: 35,
    category: "creams",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.7,
    reviewsCount: 120
  },
  {
    id: "bee-creams-new-2",
    name: "\u0643\u0631\u064A\u0645 \u062E\u0627\u0635 \u0644\u0644\u062A\u0634\u0642\u0642\u0627\u062A",
    description: " . ",
    price: 9,
    quantity: 65,
    category: "creams",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.5,
    reviewsCount: 145
  },
  {
    id: "bee-creams-new-3",
    name: "\u0643\u0631\u064A\u0645 \u0644\u0625\u0632\u0627\u0644\u0629 \u062D\u0628\u0648\u0628 \u0627\u0644\u0648\u062D\u0647",
    description: " . ",
    price: 13,
    quantity: 65,
    category: "creams",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.8,
    reviewsCount: 100
  },
  {
    id: "bee-creams-new-4",
    name: "\u0643\u0631\u064A\u0645 \u0645\u0641\u062A\u062D \u0628\u0634\u0631\u0629",
    description: " . ",
    price: 20,
    quantity: 30,
    category: "creams",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.7,
    reviewsCount: 160
  },
  {
    id: "bee-creams-new-5",
    name: "\u0643\u0631\u064A\u0645 \u0645\u0642\u0627\u0648\u0645\u0629 \u0627\u0644\u062A\u062C\u0627\u0639\u064A\u062F",
    description: " . ",
    price: 19,
    quantity: 75,
    category: "creams",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.8,
    reviewsCount: 160
  },
  {
    id: "bee-creams-new-6",
    name: "\u0643\u0631\u064A\u0645 \u0645\u0631\u0637\u0628 \u0634\u0641\u0627\u0647",
    description: " . ",
    price: 16,
    quantity: 65,
    category: "creams",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.5,
    reviewsCount: 150
  },
  {
    id: "bee-creams-new-7",
    name: "\u0643\u0631\u064A\u0645 \u0648\u0627\u0642\u064A \u0634\u0645\u0633\u064A",
    description: " . ",
    price: 12,
    quantity: 65,
    category: "creams",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.9,
    reviewsCount: 130
  },
  {
    id: "bee-creams-new-8",
    name: "\u0643\u0631\u064A\u0645 \u0628\u0627\u0644\u0639\u0633\u0644 \u0637\u0628\u064A\u0639\u064A",
    description: " . ",
    price: 15,
    quantity: 45,
    category: "creams",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.3,
    reviewsCount: 110
  },
  {
    id: "bee-herbs-new-1",
    name: "\u0634\u0627\u064A \u0627\u0644\u0623\u0639\u0634\u0627\u0628 \u0627\u0644\u0645\u0647\u062F\u0626\u0629",
    description: " . ",
    price: 19,
    quantity: 65,
    category: "herbs",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.7,
    reviewsCount: 110
  },
  {
    id: "bee-herbs-new-2",
    name: "\u0627\u0644\u064A\u0627\u0646\u0633\u0648\u0646",
    description: " . ",
    price: 1.99,
    quantity: 65,
    category: "herbs",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.9,
    reviewsCount: 140
  },
  {
    id: "bee-herbs-new-3",
    name: "\u0627\u0644\u062C\u064A\u0646\u0633\u0646\u063A",
    description: " . ",
    price: 1.99,
    quantity: 75,
    category: "herbs",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.7,
    reviewsCount: 100
  },
  {
    id: "bee-herbs-new-4",
    name: "\u0625\u0643\u0644\u064A\u0644 \u0627\u0644\u062C\u0628\u0644",
    description: " . ",
    price: 2.99,
    quantity: 45,
    category: "herbs",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.8,
    reviewsCount: 130
  },
  {
    id: "bee-herbs-new-5",
    name: "\u0627\u0644\u0643\u0631\u0643\u0645",
    description: " . ",
    price: 0.99,
    quantity: 25,
    category: "herbs",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.9,
    reviewsCount: 130
  },
  {
    id: "bee-herbs-new-6",
    name: "\u0627\u0644\u0646\u0639\u0646\u0627\u0639",
    description: " . ",
    price: 0.99,
    quantity: 95,
    category: "herbs",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.8,
    reviewsCount: 160
  },
  {
    id: "bee-herbs-new-7",
    name: "\u0627\u0644\u0632\u0646\u062C\u0628\u064A\u0644",
    description: " . ",
    price: 0.99,
    quantity: 75,
    category: "herbs",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.9,
    reviewsCount: 190
  },
  {
    id: "bee-herbs-new-8",
    name: "\u0627\u0644\u0628\u0627\u0628\u0648\u0646\u062C",
    description: " . ",
    price: 0.99,
    quantity: 45,
    category: "herbs",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.5,
    reviewsCount: 100
  },
  {
    id: "bee-shampoos-new-1",
    name: "\u0634\u0627\u0645\u0628\u0648 \u0639\u0633\u0644 \u0627\u0644\u0633\u062F\u0631",
    description: " . ",
    price: 10,
    quantity: 45,
    category: "shampoos",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.6,
    reviewsCount: 100
  },
  {
    id: "bee-shampoos-new-2",
    name: "\u0634\u0627\u0645\u0628\u0648 \u0636\u062F \u0627\u0644\u0642\u0634\u0631\u0629",
    description: " . ",
    price: 7,
    quantity: 25,
    category: "shampoos",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.4,
    reviewsCount: 130
  },
  {
    id: "bee-shampoos-new-3",
    name: "\u0634\u0627\u0645\u0628\u0648 \u0628\u0627\u0644\u0639\u0633\u0644 \u0627\u0644\u0637\u0628\u064A\u0639\u064A \u0644\u0644\u0623\u0637\u0641\u0627\u0644",
    description: " . ",
    price: 17,
    quantity: 45,
    category: "shampoos",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.6,
    reviewsCount: 100
  },
  {
    id: "bee-shampoos-new-4",
    name: "\u0634\u0627\u0645\u0628\u0648 \u0644\u062A\u062D\u0641\u064A\u0632 \u0646\u0645\u0648 \u0627\u0644\u0634\u0639\u0631",
    description: " . ",
    price: 15,
    quantity: 65,
    category: "shampoos",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.7,
    reviewsCount: 120
  },
  {
    id: "bee-shampoos-new-5",
    name: "\u0634\u0627\u0645\u0628\u0648 \u062A\u0631\u0637\u064A\u0628 \u0639\u0645\u064A\u0642 \u0628\u0627\u0644\u0634\u064A\u0627",
    description: " . ",
    price: 16,
    quantity: 25,
    category: "shampoos",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.5,
    reviewsCount: 170
  },
  {
    id: "bee-shampoos-new-6",
    name: "\u0634\u0627\u0645\u0628\u0648 \u0628\u0627\u0644\u0639\u0633\u0644 \u0648\u0627\u0644\u0639\u0643\u0628\u0631 \u0627\u0644\u0637\u0628\u064A\u0639\u064A",
    description: " . ",
    price: 12,
    quantity: 65,
    category: "shampoos",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.8,
    reviewsCount: 150
  },
  {
    id: "bee-shampoos-new-7",
    name: "\u0634\u0627\u0645\u0628\u0648 \u0627\u0644\u062E\u0627\u0635 \u0645\u0646 BeePharma",
    description: " . ",
    price: 15,
    quantity: 65,
    category: "shampoos",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.7,
    reviewsCount: 140
  },
  {
    id: "bee-shampoos-new-8",
    name: "\u0634\u0627\u0645\u0628\u0648 \u0627\u0644\u0642\u0637\u0631\u0627\u0646 \u0627\u0644\u0637\u0628\u064A\u0639\u064A",
    description: " . ",
    price: 13,
    quantity: 35,
    category: "shampoos",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.5,
    reviewsCount: 130
  },
  {
    id: "bee-incense-new-1",
    name: "\u0628\u062E\u0648\u0631 \u0627\u0644\u0639\u0648\u062F \u0627\u0644\u0641\u0627\u062E\u0631",
    description: " . ",
    price: 13,
    quantity: 45,
    category: "incense",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.7,
    reviewsCount: 150
  },
  {
    id: "bee-incense-new-2",
    name: "\u0628\u062E\u0648\u0631 \u0627\u0644\u0645\u0643\u064A",
    description: " . ",
    price: 19,
    quantity: 45,
    category: "incense",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4,
    reviewsCount: 180
  },
  {
    id: "bee-incense-new-3",
    name: "\u0628\u062E\u0648\u0631 \u0627\u0644\u0639\u0637\u0631\u064A \u0627\u0644\u0633\u0627\u0626\u0644",
    description: " . ",
    price: 9,
    quantity: 35,
    category: "incense",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.8,
    reviewsCount: 150
  },
  {
    id: "bee-incense-new-4",
    name: "\u0628\u062E\u0648\u0631 \u0627\u0644\u0643\u0644\u0645\u0646\u062A\u0627\u0646",
    description: " . ",
    price: 29,
    quantity: 55,
    category: "incense",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.6,
    reviewsCount: 170
  },
  {
    id: "bee-incense-new-5",
    name: "\u0628\u062E\u0648\u0631 \u0627\u0644\u0647\u0646\u062F\u064A",
    description: " . ",
    price: 18,
    quantity: 65,
    category: "incense",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.8,
    reviewsCount: 120
  },
  {
    id: "bee-incense-new-6",
    name: "\u0628\u062E\u0648\u0631 \u0627\u0644\u0645\u0627\u0644\u064A\u0632\u064A",
    description: " . ",
    price: 25,
    quantity: 45,
    category: "incense",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.5,
    reviewsCount: 140
  },
  {
    id: "bee-incense-new-7",
    name: "\u0628\u062E\u0648\u0631 \u0627\u0644\u0645\u0648\u0631\u0648\u0643\u064A",
    description: " . ",
    price: 29,
    quantity: 35,
    category: "incense",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.9,
    reviewsCount: 110
  },
  {
    id: "bee-incense-new-8",
    name: "\u0628\u062E\u0648\u0631 \u0627\u0627\u0644\u0643\u0645\u0628\u0648\u062F\u064A",
    description: " . ",
    price: 19,
    quantity: 25,
    category: "incense",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.4,
    reviewsCount: 120
  },
  {
    id: "bee-natural_soap-new-1",
    name: "\u0635\u0627\u0628\u0648\u0646 \u0627\u0644\u063A\u0627\u0631",
    description: " . ",
    price: 2.99,
    quantity: 95,
    category: "natural_soap",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.9,
    reviewsCount: 170
  },
  {
    id: "bee-natural_soap-new-2",
    name: "\u0635\u0627\u0628\u0648\u0646 \u0627\u0644\u0635\u0628\u0627\u0631 \u0627\u0644\u0623\u0644\u0648\u0641\u064A\u0631\u0627",
    description: " . ",
    price: 4.99,
    quantity: 65,
    category: "natural_soap",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.6,
    reviewsCount: 110
  },
  {
    id: "bee-natural_soap-new-3",
    name: "\u0635\u0627\u0628\u0648\u0646 \u0632\u064A\u062A \u0627\u0644\u0632\u064A\u062A\u0648\u0646 \u0627\u0644\u0637\u0628\u064A\u0639\u064A",
    description: " . ",
    price: 1.99,
    quantity: 85,
    category: "natural_soap",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.8,
    reviewsCount: 120
  },
  {
    id: "bee-natural_soap-new-4",
    name: "\u0635\u0627\u0628\u0648\u0646 \u0639\u0633\u0644 \u0627\u0644\u0646\u062D\u0644 \u0627\u0644\u0637\u0628\u064A\u0639\u064A",
    description: " . ",
    price: 3.99,
    quantity: 75,
    category: "natural_soap",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.7,
    reviewsCount: 160
  },
  {
    id: "bee-natural_soap-new-5",
    name: "\u0635\u0627\u0628\u0648\u0646 \u0627\u0644\u062C\u0644\u0633\u0631\u064A\u0646",
    description: " . ",
    price: 1.99,
    quantity: 75,
    category: "natural_soap",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.3,
    reviewsCount: 140
  },
  {
    id: "bee-natural_soap-new-6",
    name: "\u0635\u0627\u0628\u0648\u0646 \u0627\u0644\u0643\u0631\u0643\u0645",
    description: " . ",
    price: 5.99,
    quantity: 55,
    category: "natural_soap",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.5,
    reviewsCount: 130
  },
  {
    id: "bee-natural_soap-new-7",
    name: "\u0635\u0627\u0628\u0648\u0646 \u0627\u0644\u062E\u0627\u0635 \u0645\u0646 BeePharma",
    description: " . ",
    price: 4.99,
    quantity: 85,
    category: "natural_soap",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.8,
    reviewsCount: 140
  },
  {
    id: "bee-natural_soap-new-8",
    name: "\u0635\u0627\u0628\u0648\u0646 \u0627\u0644\u0643\u0628\u0631\u064A\u062A",
    description: " . ",
    price: 4.99,
    quantity: 65,
    category: "natural_soap",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.7,
    reviewsCount: 150
  },
  {
    id: "bee-therapeutic_mixtures-new-1",
    name: "\u0639\u0633\u0644 \u0627\u0644\u0633\u062F\u0631 \u0645\u0639 \u0627\u0644\u063A\u0630\u0627\u0621 \u0627\u0644\u0645\u0644\u0643\u064A \u0648\u062D\u0628\u0648\u0628 \u0627\u0644\u0644\u0642\u0627\u062D",
    description: " . ",
    price: 49,
    quantity: 75,
    category: "therapeutic_mixtures",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.7,
    reviewsCount: 120
  },
  {
    id: "bee-therapeutic_mixtures-new-2",
    name: "\u0627\u0644\u0634\u0645\u0631",
    description: " . ",
    price: 19,
    quantity: 15,
    category: "therapeutic_mixtures",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.2,
    reviewsCount: 100
  },
  {
    id: "bee-therapeutic_mixtures-new-3",
    name: "\u0639\u0633\u0644 \u0627\u0644\u0646\u062D\u0644 \u0645\u0639 \u0627\u0644\u0632\u0646\u062C\u0628\u064A\u0644 \u0627\u0644\u0645\u0637\u062D\u0648\u0646 \u0648\u0627\u0644\u0644\u064A\u0645\u0648\u0646",
    description: " . ",
    price: 14,
    quantity: 35,
    category: "therapeutic_mixtures",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.4,
    reviewsCount: 110
  },
  {
    id: "bee-therapeutic_mixtures-new-4",
    name: "\u0627\u0644\u0628\u0627\u0628\u0648\u0646\u062C \u0645\u0639 \u0632\u0647\u0648\u0631 \u0627\u0644\u0644\u0627\u0641\u0646\u062F\u0631",
    description: " . ",
    price: 11,
    quantity: 45,
    category: "therapeutic_mixtures",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.6,
    reviewsCount: 110
  },
  {
    id: "bee-therapeutic_mixtures-new-5",
    name: "\u0645\u0632\u064A\u062C \u0627\u0644\u0623\u0644\u0648\u0641\u064A\u0631\u0627 \u0627\u0644\u0635\u0628\u0627\u0631 \u0648\u0632\u064A\u062A \u062C\u0648\u0632 \u0627\u0644\u0647\u0646\u062F",
    description: " . ",
    price: 9,
    quantity: 25,
    category: "therapeutic_mixtures",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.9,
    reviewsCount: 100
  },
  {
    id: "bee-therapeutic_mixtures-new-6",
    name: "\u0627\u0644\u062D\u0628\u0629 \u0627\u0644\u0633\u0648\u062F\u0627\u0621 \u062D\u0628\u0629 \u0627\u0644\u0628\u0631\u0643\u0629 \u0645\u0639 \u0627\u0644\u0639\u0633\u0644 \u0627\u0644\u0637\u0628\u064A\u0639\u064A",
    description: " . ",
    price: 20,
    quantity: 65,
    category: "therapeutic_mixtures",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.7,
    reviewsCount: 140
  },
  {
    id: "bee-therapeutic_mixtures-new-7",
    name: "\u062E\u0644\u0637\u0629 \u0627\u0644\u0639\u0633\u0644 \u0648\u0627\u0644\u0628\u0631\u0648\u0628\u0648\u0644\u064A\u0633 \u0627\u0644\u0641\u0627\u0626\u0642\u0629",
    description: " . ",
    price: 19,
    quantity: 35,
    category: "therapeutic_mixtures",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.6,
    reviewsCount: 150
  },
  {
    id: "bee-therapeutic_mixtures-new-8",
    name: "\u0643\u0628\u0633\u0648\u0644\u0627\u062A \u0639\u0643\u0628\u0631 \u0627\u0644\u0646\u062D\u0644 (\u0627\u0644\u0628\u0631\u0648\u0628\u0648\u0644\u064A\u0633) \u0627\u0644\u0637\u0628\u064A\u0639\u064A\u0629",
    description: " . ",
    price: 39,
    quantity: 45,
    category: "therapeutic_mixtures",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.5,
    reviewsCount: 160
  },
  {
    id: "skin_care-new-1",
    name: "\u0633\u064A\u0631\u0648\u0645 \u0627\u0644\u0647\u064A\u0627\u0644\u0648\u0631\u0648\u0646\u064A\u0643 \u0623\u0633\u064A\u062F \u0627\u0644\u0645\u0631\u0643\u0632",
    description: " . ",
    price: 49,
    quantity: 65,
    category: "skin_care",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.5,
    reviewsCount: 140
  },
  {
    id: "skin_care-new-2",
    name: "\u0643\u0631\u064A\u0645 \u0627\u0644\u0639\u064A\u0646",
    description: " . ",
    price: 40,
    quantity: 75,
    category: "skin_care",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.9,
    reviewsCount: 130
  },
  {
    id: "skin_care-new-3",
    name: " \u0642\u0646\u0627\u0639 \u0627\u0644\u0648\u062C\u0647",
    description: " . ",
    price: 29,
    quantity: 55,
    category: "skin_care",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.8,
    reviewsCount: 160
  },
  {
    id: "skin_care-new-4",
    name: "\u0648\u0627\u0642\u064A \u0627\u0644\u0634\u0645\u0633 \u0644\u0644\u062D\u0645\u0627\u064A\u0629 \u0645\u0646 \u0623\u0636\u0631\u0627\u0631 \u0627\u0644\u0623\u0634\u0639\u0629 \u0641\u0648\u0642 \u0627\u0644\u0628\u0646\u0641\u0633\u062C\u064A\u0629",
    description: " . ",
    price: 65,
    quantity: 45,
    category: "skin_care",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.7,
    reviewsCount: 120
  },
  {
    id: "skin_care-new-5",
    name: "\u0627\u0644\u0645\u0631\u0637\u0628 \u0644\u062D\u0628\u0633 \u0627\u0644\u0645\u0627\u0621 \u062F\u0627\u062E\u0644 \u0627\u0644\u062C\u0644\u062F",
    description: " . ",
    price: 35,
    quantity: 35,
    category: "skin_care",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.8,
    reviewsCount: 130
  },
  {
    id: "skin_care-new-6",
    name: "\u0627\u0644\u0633\u064A\u0631\u0648\u0645 \u0644\u0645\u0639\u0627\u0644\u062C\u0629 \u0645\u0634\u0627\u0643\u0644 \u0627\u0644\u062C\u0644\u062F",
    description: " . ",
    price: 59,
    quantity: 35,
    category: "skin_care",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.3,
    reviewsCount: 160
  },
  {
    id: "skin_care-new-7",
    name: "\u0627\u0644\u062A\u0648\u0646\u0631 \u0644\u0636\u0628\u0637 \u062F\u0631\u062C\u0629 \u0627\u0644\u062D\u0645\u0648\u0636\u0629",
    description: " . ",
    price: 45,
    quantity: 35,
    category: "skin_care",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.6,
    reviewsCount: 170
  },
  {
    id: "skin_care-new-8",
    name: "\u0627\u0644\u063A\u0633\u0648\u0644 \u0644\u0625\u0632\u0627\u0644\u0629 \u0627\u0644\u0634\u0648\u0627\u0626\u0628",
    description: " . ",
    price: 37,
    quantity: 45,
    category: "skin_care",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.8,
    reviewsCount: 100
  },
  {
    id: "makeup-new-1",
    name: "\u0627\u0644\u0628\u0631\u0627\u064A\u0645\u0631",
    description: " . ",
    price: 45,
    quantity: 55,
    category: "makeup",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.5,
    reviewsCount: 120
  },
  {
    id: "makeup-new-2",
    name: "\u0628\u0631\u0627\u064A\u0645\u0631 \u0627\u0644\u0639\u064A\u0648\u0646",
    description: " . ",
    price: 29,
    quantity: 65,
    category: "makeup",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.4,
    reviewsCount: 170
  },
  {
    id: "makeup-new-3",
    name: "\u0623\u062D\u0645\u0631 \u0627\u0644\u062E\u062F\u0648\u062F",
    description: " . ",
    price: 39,
    quantity: 35,
    category: "makeup",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.7,
    reviewsCount: 160
  },
  {
    id: "makeup-new-4",
    name: "\u0627\u0644\u0643\u0648\u0646\u062A\u0648\u0631 \u0648\u0627\u0644\u0628\u0631\u0648\u0646\u0632\u0631",
    description: " . ",
    price: 49,
    quantity: 45,
    category: "makeup",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.8,
    reviewsCount: 150
  },
  {
    id: "makeup-new-5",
    name: "\u0627\u0627\u0644\u0647\u0627\u064A\u0644\u0627\u064A\u062A\u0631",
    description: " . ",
    price: 35,
    quantity: 75,
    category: "makeup",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.7,
    reviewsCount: 140
  },
  {
    id: "makeup-new-6",
    name: "\u0627\u0627\u0644\u0628\u0648\u062F\u0631\u0629",
    description: " . ",
    price: 49,
    quantity: 75,
    category: "makeup",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.3,
    reviewsCount: 110
  },
  {
    id: "makeup-new-7",
    name: "\u062E\u0627\u0641\u064A \u0627\u0644\u0639\u064A\u0648\u0628",
    description: " . ",
    price: 39,
    quantity: 65,
    category: "makeup",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.7,
    reviewsCount: 160
  },
  {
    id: "makeup-new-8",
    name: "\u0643\u0631\u064A\u0645 \u0627\u0644\u0623\u0633\u0627\u0633",
    description: " . ",
    price: 49,
    quantity: 45,
    category: "makeup",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.6,
    reviewsCount: 140
  },
  {
    id: "hair_care-new-1",
    name: "\u0633\u064A\u0631\u0648\u0645 \u0645\u063A\u0630\u064A \u0644\u0644\u0634\u0639\u0631 \u0628\u0627\u0644\u0623\u0631\u063A\u0627\u0646",
    description: " . ",
    price: 49,
    quantity: 65,
    category: "hair_care",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.6,
    reviewsCount: 120
  },
  {
    id: "hair_care-new-2",
    name: "\u0628\u0644\u0633\u0645 \u0627\u0644\u0634\u0639\u0631",
    description: " . ",
    price: 25,
    quantity: 45,
    category: "hair_care",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.3,
    reviewsCount: 130
  },
  {
    id: "hair_care-new-3",
    name: "\u0633\u064A\u0631\u0648\u0645 \u0627\u0644\u0643\u062B\u0627\u0641\u0629",
    description: " . ",
    price: 29,
    quantity: 25,
    category: "hair_care",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.5,
    reviewsCount: 150
  },
  {
    id: "hair_care-new-4",
    name: "\u0633\u064A\u0631\u0648\u0645 \u0627\u0644\u062A\u0631\u0637\u064A\u0628 \u0648\u0627\u0644\u0644\u0645\u0639\u0627\u0646",
    description: " . ",
    price: 39,
    quantity: 55,
    category: "hair_care",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.8,
    reviewsCount: 140
  },
  {
    id: "hair_care-new-5",
    name: "\u0633\u064A\u0631\u0648\u0645 \u0644\u0639\u0644\u0627\u062C \u0627\u0644\u062A\u0633\u0627\u0642\u0637 \u0648\u062A\u0642\u0648\u064A\u0629 \u0627\u0644\u0628\u0635\u064A\u0644\u0627\u062A",
    description: " . ",
    price: 19,
    quantity: 35,
    category: "hair_care",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.8,
    reviewsCount: 100
  },
  {
    id: "hair_care-new-6",
    name: "\u0643\u0631\u064A\u0645\u0627\u062A \u062A\u062D\u062F\u064A\u062F \u0627\u0644\u0634\u0639\u0631 \u0627\u0644\u0643\u064A\u0631\u0644\u064A",
    description: " . ",
    price: 29,
    quantity: 25,
    category: "hair_care",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.1,
    reviewsCount: 110
  },
  {
    id: "hair_care-new-7",
    name: "\u0627\u0644\u0643\u0631\u064A\u0645\u0627\u062A \u0627\u0644\u0648\u0627\u0642\u064A\u0629 \u0645\u0646 \u0627\u0644\u062D\u0631\u0627\u0631\u0629",
    description: " . ",
    price: 28,
    quantity: 45,
    category: "hair_care",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.4,
    reviewsCount: 150
  },
  {
    id: "hair_care-new-8",
    name: "\u0643\u0631\u064A\u0645\u0627\u062A \u0627\u0644\u0645\u0639\u0627\u0644\u062C\u0629 \u0648\u0627\u0644\u062A\u063A\u0630\u064A\u0629",
    description: " . ",
    price: 39,
    quantity: 35,
    category: "hair_care",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.7,
    reviewsCount: 130
  },
  {
    id: "mens_perfumes-new-1",
    name: "\u0639\u0637\u0631 \u0632\u064A\u0631\u062C\u0648\u0641 \u0623\u0644\u0643\u0633\u0627\u0646\u062F\u0631\u064A\u0627",
    description: " . ",
    price: 400,
    quantity: 25,
    category: "mens_perfumes",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.8,
    reviewsCount: 110
  },
  {
    id: "mens_perfumes-new-2",
    name: "\u0639\u0637\u0631 \u062A\u0648\u0645 \u0641\u0648\u0631\u062F \u0639\u0648\u062F \u0648\u0648\u062F",
    description: " . ",
    price: 420,
    quantity: 65,
    category: "mens_perfumes",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.2,
    reviewsCount: 170
  },
  {
    id: "mens_perfumes-new-3",
    name: "\u0639\u0637\u0631 \u0631\u064A\u0641 \u063A\u0648\u0634 \u0645\u0646 \u0625\u064A\u0641 \u0633\u0627\u0646 \u0644\u0648\u0631\u0627\u0646",
    description: " . ",
    price: 350,
    quantity: 45,
    category: "mens_perfumes",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.3,
    reviewsCount: 120
  },
  {
    id: "mens_perfumes-new-4",
    name: "\u0639\u0637\u0631 \u0628\u0627\u064A\u0644\u0648\u062A \u063A\u0627\u0631\u0645\u064A\u0646\u062A \u0645\u0646 \u0628\u0631\u0627\u062F\u0627",
    description: " . ",
    price: 150,
    quantity: 25,
    category: "mens_perfumes",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.9,
    reviewsCount: 100
  },
  {
    id: "mens_perfumes-new-5",
    name: "\u0639\u0637\u0631 \u0623\u0648\u0645\u0628\u0631 \u0646\u0648\u0645\u0627\u062F \u0645\u0646 \u0644\u0648\u064A\u0633 \u0641\u0648\u064A\u062A\u0648\u0646",
    description: " . ",
    price: 100,
    quantity: 35,
    category: "mens_perfumes",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.5,
    reviewsCount: 160
  },
  {
    id: "mens_perfumes-new-6",
    name: "\u0639\u0637\u0631 \u0628\u0644\u0648 \u062F\u064A \u0634\u0627\u0646\u064A\u0644",
    description: " . ",
    price: 450,
    quantity: 65,
    category: "mens_perfumes",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.4,
    reviewsCount: 150
  },
  {
    id: "mens_perfumes-new-7",
    name: "\u0639\u0637\u0631 \u0643\u0631\u064A\u062F \u0623\u0641\u064A\u0646\u062A\u0633",
    description: " . ",
    price: 250,
    quantity: 55,
    category: "mens_perfumes",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.6,
    reviewsCount: 140
  },
  {
    id: "mens_perfumes-new-8",
    name: "\u0639\u0637\u0631 \u0633\u0648\u0641\u0627\u062C \u0625\u0644\u0643\u0633\u064A\u0631 \u0645\u0646 \u062F\u064A\u0648\u0631",
    description: " . ",
    price: 300,
    quantity: 35,
    category: "mens_perfumes",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.6,
    reviewsCount: 140
  },
  {
    id: "womens_perfumes-new-1",
    name: "\u0639\u0637\u0631 \u062A\u0648\u0645 \u0641\u0648\u0631\u062F \u0628\u0644\u0627\u0643 \u0623\u0648\u0631\u0643\u064A\u062F",
    description: " . ",
    price: 400,
    quantity: 45,
    category: "womens_perfumes",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.7,
    reviewsCount: 180
  },
  {
    id: "womens_perfumes-new-2",
    name: "\u0639\u0637\u0631 \u062C\u0648\u0631\u062C\u064A\u0648 \u0623\u0631\u0645\u0627\u0646\u064A \u0633\u064A \u0628\u0627\u0633\u064A\u0648\u0646\u064A",
    description: " . ",
    price: 200,
    quantity: 45,
    category: "womens_perfumes",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.6,
    reviewsCount: 140
  },
  {
    id: "womens_perfumes-new-3",
    name: "\u0639\u0637\u0631 \u0643\u0627\u0631\u0648\u0644\u064A\u0646\u0627 \u0647\u064A\u0631\u064A\u0631\u0627 \u062C\u0648\u062F \u062C\u064A\u0631\u0644",
    description: " . ",
    price: 420,
    quantity: 35,
    category: "womens_perfumes",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.8,
    reviewsCount: 165
  },
  {
    id: "womens_perfumes-new-4",
    name: "\u0639\u0637\u0631 \u0628\u0627\u064A\u0633\u0648\u0646 \u0631\u0648\u062C",
    description: " . ",
    price: 370,
    quantity: 65,
    category: "womens_perfumes",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.7,
    reviewsCount: 190
  },
  {
    id: "womens_perfumes-new-5",
    name: "\u0639\u0637\u0631 \u0628\u0631\u0627\u062F\u0627 \u0628\u0627\u0631\u0627\u062F\u0648\u0643\u0633",
    description: " . ",
    price: 500,
    quantity: 35,
    category: "womens_perfumes",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.9,
    reviewsCount: 175
  },
  {
    id: "womens_perfumes-new-6",
    name: "\u0639\u0637\u0631 \u0625\u064A\u0641 \u0633\u0627\u0646 \u0644\u0648\u0631\u0627\u0646 \u0644\u064A\u0628\u0631 \u0625\u0646\u062A\u0646\u0633",
    description: " . ",
    price: 460,
    quantity: 75,
    category: "womens_perfumes",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.8,
    reviewsCount: 185
  },
  {
    id: "womens_perfumes-new-7",
    name: "\u0639\u0637\u0631 \u062F\u064A\u0648\u0631 \u062C\u0627\u062F\u0648\u0631",
    description: " . ",
    price: 390,
    quantity: 35,
    category: "womens_perfumes",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.8,
    reviewsCount: 170
  },
  {
    id: "womens_perfumes-new-8",
    name: "\u0639\u0637\u0631 \u0634\u0627\u0646\u064A\u0644 \u0643\u0648\u0643\u0648 \u0645\u062F\u0645\u0648\u0632\u064A\u0644",
    description: " . ",
    price: 450,
    quantity: 65,
    category: "womens_perfumes",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.7,
    reviewsCount: 190
  },
  {
    id: "mens_care-new-1",
    name: "\u0632\u064A\u0648\u062A \u0648\u0628\u0644\u0633\u0645 \u0627\u0644\u0644\u062D\u064A\u0629",
    description: " . ",
    price: 40,
    quantity: 75,
    category: "mens_care",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.1,
    reviewsCount: 60
  },
  {
    id: "mens_care-new-2",
    name: "\u063A\u0633\u0648\u0644 \u0644\u0644\u062C\u0633\u0645",
    description: " . ",
    price: 13,
    quantity: 35,
    category: "mens_care",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4,
    reviewsCount: 10
  },
  {
    id: "mens_care-new-3",
    name: "\u0631\u063A\u0648\u0629 \u062D\u0644\u0627\u0642\u0629 \u0648\u063A\u0633\u0648\u0644 \u0639\u0646\u0627\u064A\u0629 \u0644\u0644\u0631\u062C\u0627\u0644",
    description: " . ",
    price: 4,
    quantity: 75,
    category: "mens_care",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.1,
    reviewsCount: 60
  },
  {
    id: "mens_care-new-4",
    name: "\u0634\u0641\u0631\u0627\u062A \u062D\u0644\u0627\u0641\u0629 \u0645\u0646 \u0634\u0631\u0643\u0629 Gillette",
    description: " . ",
    price: 17,
    quantity: 35,
    category: "mens_care",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.7,
    reviewsCount: 30
  },
  {
    id: "mens_care-new-4",
    name: "\u0643\u0631\u064A\u0645 \u0644\u062A\u0635\u0641\u064A\u0641 \u0627\u0644\u0634\u0639\u0631",
    description: " . ",
    price: 23,
    quantity: 45,
    category: "mens_care",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.5,
    reviewsCount: 40
  },
  {
    id: "mens_care-new-6",
    name: "\u0632\u064A\u062A \u0625\u0646\u0628\u0627\u062A \u0627\u0644\u0644\u062D\u064A\u0629",
    description: " . ",
    price: 19,
    quantity: 65,
    category: "mens_care",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.4,
    reviewsCount: 20
  },
  {
    id: "mens_care-new-7",
    name: "\u0644\u0648\u0634\u0646 \u0645\u0627 \u0628\u0639\u062F \u0627\u0644\u062D\u0644\u0627\u0642\u0629",
    description: " . ",
    price: 4.99,
    quantity: 65,
    category: "mens_care",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.5,
    reviewsCount: 20
  },
  {
    id: "mens_care-new-8",
    name: "\u0643\u0631\u064A\u0645 \u0627\u0644\u062D\u0644\u0627\u0642\u0629",
    description: " . ",
    price: 10,
    quantity: 85,
    category: "mens_care",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.2,
    reviewsCount: 30
  },
  {
    id: "seasonal_products-new-1",
    name: "\u0648\u0627\u0642\u064A \u0634\u0645\u0633 \u062E\u0641\u064A\u0641",
    description: " . ",
    price: 20,
    quantity: 85,
    category: "seasonal_products",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.5,
    reviewsCount: 90
  },
  {
    id: "seasonal_products-new-2",
    name: "\u0645\u0642\u0634\u0631 \u0644\u0637\u064A\u0641",
    description: " . ",
    price: 20,
    quantity: 45,
    category: "seasonal_products",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.6,
    reviewsCount: 70
  },
  {
    id: "seasonal_products-new-3",
    name: "\u0632\u064A\u062A \u0627\u0644\u0648\u062C\u0647 \u0627\u0644\u0645\u063A\u0630\u064A",
    description: " . ",
    price: 29,
    quantity: 55,
    category: "seasonal_products",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.7,
    reviewsCount: 70
  },
  {
    id: "seasonal_products-new-4",
    name: "\u0645\u0631\u0637\u0628 \u0643\u0631\u064A\u0645\u064A",
    description: " . ",
    price: 19,
    quantity: 25,
    category: "seasonal_products",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.6,
    reviewsCount: 40
  },
  {
    id: "seasonal_products-new-5",
    name: "\u0645\u0646\u0638\u0641 \u0644\u0637\u064A\u0641",
    description: " . ",
    price: 12,
    quantity: 65,
    category: "seasonal_products",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.4,
    reviewsCount: 80
  },
  {
    id: "seasonal_products-new-6",
    name: "\u0628\u062E\u0627\u062E \u0631\u0630\u0627\u0630 \u0627\u0644\u0648\u062C\u0647",
    description: " . ",
    price: 6,
    quantity: 75,
    category: "seasonal_products",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.8,
    reviewsCount: 110
  },
  {
    id: "seasonal_products-new-7",
    name: "\u0627\u0644\u062C\u0644 \u0627\u0644\u0645\u0631\u0637\u0628 \u0627\u0644\u0645\u0627\u0626\u064A",
    description: " . ",
    price: 15,
    quantity: 45,
    category: "seasonal_products",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.7,
    reviewsCount: 80
  },
  {
    id: "seasonal_products-new-8",
    name: "\u0633\u064A\u0631\u0648\u0645 \u0641\u064A\u062A\u0627\u0645\u064A\u0646 \u0633\u064A",
    description: " . ",
    price: 16,
    quantity: 35,
    category: "seasonal_products",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.6,
    reviewsCount: 70
  },
  {
    id: "beauty_devices-new-1",
    name: "\u062C\u0647\u0627\u0632 \u0625\u0632\u0627\u0644\u0629 \u0627\u0644\u0634\u0639\u0631 \u0628\u0627\u0644\u0644\u064A\u0632\u0631 \u0627\u0644\u0645\u0646\u0632\u0644\u064A",
    description: " . ",
    price: 50,
    quantity: 35,
    category: "beauty_devices",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.8,
    reviewsCount: 100
  },
  {
    id: "beauty_devices-new-2",
    name: "\u062C\u0647\u0627\u0632 \u062A\u0642\u0634\u064A\u0631 \u0627\u0644\u062C\u0644\u062F \u0628\u0627\u0644\u0643\u0631\u064A\u0633\u062A\u0627\u0644",
    description: " . ",
    price: 60,
    quantity: 25,
    category: "beauty_devices",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.4,
    reviewsCount: 130
  },
  {
    id: "beauty_devices-new-3",
    name: "\u062C\u0647\u0627\u0632 \u0628\u062E\u0627\u0631 \u0627\u0644\u0648\u062C\u0647 \u0627\u0644\u0623\u064A\u0648\u0646\u064A",
    description: " . ",
    price: 70,
    quantity: 45,
    category: "beauty_devices",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.8,
    reviewsCount: 140
  },
  {
    id: "beauty_devices-new-4",
    name: "\u062C\u0647\u0627\u0632 \u062A\u0646\u0638\u064A\u0641 \u0627\u0644\u0648\u062C\u0647 \u0627\u0644\u0633\u064A\u0644\u064A\u0643\u0648\u0646\u064A",
    description: " . ",
    price: 80,
    quantity: 25,
    category: "beauty_devices",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.7,
    reviewsCount: 150
  },
  {
    id: "beauty_devices-new-5",
    name: "\u062C\u0647\u0627\u0632 \u062A\u062F\u0644\u064A\u0643 \u0648\u0634\u062F \u0627\u0644\u0648\u062C\u0647 \u0628\u062A\u0642\u0646\u064A\u0629 \u0627\u0644\u0636\u0648\u0621",
    description: " . ",
    price: 73,
    quantity: 55,
    category: "beauty_devices",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.6,
    reviewsCount: 120
  },
  {
    id: "beauty_devices-new-6",
    name: "\u062C\u0647\u0627\u0632 \u062A\u0646\u0638\u064A\u0641 \u0627\u0644\u0628\u0634\u0631\u0629 \u0627\u0644\u0639\u0645\u064A\u0642",
    description: " . ",
    price: 85,
    quantity: 65,
    category: "beauty_devices",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.7,
    reviewsCount: 110
  },
  {
    id: "beauty_devices-new-7",
    name: "\u062C\u0647\u0627\u0632 \u0627\u0644\u0647\u0627\u064A\u0641\u0648",
    description: " . ",
    price: 75,
    quantity: 65,
    category: "beauty_devices",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.6,
    reviewsCount: 130
  },
  {
    id: "beauty_devices-new-8",
    name: "\u062C\u0647\u0627\u0632 \u0634\u062F \u0627\u0644\u0648\u062C\u0647 \u0628\u0627\u0644\u062A\u0631\u062F\u062F\u0627\u062A \u0627\u0644\u0631\u0627\u062F\u064A\u0648\u064A\u0629",
    description: " . ",
    price: 45,
    quantity: 45,
    category: "beauty_devices",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.7,
    reviewsCount: 120
  },
  {
    id: "womens_perfumes-new-2",
    name: "\u0639\u0637\u0631 \u062C\u0648\u0631\u062C\u064A\u0648 \u0623\u0631\u0645\u0627\u0646\u064A \u0633\u064A \u0628\u0627\u0633\u064A\u0648\u0646\u064A",
    description: " . ",
    price: 200,
    quantity: 45,
    category: "womens_perfumes",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.6,
    reviewsCount: 140
  },
  {
    id: "womens_perfumes-new-3",
    name: "\u0639\u0637\u0631 \u0643\u0627\u0631\u0648\u0644\u064A\u0646\u0627 \u0647\u064A\u0631\u064A\u0631\u0627 \u062C\u0648\u062F \u062C\u064A\u0631\u0644",
    description: " . ",
    price: 420,
    quantity: 35,
    category: "womens_perfumes",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.8,
    reviewsCount: 165
  },
  {
    id: "womens_perfumes-new-4",
    name: "\u0639\u0637\u0631 \u0628\u0627\u064A\u0633\u0648\u0646 \u0631\u0648\u062C",
    description: " . ",
    price: 370,
    quantity: 65,
    category: "womens_perfumes",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.7,
    reviewsCount: 190
  },
  {
    id: "womens_perfumes-new-5",
    name: "\u0639\u0637\u0631 \u0628\u0631\u0627\u062F\u0627 \u0628\u0627\u0631\u0627\u062F\u0648\u0643\u0633",
    description: " . ",
    price: 500,
    quantity: 35,
    category: "womens_perfumes",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.9,
    reviewsCount: 175
  },
  {
    id: "womens_perfumes-new-6",
    name: "\u0639\u0637\u0631 \u0625\u064A\u0641 \u0633\u0627\u0646 \u0644\u0648\u0631\u0627\u0646 \u0644\u064A\u0628\u0631 \u0625\u0646\u062A\u0646\u0633",
    description: " . ",
    price: 460,
    quantity: 75,
    category: "womens_perfumes",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.8,
    reviewsCount: 185
  },
  {
    id: "womens_perfumes-new-7",
    name: "\u0639\u0637\u0631 \u062F\u064A\u0648\u0631 \u062C\u0627\u062F\u0648\u0631",
    description: " . ",
    price: 390,
    quantity: 35,
    category: "womens_perfumes",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.8,
    reviewsCount: 170
  },
  {
    id: "womens_perfumes-new-8",
    name: "\u0639\u0637\u0631 \u0634\u0627\u0646\u064A\u0644 \u0643\u0648\u0643\u0648 \u0645\u062F\u0645\u0648\u0632\u064A\u0644",
    description: " . ",
    price: 450,
    quantity: 65,
    category: "womens_perfumes",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.7,
    reviewsCount: 190
  },
  {
    id: "mens_care-new-1",
    name: "\u0632\u064A\u0648\u062A \u0648\u0628\u0644\u0633\u0645 \u0627\u0644\u0644\u062D\u064A\u0629",
    description: " . ",
    price: 40,
    quantity: 75,
    category: "mens_care",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.1,
    reviewsCount: 60
  },
  {
    id: "mens_care-new-2",
    name: "\u063A\u0633\u0648\u0644 \u0644\u0644\u062C\u0633\u0645",
    description: " . ",
    price: 13,
    quantity: 35,
    category: "mens_care",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4,
    reviewsCount: 10
  },
  {
    id: "mens_care-new-3",
    name: "\u0631\u063A\u0648\u0629 \u062D\u0644\u0627\u0642\u0629 \u0648\u063A\u0633\u0648\u0644 \u0639\u0646\u0627\u064A\u0629 \u0644\u0644\u0631\u062C\u0627\u0644",
    description: " . ",
    price: 4,
    quantity: 75,
    category: "mens_care",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.1,
    reviewsCount: 60
  },
  {
    id: "mens_care-new-4",
    name: "\u0634\u0641\u0631\u0627\u062A \u062D\u0644\u0627\u0641\u0629 \u0645\u0646 \u0634\u0631\u0643\u0629 Gillette",
    description: " . ",
    price: 17,
    quantity: 35,
    category: "mens_care",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.7,
    reviewsCount: 30
  },
  {
    id: "mens_care-new-4",
    name: "\u0643\u0631\u064A\u0645 \u0644\u062A\u0635\u0641\u064A\u0641 \u0627\u0644\u0634\u0639\u0631",
    description: " . ",
    price: 23,
    quantity: 45,
    category: "mens_care",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.5,
    reviewsCount: 40
  },
  {
    id: "mens_care-new-6",
    name: "\u0632\u064A\u062A \u0625\u0646\u0628\u0627\u062A \u0627\u0644\u0644\u062D\u064A\u0629",
    description: " . ",
    price: 19,
    quantity: 65,
    category: "mens_care",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.4,
    reviewsCount: 20
  },
  {
    id: "mens_care-new-7",
    name: "\u0644\u0648\u0634\u0646 \u0645\u0627 \u0628\u0639\u062F \u0627\u0644\u062D\u0644\u0627\u0642\u0629",
    description: " . ",
    price: 4.99,
    quantity: 65,
    category: "mens_care",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.5,
    reviewsCount: 20
  },
  {
    id: "mens_care-new-8",
    name: "\u0643\u0631\u064A\u0645 \u0627\u0644\u062D\u0644\u0627\u0642\u0629",
    description: " . ",
    price: 10,
    quantity: 85,
    category: "mens_care",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.2,
    reviewsCount: 30
  },
  {
    id: "seasonal_products-new-1",
    name: "\u0648\u0627\u0642\u064A \u0634\u0645\u0633 \u062E\u0641\u064A\u0641",
    description: " . ",
    price: 20,
    quantity: 85,
    category: "seasonal_products",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.5,
    reviewsCount: 90
  },
  {
    id: "seasonal_products-new-2",
    name: "\u0645\u0642\u0634\u0631 \u0644\u0637\u064A\u0641",
    description: " . ",
    price: 20,
    quantity: 45,
    category: "seasonal_products",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.6,
    reviewsCount: 70
  },
  {
    id: "seasonal_products-new-3",
    name: "\u0632\u064A\u062A \u0627\u0644\u0648\u062C\u0647 \u0627\u0644\u0645\u063A\u0630\u064A",
    description: " . ",
    price: 29,
    quantity: 55,
    category: "seasonal_products",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.7,
    reviewsCount: 70
  },
  {
    id: "seasonal_products-new-4",
    name: "\u0645\u0631\u0637\u0628 \u0643\u0631\u064A\u0645\u064A",
    description: " . ",
    price: 19,
    quantity: 25,
    category: "seasonal_products",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.6,
    reviewsCount: 40
  },
  {
    id: "seasonal_products-new-5",
    name: "\u0645\u0646\u0638\u0641 \u0644\u0637\u064A\u0641",
    description: " . ",
    price: 12,
    quantity: 65,
    category: "seasonal_products",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.4,
    reviewsCount: 80
  },
  {
    id: "seasonal_products-new-6",
    name: "\u0628\u062E\u0627\u062E \u0631\u0630\u0627\u0630 \u0627\u0644\u0648\u062C\u0647",
    description: " . ",
    price: 6,
    quantity: 75,
    category: "seasonal_products",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.8,
    reviewsCount: 110
  },
  {
    id: "seasonal_products-new-7",
    name: "\u0627\u0644\u062C\u0644 \u0627\u0644\u0645\u0631\u0637\u0628 \u0627\u0644\u0645\u0627\u0626\u064A",
    description: " . ",
    price: 15,
    quantity: 45,
    category: "seasonal_products",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.7,
    reviewsCount: 80
  },
  {
    id: "seasonal_products-new-8",
    name: "\u0633\u064A\u0631\u0648\u0645 \u0641\u064A\u062A\u0627\u0645\u064A\u0646 \u0633\u064A",
    description: " . ",
    price: 16,
    quantity: 35,
    category: "seasonal_products",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.6,
    reviewsCount: 70
  },
  {
    id: "beauty_devices-new-1",
    name: "\u062C\u0647\u0627\u0632 \u0625\u0632\u0627\u0644\u0629 \u0627\u0644\u0634\u0639\u0631 \u0628\u0627\u0644\u0644\u064A\u0632\u0631 \u0627\u0644\u0645\u0646\u0632\u0644\u064A",
    description: " . ",
    price: 50,
    quantity: 35,
    category: "beauty_devices",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.8,
    reviewsCount: 100
  },
  {
    id: "beauty_devices-new-2",
    name: "\u062C\u0647\u0627\u0632 \u062A\u0642\u0634\u064A\u0631 \u0627\u0644\u062C\u0644\u062F \u0628\u0627\u0644\u0643\u0631\u064A\u0633\u062A\u0627\u0644",
    description: " . ",
    price: 60,
    quantity: 25,
    category: "beauty_devices",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.4,
    reviewsCount: 130
  },
  {
    id: "beauty_devices-new-3",
    name: "\u062C\u0647\u0627\u0632 \u0628\u062E\u0627\u0631 \u0627\u0644\u0648\u062C\u0647 \u0627\u0644\u0623\u064A\u0648\u0646\u064A",
    description: " . ",
    price: 70,
    quantity: 45,
    category: "beauty_devices",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.8,
    reviewsCount: 140
  },
  {
    id: "beauty_devices-new-4",
    name: "\u062C\u0647\u0627\u0632 \u062A\u0646\u0638\u064A\u0641 \u0627\u0644\u0648\u062C\u0647 \u0627\u0644\u0633\u064A\u0644\u064A\u0643\u0648\u0646\u064A",
    description: " . ",
    price: 80,
    quantity: 25,
    category: "beauty_devices",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.7,
    reviewsCount: 150
  },
  {
    id: "beauty_devices-new-5",
    name: "\u062C\u0647\u0627\u0632 \u062A\u062F\u0644\u064A\u0643 \u0648\u0634\u062F \u0627\u0644\u0648\u062C\u0647 \u0628\u062A\u0642\u0646\u064A\u0629 \u0627\u0644\u0636\u0648\u0621",
    description: " . ",
    price: 73,
    quantity: 55,
    category: "beauty_devices",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.6,
    reviewsCount: 120
  },
  {
    id: "beauty_devices-new-6",
    name: "\u062C\u0647\u0627\u0632 \u062A\u0646\u0638\u064A\u0641 \u0627\u0644\u0628\u0634\u0631\u0629 \u0627\u0644\u0639\u0645\u064A\u0642",
    description: " . ",
    price: 85,
    quantity: 65,
    category: "beauty_devices",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.7,
    reviewsCount: 110
  },
  {
    id: "beauty_devices-new-7",
    name: "\u062C\u0647\u0627\u0632 \u0627\u0644\u0647\u0627\u064A\u0641\u0648",
    description: " . ",
    price: 75,
    quantity: 65,
    category: "beauty_devices",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.6,
    reviewsCount: 130
  },
  {
    id: "beauty_devices-new-8",
    name: "\u062C\u0647\u0627\u0632 \u0634\u062F \u0627\u0644\u0648\u062C\u0647 \u0628\u0627\u0644\u062A\u0631\u062F\u062F\u0627\u062A \u0627\u0644\u0631\u0627\u062F\u064A\u0648\u064A\u0629",
    description: " . ",
    price: 45,
    quantity: 45,
    category: "beauty_devices",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.7,
    reviewsCount: 120
  }
];

// server.ts
var import_fs = __toESM(require("fs"), 1);
var import_meta = {};
var getFilename = () => {
  try {
    return (0, import_url.fileURLToPath)(import_meta.url);
  } catch {
    return typeof __filename !== "undefined" ? __filename : "";
  }
};
var __filename = getFilename();
var __dirname = import_path.default.dirname(__filename);
var PRODUCTS_FILE_PATH = import_path.default.join(process.cwd(), "products-data.json");
function getStoredProducts() {
  try {
    if (import_fs.default.existsSync(PRODUCTS_FILE_PATH)) {
      const data = import_fs.default.readFileSync(PRODUCTS_FILE_PATH, "utf-8");
      return JSON.parse(data);
    }
  } catch (err) {
    console.error("Error reading stored products:", err);
  }
  return null;
}
function saveStoredProducts(products) {
  try {
    import_fs.default.writeFileSync(PRODUCTS_FILE_PATH, JSON.stringify(products, null, 2), "utf-8");
    return true;
  } catch (err) {
    console.error("Error saving products:", err);
    return false;
  }
}
function getGeminiClient() {
  let apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey.trim() === "" || apiKey.startsWith("AQ.")) {
    apiKey = "AIzaSyDqE8t7nECJoKrWTQnXXCktRdcW9S7TnQw";
  }
  return new import_genai.GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build"
      }
    }
  });
}
async function startServer() {
  const app = (0, import_express.default)();
  const server = (0, import_http.createServer)(app);
  const wss = new import_ws.WebSocketServer({ server });
  const PORT = 3e3;
  app.use(import_express.default.json());
  app.get("/api/products", (req, res) => {
    const stored = getStoredProducts();
    if (stored) {
      return res.json({ hasStored: true, products: stored });
    }
    return res.json({ hasStored: false, products: INITIAL_PRODUCTS });
  });
  app.post("/api/products", (req, res) => {
    const products = req.body;
    if (Array.isArray(products)) {
      const success = saveStoredProducts(products);
      if (success) {
        wss.clients.forEach((client) => {
          if (client.readyState === import_ws.WebSocket.OPEN) {
            client.send(JSON.stringify({ type: "UPDATE_PRODUCTS", data: products }));
          }
        });
        return res.json({ success: true, message: "Products saved" });
      }
      return res.status(500).json({ error: "Failed to write products to disk" });
    }
    return res.status(400).json({ error: "Invalid products data format. Expected an array." });
  });
  app.post("/api/gemini/recommend", async (req, res) => {
    const { viewedProducts, allProducts, purchaseHistory } = req.body;
    try {
      const viewedNames = (viewedProducts || []).map((p) => p.name).join(", ");
      const purchasedNames = (purchaseHistory || []).flatMap((o) => (o.items || []).map((i) => i.name)).join(", ");
      const availableProducts = (allProducts || []).map((p) => ({ id: p.id, name: p.name, category: p.category }));
      const ai = getGeminiClient();
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: `Analyze user behavior to provide highly accurate product recommendations. 
        User viewed: [${viewedNames}]. 
        User purchased: [${purchasedNames}]. 
        Available products: ${JSON.stringify(availableProducts)}. 
        Select the 4 most relevant product IDs. Ensure the selection is logical and precise based on categories and user interests. 
        Return ONLY a JSON array of product IDs.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: import_genai.Type.ARRAY,
            items: { type: import_genai.Type.STRING }
          }
        }
      });
      res.json({ result: JSON.parse(response.text || "[]") });
    } catch (error) {
      console.warn("Server AI Recommendation failed, using programmatic fallback:", error.message || error);
      const viewedIds = new Set((viewedProducts || []).map((p) => p.id));
      const viewedCategories = new Set((viewedProducts || []).map((p) => p.category).filter(Boolean));
      const selected = /* @__PURE__ */ new Set();
      const matchingCategoryProducts = (allProducts || []).filter(
        (p) => !viewedIds.has(p.id) && viewedCategories.has(p.category)
      );
      for (const p of matchingCategoryProducts) {
        if (selected.size >= 4) break;
        selected.add(p.id);
      }
      if (selected.size < 4) {
        for (const p of allProducts || []) {
          if (selected.size >= 4) break;
          if (!viewedIds.has(p.id)) {
            selected.add(p.id);
          }
        }
      }
      if (selected.size < 4) {
        for (const p of allProducts || []) {
          if (selected.size >= 4) break;
          selected.add(p.id);
        }
      }
      res.json({ result: Array.from(selected) });
    }
  });
  app.post("/api/gemini/chat", async (req, res) => {
    const { message, products, history } = req.body;
    try {
      const productContext = (products || []).map((p) => `${p.name} (${p.category}): ${p.description} - Price: ${p.price}`).join("\n");
      const formattedHistory = (history || []).map((h) => ({
        role: h.role === "user" ? "user" : "model",
        parts: Array.isArray(h.parts) ? h.parts : [{ text: String(h.parts) }]
      }));
      const ai = getGeminiClient();
      const chat = ai.chats.create({
        model: "gemini-3.5-flash",
        config: {
          systemInstruction: `\u0623\u0646\u062A \u0645\u0633\u0627\u0639\u062F \u062A\u0633\u0648\u0642 \u0630\u0643\u064A \u0648\u0631\u0627\u0642\u064A \u0644\u0645\u062A\u062C\u0631 "BeePharma & More". 
          \u0645\u0647\u0645\u062A\u0643 \u0647\u064A \u0645\u0633\u0627\u0639\u062F\u0629 \u0627\u0644\u0639\u0645\u0644\u0627\u0621 \u0628\u0623\u0633\u0644\u0648\u0628 \u0623\u0646\u064A\u0642\u060C \u0645\u0646\u0638\u0645\u060C \u0648\u062F\u0642\u064A\u0642 \u0644\u0644\u063A\u0627\u064A\u0629.
          \u0627\u0633\u062A\u062E\u062F\u0645 \u0644\u063A\u0629 \u0639\u0631\u0628\u064A\u0629 \u0641\u0635\u062D\u0649 \u0628\u0633\u064A\u0637\u0629 \u0648\u0623\u0646\u064A\u0642\u0629 (\u0623\u0648 \u0644\u0647\u062C\u0629 \u0628\u064A\u0636\u0627\u0621 \u0645\u0647\u0630\u0628\u0629 \u062C\u062F\u0627\u064B).
          \u064A\u062C\u0628 \u0623\u0646 \u062A\u0643\u0648\u0646 \u0625\u062C\u0627\u0628\u0627\u062A\u0643 \u0645\u0631\u062A\u0628\u0629 \u0648\u0645\u0646\u0638\u0645\u0629 (\u0627\u0633\u062A\u062E\u062F\u0645 \u0627\u0644\u0646\u0642\u0627\u0637 \u0625\u0630\u0627 \u0644\u0632\u0645 \u0627\u0644\u0623\u0645\u0631).
          \u0643\u0646 \u062F\u0642\u064A\u0642\u0627\u064B \u062C\u062F\u0627\u064B \u0641\u064A \u0648\u0635\u0641 \u0627\u0644\u0645\u0646\u062A\u062C\u0627\u062A \u0628\u0646\u0627\u0621\u064B \u0639\u0644\u0649 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0642\u062F\u0645\u0629.
          \u0625\u0630\u0627 \u0633\u0623\u0644\u0643 \u0627\u0644\u0639\u0645\u064A\u0644 \u0639\u0646 \u0645\u0646\u062A\u062C \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u060C \u0627\u0642\u062A\u0631\u062D \u0628\u062F\u0627\u0626\u0644 \u0645\u0634\u0627\u0628\u0647\u0629 \u0628\u0630\u0643\u0627\u0621.
          
          \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0646\u062A\u062C\u0627\u062A \u0627\u0644\u0645\u062A\u0627\u062D\u0629:
          ${productContext}
          
          \u0642\u0648\u0627\u0639\u062F \u0627\u0644\u062A\u0639\u0627\u0645\u0644:
          1. \u0627\u0644\u0623\u0646\u0627\u0642\u0629: \u0627\u0633\u062A\u062E\u062F\u0645 \u0639\u0628\u0627\u0631\u0627\u062A \u062A\u0631\u062D\u064A\u0628\u064A\u0629 \u0648\u0648\u062F\u0627\u0639\u064A\u0629 \u0631\u0627\u0642\u064A\u0629.
          2. \u0627\u0644\u062F\u0642\u0629: \u0644\u0627 \u062A\u0642\u062F\u0645 \u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0645\u063A\u0644\u0648\u0637\u0629 \u0639\u0646 \u0627\u0644\u0623\u0633\u0639\u0627\u0631 \u0623\u0648 \u0627\u0644\u0645\u0643\u0648\u0646\u0627\u062A.
          3. \u0627\u0644\u062A\u0631\u062A\u064A\u0628: \u0627\u062C\u0639\u0644 \u0627\u0644\u0631\u062F\u0648\u062F \u0633\u0647\u0644\u0629 \u0627\u0644\u0642\u0631\u0627\u0621\u0629 \u0648\u0645\u0646\u0638\u0645\u0629.
          4. \u0641\u064A \u062D\u0627\u0644 \u0639\u062F\u0645 \u0627\u0644\u0645\u0639\u0631\u0641\u0629: \u0648\u062C\u0647 \u0627\u0644\u0639\u0645\u064A\u0644 \u0628\u0644\u0628\u0627\u0642\u0629 \u0644\u0644\u062A\u0648\u0627\u0635\u0644 \u0645\u0639 \u0627\u0644\u062F\u0639\u0645 \u0627\u0644\u0641\u0646\u064A \u0627\u0644\u0628\u0634\u0631\u064A.`
        },
        history: formattedHistory
      });
      const response = await chat.sendMessage({ message });
      res.json({ result: response.text || "\u0639\u0630\u0631\u0627\u064B\u060C \u0644\u0645 \u0623\u062A\u0645\u0643\u0646 \u0645\u0646 \u0645\u0639\u0627\u0644\u062C\u0629 \u0647\u0630\u0627 \u0627\u0644\u0637\u0644\u0628." });
    } catch (error) {
      console.warn("Server AI Chat failed, using smart helper response fallback:", error.message || error);
      const msgLower = (message || "").toLowerCase();
      let reply = "";
      if (msgLower.includes("\u0645\u0631\u062D\u0628\u0627") || msgLower.includes("\u0623\u0647\u0644\u0627\u064B") || msgLower.includes("\u0627\u0644\u0633\u0644\u0627\u0645") || msgLower.includes("hello") || msgLower.includes("hi")) {
        reply = "\u0623\u0647\u0644\u0627\u064B \u0628\u0643 \u0641\u064A \u0645\u062A\u062C\u0631 **BeePharma & More** \u0627\u0644\u0631\u0627\u0642\u064D! \u{1F338} \u0643\u064A\u0641 \u064A\u0645\u0643\u0646\u0646\u064A \u0645\u0633\u0627\u0639\u062F\u062A\u0643 \u0627\u0644\u064A\u0648\u0645 \u0641\u064A \u062A\u0635\u0641\u062D \u0645\u0646\u062A\u062C\u0627\u062A\u0646\u0627 \u0627\u0644\u0637\u0628\u064A\u0629 \u0648\u0627\u0644\u0639\u0646\u0627\u064A\u0629 \u0627\u0644\u0641\u0627\u0626\u0642\u0629\u061F";
      } else if (msgLower.includes("\u0645\u0646\u062A\u062C") || msgLower.includes("\u0627\u0644\u0645\u0646\u062A\u062C\u0627\u062A") || msgLower.includes("\u0639\u0631\u0636")) {
        const sampleProducts = (products || []).slice(0, 3).map((p) => `- **${p.name}** (${p.category}): \u0628\u0633\u0639\u0631 ${p.price} \u0631.\u0633`).join("\n");
        reply = `\u0644\u062F\u064A\u0646\u0627 \u062A\u0634\u0643\u064A\u0644\u0629 \u0631\u0627\u0626\u0639\u0629 \u0645\u0646 \u0627\u0644\u0645\u0646\u062A\u062C\u0627\u062A \u0627\u0644\u0641\u0627\u062E\u0631\u0629! \u0625\u0644\u064A\u0643 \u0628\u0639\u0636 \u0645\u0646\u0647\u0627:
${sampleProducts || "\u0627\u0644\u0645\u0646\u062A\u062C\u0627\u062A \u0642\u064A\u062F \u0627\u0644\u062A\u062D\u0645\u064A\u0644 \u062D\u0627\u0644\u064A\u0627\u064B!"}

\u0647\u0644 \u062A\u0648\u062F \u0627\u0644\u0627\u0633\u062A\u0641\u0633\u0627\u0631 \u0639\u0646 \u0645\u0646\u062A\u062C \u0645\u0639\u064A\u0646\u061F`;
      } else if (msgLower.includes("\u0633\u0639\u0631") || msgLower.includes("\u0628\u0643\u0645") || msgLower.includes("\u0643\u0645")) {
        const match = (products || []).find((p) => msgLower.includes(p.name.toLowerCase()));
        if (match) {
          reply = `\u0628\u0627\u0644\u062A\u0623\u0643\u064A\u062F! \u0645\u0646\u062A\u062C **${match.name}** \u0645\u062A\u0648\u0641\u0631 \u0628\u0633\u0639\u0631 **${match.price} \u0631.\u0633**.

\u0648\u0635\u0641 \u0627\u0644\u0645\u0646\u062A\u062C: ${match.description || "\u0644\u0627 \u064A\u0648\u062C\u062F \u0648\u0635\u0641 \u0645\u062A\u0648\u0641\u0631"}. \u0647\u0644 \u062A\u0631\u063A\u0628 \u0641\u064A \u0625\u0636\u0627\u0641\u062A\u0647 \u0625\u0644\u0649 \u0633\u0644\u062A\u0643\u061F`;
        } else {
          reply = "\u062A\u062A\u0641\u0627\u0648\u062A \u0623\u0633\u0639\u0627\u0631 \u0645\u0646\u062A\u062C\u0627\u062A\u0646\u0627 \u0627\u0644\u0641\u0627\u062E\u0631\u0629 \u0644\u062A\u0646\u0627\u0633\u0628 \u0627\u0644\u062C\u0645\u064A\u0639 \u0648\u062A\u0628\u062F\u0623 \u0645\u0646 \u0623\u0633\u0639\u0627\u0631 \u0645\u0646\u0627\u0641\u0633\u0629 \u062C\u062F\u0627\u064B! \u064A\u0645\u0643\u0646\u0643 \u0627\u0644\u0636\u063A\u0637 \u0639\u0644\u0649 \u0623\u064A \u0645\u0646\u062A\u062C \u0644\u0645\u0639\u0631\u0641\u0629 \u062A\u0641\u0627\u0635\u064A\u0644\u0647 \u0648\u0633\u0639\u0631\u0647 \u0628\u062F\u0642\u0629. \u0647\u0644 \u0647\u0646\u0627\u0643 \u0645\u0646\u062A\u062C \u0645\u0639\u064A\u0646 \u062A\u0628\u062D\u062B \u0639\u0646 \u0633\u0639\u0631\u0647\u061F";
        }
      } else if (msgLower.includes("\u062A\u0648\u0635\u064A\u0629") || msgLower.includes("\u0623\u0641\u0636\u0644") || msgLower.includes("\u0631\u0634\u062D")) {
        const topProduct = (products || [])[0];
        if (topProduct) {
          reply = `\u0623\u0631\u0634\u062F\u0643 \u0628\u0634\u062F\u0629 \u0644\u062A\u062C\u0631\u0628\u0629 \u0645\u0646\u062A\u062C\u0646\u0627 \u0627\u0644\u0623\u0643\u062B\u0631 \u0637\u0644\u0628\u0627\u064B: **${topProduct.name}** (${topProduct.category}) \u0628\u0633\u0639\u0631 **${topProduct.price} \u0631.\u0633**!

\u0648\u0635\u0641\u0647: ${topProduct.description}

\u0647\u0644 \u062A\u0641\u0636\u0644 \u0645\u0646\u062A\u062C\u0627\u062A \u0645\u0646 \u062A\u0635\u0646\u064A\u0641 \u0645\u0639\u064A\u0646 \u0643\u0627\u0644\u062C\u0645\u0627\u0644 \u0623\u0648 \u0627\u0644\u0641\u064A\u062A\u0627\u0645\u064A\u0646\u0627\u062A\u061F`;
        } else {
          reply = "\u064A\u0633\u0639\u062F\u0646\u064A \u062A\u0631\u0634\u064A\u062D \u0623\u0641\u0636\u0644 \u0627\u0644\u0645\u0646\u062A\u062C\u0627\u062A \u0644\u0643! \u0645\u0627 \u0647\u0648 \u0646\u0648\u0639 \u0627\u0644\u0631\u0639\u0627\u064A\u0629 \u0623\u0648 \u0627\u0644\u062A\u0635\u0646\u064A\u0641 \u0627\u0644\u0630\u064A \u062A\u0628\u062D\u062B \u0639\u0646\u0647 \u062D\u0627\u0644\u064A\u0627\u064B (\u0641\u064A\u062A\u0627\u0645\u064A\u0646\u0627\u062A\u060C \u0645\u0633\u062A\u062D\u0636\u0631\u0627\u062A \u062A\u062C\u0645\u064A\u0644\u060C \u0639\u0646\u0627\u064A\u0629 \u0628\u0627\u0644\u0628\u0634\u0631\u0629)\u061F";
        }
      } else {
        reply = "\u0634\u0643\u0631\u0627\u064B \u0644\u0631\u0633\u0627\u0644\u062A\u0643 \u0627\u0644\u0644\u0637\u064A\u0641\u0629! \u{1F31F} \u0644\u0645\u0633\u0627\u0639\u062F\u062A\u0643 \u0628\u0623\u0641\u0636\u0644 \u0634\u0643\u0644\u060C \u064A\u0645\u0643\u0646\u0643 \u062A\u0635\u0641\u062D \u0623\u0642\u0633\u0627\u0645 \u0627\u0644\u0645\u062A\u062C\u0631 \u0627\u0644\u0645\u062E\u062A\u0644\u0641\u0629 \u0645\u062B\u0644 \u0627\u0644\u0641\u064A\u062A\u0627\u0645\u064A\u0646\u0627\u062A \u0648\u0645\u0633\u062A\u062D\u0636\u0631\u0627\u062A \u0627\u0644\u062A\u062C\u0645\u064A\u0644\u060C \u0623\u0648 \u0625\u062E\u0628\u0627\u0631\u064A \u0628\u0627\u0633\u0645 \u0627\u0644\u0645\u0646\u062A\u062C \u0627\u0644\u0630\u064A \u062A\u0628\u062D\u062B \u0639\u0646\u0647 \u0648\u0633\u0623\u0639\u0637\u064A\u0643 \u0643\u0627\u0645\u0644 \u062A\u0641\u0627\u0635\u064A\u0644\u0647 \u0648\u0623\u0633\u0639\u0627\u0631\u0647 \u0641\u0648\u0631\u0627\u064B!";
      }
      const errStr = String(error).toLowerCase();
      const isKeyError = errStr.includes("leaked") || errStr.includes("leak") || errStr.includes("403") || errStr.includes("permission_denied") || errStr.includes("key") || errStr.includes("api_key_invalid") || errStr.includes("not valid");
      if (isKeyError) {
        reply += "\n\n*(\u0645\u0644\u0627\u062D\u0638\u0629: \u064A\u0645\u0643\u0646\u0643 \u0648\u0636\u0639 \u0645\u0641\u062A\u0627\u062D API Key \u0627\u0644\u062E\u0627\u0635 \u0628\u0643 \u0641\u064A Settings \u0628\u0627\u0633\u0645 GEMINI_API_KEY \u0644\u0644\u062D\u0635\u0648\u0644 \u0639\u0644\u0649 \u062A\u062C\u0631\u0628\u0629 \u0630\u0643\u0627\u0621 \u0627\u0635\u0637\u0646\u0627\u0639\u064A \u062A\u0641\u0627\u0639\u0644\u064A\u0629 \u0643\u0627\u0645\u0644\u0629)*";
      }
      res.json({ result: reply });
    }
  });
  app.post("/api/gemini/search", async (req, res) => {
    const { query, products } = req.body;
    try {
      const productList = (products || []).map((p) => ({ id: p.id, name: p.name, description: p.description }));
      const ai = getGeminiClient();
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: `User search query: "${query}". 
        Perform a sophisticated semantic search to find the most relevant product IDs from: ${JSON.stringify(productList)}. 
        Understand the underlying intent, synonyms, and context. 
        Prioritize accuracy and relevance. Return ONLY a JSON array of product IDs.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: import_genai.Type.ARRAY,
            items: { type: import_genai.Type.STRING }
          }
        }
      });
      res.json({ result: JSON.parse(response.text || "[]") });
    } catch (error) {
      console.warn("Server Smart Search failed, using word-match programmatic fallback:", error.message || error);
      if (!query) {
        return res.json({ result: [] });
      }
      const queryLower = query.toLowerCase().trim();
      const queryWords = queryLower.split(/\s+/).filter((w) => w.length > 1);
      const scored = (products || []).map((p) => {
        let score = 0;
        const nameLower = (p.name || "").toLowerCase();
        const descLower = (p.description || "").toLowerCase();
        const catLower = (p.category || "").toLowerCase();
        if (nameLower.includes(queryLower)) score += 12;
        if (descLower.includes(queryLower)) score += 6;
        if (catLower.includes(queryLower)) score += 8;
        for (const word of queryWords) {
          if (nameLower.includes(word)) score += 4;
          if (descLower.includes(word)) score += 2;
          if (catLower.includes(word)) score += 3;
        }
        return { id: p.id, score };
      });
      const filteredAndSortedIds = scored.filter((item) => item.score > 0).sort((a, b) => b.score - a.score).map((item) => item.id);
      res.json({ result: filteredAndSortedIds });
    }
  });
  app.post("/api/gemini/inventory", async (req, res) => {
    const { products, orders } = req.body;
    try {
      const inventoryData = (products || []).map((p) => ({
        id: p.id,
        name: p.name,
        currentStock: p.quantity,
        salesCount: (orders || []).reduce((acc, o) => acc + (o.items || []).filter((i) => i.productId === p.id).reduce((sum, item) => sum + item.quantity, 0), 0)
      }));
      const ai = getGeminiClient();
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: `Analyze the following inventory and sales data with high precision: ${JSON.stringify(inventoryData)}. 
        Predict restocking needs based on sales velocity and current stock. 
        For each prediction, provide a professional, elegant, and accurate reason in Arabic (\u0627\u0644\u0644\u063A\u0629 \u0627\u0644\u0639\u0631\u0628\u064A\u0629).
        The reason should be concise yet insightful.
        Return a JSON array of objects with {id, name, prediction, reason}.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: import_genai.Type.ARRAY,
            items: {
              type: import_genai.Type.OBJECT,
              properties: {
                id: { type: import_genai.Type.STRING },
                name: { type: import_genai.Type.STRING },
                prediction: { type: import_genai.Type.STRING },
                reason: { type: import_genai.Type.STRING }
              },
              required: ["id", "name", "prediction", "reason"]
            }
          }
        }
      });
      res.json({ result: JSON.parse(response.text || "[]") });
    } catch (error) {
      console.warn("Server Inventory Prediction failed, using programmatic fallback:", error.message || error);
      const list = (products || []).map((p) => {
        const salesCount = (orders || []).reduce((acc, o) => {
          const items = o.items || [];
          const productItems = items.filter((i) => i.productId === p.id);
          return acc + productItems.reduce((sum, item) => sum + (item.quantity || 0), 0);
        }, 0);
        let prediction = "\u0645\u0633\u062A\u0642\u0631 (\u0645\u062E\u0632\u0648\u0646 \u0643\u0627\u0641\u064D)";
        let reason = "\u0627\u0644\u0645\u062E\u0632\u0648\u0646 \u0627\u0644\u062D\u0627\u0644\u064A \u064A\u063A\u0637\u064A \u0627\u0644\u0637\u0644\u0628\u0627\u062A \u0627\u0644\u0645\u062A\u0648\u0642\u0639\u0629 \u0628\u0646\u0627\u0621\u064B \u0639\u0644\u0649 \u0645\u0639\u062F\u0644 \u0627\u0644\u0645\u0628\u064A\u0639\u0627\u062A \u0627\u0644\u062D\u0627\u0644\u064A\u0629 \u0644\u0644\u0642\u0633\u0645.";
        if (p.quantity === 0) {
          prediction = "\u0646\u0641\u062F \u0645\u0646 \u0627\u0644\u0645\u062E\u0632\u0648\u0646 (\u0628\u062D\u0627\u062C\u0629 \u0644\u0634\u062D\u0646)";
          reason = "\u0627\u0644\u0645\u0646\u062A\u062C \u0646\u0641\u062F \u0628\u0627\u0644\u0643\u0627\u0645\u0644 \u0645\u0646 \u0627\u0644\u0645\u062A\u062C\u0631 \u0645\u0639 \u0627\u0633\u062A\u0645\u0631\u0627\u0631 \u0637\u0644\u0628\u0627\u062A \u0627\u0644\u0628\u062D\u062B \u0648\u0627\u0644\u0627\u0647\u062A\u0645\u0627\u0645 \u0645\u0646 \u0627\u0644\u0632\u0648\u0627\u0631.";
        } else if (p.quantity < 5) {
          prediction = "\u0628\u062D\u0627\u062C\u0629 \u0644\u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0637\u0644\u0628 \u0641\u0648\u0631\u0627\u064B";
          reason = `\u0627\u0644\u0645\u062E\u0632\u0648\u0646 \u062D\u0631\u062C \u062C\u062F\u0627\u064B (${p.quantity} \u0642\u0637\u0639 \u0645\u062A\u0628\u0642\u064A\u0629) \u0645\u0639 \u0645\u0628\u064A\u0639\u0627\u062A \u0628\u0644\u063A\u062A ${salesCount} \u0642\u0637\u0639 \u0645\u0624\u062E\u0631\u0627\u064B.`;
        } else if (p.quantity < 15 && salesCount > 2) {
          prediction = "\u062A\u0648\u0635\u064A\u0629 \u0628\u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0637\u0644\u0628 \u0642\u0631\u064A\u0628\u0627\u064B";
          reason = `\u0645\u0639\u062F\u0644 \u0633\u062D\u0628 \u0627\u0644\u0645\u0646\u062A\u062C \u0645\u0631\u062A\u0641\u0639 \u0645\u0642\u0627\u0631\u0646\u0629 \u0628\u0627\u0644\u0643\u0645\u064A\u0629 \u0627\u0644\u0645\u062A\u0648\u0641\u0631\u0629 \u062D\u0627\u0644\u064A\u0627\u064B \u0641\u064A \u0627\u0644\u0645\u0633\u062A\u0648\u062F\u0639.`;
        }
        return {
          id: p.id,
          name: p.name,
          prediction,
          reason
        };
      });
      res.json({ result: list });
    }
  });
  wss.on("connection", (ws) => {
    console.log("Client connected to WebSocket");
    ws.on("message", (data) => {
      try {
        const message = JSON.parse(data.toString());
        console.log("Received message:", message.type);
        wss.clients.forEach((client) => {
          if (client !== ws && client.readyState === import_ws.WebSocket.OPEN) {
            client.send(JSON.stringify(message));
          }
        });
      } catch (err) {
        console.error("Error parsing WebSocket message:", err);
      }
    });
    ws.on("close", () => {
      console.log("Client disconnected from WebSocket");
    });
  });
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  server.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}
startServer();
//# sourceMappingURL=server.cjs.map
