const { expect } = require("chai");
const { ethers } = require("hardhat");
const fs = require("fs");
const { groth16, plonk } = require("snarkjs");

function unstringifyBigInts(o) {
    if ((typeof(o) == "string") && (/^[0-9]+$/.test(o) ))  {
        return BigInt(o);
    } else if ((typeof(o) == "string") && (/^0x[0-9a-fA-F]+$/.test(o) ))  {
        return BigInt(o);
    } else if (Array.isArray(o)) {
        return o.map(unstringifyBigInts);
    } else if (typeof o == "object") {
        if (o===null) return null;
        const res = {};
        const keys = Object.keys(o);
        keys.forEach( (k) => {
            res[k] = unstringifyBigInts(o[k]);
        });
        return res;
    } else {
        return o;
    }
}

// describe("HelloWorld", function () {
//     let Verifier;
//     let verifier; 

//     beforeEach(async function () {
//         Verifier = await ethers.getContractFactory("HelloWorldVerifier"); // obtaining some data of the HelloWorldVerifer
//         verifier = await Verifier.deploy(); // Deploying the contract
//         await verifier.deployed(); // waiting for the deployment promise
//     });

//     it("Should return true for correct proof", async function () {
//         //[assignment] Add comments to explain what each line is doing
//         const { proof, publicSignals } = await groth16.fullProve({"a":"1","b":"2"}, "contracts/circuits/HelloWorld/HelloWorld_js/HelloWorld.wasm","contracts/circuits/HelloWorld/circuit_final.zkey");  //here the two input (a) and (b) are been sent to the circuit then a proof and an output which was named (c) in the circuit in deconstructed from the return of the growth16 function

//         console.log('1x2 =',publicSignals[0]); //NOTE: the publicSignals is an array
        

//         const editedPublicSignals = unstringifyBigInts(publicSignals); // converting the number into a big integer
//         const editedProof = unstringifyBigInts(proof); // converting this proof to big interger
//         const calldata = await groth16.exportSolidityCallData(editedProof, editedPublicSignals);
        
    
//         const argv = calldata.replace(/["[\]\s]/g, "").split(',').map(x => BigInt(x).toString());
        
//         // The arrangement of the variables a,b,c,Input all came from the agrument of the verifyProof function on HelloWorldVerifier contract
//         const a = [argv[0], argv[1]];
//         const b = [[argv[2], argv[3]], [argv[4], argv[5]]];
//         const c = [argv[6], argv[7]];
//         const Input = argv.slice(8);
//         console.log(Input)

//         expect(await verifier.verifyProof(a, b, c, Input)).to.be.true; // verification state is checked here
//     });
//     it("Should return false for invalid proof", async function () { // here we are simulating a sinerio of a false proof to see if the circuit will give the right answer which is false
//         let a = [0, 0];
//         let b = [[0, 0], [0, 0]];
//         let c = [0, 0];
//         let d = [0]
//         expect(await verifier.verifyProof(a, b, c, d)).to.be.false;
//     });
// });


// describe("Multiplier3 with Groth16", function () {

//     beforeEach(async function () {
//         //[assignment] insert your script here
//         Verifier = await ethers.getContractFactory("Multiplier3Verifier"); // obtaining some data of the HelloWorldVerifer
//         verifier = await Verifier.deploy(); // Deploying the contract
//         await verifier.deployed(); // waiting for the deployment promise
//     });

//     it("Should return true for correct proof", async function () {
//         //[assignment] insert your script here
//         const { proof, publicSignals } = await groth16.fullProve({"a":"1","b":"2","c":"3"}, "contracts/circuits/Multiplier3/Multiplier3_js/Multiplier3.wasm","contracts/circuits/Multiplier3/circuit_final.zkey");  //here the three input (a) and (b) and (c) are been sent to the circuit then a proof and an output which was named (d) in the circuit in deconstructed from the return of the growth16 function

//         console.log('1x2x3 =',publicSignals[0]); //NOTE: the publicSignals is an array
        

//         const editedPublicSignals = unstringifyBigInts(publicSignals); // converting the number into a big integer
//         const editedProof = unstringifyBigInts(proof); // converting this proof to big interger
//         const calldata = await groth16.exportSolidityCallData(editedProof, editedPublicSignals);
        
    
//         const argv = calldata.replace(/["[\]\s]/g, "").split(',').map(x => BigInt(x).toString());
    
//         const a = [argv[0], argv[1]];
//         const b = [[argv[2], argv[3]], [argv[4], argv[5]]];
//         const c = [argv[6], argv[7]];
//         const Input = argv.slice(8);
//         console.log(Input)

//         expect(await verifier.verifyProof(a, b, c, Input)).to.be.true;
//     });
//     it("Should return false for invalid proof", async function () { // here we are simulating a sinerio of a false proof to see if the circuit will give the right answer which is false
//         //[assignment] insert your script here
//         let a = [0, 0];
//         let b = [[0, 0], [0, 0]];
//         let c = [0, 0];
//         let d = [0]
//         expect(await verifier.verifyProof(a, b, c, d)).to.be.false;
//     });
// });






describe("Multiplier3 with PLONK", function () {

    beforeEach(async function () {
        //[assignment] insert your script here
        Verifier = await ethers.getContractFactory("_plonkMultiplier3Verifier"); // obtaining some data of the HelloWorldVerifer
        verifier = await Verifier.deploy(); // Deploying the contract
        await verifier.deployed(); // waiting for the deployment promise
    });

    it("Should return true for correct proof", async function () {
        //[assignment] insert your script here
        const { proof, publicSignals } = await plonk.fullProve("contracts/circuits/_plonkMultiplier3/circuit_final.zkey", "contracts/circuits/_plonkMultiplier3/Multiplier3_js/Multiplier3.wasm");  //here the three input (a) and (b) and (c) are been sent to the circuit then a proof and an output which was named (d) in the circuit in deconstructed from the return of the growth16 function

        console.log('1x2x3 =',publicSignals[0]); //NOTE: the publicSignals is an array
        

        const editedPublicSignals = unstringifyBigInts(publicSignals); // converting the number into a big integer
        const editedProof = unstringifyBigInts(proof); // converting this proof to big interger
        const calldata = await plonk.exportSolidityCallData(editedProof, editedPublicSignals);
        console.log(proof)
    
        const argv = calldata.replace(/["[\]\s]/g, "").split(',').map(x => BigInt(x).toString());
    
        const a = [argv[0], argv[1]];
        const b = [[argv[2], argv[3]], [argv[4], argv[5]]];
        const c = [argv[6], argv[7]];
        const Input = argv.slice(8);

        expect(await verifier.verifyProof(a, b, c, Input)).to.be.true;

    });
    it("Should return false for invalid proof", async function () { // here we are simulating a sinerio of a false proof to see if the circuit will give the right answer which is false
        //[assignment] insert your script here
        let a = [0, 0];
        let b = [[0, 0], [0, 0]];
        let c = [0, 0];
        let d = [0]
        expect(await verifier.verifyProof(a, b, c, d)).to.be.false;
    });
});