import { FilterQuery, Query } from "mongoose";

const builderQuery = async <T>(
  modelQuery: Query<T[], T>,
  query: Record<string, unknown>,
  searchAbleFields: string[]
) => {
  // search query
  let constructorQuery = modelQuery.find();
  let searchText = "";
  if (query?.searchTerm) {
    searchText = query?.searchTerm as string;
    constructorQuery = constructorQuery.find({
      $or: searchAbleFields.map((field) => ({
        [field]: { $regex: searchText, $options: "i" },
      })),
    } as FilterQuery<T>);
  }

  //query for filtering
  const queryObj = { ...query };
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
  if (queryObj!.category) {
    const categories = (queryObj!.category as string).split(",");
    constructorQuery = constructorQuery.find({ category: { $in: categories } });
  }

  //sorting query
  let sort = "-createdAt";
  if (query?.sort) {
    sort = (query?.sort as string).split(",").join(" ");
    constructorQuery = constructorQuery.sort(sort);
  }

  //pagination query
  let limit = 1;
  let page = 1;
  let skip = 0;
  if (query?.limit) {
    limit = Number(query?.limit);
    constructorQuery = constructorQuery.limit(limit);
  }
  if (query?.page) {
    page = Number(query?.page);
    skip = (page - 1) * limit;
    constructorQuery = constructorQuery.skip(skip);
  }

  //fields filtering query
  let fields = "-__v";
  if (query?.fields) {
    fields = (query?.fields as string).split(",").join(" ");
    constructorQuery = constructorQuery.select(fields);
  }

  return constructorQuery;
};

export default builderQuery;
