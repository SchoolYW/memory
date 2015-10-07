function memoryObject(){
	this.cardAmount = 0;
	this.cardCounter = 0;
	this.cardSelected = -1;
    this.isAvailable = true;
	
	this.createCard = function(){
		var card = document.createElement("div");
		
		card.id = this.cardCounter++;
		card.setAttribute("class", "card");
		card.setAttribute("onClick", "memory.cardChosen(this)");
		card.setAttribute("data-finalized", "false");
		
		var numberPanel = document.createElement("span");
		numberPanel.setAttribute("class", "numberPanel");
		card.appendChild(numberPanel);
		
		return card;
	}
	
	this.createCardRow = function(columns){
		var cardRow = document.createElement("div");
		cardRow.setAttribute("class", "row"); 
		
		for (var i = 0; i < columns; i++)
		{
			var card = this.createCard();
			cardRow.appendChild(card);
		}
		
		return cardRow;
	}
	
	function shuffle(o)
	{
		for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
		return o;
	}
	
	this.shuffleCards = function(){
		var numbers = [];
		for (var i = 1; i <= (this.cardAmount / 2); i++)
		{
			numbers.push(i);
			numbers.push(i);
		}
		
		var shuffledNumbers = shuffle(numbers);
		for (var i = 0; i < this.cardAmount; i++)
		{
			var card = document.getElementById(i);
			var span = card.getElementsByTagName("span")[0];
			span.innerHTML = shuffledNumbers[i];
		}
	}
	
	this.createPlayfield = function(amount){
		this.cardAmount = amount * 2;
		var playfield = document.getElementById("playfield");
		
		var rows = Math.sqrt(this.cardAmount);
		var columns = Math.ceil(rows);
		for (var i = 0; i<Math.floor(rows); i++)
		{
			var cardRow = this.createCardRow(columns);
			playfield.appendChild(cardRow);
		}
		
		var residue = this.cardAmount % columns;
		if (residue != 0)
		{
			var cardRow = this.createCardRow(residue);
			playfield.appendChild(cardRow);
		}
		
		this.shuffleCards();
	}
	
    this.cardChosen = function(element){
        if(element.getAttribute("data-finalized") == "false" && this.cardSelected != element.id && this.isAvailable){
            this.changeVisibility(element);
            if(this.cardSelected != -1){
                var selectedValue = document.getElementById(this.cardSelected).getElementsByTagName("span")[0].innerHTML;
                var currentValue = element.getElementsByTagName("span")[0].innerHTML;
                if(selectedValue == currentValue){
                    document.getElementById(this.cardSelected).setAttribute("data-finalized", true);
                    element.setAttribute("data-finalized", true);
                }else{
                    this.refreshFailCounter();
                    this.isAvailable = false;
                    var secondCard = document.getElementById(this.cardSelected);
                    window.setTimeout(this.resetCards,500, this, element, secondCard);
                }
                this.cardSelected = -1;
            }else{
                this.cardSelected = element.id;
            }
        }
    }
	
	this.changeVisibility = function(element){
		var span = element.getElementsByTagName("span")[0];
		if(span.style.visibility=="visible"){
			span.style.visibility = "hidden";
		}else{
			span.style.visibility = "visible";
	}
}
    
    this.resetCards = function(object, firstCard, secondCard)
    {
        object.changeVisibility(firstCard);
        object.changeVisibility(secondCard);
        object.isAvailable = true;
    }
    
    this.refreshFailCounter = function()
    {
        document.getElementById("failCounter").innerHTML = failCount++;
    }
    
    this.refreshGame = function()
    {
        location.reload();
    }
}

var memory = new memoryObject();
var timerCount = 0;
var failCount = 1;

function toTimer(seconds)
{
	var sec_num = parseInt(seconds, 10);
	var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);
	
	if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    var time    = hours+':'+minutes+':'+seconds;
    return time;
}

function timerFunction()
{
	document.getElementById("timer").innerHTML = toTimer(timerCount);
	timerCount++
	window.setTimeout(timerFunction, 1000);
}
	
window.onload = function(){
	memory.createPlayfield(4);
	timerFunction();
}
