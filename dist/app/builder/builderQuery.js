"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const builderQuery = (modelQuery, query, searchAbleFields) => __awaiter(void 0, void 0, void 0, function* () {
    // search query
    let constructorQuery = modelQuery.find();
    let searchText = "";
    if (query === null || query === void 0 ? void 0 : query.searchTerm) {
        searchText = query === null || query === void 0 ? void 0 : query.searchTerm;
        constructorQuery = constructorQuery.find({
            $or: searchAbleFields.map((field) => ({
                [field]: { $regex: searchText, $options: "i" },
            })),
        });
    }
    //query for filtering
    const queryObj = Object.assign({}, query);
    const excludesFields = [
        "searchTerm",
        "sort",
        "limit",
        "page",
        "skip",
        "fields",
    ];
    excludesFields.forEach((ele) => delete queryObj[ele]);
    // Handling multiple categories
    if (queryObj.category) {
        const categories = queryObj.category.split(",");
        constructorQuery = constructorQuery.find({ category: { $in: categories } });
    }
    //sorting query
    let sort = "-createdAt";
    if (query === null || query === void 0 ? void 0 : query.sort) {
        sort = (query === null || query === void 0 ? void 0 : query.sort).split(",").join(" ");
        constructorQuery = constructorQuery.sort(sort);
    }
    //pagination query
    let limit = 1;
    let page = 1;
    let skip = 0;
    if (query === null || query === void 0 ? void 0 : query.limit) {
        limit = Number(query === null || query === void 0 ? void 0 : query.limit);
        constructorQuery = constructorQuery.limit(limit);
    }
    if (query === null || query === void 0 ? void 0 : query.page) {
        page = Number(query === null || query === void 0 ? void 0 : query.page);
        skip = (page - 1) * limit;
        constructorQuery = constructorQuery.skip(skip);
    }
    //fields filtering query
    let fields = "-__v";
    if (query === null || query === void 0 ? void 0 : query.fields) {
        fields = (query === null || query === void 0 ? void 0 : query.fields).split(",").join(" ");
        constructorQuery = constructorQuery.select(fields);
    }
    return constructorQuery;
});
exports.default = builderQuery;
