pragma circom 2.0.0;

// [assignment] Modify the circuit below to perform a multiplication of three signals


template Multiplier2 () {  

   // Declaration of signals.  
   signal input a;  
   signal input b;  
   signal output c;  

   // Constraints.  
   c <== a * b;  
}


template Multiplier3 () {    

   // "Non-qudratic constraints are not allowed error would occur using this code"

   // Using this code instead
   // Declaration of signals.  
   signal input a;  //this is the first input
   signal input b; // this is the second input
   signal input c; // this is the thrid input
   signal output d; // this is the output 
   component mult1 = Multiplier2(); // initialing the circuit which would multipling a and b and give an input c
   component mult2 = Multiplier2(); // initialing the circuit which would multipling a and b and give an input c

   // statements.
   mult1.a <== a; // allocating the input (a) of this circuit to the input (a) of the initalized mult1 
   mult1.b <== b; // allocating the input (b) of this circuit to the input (b) of the initalized mult1 
   mult2.a <== mult1.c; // allocating the output of mult1 circuit to the input (a) of the initalized muit2 circuit
   mult2.b <== c; // allocating the input (c) of this contract to the input (b) of the circuit mult2
   d <== mult2.c; // Here the constrant occurs and the paramater is qudratic in nature

}

component main = Multiplier3(); // Initalization process of the Muitiply3 circuit