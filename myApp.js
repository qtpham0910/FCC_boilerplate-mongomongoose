require('dotenv').config();
const mongoose = require('mongoose');
const { Schema } = mongoose;
const dotenv = require('dotenv');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });



const personSchema = new Schema({
  name: { 
    type: String, 
    required: true },
  age: Number,
  favoriteFoods: [String]
});

const Person = mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {
  const James = new Person({name: "Lebron James", age: 38, favoriteFoods: ["taco taco", "Pizza"]})

  James.save(function(err, data) {
    if (err) return console.error(err);
    done(null, data)
  });
};

const arrayOfPeople = [
  {name: "Steph", age: 34, favoriteFoods: "Curry"},
  {name: "Jokic", age: 24, favoriteFoods: "Cola"},
  {name: "Doncic", age: 24, favoriteFoods: "Burger"}
]

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, people) =>  {
    if (err) return console.log(err);    
    done(null, people);
  })
 
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, (err, personFound) => {
    if (err) return console.log(err);
    done(null, personFound);
  })
  
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, (err, foodFound) => {
    if (err) return console.log(err);
    done(null, foodFound);
  });
};

const findPersonById = (personId, done) => {
  Person.findById(personId, function (err, IdFound) {
    if (err) return console.log(err);
    done(null, IdFound);
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById(personId, function (err, person) {
    if(err) return console.log(err);
    person.favoriteFoods.push(foodToAdd);

    person.save((err, updatedPerson) => {
      if(err) return console.log(err);
      done(null, updatedPerson);
    })
  })
  
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (err, updateDoc) => {
    if(err) return console.log(err);
    done(null, updateDoc);
  })
};

const removeById = (personId, done) => {

  Person.findByIdAndRemove(personId, (err, removePerson) => {
    if (err) return console.log(err);
    done(null, removePerson);
  } )
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, (err, removeList) => {
    if(err) return console.log(err);
    done(null, removeList);
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  const findQuery = Person.find({favoriteFoods: foodToSearch});
  Person.find({favoriteFoods: foodToSearch}, )
        .sort({name : 1})
        .limit(2)
        .select('-age')
        .exec((err, result) => {
          if(err) return console.log(err);
          done(null, result);
        });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
