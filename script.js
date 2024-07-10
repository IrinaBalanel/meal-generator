// TABLE OF CONTENTS:
// 1. Elements that are hidden by default
// 2. Arrays of meal types and meals
// 3. Object to store favourite meals
// 4. 'Generate' functionality to get random meals from the array and output data + Card flip animation
// 5. 'Add to the menu' functionality + sidebar menu - Add to menu button
// 6. 'Clear the menu' functionality - Start over button
// 7. 'Show menu for the day' functionality - Finish button
// 8. 'Create new menu or generate new meal' functionality - Generate new button
// ARCHIVED

$(window).on("load", function(){
    
    //1. Elements that are hidden by default
    $("#btn-add-to-menu").hide();
    $("#meal-card-front").hide();
    $("#meal-card-back").hide();
    $("#small-menu").hide();
    $("#btn-show-menu").hide();
    $("#btn-cancel-menu").hide();
    $(".full-menu-page").hide();

    //2. Arrays of meal types and meals
    var breakfast = [

        frenchCrepes = {
            name: "French Crepes",
            image: "images/crepes.png",
            ingredients:"1 cup all-purpose flour, 2 eggs, 1/2 cup milk, 1/2 cup water, 2 tablespoons melted butter, 1/4 teaspoon salt, butter or oil for frying.",
            instructions:"In a mixing bowl, whisk together the flour and eggs. Gradually add in the milk and water, stirring to combine. Add the melted butter and salt, and beat the batter until smooth.Heat a lightly greased non-stick pan over medium heat. Pour a small amount of batter into the pan and swirl it around to coat the bottom evenly. Cook the crepe for about 2 minutes, until the edges start to lift from the pan and the bottom is lightly browned. Flip the crepe and cook for another 1-2 minutes on the other side. Repeat with the remaining batter, stacking the crepes on a plate as you go. Serve the crepes warm with your favorite fillings such as Nutella, fruits, whipped cream, or savory options like cheese and ham."
        },

        avocadoToasts = {
            name: "Avocado Toast with Egg",
            image: "images/avocado-toast.png",
            ingredients:"Sliced bread, ripe avocado, eggs, salt, pepper, optional toppings like cherry tomatoes, feta cheese, or microgreens.",
            instructions:"Toast the bread until golden brown. Slice or mash ripe avocado and spread it on the toast. Poach an egg and place it on top of the avocado. Season with salt and pepper. Add optional toppings for extra flavor and texture."
        },

        chiaPudding = {
            name: "Chia Seed Pudding",
            image: "images/pudding.png",
            ingredients:"Chia seeds, milk (almond milk, coconut milk, or dairy milk), vanilla extract, honey or agave syrup, fresh fruit for topping (e.g., mango, berries).",
            instructions:"Mix chia seeds, milk, vanilla extract, and sweetener in a bowl. Let it sit for a few hours or overnight in the refrigerator until it thickens into a pudding-like consistency. Serve chilled with fresh fruit toppings for a nutritious and filling breakfast."
        }
    ];

    var lunch = [

        tunaSalad = {
            name: "Tuna salad",
            image: "images/tuna-salad.png",
            ingredients:"1 can of tuna, 1/4 cup mayonnaise, 1 tablespoon Dijon mustard, 1/4 cup chopped celery, 1/4 cup chopped red onion, 1/4 cup chopped pickles or relish, salt and pepper to taste, fresh lemon juice.",
            instructions:"Drain the canned tuna and mix with mayo and optional mustard. Adjust mayo for desired creaminess. Add chopped celery, red onion, and pickles for texture and flavor. Season with salt, pepper, and optional lemon juice. Mix thoroughly until tuna is evenly coated. Chill for 30 mins for best flavor. Serve as a sandwich filling or with crackers. Store leftovers in the fridge for up to 2-3 days."
        },

        chickenRice = {
            name: "Teriyaki Chicken Rice Bowl",
            image: "images/rice.png",
            ingredients:"Cooked rice, teriyaki chicken (grilled or stir-fried), steamed broccoli, sliced carrots, green onions, sesame seeds.",
            instructions:"Arrange rice, chicken, and vegetables in a bowl. Drizzle with teriyaki sauce. Garnish with green onions and sesame seeds."
        },

        pasta = {
            name: "Pasta Primavera",
            image: "images/pasta.png",
            ingredients:"Pasta (such as penne or spaghetti), mixed vegetables (bell peppers, zucchini, cherry tomatoes), garlic, olive oil, Parmesan cheese, fresh herbs (basil or parsley).",
            instructions:"Cook pasta according to package instructions. Sauté vegetables and garlic in olive oil until tender. Toss pasta with vegetables, Parmesan, and herbs. Serve hot with extra cheese on top."
        }
    ];

    var dinner = [

        curry = {
            name: "Indian curry",
            image: "images/curry.png",
            ingredients:"1 lb chicken/tofu, 2 chopped onions, 3 pureed tomatoes, 3 cloves garlic, minced, grated ginger, cumin seeds, coriander powder, turmeric powder, garam masala, oil, salt to taste.",
            instructions:"Heat oil in a pan and sauté onions and garlic until golden. Add curry powder and stir for a minute. Pour in coconut milk and bring to a simmer. Add vegetables and cooked chickpeas/chicken. Cook until vegetables are tender. Season with salt and pepper. Serve hot with rice or naan."
        },

        tacos = {
            name: "Beef Tacos",
            image: "images/tacos.png",
            ingredients:"1 lb ground beef, 1 packet taco seasoning, 8 small corn or flour tortillas. Toppings: shredded lettuce, diced tomatoes, shredded cheese, sour cream, salsa.",
            instructions:"In a skillet, brown ground beef over medium heat. Drain excess fat. Add taco seasoning and water (as per packet instructions). Simmer until sauce thickens. Warm tortillas in a separate pan or microwave. Assemble tacos by spooning beef mixture onto tortillas and adding desired toppings. Serve immediately with extra salsa and a side of Mexican rice or beans."
        },

        carbonara = {
            name: "Spaghetti Carbonara",
            image: "images/carbonara.png",
            ingredients:"8 oz spaghetti, 4 slices of bacon, chopped, 2 garlic cloves, minced, 2 large eggs. 1/2 cup grated Parmesan cheese. Salt and black pepper to taste.",
            instructions:"Cook spaghetti according to package instructions. Reserve 1/2 cup of pasta water before draining. In a separate pan, cook bacon until crispy. Add minced garlic and cook until fragrant. In a bowl, whisk eggs, Parmesan cheese, salt, and pepper. Add drained pasta to the bacon pan, then quickly toss with the egg mixture. Add reserved pasta water if needed for a creamy sauce. Serve immediately with extra Parmesan on top."
        }


    ];

    var meals = [breakfast, lunch, dinner];

    // 3. Object to store favourite meals
    var myMenu = {
        breakfast: {},
        lunch: {},
        dinner: {}
    };
    
    // 4. 'Generate' functionality to get random meals from the array and output data
    /// Variables
    var selectedOption = document.getElementById("meal-types");
    var mealTypeInput = document.getElementById("picked_meal_type");
    var randomMeal;
    var mealCard = document.getElementById("meal-card");
    
    /// Generate button
    $("#btn-generate").on("click", function(){
        // Hide alert when generate button is clicked again
        $("#alert").hide();
        
        // Logic to prevent button from clicking without user input
        if (selectedOption.value !== "none"){
            $("#btn-add-to-menu").show();
            $("#meal-card-front").show();
            
            // This class adds margins and creates space for the cards
            mealCard.classList.add("addMargins");

            // Dynamically update selected meal type
            mealTypeInput.innerHTML = selectedOption.options[selectedOption.selectedIndex].text;
            
            // Randomize meals from the array
            var selectedMeals = meals[selectedOption.value];
            // console.log(selectedMeals);
            var randomNumber = Math.floor(Math.random() * selectedMeals.length);
            randomMeal = selectedMeals[randomNumber];
            console.log(randomMeal); // check generated randomMeal object
    
            //Dynamically update meal_name and other fields on the card from the object
            $("#meal-name").html(randomMeal.name);
            $("#meal-image").attr("src", randomMeal.image);
            $("#ingredients").html(randomMeal.ingredients);
            $("#instructions").html(randomMeal.instructions);

        }; //end of validation logic for user input

        //Card flip animation
        var moreBtn = document.getElementById("btn-see-more");
        var backBtn = document.getElementById("btn-get-back");
        
        moreBtn.addEventListener("click", function(){
            mealCard.classList.add("flipped");
            $("#meal-card-back").show();
        });

        backBtn.addEventListener("click", function(){
            mealCard.classList.remove("flipped");
        });


    }); //end of 'generate' functionality


    // 5. 'Add to the menu' functionality + sidebar menu - Add to menu button
    /// Variables
    var menuBtn = document.getElementById("btn-add-to-menu");
    var selectedBreakfast = document.getElementById("show-breakfast");
    var selectedLunch = document.getElementById("show-lunch");
    var selectedDinner = document.getElementById("show-dinner");

    /// When 'add to menu' button ic clicked, the sidebar menu shows up
    menuBtn.addEventListener("click", function(){
        $("#small-menu").show();
        // Check if the meal is already added to the menu and if yes, show alert message
        if (myMenu.breakfast.name === randomMeal.name || myMenu.lunch.name === randomMeal.name || myMenu.dinner.name === randomMeal.name){
            $("#alert").show();
            // return;
        } else {$("#alert").hide();};

        // Check if the meal belongs to a particular type and output that meal to the corresponding fields on the menu
        if (breakfast.includes(randomMeal)) {
            selectedBreakfast.innerHTML = randomMeal.name;
            myMenu.breakfast = randomMeal;
        } else if (lunch.includes(randomMeal)) {
            selectedLunch.innerHTML = randomMeal.name;
            myMenu.lunch = randomMeal;
        } else if (dinner.includes(randomMeal)) {
            selectedDinner.innerHTML = randomMeal.name;
            myMenu.dinner = randomMeal;
        };
        console.log(myMenu); // check myMenu object and meals inside

        // Check if the menu is complete, and then hide the buttons 'generate' and 'add to menu' and show the buttons 'finish' and 'cancel'
        if (myMenu.breakfast.name && myMenu.lunch.name && myMenu.dinner.name){
            $("#btn-add-to-menu").hide();
            $("#btn-generate").hide();
            $("#btn-show-menu").show();
            $("#btn-cancel-menu").show();
        };

        // if (Object.keys(myMenu.breakfast).length != 0 && Object.keys(myMenu.lunch).length != 0 && Object.keys(myMenu.dinner).length != 0){
        //     $("#btn-add-to-menu").hide();
        //     $("#btn-generate").hide();
        //     $("#btn-show-menu").show();
        //     $("#btn-cancel-menu").show();
        // };

    }); //end of 'add to menu' functionality

    

    // 6. 'Clear the menu' functionality - Start over button
    var cancelBtn = document.getElementById("btn-cancel-menu");
    
    // To start over, cancel button is clicked and clears the menu object allowing user to create another menu
    cancelBtn.addEventListener("click", function(){
        myMenu.breakfast = {};
        myMenu.lunch = {};
        myMenu.dinner = {};
        console.log(myMenu); //check if myMenu is empty

        // This logic clears out the sidebar menu after cancelation and hides & shows same elements to start over
        if (Object.keys(myMenu.breakfast).length == 0 && Object.keys(myMenu.lunch).length == 0 && Object.keys(myMenu.dinner).length == 0){
            selectedBreakfast.innerHTML = "";
            selectedLunch.innerHTML = "";
            selectedDinner.innerHTML = "";
            $("#btn-add-to-menu").show();
            $("#btn-generate").show();
            $("#btn-show-menu").hide();
            $("#btn-cancel-menu").hide();
            $("#small-menu").hide();
        };
    }); //end of clear menu functionality

    // 7. 'Show menu for the day' functionality - Finish button
    // When the button is clicked, hide all and display new page with three meal cards/objects (without reloading)
    var showMenuBtn = document.getElementById("btn-show-menu");
    showMenuBtn.addEventListener("click", function(){
        $("#btn-add-to-menu").hide();
        $("#meal-card-front").hide();
        $("#meal-card-back").hide();
        $("#btn-show-menu").hide();
        $("#btn-cancel-menu").hide();
        $("#small-menu").hide();
        $(".form-container").hide();
        $(".full-menu-page").show();

        // Output values to the full menu page
        //Breakfast
        $("#one-meal-name").html(myMenu.breakfast.name);
        $("#one-meal-image").attr("src", myMenu.breakfast.image);
        $("#one-ingredients").html(myMenu.breakfast.ingredients);
        $("#one-instructions").html(myMenu.breakfast.instructions);

        //Lunch
        $("#two-meal-name").html(myMenu.lunch.name);
        $("#two-meal-image").attr("src", myMenu.lunch.image);
        $("#two-ingredients").html(myMenu.lunch.ingredients);
        $("#two-instructions").html(myMenu.lunch.instructions);

        //Dinner
        $("#three-meal-name").html(myMenu.dinner.name);
        $("#three-meal-image").attr("src", myMenu.dinner.image);
        $("#three-ingredients").html(myMenu.dinner.ingredients);
        $("#three-instructions").html(myMenu.dinner.instructions);

        // Card flip animaton for each of three cards (more button flips the card, and back buttons flips card back)
        var mealCardOne = document.getElementById("one-meal-card");
        var mealCardTwo = document.getElementById("two-meal-card");
        var mealCardThree = document.getElementById("three-meal-card");
        var moreBtnOne = document.getElementById("one-btn-see-more");
        var moreBtnTwo = document.getElementById("two-btn-see-more");
        var moreBtnThree = document.getElementById("three-btn-see-more");
        var backBtnOne = document.getElementById("one-btn-get-back");
        var backBtnTwo = document.getElementById("two-btn-get-back");
        var backBtnThree = document.getElementById("three-btn-get-back");
        
        moreBtnOne.addEventListener("click", function(){
            mealCardOne.classList.add("flipped");
            $("#one-meal-card-back").show();
        });

        moreBtnTwo.addEventListener("click", function(){
            mealCardTwo.classList.add("flipped");
            $("#two-meal-card-back").show();
        });

        moreBtnThree.addEventListener("click", function(){
            mealCardThree.classList.add("flipped");
            $("#three-meal-card-back").show();
        });

        backBtnOne.addEventListener("click", function(){
            mealCardOne.classList.remove("flipped");
        });

        backBtnTwo.addEventListener("click", function(){
            mealCardTwo.classList.remove("flipped");
        });

        backBtnThree.addEventListener("click", function(){
            mealCardThree.classList.remove("flipped");
        });


    }); //end of show menu functionality
    

    // 8. Create new menu or generate new meal - Generate new button
    /// When the button is clicked, hide all and show the home page with dropdown for user input
    var genNewMenuBtn = document.getElementById("btn-gen-new-menu");
    genNewMenuBtn.addEventListener("click", function(){
        $(".full-menu-page").hide();
        $(".form-container").show();
        
        //Clear user input
        selectedOption.selectedIndex="none";
        //Clear myMenu object
        myMenu.breakfast = {};
        myMenu.lunch = {};
        myMenu.dinner = {};
        console.log(myMenu); //check if myMenu is empty
        
        // Clear the sidebar menu
        if (Object.keys(myMenu.breakfast).length == 0 && Object.keys(myMenu.lunch).length == 0 && Object.keys(myMenu.dinner).length == 0){
            mealTypeInput.innerHTML = "";
            selectedBreakfast.innerHTML = "";
            selectedLunch.innerHTML = "";
            selectedDinner.innerHTML = "";
        }
        // Remove margins to restore the layout
        mealCard.classList.remove("addMargins");

    }); //end of create new menu function



    // ARCHIVED:
    // $("#btn-generate").on("click", function(){
    //     $(".hidden").show()

    //     //dynamically update selected meal type
    //     var selectedOption = document.getElementById("meal-types");
    //     var mealTypeInput = document.getElementById("picked_meal_type");
    //     mealTypeInput.innerHTML = selectedOption.options[selectedOption.selectedIndex].text;

    //     //dynamically update meal_name and other fields on the card from the object
    //     var mealName = document.getElementById("meal-name");
    //     mealName.innerHTML = frenchCrepes.name;

    //     var mealImage = document.getElementById("meal-image");
    //     mealImage.src = frenchCrepes.image;

    //     var ingredients = document.getElementById("ingredients");
    //     ingredients.innerHTML = frenchCrepes.ingredients;

    //     var instructions = document.getElementById("instructions");
    //     instructions.innerHTML = frenchCrepes.instructions;


    //     //BACK SIDE OF CARD & FLIP ANIMATION
    //     var moreBtn = document.getElementById("btn-see-more");
    //     var backBtn = document.getElementById("btn-get-back");
    //     // var cardFrontSide = document.getElementById("meal-card");
    //     // var cardBackSide = document.getElementById("meal-card-back");
        
    //     moreBtn.addEventListener("click", function(){
    //         // cardBackSide.classList.add("card-flip");
    //         // cardFrontSide.classList.add("card-flip");
    //         $("#meal-card-back").show();
    //         $("#meal-card").hide();
    //     });

    //     backBtn.addEventListener("click", function(){
    //         $("#meal-card-back").hide();
    //         $("#meal-card").show();
    //     });

    // });


}); // end of onload function