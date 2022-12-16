import "../style.css";
import { Match, mom } from "./matches.js";

mom(document.getElementById("mommy"));//sets mommy to the proper container

new Match("R1GA", "left", 1, "A"); //makes a match. the first paramater should be "RxGy", where x is the third parameter and y is the fourth parameter
new Match("R1GB", "left", 1, "B"); // makes a match
new Match("R1GC", "left", 1, "C"); // makes a match
new Match("R1GD", "left", 1, "D"); // makes a match
new Match("R1GE", "right", 1, "E"); //makes a match
new Match("R1GF", "right", 1, "F"); // makes a match
new Match("R1GG", "right", 1, "G"); // makes a match
new Match("R1GH", "right", 1, "H"); // makes a match


//Round 2 (only 4 matches bc half the tournament gets eleminated in each round)

new Match("R2GA", "left", 2, "A"); // makes a match
new Match("R2GB", "left", 2, "B"); // makes a match
new Match("R2GC", "right", 2, "C"); // makes a match
new Match("R2GD", "right", 2, "D"); //makes a match


//Round 3 (only 2 matches)
new Match("R3GA", "left", 3, "A"); // makes a match
new Match("R3GB", "right", 3, "B"); //makes a match


new Match("R4GA", "center", 4, "A")