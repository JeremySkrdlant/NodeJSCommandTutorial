//The top section is usually used for importing libraries
//These chunks of code keep us from reinventing the wheel.

var fs = require("fs"); //Gives us access to the file system
var prompt = require("prompt"); //lets your user input data.
var cmd = require("node-run-cmd"); //runs terminal commands like open

//This function let's us slow things down a bit.
//Without it, everything would be instantaneous instead of the 
//nice slow line by line pace. 
// calling await sleep(3000)
// would wait 3 seconds before running the next line of code.  
function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

//This function is asyncronous and takes in one parameter. 
//note that javascript doesn't require you to specify the type 
//of the parameter.  You just need to give it a name. 
async function slowReadInFile(fileLocation){
    //using the file system to read our txt file and store the 
    //data in the fileText variable
    let fileText = fs.readFileSync(fileLocation, "utf-8"); 
    //We want to show one line at a time.  We are splitting the string 
    //into a bunch of individual strings based on the return character 
    //of \n. 
    let linesOfText = fileText.split("\n");
    //We loop through each line of text. 
    for(let i = 0; i < linesOfText.length; i++){
        //we display the individual line to the console
        console.log(linesOfText[i]);
        //we take a nice 200 milisecond nap before showing the next line.
        await sleep(200);
    }
}

//This function is used to check the students work.
async function runExpectedPrompt(expectedAnswer, wrongAnswerResponse){
    //We start off with not having the write answer. 
    var isCorrect = false; 

    //we will keep looping until we get the answer we want.
    // the ! means not, so we will loop while isCorrect is not 
    // true. 
    while (!isCorrect){
        //We ask the user for an answer
        const {answer} = await prompt.get(['answer']);

        if (answer == expectedAnswer){
            //They answered correctly, we break out of the loop
            //by setting isCorrect to true. 
            isCorrect = true;
        }else {
            //Ooops, wrong answer, log out a response and a blank 
            //line below. 
            console.log(wrongAnswerResponse + "\n\n");
        }
    }
}

//We can not block the main thread so we create this async function to 
//run.  This has to be asynchronous because we get input from our users. 
//We have no clue how much time they will take answering prompts.  
async function main(){
    //We use the await keyword to tell the computer to slow down. 
    //If we left it off, it would go on to the next line of code 
    //before this function finished. 
    await slowReadInFile("./Data/super/secret/data/stuff/welcome.txt");
    //console logs will print out to the terminal.  They are super useful for debugging code.
    console.log("\n\nOur mission in this tutorial is to get some food using the power of Node.js.")  
    console.log("What is your favorite restaurant?");
    
    //We start our prompt service. This was in the npm documentation.
    prompt.start()

    //We ask the user for information and store it in the variable restaurant.
    const {restaurant} = await prompt.get(['restauraunt'])
    console.log();

    //Robots are so cruel sometimes. 
    console.log("Eww, gross, maybe we should practice some command line instead.")
    await sleep(2000);
    await slowReadInFile("./Data/super/secret/data/stuff/cd.txt");

    //This runs our function above that had the while loop. 
    await runExpectedPrompt("cd Data", "Oops, try again, you want to change in to the directory called Data. Note that capital letters do matter.")
 
    //The rest of the code is the same stuff. The only thing we change 
    //are the files we read in and the questoins we ask. 
    console.log();
    console.log("Great Job.");
    await sleep(1000);
    console.log();
    console.log("Now we want to go backwards.");
    console.log("You can use two periods after the cd to go backwards.  Try it out.");

    await runExpectedPrompt("cd ..", "Oops, try again.  You need a space between the cd and the ..")
    console.log("😎");
    console.log("Ok, let's change into the directory called cheatsheets");
    
    await runExpectedPrompt("cd cheatsheets", "Oops, try again.")

    console.log();
    console.log("You are doing great!");
    await sleep(1500);

    await slowReadInFile("./Data/super/secret/data/stuff/ls.txt");

    await runExpectedPrompt("ls *.pdf", "Make sure you get the entire .pdf at the end.");
    console.log("📂 VSCode-keyboard-shortcuts.pdf");
    console.log()
    console.log("Looks like we found a cheat sheet. Let's look at how to open it.")

    await sleep(1000);
    await slowReadInFile("./Data/super/secret/data/stuff/open.txt");
    await runExpectedPrompt("open .", "let's try open . instead.");
    //This uses a node library we installed.  It allows us to 
    //run mac commands from node.  It is a little finicky on 
    //running commands so these commands are not the exact same 
    //as the tutorial.  The tutorial commands do work in the normal 
    //terminal though. 
    cmd.run("open cheatsheets");

    await sleep(1000);
    console.log("🤯")
    console.log("Holy cow, your console just opened up!!");
    console.log();
    console.log("Let's open up with the default application.  Type the following command.")
    console.log("open *.pdf");
    await runExpectedPrompt("open *.pdf", `Hmmm, That is odd. I think you have been eating at ${restaurant} to much. `)
    cmd.run("open ./cheatsheets/VSCode-keyboard-shortcuts-macos.pdf");
    await sleep(2000);

    //All Done
    await slowReadInFile("./Data/super/secret/data/stuff/thankYou.txt")
}

//We have to call main once.  Otherwise, node would go through the 
//file and just end without showing anything. A function that isn't 
//called isn't ever run.
main();
 
