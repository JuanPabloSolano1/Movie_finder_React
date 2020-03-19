// So let's write a couple and then you can go back to your life, lol.

/// Aite cool. Just letting you know so you can see output.

const combineNames = (firstName, lastName) => {
  const fullName = () => {
    return firstName + " " + lastName;
  };

  return fullName;
};

const Jake = combineNames("Jake", "Johnson");
// AHA!
// Stop!

// Perfect...

// Perfect perfect example of closure.
// See in the output? firstName and lastName...
// but there is no trace of those values anywhere
// in the function. So that is the magic.
console.log(Jake);
// God dammit, haha.
//It's not showing any console output for me

// FINISH HIM
