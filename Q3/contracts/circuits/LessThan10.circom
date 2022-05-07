pragma circom 2.0.0;

include "../../node_modules/circomlib/circuits/comparators.circom";

template LessThan10() {
    // This wouold compare the input to the 10 checking if the input (in) is greater than ten.
    signal input in;
    signal output out;

    component lt = LessThan(32); // 32 is the size of the input data (it can span to 252)

    // the next two line of code implements this (in < 10);
    lt.in[0] <== in; 
    lt.in[1] <== 10;

    out <== lt.out; // this would return 1 0r 0
}