$(document).ready(function() {
  let checkIn = "";
  let checkOut = "";
  let days = "";
  let adults = "1";
  
  $("#dropdown-1").click(function(){
    updateDropdown("1");
  });
  
  $("#dropdown-2").click(function(){
    updateDropdown("2");
  });
  
  $("#dropdown-3").click(function(){
    updateDropdown("3");
  });
  
  $("#dropdown-4").click(function(){
    updateDropdown("4");
  });
  
  /* updates days textbox on check in change */
  $("#check-in").change(function(){
    checkIn = moment($("#check-in").val());
    
    /* user must also have selected a check out date to calculate days and cost */
    if(checkOut !== ""){
      days = checkOut.diff(checkIn, "days")
      $("#days").val(days);
      $("#cost").val(calculateCost(days));
    }
  });
  
  /* updates days textbox on check out change */
  $("#check-out").change(function(){
    checkOut = moment($("#check-out").val());
    
    /* user must also have selected a check in date to calculate days and cost */
    if(checkIn !== ""){
      days = checkOut.diff(checkIn, "days")
      $("#days").val(days);
      $("#cost").val(calculateCost(days));
    }
  });
  
  /* updates # of adults and cost on a dropdown change */
  $(".dropdown-opt").click(function(){
    adults = $("#dropdown").val();
    
    if(checkIn !== "" && checkOut !== ""){
      $("#cost").val(calculateCost(days));
    }
  });
  
  /* clears all fields when reset button is clicked */
  $("#reset").click(function(event){
    event.preventDefault();
    $("input").val("");
    updateDropdown("1");
    adults = "1";
    $(".rad").prop("checked", false);
    $("textarea").val("");
    $(".has-error").removeClass("has-error");
    toastr["info"]("Fields were successfully cleared!", "");
  });
  
  /* validates user and contact panels as well as cost */
  $("#submit").click(function(event){
    event.preventDefault();
    $(".has-error").removeClass("has-error");
    
    userContactValid = validateUserContact();
    costValid = validateCost();
    
    if(userContactValid && costValid){
      toastr["success"]("Form Successfully Submitted!");
    }
  });
  
  /* calculates cost based on provided formula */
  function calculateCost(days){
    let numAdults = parseInt(adults);
    
    return "$" + (150 * numAdults * days);
  }
  
  /* updates dropdown with value */
  function updateDropdown(value){
    $("#dropdown").val(value);
    $("#dropdown-text").text(value);
  }
  
  /* validates that username, first name, last name, phone, fax, and email are filled out */
  function validateUserContact(){
    let valid = true;
    let inputs = ["#username", "#first-name", "#last-name", "#phone", "#fax", "#email"];
    let colsAndGroups = ["#username-col", "#firstname-col", "#lastname-col", "#phone-group", "#fax-group", "#email-group"];
    let inputNames = ["Username", "First Name", "Last Name", "phone#", "fax#", "email"];
    
    for(let i = 0; i < inputs.length; i++){
      if($(inputs[i]).val() === ""){
        valid = false;
        $(colsAndGroups[i]).addClass("has-error");
        toastr["error"]("Missing Field: " + inputNames[i]);
      }
    }
      
      return valid;
    }
  
  /* validates that cost has been calculated and is not negative */
  function validateCost(){
    let valid = true;
        
    if($("#cost").val() === ""){
      valid = false;
      toastr["error"]("Error: No cost calculated");
    }
    
    let costNum = parseInt($("#cost").val().slice(1));
    
    if(costNum < 0){
      valid = false;
      toastr["error"]("Error: Cost is negative");
    }
    
    return valid;
  }
});