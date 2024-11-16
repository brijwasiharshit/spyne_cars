class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }
  // search() {
  //   const keyword = this.queryStr.keyword
  //     ? {
  //         title: {
  //           $regex: this.queryStr.keyword,
  //           $options: "i",
  //         },
  //       }
  //     : {};

  //   this.query = this.query.find({ ...keyword });
  //   return this;
  // }
  search() {
    const keyword = this.queryStr.keyword
      ? {
          $or: [
            { title: { $regex: this.queryStr.keyword, $options: "i" } },
            { description: { $regex: this.queryStr.keyword, $options: "i" } },
            {
              "tags.car_type": { $regex: this.queryStr.keyword, $options: "i" },
            },
            {
              "tags.company": { $regex: this.queryStr.keyword, $options: "i" },
            },
            { "tags.dealer": { $regex: this.queryStr.keyword, $options: "i" } },
            { "tags.rating": { $regex: this.queryStr.keyword, $options: "i" } },
            {
              "tags.mileage": { $regex: this.queryStr.keyword, $options: "i" },
            },
            {
              "tags.fuelType": { $regex: this.queryStr.keyword, $options: "i" },
            },
          ],
        }
      : {};

    this.query = this.query.find({ ...keyword });
    return this;
  }
  filter() {
    const queryCopy = { ...this.queryStr };
    const removeFields = ["keyword", "page", "limit"];
    removeFields.forEach((key) => delete queryCopy[key]);
    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }
}
module.exports = ApiFeatures;
