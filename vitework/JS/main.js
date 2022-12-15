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