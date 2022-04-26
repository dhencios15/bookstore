const ApiQuery = (Model, queryStr) => {
  const queryString = queryStr;
  const excludeFields = ["page", "sort", "limit", "fields"];
  let sort = "-createdAt";
  let fields = "-__v";

  // filter
  const queryObj = { queryStr };
  excludeFields.forEach((el) => delete queryObj[el]);
  let quertStr = JSON.stringify(queryObj);
  quertStr = quertStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

  //sorting
  if (queryStr.sort) {
    sort = queryStr.sort.split(",").join(" ");
  }

  // field limiting
  if (queryStr.fields) {
    fields = queryStr.fields.split(",").join(" ");
  }

  // pagination
  const page = queryStr.page * 1 || 1;
  const limit = queryStr.limit * 1 || 10;

  const options = {
    page,
    limit,
    select: fields,
    sort,
    customLabels: {
      docs: "data",
      totalDocs: "total_items",
    },
  };

  return Model.paginate(queryString, options);
};

export default ApiQuery;
