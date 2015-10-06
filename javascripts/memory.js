function changeVisibility(element){
  var span = element.getElementsByTagName("span")[0];
  if(span.style.visibility=="visible"){
    span.style.visibility = "hidden";
  }else{
    span.style.visibility = "visible";
  }
}
