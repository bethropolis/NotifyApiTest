let current = false; 
let message = "this is a test notification message ";
let title = "title"; 

function notifyMe() {
  // Let's check if the browser supports notifications
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
  }
  // Let's check whether notification permissions have already been granted
  else if (Notification.permission === "granted") {
    // If it's okay let's create a notification
    const greeting = new Notification(title,{
  body: message, 
  icon: './img/goodday.png'
});
 
  }

  // Otherwise, we need to ask the user for permission
  else if (Notification.permission !== "denied") {
    Notification.requestPermission().then(function (permission) {
      // If the user accepts, let's create a notification
      if (permission === "granted") {        
        var notification = new Notification("Hi there!");
          $('#notify').text("notified"); 
      }
    });
  }else{
    alert(":( denied to send notification"); 
  } 
}
function showOne(data){
  if (data){
    $('#notify').hide()
     $('.data').show("slow");
  }else{
     $('.data').hide(1000);
     $('#notify').show('slow');
  }
}
$("#feedback").click(function(){
  var fdbck = prompt("enter your feedback to developer";)
    alert("feedback successfully sent");
})
$("#edit").click(function(){
  showOne(!current) 
  current = !current; 
})

$("#save").click(function(){
  $("#save").attr('')
})
$("#notify").click(function(){
    $('#notify').text("notifying") 
   notifyMe();    
}) 