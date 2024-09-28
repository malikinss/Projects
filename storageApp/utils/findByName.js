
const findByName = async function (givenSchema, fieldName) {
    return givenSchema.findOne({ name: fieldName });
};

module.exports = findByName;