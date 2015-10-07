function memoryObject(){
    this.cardSelected = -1;
    this.cardIds = [0, 1, 2, 3, 4, 5, 6, 7];
    
    this.changeVisbility = function(element){
        var span = element.getElementsByTagName("span")[0];
        if(span.style.visibility=="visible"){
            span.style.visibility = "hidden";
        }else{
            span.style.visibility = "visible";
        }
    }
    this.cardChosen = function(element){
        if(element.getAttribute("data-finalized") != "false"){
            this.changeVisibility(element);
            if(this.cardSelected != -1){
                var selectedValue = document.getElementById(this.cardSelected).getElementsByTagName("span")[0].innerHTML;
                var currentValue = element.getElementsByTagName("span")[0].innerHTML;
                if(selectedValue == currentValue){
                    document.getElementById(this.cardSelected).setAttribute("data-finalized", true);
                    element.setAttribute("data-finalized", true);
                }else{
                    this.changeVisbility(element);
                    this.changeVisbility(document.getElementById(this.cardSelected));
                }
                this.cardSelected = -1;
            }else{
                this.cardSelected = element.id;
            }
        }
    }
}

var memory = new memoryObject();
