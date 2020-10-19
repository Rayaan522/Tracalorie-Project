// Storage Controller


const StorageCtrl = (function(){

    // Public Methods

    return{

        storeItem: function(item){

            let items ;

            // check if any items in localStorage

            if(localStorage.getItem('items')=== null){

                items = [];

                // push new item

                items.push(item);

                // set ls

                localStorage.setItem('items',JSON.stringify(items));



            }
            else{

                // Get Already in LS

                items = JSON.parse(localStorage.getItem('items'));

                // Push new item

                items.push(item);

                // Re set LS
                localStorage.setItem('items',JSON.stringify(items));

                


            }


        },

        getItemsFromLocalStorage: function(){

            let items ;

            // check if any items in LS

            if(localStorage.getItem('items') === null){

                items = [];


            }
            else{

                items = JSON.parse(localStorage.getItem('items'));


            }
            return items;

        },


        updateItemStorage:function(updateItem){

            let items = JSON.parse(localStorage.getItem('items'));

            items.forEach(function(item,index){

                if(updateItem.id === item.id){

                    items.splice(index,1,updateItem);

                }

            });

               // Re set LS
               localStorage.setItem('items',JSON.stringify(items));


        },

        deleteItemFromStorage : function(id){


            let items = JSON.parse(localStorage.getItem('items'));

            items.forEach(function(item,index){

                if( id === item.id){

                    items.splice(index,1);

                }

            });

               // Re set LS
               localStorage.setItem('items',JSON.stringify(items));


        },

        clearItemsFromStorage:function(){

            localStorage.removeItem('items');
        }
    }

})();


// Item Controller
const ItemCtrl = (function(){

  // Item Controller

  const Item = function(id,name,calories){

    this.id = id;
    this.name = name;
    this.calories = calories;



  }

  // Data structure / state

  const data = {
    //   items : [
    //     //   {id:0,name:'Steak Dinner',calories:1200},
    //     //   {id:1,name:'Cookies',calories:400},
    //     //   {id:2,name:'Eggs',calories:300},

    //   ],

    items:StorageCtrl.getItemsFromLocalStorage(),
      currentItem:null,
      totalcalories:0
  }
// Public methods


return{

    getItems:function(){
        return data.items;

    },
    logData :function(){
      return data;
    },
    addItem: function(name,calories){
         

        // create ID
          let ID;
        if(data.items.length>0){
            ID = data.items[data.items.length-1].id +1;


        }
        else{
            ID=0;

        }

        // Calories to number

        calories = parseInt(calories);


        // create new item

          newItem = new Item(ID,name,calories);

          // add to items array

          data.items.push(newItem);

          return newItem;
    },

    getItemById:function(id){

        let found= null;
        //Loop through  items

        data.items.forEach(function(item){

            if(item.id === id){

                found = item;
            }
        });
        return found;

        

    },

    

    updateItem: function(name,calories){
       // Calories to number

       calories = parseInt(calories);

       let found = null;
      data.items.forEach(function(item){
        if(item.id === data.currentItem.id){

            item.name = name;
            item.calories = calories;

              found = item;


        }
      
         
      });
         return found;


    },

    deleteItem: function(id){

        // Get id

        const ids = data.items.map(function(item){

            return item.id;
        });

        // Get index

        const index= ids.indexOf(id);
        // Remove index

        data.items.splice(index,1);



    },

    clearAllItems: function(){

        data.items = [];

    },

    setCurrentItem:function(item){

        data.currentItem = item;

    },
    getCurrentItem:function(){

        return data.currentItem;

    },
    getTotalCalories:function(){
        let total = 0;
      // Loop through  items and calories
        data.items.forEach(function(item){

            total+= item.calories;
             
        });

        // Set total in Datastructure

        data.totalcalories = total;

        // return total

        return data.totalcalories;
    

    }
}

})();

// UI Controller

