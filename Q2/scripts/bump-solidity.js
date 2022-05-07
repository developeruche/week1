const fs = require("fs");
const solidityRegex = /pragma solidity \^\d+\.\d+\.\d+/

const verifierRegex = /contract Verifier/
const verifierRegexPlonk = /contract PlonkVerifier/  // when the plonk verifier contract is generated, it is named PlonkVerifier


// Working on the HelloWorldVerifier contract
let content = fs.readFileSync("./contracts/HelloWorldVerifier.sol", { encoding: 'utf-8' }); // reading the HelloWorlVerifier contract in ufr-8 encoding
let bumped = content.replace(solidityRegex, 'pragma solidity ^0.8.0'); // this line of code changes the solidity compiler version
bumped = bumped.replace(verifierRegex, 'contract HelloWorldVerifier'); // this line of code changes the the name of the contract from Verifier to HelloWorldVerifier

// Working on the Multiplier3Verifier contract
let content2 = fs.readFileSync("./contracts/Multiplier3Verifier.sol", { encoding: 'utf-8' });
let bumped2 = content2.replace(solidityRegex, 'pragma solidity ^0.8.0'); // this line of code changes the solidity compiler version
bumped2 = bumped2.replace(verifierRegex, 'contract Multiplier3Verifier'); // this line of code changes the name of the ontract from Verififer to Multiplier3Verifier


// Working on the _plonkMultiplier3Verifier contract
let content3 = fs.readFileSync("./contracts/_plonkMultiplier3Verifier.sol", { encoding: 'utf-8' });
let bumped3 = content3.replace(solidityRegex, 'pragma solidity ^0.8.0'); // this line of code changes the solidity compiler version
bumped3 = bumped3.replace(verifierRegexPlonk, 'contract _plonkMultiplier3Verifier'); // this line of code changes the name of the ontract from Verififer to Multiplier3Verifier




// Here the implementation is carried out
fs.writeFileSync("./contracts/HelloWorldVerifier.sol", bumped);
// [assignment] add your own scripts below to modify the other verifier contracts you will build during the assignment
fs.writeFileSync("./contracts/Multiplier3Verifier.sol", bumped2);
fs.writeFileSync("./contracts/_plonkMultiplier3Verifier.sol", bumped3);


