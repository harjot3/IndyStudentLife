function save_data(variable) {

    if (!document.getElementById(variable).value) {

         let zip_code_entered = false;
         localStorage.setItem("localZipCode", zip_code_entered);

    } else {

        /* Assigning Zip Code as userInput */
        /* Printing it to the assigned output element in front html  */
        /* Saving Zip Code as userInput */

        let userInput = document.getElementById(variable).value;
        localStorage.setItem("savedZipCode", userInput);


        let zip_code_entered = true;
        localStorage.setItem("localZipCode", zip_code_entered);

        /* Accessing Zip Code as userInput */
    }
}

if (localStorage.getItem("localZipCode") == "true") {
    document.getElementById("index2_id_1").innerHTML = "You entered the zip code " + localStorage.getItem("savedZipCode") + ".";
} else {
    document.getElementById("index2_id_1").innerHTML = "You did not enter a code.";
}