const UICtrl = (function(){
    const UISelectors = {
        itemList :'#item-list',
        listItems:'#item-list li',
        addBtn:'.add-btn',
        updateBtn:'.update-btn',
        deleteBtn:'.delete-btn',
        backBtn:'.back-btn',
        clearBtn: '.clear-btn',
        itemNameInput:'#item-name',
        itemCaloriesInput:'#item-calories',
        totalCalories:'.total-calories'
    }
            
// public methods
    return{

        populateItemList: function(items){

            let html = '';

            items.forEach(function(item){

                html += `<li class="collection-item" id="item-${item.id}">
                <strong>${item.name} </strong><em>${item.calories}</em>
                <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>
            </li>
                
                `	;

            });

            // insert list items

            document.querySelector(UISelectors.itemList).innerHTML = html;

        },

        getItemInput: function(){
           return{
          name:document.querySelector(UISelectors.itemNameInput)
            .value,
            calories: document.querySelector(UISelectors.itemCaloriesInput).value
            

           }

        },
        getSelectors:function(){
            return UISelectors;
        },
        addListItem : function(item){

            // show item

            document.querySelector(UISelectors.itemList).style.display = 'block';

            // Create li element
            const li = document.createElement('li');
            // Add Class

            li.className = 'collection-item';

            // Ad Id

            li.id =   `item-${item.id} `;

            li.innerHTML = ` <strong>${item.name} </strong><em>${item.calories}</em>
            <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>
            
            
            
            `;


            // insert item

            document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend',li);

            





        },

        updateListItem:function(item){

            let listItems = document.querySelectorAll(UISelectors.listItems);

            // Turn node list into an array

            listItems = Array.from(listItems);

            listItems.forEach(function(listItem){

                const itemID = listItem.getAttribute('id');

                if(itemID === `item-${item.id}`){

                    document.querySelector(`#${itemID}`).innerHTML=  `<strong>${item.name} </strong><em>${item.calories}</em>
                    <a href="#" class="secondary-content">
                    <i class="edit-item fa fa-pencil"></i>
                    </a>  `;


                }


            });



        },

        deleteListItem: function(id){

            const ItemID = `#item-${id}`;
            const item = document.querySelector(ItemID);

            item.remove();

        },


        clearInput: function(){

            document.querySelector(UISelectors.itemNameInput).value = '';
            document.querySelector(UISelectors.itemCaloriesInput).value = '';

        },

        addItemToForm:function(){
            document.querySelector(UISelectors.itemNameInput).value = ItemCtrl.getCurrentItem().name;
            document.querySelector(UISelectors.itemCaloriesInput).value = ItemCtrl.getCurrentItem().calories;

            UICtrl.showEditState();


        },

        showEditState:function(){
            document.querySelector(UISelectors.updateBtn).style.display = 'inline';
            document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
            document.querySelector(UISelectors.addBtn).style.display = 'none';

        },

        
        removeItems: function(){
         let listItems = document.querySelectorAll(UISelectors.listItems);

         // turn node list into Array

         listItems = Array.from(listItems);

         listItems.forEach(function(item){

            item.remove();
         });

        },

        hideList:function(){

            document.querySelector(UISelectors.itemList).style.display = 'none';
        },

        showTotalCalories:function(totalCalories){
           document.querySelector(UISelectors.totalCalories).textContent = totalCalories;

        },
        clearEditState:function(){
            UICtrl.clearInput();
            document.querySelector(UISelectors.updateBtn).style.display = 'none';
            document.querySelector(UISelectors.deleteBtn).style.display = 'none';
            document.querySelector(UISelectors.addBtn).style.display = 'inline';

        }
    }

 

})();
// App Controller

