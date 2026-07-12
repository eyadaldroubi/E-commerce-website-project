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
    id: "1",
    name: "\u0633\u0627\u0639\u0629 \u0630\u0643\u064A\u0629 \u0628\u0631\u0648",
    description: "\u0633\u0627\u0639\u0629 \u0630\u0643\u064A\u0629 \u0645\u062A\u0637\u0648\u0631\u0629 \u0645\u0639 \u062A\u062A\u0628\u0639 \u0627\u0644\u0635\u062D\u0629 \u0648\u0627\u0644\u0623\u0646\u0634\u0637\u0629 \u0627\u0644\u0631\u064A\u0627\u0636\u064A\u0629 \u0648\u0634\u0627\u0634\u0629 AMOLED.",
    price: 299,
    quantity: 15,
    category: "smartwatches",
    image: "https://picsum.photos/seed/watch/400/400",
    images: [],
    rating: 4.8,
    reviewsCount: 124
  },
  {
    id: "2",
    name: "\u0633\u0645\u0627\u0639\u0627\u062A \u0644\u0627\u0633\u0644\u0643\u064A\u0629",
    description: "\u0633\u0645\u0627\u0639\u0627\u062A \u0628\u0644\u0648\u062A\u0648\u062B \u0645\u0639 \u062E\u0627\u0635\u064A\u0629 \u0625\u0644\u063A\u0627\u0621 \u0627\u0644\u0636\u062C\u064A\u062C \u0648\u0628\u0637\u0627\u0631\u064A\u0629 \u062A\u062F\u0648\u0645 \u0637\u0648\u064A\u0644\u0627\u064B.",
    price: 150,
    quantity: 20,
    category: "headphones",
    image: "https://picsum.photos/seed/earbuds/400/400",
    images: [],
    rating: 4.5,
    reviewsCount: 89
  },
  {
    id: "7",
    name: "\u062C\u0647\u0627\u0632 \u0644\u0627\u0628\u062A\u0648\u0628 \u0623\u0644\u062A\u0631\u0627",
    description: "\u0644\u0627\u0628\u062A\u0648\u0628 \u0641\u0627\u0626\u0642 \u0627\u0644\u0646\u062D\u0627\u0641\u0629 \u0645\u0639 \u0645\u0639\u0627\u0644\u062C \u0642\u0648\u064A \u0648\u0634\u0627\u0634\u0629 4K \u0644\u0644\u0639\u0645\u0644 \u0627\u0644\u0625\u0628\u062F\u0627\u0639\u064A \u0648\u0627\u0644\u0623\u0644\u0639\u0627\u0628.",
    price: 1299,
    quantity: 8,
    category: "laptops",
    image: "https://picsum.photos/seed/laptop/400/400",
    images: [],
    rating: 4.9,
    reviewsCount: 32
  },
  {
    id: "8",
    name: "\u0646\u0638\u0627\u0645 \u0645\u0633\u0631\u062D \u0645\u0646\u0632\u0644\u064A \u0641\u0627\u062E\u0631",
    description: "\u062A\u062C\u0631\u0628\u0629 \u0633\u064A\u0646\u0645\u0627\u0626\u064A\u0629 \u0645\u062A\u0643\u0627\u0645\u0644\u0629 \u0641\u064A \u0645\u0646\u0632\u0644\u0643 \u0645\u0639 \u0635\u0648\u062A \u0645\u062D\u064A\u0637\u064A 7.1 \u0648\u062A\u0642\u0646\u064A\u0629 \u0644\u0627\u0633\u0644\u0643\u064A\u0629.",
    price: 2499,
    quantity: 3,
    category: "tvs",
    image: "https://picsum.photos/seed/theater/400/400",
    images: [],
    rating: 5,
    reviewsCount: 12
  },
  {
    id: "elec-new-1",
    name: "\u0647\u0627\u062A\u0641 \u0622\u064A\u0641\u0648\u0646 15 \u0628\u0631\u0648 \u0645\u0627\u0643\u0633",
    description: "\u0623\u062D\u062F\u062B \u0647\u0627\u062A\u0641 \u0630\u0643\u064A \u0645\u0646 \u0622\u0628\u0644 \u0628\u0643\u0627\u0645\u064A\u0631\u0627 \u0627\u062D\u062A\u0631\u0627\u0641\u064A\u0629 \u0648\u0634\u0631\u064A\u062D\u0629 A17 Pro \u0627\u0644\u0641\u0627\u0626\u0642\u0629 \u0627\u0644\u0633\u0631\u0639\u0629.",
    price: 4800,
    quantity: 12,
    category: "mobiles",
    image: "https://picsum.photos/seed/iphone/400/400",
    images: [],
    rating: 4.9,
    reviewsCount: 340
  },
  {
    id: "elec-new-2",
    name: "\u0644\u0648\u062D\u0629 \u0645\u0641\u0627\u062A\u064A\u062D \u0645\u064A\u0643\u0627\u0646\u064A\u0643\u064A\u0629 \u0645\u0636\u064A\u0626\u0629",
    description: "\u0644\u0648\u062D\u0629 \u0645\u0641\u0627\u062A\u064A\u062D \u0645\u064A\u0643\u0627\u0646\u064A\u0643\u064A\u0629 \u0645\u062E\u0635\u0635\u0629 \u0644\u0644\u0623\u0644\u0639\u0627\u0628 \u0645\u0639 \u0625\u0636\u0627\u0621\u0629 RGB \u0648\u0645\u0641\u0627\u062A\u064A\u062D \u0633\u0631\u064A\u0639\u0629 \u0627\u0644\u0627\u0633\u062A\u062C\u0627\u0628\u0629.",
    price: 180,
    quantity: 25,
    category: "computer_world",
    image: "https://picsum.photos/seed/keyboard/400/400",
    images: [],
    rating: 4.7,
    reviewsCount: 112
  },
  {
    id: "3",
    name: "\u0642\u0645\u064A\u0635 \u0642\u0637\u0646\u064A \u0639\u0635\u0631\u064A",
    description: "\u0642\u0645\u064A\u0635 \u0645\u0631\u064A\u062D \u0645\u0635\u0646\u0648\u0639 \u0645\u0646 \u0627\u0644\u0642\u0637\u0646 \u0627\u0644\u0637\u0628\u064A\u0639\u064A 100% \u0628\u062A\u0635\u0645\u064A\u0645 \u0643\u0644\u0627\u0633\u064A\u0643\u064A.",
    price: 45,
    quantity: 50,
    category: "men",
    image: "https://picsum.photos/seed/shirt/400/400",
    images: [],
    rating: 4.2,
    reviewsCount: 56
  },
  {
    id: "4",
    name: "\u062D\u0642\u064A\u0628\u0629 \u0638\u0647\u0631 \u062C\u0644\u062F\u064A\u0629",
    description: "\u062D\u0642\u064A\u0628\u0629 \u0638\u0647\u0631 \u0623\u0646\u064A\u0642\u0629 \u0648\u0645\u062A\u064A\u0646\u0629 \u0645\u0646\u0627\u0633\u0628\u0629 \u0644\u0644\u0639\u0645\u0644 \u0648\u0627\u0644\u0633\u0641\u0631.",
    price: 85,
    quantity: 10,
    category: "travel_essentials",
    image: "https://picsum.photos/seed/backpack/400/400",
    images: [],
    rating: 4.4,
    reviewsCount: 34
  },
  {
    id: "fash-new-1",
    name: "\u0641\u0633\u062A\u0627\u0646 \u0633\u0647\u0631\u0629 \u0645\u062E\u0645\u0644\u064A \u0623\u0646\u064A\u0642",
    description: "\u0641\u0633\u062A\u0627\u0646 \u0646\u0633\u0627\u0626\u064A \u0641\u0627\u062E\u0631 \u0645\u0646 \u0627\u0644\u0645\u062E\u0645\u0644 \u0627\u0644\u0646\u0627\u0639\u0645 \u0645\u0646\u0627\u0633\u0628 \u0644\u0644\u062D\u0641\u0644\u0627\u062A \u0648\u0627\u0644\u0645\u0646\u0627\u0633\u0628\u0627\u062A \u0627\u0644\u0633\u0639\u064A\u062F\u0629.",
    price: 250,
    quantity: 18,
    category: "women",
    image: "https://picsum.photos/seed/dress/400/400",
    images: [],
    rating: 4.8,
    reviewsCount: 74
  },
  {
    id: "fash-new-2",
    name: "\u062D\u0630\u0627\u0621 \u0631\u064A\u0627\u0636\u064A \u0645\u0631\u064A\u062D \u0644\u0644\u062C\u0631\u064A",
    description: "\u062D\u0630\u0627\u0621 \u0645\u062E\u0635\u0635 \u0644\u0644\u0631\u0643\u0636 \u0648\u0627\u0644\u062A\u0645\u0627\u0631\u064A\u0646 \u0627\u0644\u0631\u064A\u0627\u0636\u064A\u0629 \u0628\u0646\u0639\u0644 \u0637\u0628\u064A \u0645\u0645\u062A\u0635 \u0644\u0644\u0635\u062F\u0645\u0627\u062A \u0648\u0648\u0632\u0646 \u062E\u0641\u064A\u0641 \u062C\u062F\u0627\u064B.",
    price: 140,
    quantity: 30,
    category: "shoes",
    image: "https://picsum.photos/seed/runningshoes/400/400",
    images: [],
    rating: 4.6,
    reviewsCount: 156
  },
  {
    id: "fash-new-3",
    name: "\u0637\u0642\u0645 \u0628\u062F\u0644\u0629 \u0631\u0633\u0645\u064A\u0629 \u0641\u0627\u062E\u0631\u0629",
    description: "\u0628\u062F\u0644\u0629 \u0631\u062C\u0627\u0644\u064A\u0629 \u0643\u0644\u0627\u0633\u064A\u0643\u064A\u0629 \u0628\u062A\u0635\u0645\u064A\u0645 \u0639\u0635\u0631\u064A \u0648\u0623\u0644\u0648\u0627\u0646 \u0645\u0645\u064A\u0632\u0629 \u062A\u0644\u0627\u0626\u0645 \u0627\u0644\u0627\u062C\u062A\u0645\u0627\u0639\u0627\u062A \u0648\u0627\u0644\u0645\u0646\u0627\u0633\u0628\u0627\u062A \u0627\u0644\u0631\u0633\u0645\u064A\u0629.",
    price: 499,
    quantity: 8,
    category: "men",
    image: "https://picsum.photos/seed/suit/400/400",
    images: [],
    rating: 4.9,
    reviewsCount: 38
  },
  {
    id: "fash-new-4",
    name: "\u0633\u0627\u0639\u0629 \u064A\u062F \u0643\u0644\u0627\u0633\u064A\u0643\u064A\u0629 \u062C\u0644\u062F\u064A\u0629",
    description: "\u0633\u0627\u0639\u0629 \u064A\u062F \u0641\u0627\u062E\u0631\u0629 \u0628\u0633\u064A\u0631 \u0645\u0646 \u0627\u0644\u062C\u0644\u062F \u0627\u0644\u0637\u0628\u064A\u0639\u064A \u0627\u0644\u0645\u0642\u0627\u0648\u0645 \u0644\u0644\u0627\u0647\u062A\u0631\u0627\u0621 \u0648\u0647\u064A\u0643\u0644 \u0641\u0648\u0644\u0627\u0630\u064A \u0645\u0642\u0627\u0648\u0645 \u0644\u0644\u0645\u0627\u0621.",
    price: 180,
    quantity: 15,
    category: "watches_fashion",
    image: "https://picsum.photos/seed/classicwatch/400/400",
    images: [],
    rating: 4.7,
    reviewsCount: 65
  },
  {
    id: "5",
    name: "\u0645\u0627\u0643\u064A\u0646\u0629 \u0642\u0647\u0648\u0629 \u0623\u0648\u062A\u0648\u0645\u0627\u062A\u064A\u0643\u064A\u0629",
    description: "\u0627\u0633\u062A\u0645\u062A\u0639 \u0628\u0623\u0641\u0636\u0644 \u0643\u0648\u0628 \u0642\u0647\u0648\u0629 \u0641\u064A \u0645\u0646\u0632\u0644\u0643 \u0645\u0639 \u0647\u0630\u0647 \u0627\u0644\u0645\u0627\u0643\u064A\u0646\u0629 \u0633\u0647\u0644\u0629 \u0627\u0644\u0627\u0633\u062A\u062E\u062F\u0627\u0645.",
    price: 450,
    quantity: 5,
    category: "home_appliances",
    image: "https://picsum.photos/seed/coffee/400/400",
    images: [],
    rating: 4.9,
    reviewsCount: 210
  },
  {
    id: "home-new-1",
    name: "\u0637\u0642\u0645 \u063A\u0637\u0627\u0621 \u0633\u0631\u064A\u0631 \u0642\u0637\u0646\u064A \u0646\u0627\u0639\u0645",
    description: "\u0637\u0642\u0645 \u0633\u0631\u064A\u0631 \u0645\u0632\u062F\u0648\u062C \u0645\u0635\u0646\u0648\u0639 \u0645\u0646 \u0627\u0644\u0642\u0637\u0646 \u0627\u0644\u0645\u0635\u0631\u064A \u0627\u0644\u0641\u0627\u062E\u0631 \u0628\u0646\u0633\u0628\u0629 100% \u0644\u0646\u0648\u0645 \u0647\u0627\u062F\u0626 \u0648\u0645\u0631\u064A\u062D.",
    price: 110,
    quantity: 20,
    category: "bedding",
    image: "https://picsum.photos/seed/bedding/400/400",
    images: [],
    rating: 4.8,
    reviewsCount: 88
  },
  {
    id: "home-new-2",
    name: "\u0645\u0643\u0646\u0633\u0629 \u0631\u0648\u0628\u0648\u062A\u064A\u0629 \u0630\u0643\u064A\u0629",
    description: "\u0645\u0643\u0646\u0633\u0629 \u0630\u0643\u064A\u0629 \u062A\u0639\u0645\u0644 \u0630\u0627\u062A\u064A\u0627\u064B \u0645\u0639 \u0645\u064A\u0632\u0629 \u0627\u0644\u062A\u0648\u062C\u064A\u0647 \u0628\u0627\u0644\u0644\u064A\u0632\u0631 \u0648\u0627\u0644\u062A\u0646\u0638\u064A\u0641 \u0627\u0644\u0631\u0637\u0628 \u0648\u0645\u0633\u062A\u0634\u0639\u0631 \u0627\u0644\u0639\u0642\u0628\u0627\u062A.",
    price: 380,
    quantity: 14,
    category: "cleaning_tools",
    image: "https://picsum.photos/seed/robotvacuum/400/400",
    images: [],
    rating: 4.7,
    reviewsCount: 114
  },
  {
    id: "home-new-3",
    name: "\u0645\u062C\u0645\u0648\u0639\u0629 \u0645\u0646\u0638\u0645\u0627\u062A \u0632\u062C\u0627\u062C\u064A\u0629",
    description: "\u0637\u0642\u0645 \u0645\u0646 6 \u0645\u0631\u0637\u0628\u0627\u0646\u0627\u062A \u0632\u062C\u0627\u062C\u064A\u0629 \u0645\u062A\u064A\u0646\u0629 \u0645\u0639 \u0623\u063A\u0637\u064A\u0629 \u062E\u0634\u0628\u064A\u0629 \u0645\u062D\u0643\u0645\u0629 \u0644\u062D\u0641\u0638 \u0627\u0644\u0628\u0647\u0627\u0631\u0627\u062A \u0648\u0627\u0644\u0645\u0643\u0648\u0646\u0627\u062A.",
    price: 65,
    quantity: 45,
    category: "storage_organization",
    image: "https://picsum.photos/seed/jars/400/400",
    images: [],
    rating: 4.6,
    reviewsCount: 42
  },
  {
    id: "home-new-4",
    name: "\u0623\u0631\u064A\u0643\u0629 \u0627\u0633\u062A\u0631\u062E\u0627\u0621 \u0645\u062E\u0645\u0644\u064A\u0629",
    description: "\u0643\u0631\u0633\u064A \u0623\u0631\u064A\u0643\u0629 \u0645\u0641\u0631\u062F \u0645\u0631\u064A\u062D \u0644\u0644\u063A\u0627\u064A\u0629 \u0648\u0645\u0628\u0637\u0646 \u0628\u0637\u0628\u0642\u0627\u062A \u0643\u062B\u064A\u0641\u0629 \u0645\u0646 \u0627\u0644\u0625\u0633\u0641\u0646\u062C \u0645\u0639 \u0642\u0645\u0627\u0634 \u0645\u062E\u0645\u0644\u064A \u0646\u0627\u0639\u0645.",
    price: 1200,
    quantity: 5,
    category: "furniture",
    image: "https://picsum.photos/seed/chair/400/400",
    images: [],
    rating: 4.9,
    reviewsCount: 23
  },
  {
    id: "home-new-5",
    name: "\u0645\u0635\u0628\u0627\u062D \u0623\u0631\u0636\u064A \u0630\u0643\u064A RGB",
    description: "\u0645\u0635\u0628\u0627\u062D \u0623\u0631\u0636\u064A \u0623\u0646\u064A\u0642 \u0628\u062A\u0635\u0645\u064A\u0645 \u0639\u0635\u0631\u064A \u064A\u0645\u0646\u062D\u0643 \u0645\u0644\u0627\u064A\u064A\u0646 \u0627\u0644\u0623\u0644\u0648\u0627\u0646 \u0645\u0639 \u0625\u0645\u0643\u0627\u0646\u064A\u0629 \u0627\u0644\u062A\u062D\u0643\u0645 \u0639\u0628\u0631 \u0627\u0644\u0647\u0627\u062A\u0641.",
    price: 49,
    quantity: 50,
    category: "home_decor",
    image: "https://picsum.photos/seed/lamp/400/400",
    images: [],
    rating: 4.5,
    reviewsCount: 61
  },
  {
    id: "bee-1",
    name: "\u0639\u0633\u0644 \u0627\u0644\u0646\u062D\u0644 \u0627\u0644\u0637\u0628\u064A\u0639\u064A - BeePharma",
    description: "\u0639\u0633\u0644 \u0646\u062D\u0644 \u0637\u0628\u064A\u0639\u064A 100% \u063A\u0646\u064A \u0628\u0627\u0644\u0641\u064A\u062A\u0627\u0645\u064A\u0646\u0627\u062A \u0648\u0627\u0644\u0645\u0639\u0627\u062F\u0646 \u0644\u062A\u0639\u0632\u064A\u0632 \u0627\u0644\u0645\u0646\u0627\u0639\u0629.",
    price: 45,
    quantity: 100,
    category: "honey",
    image: "https://picsum.photos/seed/honey/400/400",
    images: [],
    rating: 5,
    reviewsCount: 150
  },
  {
    id: "bee-2",
    name: "\u0643\u0631\u064A\u0645 \u0645\u0631\u0637\u0628 \u0637\u0628\u064A\u0639\u064A",
    description: "\u0643\u0631\u064A\u0645 \u063A\u0646\u064A \u0628\u0632\u0628\u062F\u0629 \u0627\u0644\u0634\u064A\u0627 \u0648\u0627\u0644\u0632\u064A\u0648\u062A \u0627\u0644\u0637\u0628\u064A\u0639\u064A\u0629 \u0644\u062A\u0631\u0637\u064A\u0628 \u0639\u0645\u064A\u0642.",
    price: 35,
    quantity: 50,
    category: "creams",
    image: "https://picsum.photos/seed/cream/400/400",
    images: [],
    rating: 4.8,
    reviewsCount: 42
  },
  {
    id: "bee-3",
    name: "\u0645\u062C\u0645\u0648\u0639\u0629 \u0623\u0639\u0634\u0627\u0628 \u0645\u0647\u062F\u0626\u0629",
    description: "\u0645\u0632\u064A\u062C \u0645\u0646 \u0627\u0644\u0623\u0639\u0634\u0627\u0628 \u0627\u0644\u0637\u0628\u064A\u0639\u064A\u0629 \u0644\u0644\u0645\u0633\u0627\u0639\u062F\u0629 \u0639\u0644\u0649 \u0627\u0644\u0627\u0633\u062A\u0631\u062E\u0627\u0621 \u0648\u0627\u0644\u0646\u0648\u0645 \u0627\u0644\u0647\u0627\u062F\u0626.",
    price: 25,
    quantity: 80,
    category: "herbs",
    image: "https://picsum.photos/seed/herbs/400/400",
    images: [],
    rating: 4.7,
    reviewsCount: 65
  },
  {
    id: "bee-4",
    name: "\u0628\u062E\u0648\u0631 \u0639\u0648\u062F \u0641\u0627\u062E\u0631",
    description: "\u0628\u062E\u0648\u0631 \u0639\u0648\u062F \u0637\u0628\u064A\u0639\u064A \u0628\u0631\u0627\u0626\u062D\u0629 \u0632\u0643\u064A\u0629 \u062A\u062F\u0648\u0645 \u0637\u0648\u064A\u0644\u0627\u064B.",
    price: 60,
    quantity: 30,
    category: "incense",
    image: "https://picsum.photos/seed/incense/400/400",
    images: [],
    rating: 4.9,
    reviewsCount: 88
  },
  {
    id: "bee-5",
    name: "\u0635\u0627\u0628\u0648\u0646 \u0632\u064A\u062A \u0627\u0644\u0632\u064A\u062A\u0648\u0646 \u0627\u0644\u0637\u0628\u064A\u0639\u064A",
    description: "\u0635\u0627\u0628\u0648\u0646 \u0645\u0635\u0646\u0648\u0639 \u064A\u062F\u0648\u064A\u0627\u064B \u0645\u0646 \u0632\u064A\u062A \u0627\u0644\u0632\u064A\u062A\u0648\u0646 \u0627\u0644\u0646\u0642\u064A \u0644\u0644\u0628\u0634\u0631\u0629 \u0627\u0644\u062D\u0633\u0627\u0633\u0629.",
    price: 15,
    quantity: 120,
    category: "natural_soap",
    image: "https://picsum.photos/seed/soap/400/400",
    images: [],
    rating: 4.6,
    reviewsCount: 54
  },
  {
    id: "bee-6",
    name: "\u062E\u0644\u0637\u0629 \u0627\u0644\u0639\u0633\u0644 \u0648\u0627\u0644\u0628\u0631\u0648\u0628\u0648\u0644\u064A\u0633 \u0627\u0644\u0641\u0627\u0626\u0642\u0629",
    description: "\u062E\u0644\u0637\u0629 \u0639\u0644\u0627\u062C\u064A\u0629 \u0637\u0628\u064A\u0639\u064A\u0629 \u062A\u062C\u0645\u0639 \u0639\u0633\u0644 \u0627\u0644\u0633\u062F\u0631 \u0627\u0644\u062C\u0628\u0644\u064A \u0648\u0627\u0644\u063A\u0630\u0627\u0621 \u0627\u0644\u0645\u0644\u0643\u064A \u0648\u0627\u0644\u0628\u0631\u0648\u0628\u0648\u0644\u064A\u0633 \u0644\u062A\u0642\u0648\u064A\u0629 \u0627\u0644\u0645\u0646\u0627\u0639\u0629 \u0648\u0645\u062D\u0627\u0631\u0628\u0629 \u0627\u0644\u0633\u0645\u0648\u0645.",
    price: 95,
    quantity: 240,
    category: "therapeutic_mixtures",
    image: "https://picsum.photos/seed/propolis/400/400",
    images: [],
    rating: 5,
    reviewsCount: 240
  },
  {
    id: "6",
    name: "\u0645\u062C\u0645\u0648\u0639\u0629 \u0627\u0644\u0639\u0646\u0627\u064A\u0629 \u0628\u0627\u0644\u0628\u0634\u0631\u0629",
    description: "\u0645\u062C\u0645\u0648\u0639\u0629 \u0645\u062A\u0643\u0627\u0645\u0644\u0629 \u0644\u062A\u0631\u0637\u064A\u0628 \u0648\u062A\u063A\u0630\u064A\u0629 \u0627\u0644\u0628\u0634\u0631\u0629 \u0628\u0645\u0643\u0648\u0646\u0627\u062A \u0637\u0628\u064A\u0639\u064A\u0629.",
    price: 120,
    quantity: 30,
    category: "skin_care",
    image: "https://picsum.photos/seed/skincare/400/400",
    images: [],
    rating: 4.6,
    reviewsCount: 45
  },
  {
    id: "beauty-sub-1",
    name: "\u0623\u062D\u0645\u0631 \u0634\u0641\u0627\u0647 \u0643\u0644\u0627\u0633\u064A\u0643\u064A \u0645\u0637\u0641\u0623",
    description: "\u0623\u062D\u0645\u0631 \u0634\u0641\u0627\u0647 \u0643\u0631\u064A\u0645\u064A \u0628\u0627\u0644\u0644\u0648\u0646 \u0627\u0644\u0623\u062D\u0645\u0631 \u0627\u0644\u0643\u0644\u0627\u0633\u064A\u0643\u064A \u0648\u062B\u0628\u0627\u062A \u064A\u062F\u0648\u0645 \u0637\u0648\u064A\u0644\u0627\u064B \u062F\u0648\u0646 \u062C\u0641\u0627\u0641.",
    price: 25,
    quantity: 40,
    category: "makeup",
    image: "https://picsum.photos/seed/lipstick/400/400",
    images: [],
    rating: 4.7,
    reviewsCount: 82
  },
  {
    id: "beauty-sub-2",
    name: "\u0633\u064A\u0631\u0648\u0645 \u0645\u063A\u0630\u064A \u0644\u0644\u0634\u0639\u0631 \u0628\u0627\u0644\u0623\u0631\u063A\u0627\u0646",
    description: "\u0633\u064A\u0631\u0648\u0645 \u0637\u0628\u064A\u0639\u064A \u064A\u0639\u064A\u062F \u0627\u0644\u0644\u0645\u0639\u0627\u0646 \u0648\u0627\u0644\u0642\u0648\u0629 \u0644\u0644\u0634\u0639\u0631 \u0627\u0644\u062A\u0627\u0644\u0641 \u0648\u064A\u0645\u0646\u0639 \u0627\u0644\u062A\u0642\u0635\u0641.",
    price: 39,
    quantity: 25,
    category: "hair_care",
    image: "https://picsum.photos/seed/haircare/400/400",
    images: [],
    rating: 4.8,
    reviewsCount: 95
  },
  {
    id: "beauty-sub-3",
    name: "\u0639\u0637\u0631 \u0641\u0631\u0646\u0633\u064A \u0641\u0627\u062E\u0631 - \u0644\u0627\u0641\u064A",
    description: "\u0639\u0637\u0631 \u0641\u0631\u0646\u0633\u064A \u0643\u0644\u0627\u0633\u064A\u0643\u064A \u0628\u0645\u0632\u064A\u062C \u0645\u0646 \u0623\u0632\u0647\u0627\u0631 \u0627\u0644\u064A\u0627\u0633\u0645\u064A\u0646 \u0648\u0627\u0644\u062E\u0634\u0628 \u0627\u0644\u0623\u0628\u064A\u0636 \u0648\u0627\u0644\u0645\u0633\u0643.",
    price: 110,
    quantity: 15,
    category: "womens_perfumes",
    image: "https://picsum.photos/seed/perfume/400/400",
    images: [],
    rating: 4.9,
    reviewsCount: 150
  },
  {
    id: "beauty-sub-5",
    name: "\u0639\u0637\u0631 \u0628\u0644\u0648 \u0634\u0627\u0646\u064A\u0644 \u0627\u0644\u0645\u062B\u064A\u0631 \u0644\u0644\u0631\u062C\u0627\u0644",
    description: "\u0639\u0637\u0631 \u0631\u062C\u0627\u0644\u064A \u0645\u0646\u0639\u0634 \u0648\u0641\u0648\u0627\u062D \u0628\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u062D\u0645\u0636\u064A\u0627\u062A \u0648\u0627\u0644\u0623\u062E\u0634\u0627\u0628 \u0627\u0644\u062F\u0627\u0641\u0626\u0629 \u0648\u0627\u0644\u0639\u0648\u062F \u0627\u0644\u062E\u0641\u064A\u0641.",
    price: 125,
    quantity: 20,
    category: "mens_perfumes",
    image: "https://picsum.photos/seed/mensperfume/400/400",
    images: [],
    rating: 4.9,
    reviewsCount: 210
  },
  {
    id: "beauty-sub-4",
    name: "\u062C\u0647\u0627\u0632 \u062A\u0646\u0638\u064A\u0641 \u0627\u0644\u0628\u0634\u0631\u0629 \u0628\u0627\u0644\u0645\u0648\u062C\u0627\u062A",
    description: "\u062C\u0647\u0627\u0632 \u0645\u062A\u0637\u0648\u0631 \u0644\u062A\u0646\u0638\u064A\u0641 \u0648\u0625\u0632\u0627\u0644\u0629 \u0627\u0644\u0631\u0624\u0648\u0633 \u0627\u0644\u0633\u0648\u062F\u0627\u0621 \u0648\u0627\u0644\u0634\u0648\u0627\u0626\u0628 \u0628\u0644\u0637\u0641 \u0648\u062A\u0642\u0634\u064A\u0631 \u0627\u0644\u062E\u0644\u0627\u064A\u0627.",
    price: 75,
    quantity: 12,
    category: "beauty_devices",
    image: "https://picsum.photos/seed/beautydevice/400/400",
    images: [],
    rating: 4.5,
    reviewsCount: 28
  },
  // --- 8 NEW PRODUCTS FOR ELECTRONICS ---
  {
    id: "elec-new-3",
    name: "\u0645\u0643\u0628\u0631 \u0635\u0648\u062A \u0628\u0644\u0648\u062A\u0648\u062B \u0645\u0642\u0627\u0648\u0645 \u0644\u0644\u0645\u0627\u0621",
    description: "\u0633\u0628\u064A\u0643\u0631 \u0644\u0627\u0633\u0644\u0643\u064A \u0645\u062D\u0645\u0648\u0644 \u0645\u0639 \u0635\u0648\u062A \u0646\u0642\u064A \u0648\u0639\u0645\u064A\u0642 \u0648\u0645\u0642\u0627\u0648\u0645\u0629 \u0645\u0645\u062A\u0627\u0632\u0629 \u0644\u0644\u0645\u0627\u0621 \u0648\u0627\u0644\u063A\u0628\u0627\u0631.",
    price: 120,
    quantity: 35,
    category: "speakers",
    image: "https://picsum.photos/seed/waterproofspeaker/400/400",
    images: [],
    rating: 4.7,
    reviewsCount: 45
  },
  {
    id: "elec-new-4",
    name: "\u0643\u0627\u0645\u064A\u0631\u0627 \u0627\u062D\u062A\u0631\u0627\u0641\u064A\u0629 \u0628\u062F\u0642\u0629 4K",
    description: "\u0643\u0627\u0645\u064A\u0631\u0627 \u0628\u062F\u0648\u0646 \u0645\u0631\u0622\u0629 \u0628\u0639\u062F\u0633\u0629 \u0645\u062A\u0637\u0648\u0631\u0629 \u0644\u0627\u0644\u062A\u0642\u0627\u0637 \u0623\u062C\u0645\u0644 \u0627\u0644\u0644\u062D\u0638\u0627\u062A \u0628\u062F\u0642\u0629 \u0641\u0627\u0626\u0642\u0629 \u0627\u0644\u062C\u0648\u062F\u0629.",
    price: 1850,
    quantity: 10,
    category: "cameras",
    image: "https://picsum.photos/seed/dslrcamera/400/400",
    images: [],
    rating: 4.9,
    reviewsCount: 29
  },
  {
    id: "elec-new-5",
    name: "\u0634\u0627\u062D\u0646 \u0644\u0627\u0633\u0644\u0643\u064A \u0633\u0631\u064A\u0639 \u062B\u0644\u0627\u062B\u064A \u0641\u064A \u0648\u0627\u062D\u062F",
    description: "\u0634\u0627\u062D\u0646 \u0644\u0627\u0633\u0644\u0643\u064A \u0645\u063A\u0646\u0627\u0637\u064A\u0633\u064A \u0633\u0631\u064A\u0639 \u0644\u0634\u062D\u0646 \u0627\u0644\u0622\u064A\u0641\u0648\u0646\u060C \u0627\u0644\u0633\u0627\u0639\u0629 \u0627\u0644\u0630\u0643\u064A\u0629\u060C \u0648\u0633\u0645\u0627\u0639\u0627\u062A \u0627\u0644\u0623\u0630\u0646 \u0641\u064A \u0646\u0641\u0633 \u0627\u0644\u0648\u0642\u062A \u0648\u0628\u0642\u0648\u0629 15 \u0648\u0627\u0637.",
    price: 75,
    quantity: 40,
    category: "mobile_accessories",
    image: "https://picsum.photos/seed/chargingdock/400/400",
    images: [],
    rating: 4.6,
    reviewsCount: 88
  },
  {
    id: "elec-new-6",
    name: "\u0637\u0627\u0628\u0639\u0629 \u0635\u0648\u0631 \u0630\u0643\u064A\u0629 \u0644\u0627\u0633\u0644\u0643\u064A\u0629",
    description: "\u0637\u0627\u0628\u0639\u0629 \u0635\u0648\u0631 \u062C\u064A\u0628 \u0635\u063A\u064A\u0631\u0629 \u0648\u0633\u0647\u0644\u0629 \u0627\u0644\u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0644\u0637\u0628\u0627\u0639\u0629 \u0627\u0644\u0644\u062D\u0638\u0627\u062A \u0627\u0644\u062C\u0645\u064A\u0644\u0629 \u0641\u0648\u0631\u0627\u064B \u0645\u0646 \u062C\u0648\u0627\u0644\u0643 \u0628\u062C\u0648\u062F\u0629 \u0639\u0627\u0644\u064A\u0629 \u0648\u0628\u062F\u0648\u0646 \u062D\u0628\u0631.",
    price: 140,
    quantity: 15,
    category: "printer_supplies",
    image: "https://picsum.photos/seed/photo-printer/400/400",
    images: [],
    rating: 4.5,
    reviewsCount: 34
  },
  {
    id: "elec-new-7",
    name: "\u0634\u0627\u0634\u0629 \u0623\u0644\u0639\u0627\u0628 \u0645\u0646\u062D\u0646\u064A\u0629 165Hz",
    description: "\u0634\u0627\u0634\u0629 \u0623\u0644\u0639\u0627\u0628 \u0645\u062A\u0637\u0648\u0631\u0629 \u0645\u0642\u0627\u0633 27 \u0628\u0648\u0635\u0629 \u0645\u0639 \u0645\u0639\u062F\u0644 \u062A\u062D\u062F\u064A\u062B \u0641\u0627\u0626\u0642 \u0627\u0644\u0633\u0631\u0639\u0629 \u0648\u0627\u0633\u062A\u062C\u0627\u0628\u0629 1ms \u0644\u062A\u062C\u0631\u0628\u0629 \u0644\u0639\u0628 \u0645\u062B\u0627\u0644\u064A\u0629 \u0648\u0633\u0644\u0633\u0629.",
    price: 320,
    quantity: 8,
    category: "computer_world",
    image: "https://picsum.photos/seed/gamingmonitor/400/400",
    images: [],
    rating: 4.8,
    reviewsCount: 52
  },
  {
    id: "elec-new-8",
    name: "\u0633\u0645\u0627\u0639\u0629 \u0631\u0623\u0633 \u0644\u0627\u0633\u0644\u0643\u064A\u0629 \u0645\u062E\u0635\u0635\u0629 \u0644\u0644\u0623\u0644\u0639\u0627\u0628",
    description: "\u0633\u0645\u0627\u0639\u0629 \u0623\u0644\u0639\u0627\u0628 \u0645\u062D\u064A\u0637\u064A\u0629 7.1 \u0645\u0639 \u0645\u064A\u0643\u0631\u0648\u0641\u0648\u0646 \u0639\u0627\u0632\u0644 \u0644\u0644\u0636\u0648\u0636\u0627\u0621 \u0648\u062A\u0635\u0645\u064A\u0645 \u0645\u0631\u064A\u062D \u0644\u0633\u0627\u0639\u0627\u062A \u0637\u0648\u064A\u0644\u0629 \u0645\u0646 \u0627\u0644\u0644\u0639\u0628 \u0627\u0644\u0645\u062A\u0648\u0627\u0635\u0644.",
    price: 99,
    quantity: 22,
    category: "headphones",
    image: "https://picsum.photos/seed/gamingheadset/400/400",
    images: [],
    rating: 4.7,
    reviewsCount: 65
  },
  {
    id: "elec-new-9",
    name: "\u0647\u0627\u062A\u0641 \u0630\u0643\u064A \u0623\u0646\u062F\u0631\u0648\u064A\u062F \u0631\u0627\u0626\u062F",
    description: "\u0647\u0627\u062A\u0641 \u0630\u0643\u064A \u0631\u0627\u0626\u062F \u0628\u0634\u0627\u0634\u0629 120Hz \u0648\u0643\u0627\u0645\u064A\u0631\u0627 \u0628\u062F\u0642\u0629 200 \u0645\u064A\u062C\u0627\u0628\u0643\u0633\u0644 \u0645\u0639 \u0623\u062F\u0627\u0621 \u062C\u0628\u0627\u0631 \u0648\u0628\u0637\u0627\u0631\u064A\u0629 \u062A\u062F\u0648\u0645 \u0637\u0648\u064A\u0644\u0627\u064B.",
    price: 1100,
    quantity: 12,
    category: "mobiles",
    image: "https://picsum.photos/seed/androidphone/400/400",
    images: [],
    rating: 4.8,
    reviewsCount: 94
  },
  {
    id: "elec-new-10",
    name: "\u0633\u0627\u0639\u0629 \u0631\u064A\u0627\u0636\u064A\u0629 \u0630\u0643\u064A\u0629 \u0645\u062A\u064A\u0646\u0629",
    description: "\u0633\u0627\u0639\u0629 \u0630\u0643\u064A\u0629 \u0645\u062E\u0635\u0635\u0629 \u0644\u0644\u0631\u064A\u0627\u0636\u0627\u062A \u0627\u0644\u0642\u0627\u0633\u064A\u0629 \u0648\u0627\u0644\u0645\u063A\u0627\u0645\u0631\u0627\u062A \u0645\u0639 \u062A\u062A\u0628\u0639 \u062F\u0642\u064A\u0642 \u0644\u0646\u0638\u0627\u0645 \u062A\u062D\u062F\u064A\u062F \u0627\u0644\u0645\u0648\u0627\u0642\u0639 \u0648\u0639\u0645\u0631 \u0628\u0637\u0627\u0631\u064A\u0629 \u0641\u0627\u0626\u0642 \u064A\u0635\u0644 \u0644\u0640 14 \u064A\u0648\u0645\u0627\u064B.",
    price: 249,
    quantity: 15,
    category: "smartwatches",
    image: "https://picsum.photos/seed/ruggedwatch/400/400",
    images: [],
    rating: 4.9,
    reviewsCount: 41
  },
  // --- 8 NEW PRODUCTS FOR FASHION ---
  {
    id: "fash-new-5",
    name: "\u0633\u062A\u0631\u0629 \u0631\u064A\u0627\u0636\u064A\u0629 \u0645\u0642\u0627\u0648\u0645\u0629 \u0644\u0644\u0631\u064A\u0627\u062D",
    description: "\u0633\u062A\u0631\u0629 \u0631\u064A\u0627\u0636\u064A\u0629 \u062E\u0641\u064A\u0641\u0629 \u0627\u0644\u0648\u0632\u0646 \u0648\u0645\u0642\u0627\u0648\u0645\u0629 \u0644\u0644\u0645\u0627\u0621 \u0648\u0627\u0644\u0631\u064A\u0627\u062D \u0644\u062C\u0645\u064A\u0639 \u0627\u0644\u0623\u0646\u0634\u0637\u0629 \u0627\u0644\u062E\u0627\u0631\u062C\u064A\u0629 \u0648\u0627\u0644\u062A\u0645\u0627\u0631\u064A\u0646 \u0627\u0644\u062C\u0631\u064A.",
    price: 110,
    quantity: 30,
    category: "sportswear",
    image: "https://picsum.photos/seed/windbreaker/400/400",
    images: [],
    rating: 4.8,
    reviewsCount: 62
  },
  {
    id: "fash-new-6",
    name: "\u0641\u0633\u062A\u0627\u0646 \u0628\u0646\u0627\u062A\u064A \u0628\u0646\u0642\u0634\u0629 \u0627\u0644\u0632\u0647\u0648\u0631",
    description: "\u0641\u0633\u062A\u0627\u0646 \u0628\u0646\u0627\u062A\u064A \u0631\u0642\u064A\u0642 \u0648\u0635\u064A\u0641\u064A \u0645\u0635\u0646\u0648\u0639 \u0645\u0646 \u0627\u0644\u0642\u0637\u0646 \u0627\u0644\u0646\u0627\u0639\u0645 \u0627\u0644\u0645\u0631\u064A\u062D \u0628\u0646\u0642\u0634\u0627\u062A \u0635\u064A\u0641\u064A\u0629 \u0632\u0627\u0647\u064A\u0629 \u0627\u0644\u0623\u0644\u0648\u0627\u0646.",
    price: 65,
    quantity: 25,
    category: "girls",
    image: "https://picsum.photos/seed/girldress/400/400",
    images: [],
    rating: 4.7,
    reviewsCount: 41
  },
  {
    id: "fash-new-7",
    name: "\u062C\u0627\u0643\u064A\u062A \u0631\u062C\u0627\u0644\u064A \u062C\u064A\u0646\u0632 \u0643\u0644\u0627\u0633\u064A\u0643\u064A",
    description: "\u062C\u0627\u0643\u064A\u062A \u062C\u064A\u0646\u0632 \u0645\u062A\u064A\u0646 \u0648\u062A\u0635\u0645\u064A\u0645 \u0639\u0635\u0631\u064A \u064A\u0646\u0627\u0633\u0628 \u0627\u0644\u0625\u0637\u0644\u0627\u0644\u0627\u062A \u0627\u0644\u0643\u0627\u062C\u0648\u0627\u0644 \u0627\u0644\u064A\u0648\u0645\u064A\u0629 \u0648\u0627\u0644\u0637\u0642\u0633 \u0627\u0644\u0645\u0639\u062A\u062F\u0644.",
    price: 75,
    quantity: 20,
    category: "men",
    image: "https://picsum.photos/seed/denimjacket/400/400",
    images: [],
    rating: 4.5,
    reviewsCount: 38
  },
  {
    id: "fash-new-8",
    name: "\u062D\u0642\u064A\u0628\u0629 \u0633\u0641\u0631 \u0643\u0644\u0627\u0633\u064A\u0643\u064A\u0629 \u0628\u0639\u062C\u0644\u0627\u062A",
    description: "\u062D\u0642\u064A\u0628\u0629 \u0633\u0641\u0631 \u0645\u062A\u064A\u0646\u0629 \u0648\u0645\u0642\u0627\u0648\u0645\u0629 \u0644\u0644\u0635\u062F\u0645\u0627\u062A \u0645\u0639 \u0639\u062C\u0644\u0627\u062A \u062F\u0648\u0627\u0631\u0629 \u0633\u0644\u0633\u0629 \u0648\u0645\u0633\u0627\u062D\u0629 \u062A\u062E\u0632\u064A\u0646 \u0648\u0627\u0633\u0639\u0629 \u0648\u0645\u0646\u0638\u0645\u0629 \u0644\u0631\u062D\u0644\u0627\u062A\u0643.",
    price: 160,
    quantity: 12,
    category: "travel_essentials",
    image: "https://picsum.photos/seed/suitcase/400/400",
    images: [],
    rating: 4.8,
    reviewsCount: 54
  },
  {
    id: "fash-new-9",
    name: "\u062D\u0630\u0627\u0621 \u062C\u0644\u062F\u064A \u0631\u0633\u0645\u064A \u0641\u0627\u062E\u0631",
    description: "\u062D\u0630\u0627\u0621 \u0631\u0633\u0645\u064A \u0631\u062C\u0627\u0644\u064A \u0645\u0635\u0646\u0648\u0639 \u0645\u0646 \u0627\u0644\u062C\u0644\u062F \u0627\u0644\u0637\u0628\u064A\u0639\u064A \u0627\u0644\u0625\u064A\u0637\u0627\u0644\u064A \u0639\u0627\u0644\u064A \u0627\u0644\u062C\u0648\u062F\u0629 \u0628\u062A\u0635\u0645\u064A\u0645 \u0643\u0644\u0627\u0633\u064A\u0643\u064A \u0623\u0646\u064A\u0642 \u0644\u0644\u0627\u062C\u062A\u0645\u0627\u0639\u0627\u062A \u0648\u0627\u0644\u0645\u0646\u0627\u0633\u0628\u0627\u062A.",
    price: 195,
    quantity: 15,
    category: "shoes",
    image: "https://picsum.photos/seed/oxfordshoes/400/400",
    images: [],
    rating: 4.7,
    reviewsCount: 29
  },
  {
    id: "fash-new-10",
    name: "\u062A\u064A \u0634\u064A\u0631\u062A \u0631\u064A\u0627\u0636\u064A \u0633\u0631\u064A\u0639 \u0627\u0644\u062C\u0641\u0627\u0641",
    description: "\u062A\u064A \u0634\u064A\u0631\u062A \u0631\u064A\u0627\u0636\u064A \u0645\u0635\u0646\u0648\u0639 \u0645\u0646 \u0623\u0644\u064A\u0627\u0641 \u062F\u0642\u064A\u0642\u0629 \u0642\u0627\u0628\u0644\u0629 \u0644\u0644\u062A\u0646\u0641\u0633 \u0648\u062A\u0637\u0631\u062F \u0627\u0644\u0631\u0637\u0648\u0628\u0629 \u0644\u0644\u062D\u0641\u0627\u0638 \u0639\u0644\u0649 \u0627\u0646\u062A\u0639\u0627\u0634\u0643 \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u062A\u0645\u0627\u0631\u064A\u0646.",
    price: 35,
    quantity: 50,
    category: "sportswear",
    image: "https://picsum.photos/seed/sporttshirt/400/400",
    images: [],
    rating: 4.6,
    reviewsCount: 74
  },
  {
    id: "fash-new-11",
    name: "\u0646\u0638\u0627\u0631\u0629 \u0634\u0645\u0633\u064A\u0629 \u0643\u0644\u0627\u0633\u064A\u0643\u064A\u0629 \u0645\u0633\u062A\u0642\u0637\u0628\u0629",
    description: "\u0646\u0638\u0627\u0631\u0629 \u0634\u0645\u0633\u064A\u0629 \u0623\u0646\u064A\u0642\u0629 \u0628\u0639\u062F\u0633\u0627\u062A \u0645\u0633\u062A\u0642\u0637\u0628\u0629 \u0648\u0645\u0642\u0627\u0648\u0645\u0629 \u0644\u0644\u062E\u062F\u0634 \u0644\u062D\u0645\u0627\u064A\u0629 \u0645\u062B\u0627\u0644\u064A\u0629 \u0644\u0644\u0639\u064A\u0646 \u0648\u0631\u0624\u064A\u0629 \u0648\u0627\u0636\u062D\u0629 \u062A\u062D\u062A \u0623\u0634\u0639\u0629 \u0627\u0644\u0634\u0645\u0633 \u0627\u0644\u0639\u0627\u0644\u064A\u0629.",
    price: 120,
    quantity: 18,
    category: "travel_essentials",
    image: "https://picsum.photos/seed/sunglasses/400/400",
    images: [],
    rating: 4.7,
    reviewsCount: 47
  },
  {
    id: "fash-new-12",
    name: "\u0633\u0627\u0639\u0629 \u064A\u062F \u0646\u0633\u0627\u0626\u064A\u0629 \u0630\u0647\u0628\u064A\u0629 \u0631\u0627\u0642\u064A\u0629",
    description: "\u0633\u0627\u0639\u0629 \u064A\u062F \u0646\u0633\u0627\u0626\u064A\u0629 \u0641\u0627\u062E\u0631\u0629 \u0645\u0637\u0644\u064A\u0629 \u0628\u0627\u0644\u0630\u0647\u0628 \u0627\u0644\u0648\u0631\u062F\u064A \u0648\u0645\u0631\u0635\u0639\u0629 \u0628\u0628\u0644\u0648\u0631\u0627\u062A \u0628\u0631\u0627\u0642\u0629 \u062A\u0645\u0646\u062D\u0643 \u0625\u0637\u0644\u0627\u0644\u0629 \u0633\u0627\u062D\u0631\u0629 \u0641\u064A \u0627\u0644\u0645\u0646\u0627\u0633\u0628\u0627\u062A \u0627\u0644\u0633\u0639\u064A\u062F\u0629.",
    price: 290,
    quantity: 10,
    category: "watches_fashion",
    image: "https://picsum.photos/seed/luxurywomenwatch/400/400",
    images: [],
    rating: 4.9,
    reviewsCount: 33
  },
  // --- 8 NEW PRODUCTS FOR HOME ---
  {
    id: "home-new-6",
    name: "\u0642\u0644\u0627\u064A\u0629 \u0647\u0648\u0627\u0626\u064A\u0629 \u0630\u0643\u064A\u0629 \u0628\u062F\u0648\u0646 \u0632\u064A\u062A",
    description: "\u0642\u0644\u0627\u064A\u0629 \u0635\u062D\u064A\u0629 \u0628\u0633\u0639\u0629 \u0643\u0628\u064A\u0631\u0629 \u0648\u0634\u0627\u0634\u0629 \u0644\u0645\u0633 \u0631\u0642\u0645\u064A\u0629 \u0644\u062A\u062D\u0636\u064A\u0631 \u0623\u0634\u0647\u0649 \u0627\u0644\u0645\u0623\u0643\u0648\u0644\u0627\u062A \u0628\u062F\u0647\u0648\u0646 \u0623\u0642\u0644 \u0628\u0646\u0633\u0628\u0629 85%.",
    price: 299,
    quantity: 14,
    category: "home_appliances",
    image: "https://picsum.photos/seed/airfryer/400/400",
    images: [],
    rating: 4.9,
    reviewsCount: 142
  },
  {
    id: "home-new-7",
    name: "\u0633\u0644\u0629 \u0645\u0647\u0645\u0644\u0627\u062A \u0630\u0643\u064A\u0629 \u0628\u0645\u0633\u062A\u0634\u0639\u0631 \u062D\u0631\u0643\u0629",
    description: "\u0633\u0644\u0629 \u0645\u0647\u0645\u0644\u0627\u062A \u0623\u0646\u064A\u0642\u0629 \u062A\u0641\u062A\u062D \u0648\u062A\u063A\u0644\u0642 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u0628\u0645\u0633\u062A\u0634\u0639\u0631 \u062F\u0642\u064A\u0642 \u0644\u0644\u062D\u0641\u0627\u0638 \u0639\u0644\u0649 \u0627\u0644\u0646\u0638\u0627\u0641\u0629 \u0627\u0644\u062A\u0627\u0645\u0629 \u0648\u0627\u0644\u062D\u062F \u0645\u0646 \u0627\u0644\u0631\u0648\u0627\u0626\u062D.",
    price: 75,
    quantity: 22,
    category: "waste_recycling",
    image: "https://picsum.photos/seed/smartbin/400/400",
    images: [],
    rating: 4.6,
    reviewsCount: 38
  },
  {
    id: "home-new-8",
    name: "\u0637\u0642\u0645 \u0623\u0648\u0627\u0646\u064A \u0637\u0647\u064A \u0633\u064A\u0631\u0627\u0645\u064A\u0643 \u0635\u062D\u064A",
    description: "\u0637\u0642\u0645 \u0623\u0648\u0627\u0646\u064A \u0637\u0647\u064A \u0645\u0643\u0648\u0646 \u0645\u0646 10 \u0642\u0637\u0639 \u063A\u064A\u0631 \u0644\u0627\u0635\u0642\u0629 \u0648\u062E\u0627\u0644\u064A\u0629 \u0645\u0646 \u0627\u0644\u0631\u0635\u0627\u0635 \u0648\u0627\u0644\u0645\u0648\u0627\u062F \u0627\u0644\u0643\u064A\u0645\u064A\u0627\u0626\u064A\u0629 \u0627\u0644\u0636\u0627\u0631\u0629 \u0644\u0646\u0638\u0627\u0645 \u062D\u064A\u0627\u0629 \u0635\u062D\u064A \u0648\u0622\u0645\u0646.",
    price: 240,
    quantity: 10,
    category: "home_appliances",
    image: "https://picsum.photos/seed/cookware/400/400",
    images: [],
    rating: 4.8,
    reviewsCount: 56
  },
  {
    id: "home-new-9",
    name: "\u0645\u0631\u0637\u0628 \u0648\u0645\u0648\u0632\u0639 \u0631\u0648\u0627\u0626\u062D \u0630\u0643\u064A",
    description: "\u0645\u0631\u0637\u0628 \u0647\u0648\u0627\u0621 \u0641\u0627\u0626\u0642 \u0627\u0644\u0647\u062F\u0648\u0621 \u0648\u0645\u0648\u0632\u0639 \u0644\u0644\u0632\u064A\u0648\u062A \u0627\u0644\u0639\u0637\u0631\u064A\u0629 \u0645\u0639 \u0625\u0636\u0627\u0621\u0629 \u0644\u064A\u0644\u064A\u0629 \u062F\u0627\u0641\u0626\u0629 \u0648\u0647\u0627\u062F\u0626\u0629 \u0644\u063A\u0631\u0641\u0629 \u0627\u0644\u0646\u0648\u0645 \u0648\u0627\u0644\u0645\u0643\u062A\u0628.",
    price: 39,
    quantity: 40,
    category: "home_decor",
    image: "https://picsum.photos/seed/diffuser/400/400",
    images: [],
    rating: 4.5,
    reviewsCount: 81
  },
  {
    id: "home-new-10",
    name: "\u0637\u0642\u0645 \u0648\u0633\u0627\u0626\u062F \u0637\u0628\u064A\u0629 \u0645\u0631\u064A\u062D\u0629",
    description: "\u0637\u0642\u0645 \u0645\u0646 \u0648\u0633\u0627\u062F\u062A\u064A\u0646 \u0645\u0635\u0646\u0648\u0639\u062A\u064A\u0646 \u0645\u0646 \u0631\u063A\u0648\u0629 \u0627\u0644\u0630\u0627\u0643\u0631\u0629 \u0627\u0644\u0645\u0631\u0646\u0629 \u0644\u062F\u0639\u0645 \u0627\u0644\u0631\u0642\u0628\u0629 \u0648\u0627\u0644\u0639\u0645\u0648\u062F \u0627\u0644\u0641\u0642\u0631\u064A \u0648\u0645\u0633\u0627\u0639\u062F\u0629 \u0627\u0644\u0646\u0648\u0645 \u0628\u0639\u0645\u0642 \u0648\u0631\u0627\u062D\u0629.",
    price: 55,
    quantity: 30,
    category: "bedding",
    image: "https://picsum.photos/seed/medicalpillow/400/400",
    images: [],
    rating: 4.7,
    reviewsCount: 92
  },
  {
    id: "home-new-11",
    name: "\u0645\u0631\u0648\u062D\u0629 \u0628\u0631\u062C\u064A\u0629 \u0630\u0643\u064A\u0629 \u0647\u0627\u062F\u0626\u0629",
    description: "\u0645\u0631\u0648\u062D\u0629 \u0639\u0645\u0648\u062F\u064A\u0629 \u0647\u0627\u062F\u0626\u0629 \u0648\u0628\u062F\u0648\u0646 \u0634\u0641\u0631\u0627\u062A \u0645\u0639 \u0645\u064A\u0632\u0629 \u062A\u0628\u0631\u064A\u062F \u0627\u0644\u0647\u0648\u0627\u0621 \u0648\u062A\u0623\u0631\u062C\u062D \u0648\u0627\u0633\u0639 \u0644\u062A\u062F\u0641\u0642 \u0647\u0648\u0627\u0621 \u0645\u062B\u0627\u0644\u064A \u0641\u064A \u0627\u0644\u0635\u064A\u0641.",
    price: 125,
    quantity: 18,
    category: "home_appliances",
    image: "https://picsum.photos/seed/towerfan/400/400",
    images: [],
    rating: 4.6,
    reviewsCount: 49
  },
  {
    id: "home-new-12",
    name: "\u0637\u0642\u0645 \u0645\u0646\u0638\u0645\u0627\u062A \u0623\u062F\u0631\u0627\u062C \u0627\u0644\u0645\u0637\u0628\u062E",
    description: "\u0645\u0646\u0638\u0645 \u0623\u062F\u0631\u0627\u062C \u0645\u0646 \u062E\u0634\u0628 \u0627\u0644\u0628\u0627\u0645\u0628\u0648 \u0627\u0644\u0637\u0628\u064A\u0639\u064A \u0627\u0644\u0642\u0627\u0628\u0644 \u0644\u0644\u062A\u0648\u0633\u064A\u0639 \u0644\u062A\u0631\u062A\u064A\u0628 \u0627\u0644\u0645\u0644\u0627\u0639\u0642 \u0648\u0627\u0644\u0633\u0643\u0627\u0643\u064A\u0646 \u0648\u0623\u062F\u0648\u0627\u062A \u0627\u0644\u0637\u0647\u064A \u0628\u0643\u0641\u0627\u0621\u0629 \u0648\u0623\u0646\u0627\u0642\u0629.",
    price: 32,
    quantity: 35,
    category: "storage_organization",
    image: "https://picsum.photos/seed/drawerorganizer/400/400",
    images: [],
    rating: 4.7,
    reviewsCount: 64
  },
  {
    id: "home-new-13",
    name: "\u0633\u062C\u0627\u062F\u0629 \u0623\u0631\u0636\u064A\u0629 \u0646\u0627\u0639\u0645\u0629 \u0643\u0644\u0627\u0633\u064A\u0643\u064A\u0629",
    description: "\u0633\u062C\u0627\u062F\u0629 \u0623\u0631\u0636\u064A\u0629 \u0648\u062B\u064A\u0631\u0629 \u0648\u0641\u0627\u0626\u0642\u0629 \u0627\u0644\u0646\u0639\u0648\u0645\u0629 \u0628\u062A\u0635\u0645\u064A\u0645 \u0628\u0648\u0647\u064A\u0645\u064A \u0631\u0627\u0642\u064D \u064A\u0636\u0641\u064A \u0644\u0645\u0633\u0629 \u062C\u0645\u0627\u0644\u064A\u0629 \u062F\u0627\u0641\u0626\u0629 \u0639\u0644\u0649 \u063A\u0631\u0641\u0629 \u0627\u0644\u0645\u0639\u064A\u0634\u0629 \u0648\u0627\u0644\u0635\u0627\u0644\u0627\u062A.",
    price: 180,
    quantity: 8,
    category: "home_decor",
    image: "https://picsum.photos/seed/bohorug/400/400",
    images: [],
    rating: 4.8,
    reviewsCount: 27
  },
  // --- 8 NEW PRODUCTS FOR BEEPHARMA ---
  {
    id: "bee-7",
    name: "\u0634\u0627\u0645\u0628\u0648 \u0627\u0644\u0642\u0637\u0631\u0627\u0646 \u0627\u0644\u0637\u0628\u064A\u0639\u064A \u0644\u0639\u0644\u0627\u062C \u0627\u0644\u0642\u0634\u0631\u0629",
    description: "\u062A\u0631\u0643\u064A\u0628\u0629 \u0639\u0634\u0628\u064A\u0629 \u0641\u0631\u064A\u062F\u0629 \u063A\u0646\u064A\u0629 \u0628\u0627\u0644\u0642\u0637\u0631\u0627\u0646 \u0648\u0627\u0644\u0645\u0633\u062A\u062E\u0644\u0635\u0627\u062A \u0627\u0644\u0637\u0628\u064A\u0629 \u0644\u062A\u0647\u062F\u0626\u0629 \u0641\u0631\u0648\u0629 \u0627\u0644\u0631\u0623\u0633 \u0648\u0627\u0644\u062A\u062E\u0644\u0635 \u0627\u0644\u0646\u0647\u0627\u0626\u064A \u0645\u0646 \u0627\u0644\u0642\u0634\u0631\u0629 \u0648\u0627\u0644\u062D\u0643\u0629.",
    price: 28,
    quantity: 92,
    category: "shampoos",
    image: "https://picsum.photos/seed/tarshampoo/400/400",
    images: [],
    rating: 4.7,
    reviewsCount: 92
  },
  {
    id: "bee-8",
    name: "\u0639\u0633\u0644 \u0627\u0644\u0633\u062F\u0631 \u0645\u0639 \u0627\u0644\u063A\u0630\u0627\u0621 \u0627\u0644\u0645\u0644\u0643\u064A \u0648\u062D\u0628\u0648\u0628 \u0627\u0644\u0644\u0642\u0627\u062D",
    description: "\u062A\u0631\u0643\u064A\u0628\u0629 \u0637\u0627\u0642\u0629 \u0648\u062D\u064A\u0648\u064A\u0629 \u0637\u0628\u064A\u0639\u064A\u0629 \u0645\u0645\u062A\u0627\u0632\u0629 \u0644\u0644\u0631\u064A\u0627\u0636\u064A\u064A\u0646 \u0648\u0627\u0644\u0631\u0627\u063A\u0628\u064A\u0646 \u0628\u0632\u064A\u0627\u062F\u0629 \u0627\u0644\u0646\u0634\u0627\u0637 \u0627\u0644\u0628\u062F\u0646\u064A \u0648\u0627\u0644\u062A\u0631\u0643\u064A\u0632 \u0627\u0644\u0630\u0647\u0646\u064A \u0648\u0627\u0644\u0645\u0646\u0627\u0639\u0629.",
    price: 115,
    quantity: 180,
    category: "therapeutic_mixtures",
    image: "https://picsum.photos/seed/royalhoneyblend/400/400",
    images: [],
    rating: 4.9,
    reviewsCount: 180
  },
  {
    id: "bee-9",
    name: "\u0643\u0631\u064A\u0645 \u0634\u0645\u0639 \u0627\u0644\u0646\u062D\u0644 \u0644\u062A\u0631\u0637\u064A\u0628 \u0627\u0644\u064A\u062F\u064A\u0646 \u0648\u0627\u0644\u0642\u062F\u0645\u064A\u0646",
    description: "\u0645\u0631\u0647\u0645 \u0634\u0645\u0639 \u0627\u0644\u0646\u062D\u0644 \u0627\u0644\u0637\u0628\u064A\u0639\u064A \u0645\u0639 \u0632\u064A\u062A \u0627\u0644\u0644\u0648\u0632 \u0627\u0644\u0646\u0642\u064A \u0644\u0625\u0635\u0644\u0627\u062D \u062A\u0634\u0642\u0642\u0627\u062A \u0627\u0644\u062C\u0644\u062F \u0648\u062C\u0641\u0627\u0641 \u0627\u0644\u0628\u0634\u0631\u0629 \u0627\u0644\u0634\u062F\u064A\u062F \u0628\u0641\u0639\u0627\u0644\u064A\u0629 \u0641\u0627\u0626\u0642\u0629 \u0648\u0633\u0631\u064A\u0639\u0629.",
    price: 24,
    quantity: 120,
    category: "creams",
    image: "https://picsum.photos/seed/beeswaxcream/400/400",
    images: [],
    rating: 4.8,
    reviewsCount: 73
  },
  {
    id: "bee-10",
    name: "\u0643\u0628\u0633\u0648\u0644\u0627\u062A \u0639\u0643\u0628\u0631 \u0627\u0644\u0646\u062D\u0644 (\u0627\u0644\u0628\u0631\u0648\u0628\u0648\u0644\u064A\u0633) \u0627\u0644\u0637\u0628\u064A\u0639\u064A\u0629",
    description: "\u0645\u0643\u0645\u0644 \u063A\u0630\u0627\u0626\u064A \u0637\u0628\u064A\u0639\u064A \u0645\u0646 \u0639\u0643\u0628\u0631 \u0627\u0644\u0646\u062D\u0644 \u0627\u0644\u0646\u0642\u064A \u0644\u062A\u0642\u0648\u064A\u0629 \u0627\u0644\u0645\u0646\u0627\u0639\u0629 \u0648\u0645\u0642\u0627\u0648\u0645\u0629 \u0627\u0644\u0627\u0644\u062A\u0647\u0627\u0628\u0627\u062A \u0648\u0627\u0644\u0641\u064A\u0631\u0648\u0633\u0627\u062A \u0648\u0646\u0632\u0644\u0627\u062A \u0627\u0644\u0628\u0631\u062F \u0627\u0644\u064A\u0648\u0645\u064A\u0629.",
    price: 49,
    quantity: 90,
    category: "therapeutic_mixtures",
    image: "https://picsum.photos/seed/propoliscapsules/400/400",
    images: [],
    rating: 4.9,
    reviewsCount: 104
  },
  {
    id: "bee-11",
    name: "\u0634\u0627\u0645\u0628\u0648 \u0639\u0633\u0644 \u0627\u0644\u0633\u062F\u0631 \u0627\u0644\u0637\u0628\u064A\u0639\u064A \u0627\u0644\u0645\u063A\u0630\u064A",
    description: "\u0634\u0627\u0645\u0628\u0648 \u0637\u0628\u064A\u0639\u064A \u062E\u0641\u064A\u0641 \u063A\u0646\u064A \u0628\u0639\u0633\u0644 \u0627\u0644\u0633\u062F\u0631 \u0627\u0644\u0637\u0628\u064A\u0639\u064A \u0644\u062A\u0631\u0637\u064A\u0628 \u0627\u0644\u0634\u0639\u0631 \u0627\u0644\u062C\u0627\u0641 \u0648\u0627\u0644\u062A\u0627\u0644\u0641 \u0645\u0646 \u0627\u0644\u062C\u0630\u0648\u0631 \u0628\u0639\u0645\u0642 \u0648\u0625\u0639\u0627\u062F\u0629 \u0644\u0645\u0639\u0627\u0646\u0647 \u0627\u0644\u0637\u0628\u064A\u0639\u064A.",
    price: 22,
    quantity: 110,
    category: "shampoos",
    image: "https://picsum.photos/seed/honeyshampoo/400/400",
    images: [],
    rating: 4.6,
    reviewsCount: 88
  },
  {
    id: "bee-12",
    name: "\u0635\u0627\u0628\u0648\u0646\u0629 \u0639\u0633\u0644 \u0627\u0644\u0646\u062D\u0644 \u0648\u0627\u0644\u062C\u0644\u0633\u0631\u064A\u0646 \u0627\u0644\u0637\u0628\u064A\u0639\u064A",
    description: "\u0635\u0627\u0628\u0648\u0646\u0629 \u0644\u0637\u064A\u0641\u0629 \u0648\u0645\u0631\u0637\u0628\u0629 \u0645\u0635\u0646\u0648\u0639\u0629 \u0645\u0646 \u0639\u0633\u0644 \u0627\u0644\u0646\u062D\u0644 \u0627\u0644\u0646\u0642\u064A \u0648\u0627\u0644\u062C\u0644\u0633\u0631\u064A\u0646 \u0644\u062A\u0646\u0638\u064A\u0641 \u0627\u0644\u0628\u0634\u0631\u0629 \u0627\u0644\u062D\u0633\u0627\u0633\u0629 \u0628\u0639\u0645\u0642 \u0648\u0628\u062F\u0648\u0646 \u0627\u0644\u062A\u0633\u0628\u0628 \u0641\u064A \u062C\u0641\u0627\u0641\u0647\u0627.",
    price: 12,
    quantity: 150,
    category: "natural_soap",
    image: "https://picsum.photos/seed/honeysoap/400/400",
    images: [],
    rating: 4.7,
    reviewsCount: 62
  },
  {
    id: "bee-13",
    name: "\u0628\u062E\u0648\u0631 \u0627\u0644\u0644\u0628\u0627\u0646 \u0627\u0644\u0630\u0643\u0631 \u0648\u0627\u0644\u0644\u0627\u0641\u0646\u062F\u0631 \u0627\u0644\u0645\u0647\u062F\u0626",
    description: "\u0645\u0632\u064A\u062C \u0641\u0627\u062E\u0631 \u0648\u0645\u0645\u064A\u0632 \u0645\u0646 \u0628\u062E\u0648\u0631 \u0627\u0644\u0644\u0628\u0627\u0646 \u0627\u0644\u0630\u0643\u0631 \u0627\u0644\u0639\u0645\u0627\u0646\u064A \u0648\u0627\u0644\u0644\u0627\u0641\u0646\u062F\u0631 \u0644\u062A\u0637\u0647\u064A\u0631 \u0647\u0648\u0627\u0621 \u0627\u0644\u0645\u0646\u0632\u0644 \u0648\u062A\u0647\u062F\u0626\u0629 \u0627\u0644\u0623\u0639\u0635\u0627\u0628 \u0648\u0625\u0634\u0627\u0639\u0629 \u0627\u0644\u0627\u0633\u062A\u0631\u062E\u0627\u0621.",
    price: 35,
    quantity: 60,
    category: "incense",
    image: "https://picsum.photos/seed/frankincense/400/400",
    images: [],
    rating: 4.8,
    reviewsCount: 45
  },
  {
    id: "bee-14",
    name: "\u0634\u0627\u064A \u0627\u0644\u0623\u0639\u0634\u0627\u0628 \u0627\u0644\u0645\u0647\u062F\u0626 \u0644\u0644\u0645\u0639\u062F\u0629 \u0648\u0627\u0644\u0642\u0648\u0644\u0648\u0646",
    description: "\u0645\u0632\u064A\u062C \u0637\u0628\u064A\u0639\u064A 100% \u0645\u0646 \u0623\u0632\u0647\u0627\u0631 \u0627\u0644\u0628\u0627\u0628\u0648\u0646\u062C \u0648\u0623\u0648\u0631\u0627\u0642 \u0627\u0644\u0646\u0639\u0646\u0627\u0639 \u0648\u0627\u0644\u064A\u0627\u0646\u0633\u0648\u0646 \u0644\u062A\u0647\u062F\u0626\u0629 \u0627\u0644\u062C\u0647\u0627\u0632 \u0627\u0644\u0647\u0636\u0645\u064A \u0648\u0627\u0644\u0645\u0633\u0627\u0639\u062F\u0629 \u0639\u0644\u0649 \u0627\u0644\u0646\u0648\u0645 \u0627\u0644\u0647\u0627\u0646\u0626.",
    price: 18,
    quantity: 200,
    category: "herbs",
    image: "https://picsum.photos/seed/herbaltea/400/400",
    images: [],
    rating: 4.7,
    reviewsCount: 115
  },
  // --- 8 NEW PRODUCTS FOR BEAUTY ---
  {
    id: "beauty-new-6",
    name: "\u0631\u063A\u0648\u0629 \u062D\u0644\u0627\u0642\u0629 \u0648\u063A\u0633\u0648\u0644 \u0639\u0646\u0627\u064A\u0629 \u0644\u0644\u0631\u062C\u0627\u0644",
    description: "\u0645\u0633\u062A\u062D\u0636\u0631 \u062B\u0646\u0627\u0626\u064A \u0627\u0644\u0645\u0641\u0639\u0648\u0644 \u064A\u0646\u0638\u0641 \u0627\u0644\u0628\u0634\u0631\u0629 \u0628\u0639\u0645\u0642 \u0648\u064A\u0647\u064A\u0626\u0647\u0627 \u0644\u0639\u0645\u0644\u064A\u0629 \u062D\u0644\u0627\u0642\u0629 \u0646\u0627\u0639\u0645\u0629 \u0648\u0645\u062B\u0627\u0644\u064A\u0629 \u0644\u0644\u0631\u062C\u0627\u0644 \u062F\u0648\u0646 \u062A\u0647\u064A\u062C \u0623\u0648 \u062C\u0631\u0648\u062D.",
    price: 22,
    quantity: 57,
    category: "mens_care",
    image: "https://picsum.photos/seed/menshavingshave/400/400",
    images: [],
    rating: 4.6,
    reviewsCount: 57
  },
  {
    id: "beauty-new-7",
    name: "\u0648\u0627\u0642\u064A \u0634\u0645\u0633 \u0641\u064A\u0632\u064A\u0627\u0626\u064A \u0645\u0642\u0627\u0648\u0645 \u0644\u0644\u0645\u0627\u0621",
    description: "\u062D\u0645\u0627\u064A\u0629 \u0641\u0627\u0626\u0642\u0629 \u0645\u0646 \u0627\u0644\u0623\u0634\u0639\u0629 \u0641\u0648\u0642 \u0627\u0644\u0628\u0646\u0641\u0633\u062C\u064A\u0629 \u0627\u0644\u0636\u0627\u0631\u0629 UVA/UVB \u0645\u0639 \u062A\u0631\u0637\u064A\u0628 \u062E\u0641\u064A\u0641 \u0648\u0633\u0631\u064A\u0639 \u0627\u0644\u0627\u0645\u062A\u0635\u0627\u0635 \u064A\u062F\u0648\u0645 \u0637\u0648\u0627\u0644 \u0627\u0644\u064A\u0648\u0645.",
    price: 45,
    quantity: 130,
    category: "seasonal_products",
    image: "https://picsum.photos/seed/sunscreen/400/400",
    images: [],
    rating: 4.8,
    reviewsCount: 130
  },
  {
    id: "beauty-new-8",
    name: "\u0645\u0643\u0648\u0627\u0629 \u062A\u0635\u0641\u064A\u0641 \u0627\u0644\u0634\u0639\u0631 \u0627\u0644\u0627\u062D\u062A\u0631\u0627\u0641\u064A\u0629 \u0628\u0627\u0644\u0628\u0644\u0648\u062A\u0648\u0646\u064A\u0648\u0645",
    description: "\u0645\u0643\u0648\u0627\u0629 \u0634\u0639\u0631 \u0633\u064A\u0631\u0627\u0645\u064A\u0643 \u0645\u062A\u0637\u0648\u0631\u0629 \u0644\u062D\u0645\u0627\u064A\u0629 \u062E\u0635\u0644\u0627\u062A \u0627\u0644\u0634\u0639\u0631 \u0645\u0646 \u0627\u0644\u062A\u0644\u0641 \u0627\u0644\u062D\u0631\u0627\u0631\u064A \u0648\u0641\u0631\u062F \u0648\u062A\u0635\u0641\u064A\u0641 \u0627\u0644\u0634\u0639\u0631 \u0628\u0633\u0644\u0627\u0633\u0629 \u0648\u0628\u0633\u0631\u0639\u0629 \u0641\u0627\u0626\u0642\u0629.",
    price: 150,
    quantity: 20,
    category: "beauty_devices",
    image: "https://picsum.photos/seed/hairstraightener/400/400",
    images: [],
    rating: 4.8,
    reviewsCount: 44
  },
  {
    id: "beauty-new-9",
    name: "\u0633\u064A\u0631\u0648\u0645 \u0627\u0644\u0647\u064A\u0627\u0644\u0648\u0631\u0648\u0646\u064A\u0643 \u0623\u0633\u064A\u062F \u0627\u0644\u0645\u0631\u0643\u0632",
    description: "\u0633\u064A\u0631\u0648\u0645 \u0644\u062A\u0631\u0637\u064A\u0628 \u0627\u0644\u0628\u0634\u0631\u0629 \u0627\u0644\u0645\u0643\u062B\u0641 \u0648\u0645\u0644\u0621 \u0627\u0644\u062E\u0637\u0648\u0637 \u0627\u0644\u062F\u0642\u064A\u0642\u0629 \u0648\u0627\u0644\u062A\u062C\u0627\u0639\u064A\u062F \u0644\u062A\u0628\u062F\u0648 \u0627\u0644\u0628\u0634\u0631\u0629 \u0623\u0643\u062B\u0631 \u0634\u0628\u0627\u0628\u0627\u064B \u0648\u062D\u064A\u0648\u064A\u0629 \u0648\u0646\u0636\u0627\u0631\u0629 \u0637\u0648\u0627\u0644 \u0627\u0644\u064A\u0648\u0645.",
    price: 55,
    quantity: 80,
    category: "skin_care",
    image: "https://picsum.photos/seed/hyaluronic/400/400",
    images: [],
    rating: 4.9,
    reviewsCount: 165
  },
  {
    id: "beauty-new-10",
    name: "\u0645\u062C\u0645\u0648\u0639\u0629 \u0638\u0644\u0627\u0644 \u0627\u0644\u0639\u064A\u0648\u0646 \u0628\u0640 12 \u0644\u0648\u0646\u0627\u064B \u0645\u0637\u0641\u0623 \u0648\u0644\u0627\u0645\u0639\u0627\u064B",
    description: "\u0644\u0648\u062D\u0629 \u0623\u0644\u0648\u0627\u0646 \u0638\u0644\u0627\u0644 \u0639\u064A\u0648\u0646 \u063A\u0646\u064A\u0629 \u0628\u0627\u0644\u0635\u0628\u063A\u0629 \u0627\u0644\u0641\u0627\u062E\u0631\u0629 \u0648\u0633\u0647\u0644\u0629 \u0627\u0644\u062F\u0645\u062C \u0644\u062A\u0645\u0646\u062D\u0643 \u0645\u0643\u064A\u0627\u062C \u0639\u064A\u0648\u0646 \u0633\u0627\u062D\u0631 \u0648\u062C\u0631\u064A\u0621 \u0644\u0644\u0646\u0647\u0627\u0631 \u0648\u0627\u0644\u0645\u0633\u0627\u0621.",
    price: 42,
    quantity: 45,
    category: "makeup",
    image: "https://picsum.photos/seed/eyeshadow/400/400",
    images: [],
    rating: 4.7,
    reviewsCount: 78
  },
  {
    id: "beauty-new-11",
    name: "\u0632\u064A\u062A \u0645\u0642\u0648\u064A \u0648\u0645\u063A\u0630\u064A \u0644\u0628\u0635\u064A\u0644\u0627\u062A \u0627\u0644\u0634\u0639\u0631",
    description: "\u062A\u0631\u0643\u064A\u0628\u0629 \u0641\u0631\u064A\u062F\u0629 \u063A\u0646\u064A\u0629 \u0628\u0627\u0644\u0632\u064A\u0648\u062A \u0627\u0644\u0637\u0628\u064A\u0639\u064A\u0629 \u0627\u0644\u0633\u0628\u0639\u0629 \u0627\u0644\u0645\u063A\u0630\u064A\u0629 \u0648\u0627\u0644\u0641\u064A\u062A\u0627\u0645\u064A\u0646\u0627\u062A \u0644\u0625\u0646\u0628\u0627\u062A \u0648\u062A\u0643\u062B\u064A\u0641 \u0627\u0644\u0634\u0639\u0631 \u0648\u0645\u0646\u0639 \u0627\u0644\u062A\u0633\u0627\u0642\u0637 \u0628\u0641\u0639\u0627\u0644\u064A\u0629.",
    price: 48,
    quantity: 65,
    category: "hair_care",
    image: "https://picsum.photos/seed/hairoil/400/400",
    images: [],
    rating: 4.7,
    reviewsCount: 91
  },
  {
    id: "beauty-new-12",
    name: "\u0639\u0637\u0631 \u0627\u0644\u0639\u0648\u062F \u0648\u0627\u0644\u0645\u0633\u0643 \u0627\u0644\u0634\u0631\u0642\u064A \u0627\u0644\u0641\u062E\u0645",
    description: "\u0639\u0637\u0631 \u0634\u0631\u0642\u064A \u0641\u0627\u062E\u0631 \u0648\u0633\u0627\u062D\u0631 \u064A\u062C\u0645\u0639 \u0628\u064A\u0646 \u062F\u0641\u0621 \u0627\u0644\u0639\u0648\u062F \u0627\u0644\u0623\u0635\u064A\u0644 \u0648\u062C\u0627\u0630\u0628\u064A\u0629 \u0627\u0644\u0645\u0633\u0643 \u0627\u0644\u0623\u0628\u064A\u0636 \u0628\u0646\u0633\u0628\u0629 \u062B\u0628\u0627\u062A \u062A\u062F\u0648\u0645 \u0644\u0623\u0643\u062B\u0631 \u0645\u0646 48 \u0633\u0627\u0639\u0629.",
    price: 140,
    quantity: 30,
    category: "mens_perfumes",
    image: "https://picsum.photos/seed/oudperfume/400/400",
    images: [],
    rating: 4.9,
    reviewsCount: 122
  },
  {
    id: "beauty-new-13",
    name: "\u0644\u0648\u0634\u0646 \u0645\u0631\u0637\u0628 \u0648\u0645\u0641\u062A\u062D \u0644\u0644\u062C\u0633\u0645 \u0628\u0627\u0644\u0643\u0631\u0632 \u0648\u0627\u0644\u064A\u0627\u0633\u0645\u064A\u0646",
    description: "\u0644\u0648\u0634\u0646 \u0645\u0639\u0637\u0631 \u0648\u0645\u0631\u0637\u0628 \u0639\u0645\u064A\u0642 \u0644\u0644\u062C\u0633\u0645 \u064A\u0645\u0646\u062D\u0643 \u0628\u0634\u0631\u0629 \u062D\u0631\u064A\u0631\u064A\u0629 \u0648\u0646\u0627\u0639\u0645\u0629 \u0648\u0631\u0627\u0626\u062D\u0629 \u0641\u0648\u0627\u062D\u0629 \u0645\u0645\u064A\u0632\u0629 \u062A\u0623\u0633\u0631 \u0627\u0644\u062D\u0648\u0627\u0633 \u0637\u0648\u0627\u0644 \u0627\u0644\u064A\u0648\u0645.",
    price: 29,
    quantity: 100,
    category: "womens_perfumes",
    image: "https://picsum.photos/seed/bodylotion/400/400",
    images: [],
    rating: 4.7,
    reviewsCount: 89
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
      return res.json(stored);
    }
    return res.json(INITIAL_PRODUCTS);
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
    try {
      const { viewedProducts, allProducts, purchaseHistory } = req.body;
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
      console.error("Server AI Recommendation Error:", error);
      res.status(500).json({ error: error.message || "AI Error", result: [] });
    }
  });
  app.post("/api/gemini/chat", async (req, res) => {
    try {
      const { message, products, history } = req.body;
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
      console.error("Server AI Chat Error:", error);
      const errStr = String(error).toLowerCase();
      const isLeakedKey = errStr.includes("leaked") || errStr.includes("leak") || errStr.includes("403") || errStr.includes("permission_denied") || errStr.includes("key") || errStr.includes("api_key_invalid") || errStr.includes("not valid");
      const errorMessage = isLeakedKey ? "\u26A0\uFE0F \u062A\u0645 \u0627\u0643\u062A\u0634\u0627\u0641 \u0645\u0634\u0643\u0644\u0629 \u0641\u064A \u0635\u0644\u0627\u062D\u064A\u0629 \u0645\u0641\u062A\u0627\u062D \u0627\u0644\u0648\u0635\u0648\u0644 (API Key) \u0644\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064A. \u0644\u062D\u0644\u0647\u0627 \u0641\u0648\u0631\u0627\u064B\u060C \u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0645\u0641\u062A\u0627\u062D \u0645\u062C\u0627\u0646\u064A \u062E\u0627\u0635 \u0628\u0643 \u0645\u0646 Google AI Studio \u0648\u0648\u0636\u0639\u0647 \u0641\u064A \u0642\u0627\u0626\u0645\u0629 'Settings' (\u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A) \u0641\u064A \u0627\u0644\u0632\u0627\u0648\u064A\u0629 \u0627\u0644\u0639\u0644\u0648\u064A\u0629 \u0627\u0644\u064A\u0645\u0646\u0649 \u0644\u0644\u0645\u0634\u0631\u0648\u0639 \u062A\u062D\u062A \u0627\u0633\u0645 \u0627\u0644\u0628\u064A\u0626\u0629 GEMINI_API_KEY \u0644\u062A\u0641\u0639\u064A\u0644 \u0627\u0644\u0645\u0633\u0627\u0639\u062F \u0627\u0644\u0630\u0643\u064A \u0641\u0648\u0631\u0627\u064B \u0648\u0628\u062F\u0648\u0646 \u0623\u064A \u0642\u064A\u0648\u062F!" : "\u0623\u0648\u0627\u062C\u0647 \u062D\u0627\u0644\u064A\u0627\u064B \u0635\u0639\u0648\u0628\u0629 \u0641\u064A \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u062E\u0627\u062F\u0645\u064A \u0628\u0633\u0628\u0628 \u0636\u063A\u0637 \u0627\u0644\u0637\u0644\u0628\u0627\u062A. \u064A\u0631\u062C\u0649 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0628\u0639\u062F \u0642\u0644\u064A\u0644!";
      res.status(500).json({ error: error.message || "AI Chat Error", result: errorMessage });
    }
  });
  app.post("/api/gemini/search", async (req, res) => {
    try {
      const { query, products } = req.body;
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
      console.error("Server Smart Search Error:", error);
      res.status(500).json({ error: error.message || "AI Search Error", result: [] });
    }
  });
  app.post("/api/gemini/inventory", async (req, res) => {
    try {
      const { products, orders } = req.body;
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
      console.error("Server Inventory Prediction Error:", error);
      res.status(500).json({ error: error.message || "AI Inventory Error", result: [] });
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
