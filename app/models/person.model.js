module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      name: String,
      cpf: String,
      age: String,
      city: String,
      uf: String,
      email: String,
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Person = mongoose.model("person", schema);
  return Person;
};