const App= (function(ItemCtrl,StorageCtrl,UICtrl){

    //load Event listeners

    const loadEventListeners = function(){

        // Get UI Selectors

        const UISelectors = UICtrl.getSelectors();



       

        // Disable submit on enter

        document.addEventListener('keypress',function(e){

            if(e.keyCode ===13 || e.which ===13){
                e.preventDefault();
                return false;


            }

          


        })


    

        // edit icon click event

        document.querySelector(UISelectors.itemList).addEventListener('click',itemEditClick);

        // update item submit
        document.querySelector(UISelectors.updateBtn).addEventListener('click',itemUpdateSubmit);
         // delete item  event
        document.querySelector(UISelectors.deleteBtn).addEventListener('click',itemDeleteSubmit);

        // clear all btn  event

        document.querySelector(UISelectors.clearBtn).addEventListener('click',clearAllItemsClick);


        // back button event
        document.querySelector(UISelectors.backBtn).addEventListener('click',UICtrl.clearEditState);
        

         // addItem
         const addItem = function(e){

            
             

           // Get input from UI Controller

           const input =UICtrl.getItemInput();

           // check for name and  calorie input

           if(input.name !== '' && input.calories !== ''){
              // Add item  
            const newItem = ItemCtrl.addItem(input.name,input.calories);

            // Add item to UI List

            UICtrl.addListItem(newItem);
           }
           e.preventDefault();

           // Total Calories

           const totalcalories = ItemCtrl.getTotalCalories();   

           // Add total Calories to UI

           UICtrl.showTotalCalories(totalcalories);

           UICtrl.clearEditState();

           // Store in localStorage
           StorageCtrl.storeItem(newItem);

           // clear fields

           UICtrl.clearInput();
          
        }



       // Add item event

       document.querySelector(UISelectors.addBtn).addEventListener('click',addItem);

       



    }

    //  item edit click submit

    const itemEditClick = function(e){

         if(e.target.classList.contains('edit-item')){

           // Get list item id(item-0,item-1)
           const listId = e.target.parentNode.parentNode.id;

        // Break into Array

        const listIdArr = listId.split('-');

        
        // Get the actual id

        const id = parseInt(listIdArr[1]);

        // get Item

        const itemToEdit = ItemCtrl.getItemById(id);


        // set current item
        ItemCtrl.setCurrentItem(itemToEdit);

        // Add item to form
        UICtrl.addItemToForm();

    
         }

        e.preventDefault();
    }

    // update item submit

    const itemUpdateSubmit = function(e){

        


    // Get item input

    const input = UICtrl.getItemInput();

    // update item 
    const updatedItem = ItemCtrl.updateItem(input.name,input.calories);

    // Update  UI

    UICtrl.updateListItem(updatedItem);


    const totalcalories = ItemCtrl.getTotalCalories();   

    // Add total Calories to UI

    UICtrl.showTotalCalories(totalcalories);

    // update items to Local Storage

    StorageCtrl.updateItemStorage(updatedItem);

    UICtrl.clearEditState();



    e.preventDefault();     
    
    
        
        


}

// delete button event
        
const itemDeleteSubmit = function(e){

    // Get Current item

    const currentItem = ItemCtrl.getCurrentItem();

    // Delete  from the Datastructure

    ItemCtrl.deleteItem(currentItem.id);

    // Delete from UI

    UICtrl.deleteListItem(currentItem.id);


    const totalcalories = ItemCtrl.getTotalCalories();   

    // Add total Calories to UI

    UICtrl.showTotalCalories(totalcalories);

    // Delete items from Local Storage

    StorageCtrl.deleteItemFromStorage(currentItem.id);


    UICtrl.clearEditState();

    e.preventDefault();
}
// clear all items button event
const clearAllItemsClick = function(){

   // Delete all items from datastructure

   ItemCtrl.clearAllItems();


    // Total Calories

    const totalcalories = ItemCtrl.getTotalCalories();   

    // Add total Calories to UI

    UICtrl.showTotalCalories(totalcalories);

    UICtrl.clearEditState();

   // Remove from UI

     UICtrl.removeItems();

    // Clear all Items From LocalStorage
     StorageCtrl.clearItemsFromStorage();

     // Hide the UI

     UICtrl.hideList();


}

    // public methods
     return{
    init: function(){

       // clear edit state/ set initial state

       UICtrl.clearEditState();


        // console.log('Initializing App....'); 

        // fetch items from Datastructure

        const items = ItemCtrl.getItems(); 

        // check if any items

        if(items.length === 0){
            UICtrl.hideList();

        }

        else{
                  // populate list with items

       UICtrl.populateItemList(items);

        }

        const totalcalories = ItemCtrl.getTotalCalories();   

           // Add total Calories to UI

           UICtrl.showTotalCalories(totalcalories);

  

       // add load eventlisteners
       loadEventListeners();
       
    }
}

})(ItemCtrl,StorageCtrl,UICtrl);

//Initializing App

App.init();
