let current = true;
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
    sendNotification();
  }

  // Otherwise, we need to ask the user for permission
  else if (Notification.permission !== "denied") {
    Notification.requestPermission().then(function (permission) {
      $('#notify').attr('title', `please click allow for the website to send you notifications`);
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        sendNotification();
      }
    });
  } else {
    alert(":( denied to send notification");
    $('#notify').text("denied");
    $('#notify').css('background', '#FF8066');
    $('#notify').attr('disabled', true);
    $('#notify').attr('title', `please allow the website to send you notifications`);
  }

  function sendNotification() {
    const greeting = new Notification(title, {
      body: message,
      icon: './icon.png'
    });
    greeting.addEventListener('click', function () {
      window.open('https://github.com/bethropolis/NotifyApiTest');
    });

    $('#notify').text("notified");
    $('#notify').css('background', 'rgb(19, 196, 155) none repeat scroll 0% 0%');
    $('#notify').attr('title', `notification sent`);
  }
}
function showOne(data) {
  if (data) {
    $('#notify').hide();
    $('.data').show("slow");
  } else {
    $('.data').hide(1000);
    $('#notify').show('slow');
  }
  current = !current;
}

$("#feedback").click(function () {
  var fdbck = prompt("enter your feedback to the developer");
  if (fdbck) {
    try{ 
    $.post('https://pushme.vercel.app/api/sendNotification', {
      ContentType: "application/x-www-form-urlencoded",
      code: "5ro94qxv1jv",
      title: "feedback",
      message: fdbck
    }).done(function( data ) { 
    if (data.success) alert("feedback successfully sent"); 
  });  
   }catch(e){
       alert("there was an error sending feedback");
        console.error(e.message);  
    }
  } else {
    alert("feedback arborted");
  }
});
$("#edit").click(function () {
  showOne(current);
});

$("#title").on("input", function () {
  title = $("#title").val();
  $("#save").attr('disabled', false);
});

$("#message").on("input", function () {
  message = $("#message").val();
  $("#save").attr('disabled', false);
});

$("#save").click(function () {
  $("#save").attr('disabled', true);
  title = $("#title").val();
  message = $("#message").val();
  showOne(current);
});

$("#notify").click(function () {
  $('#notify').text("notifying...");
  $('#notify').css('background', 'hsl(245, 84%, 68%)');
  notifyMe();
}); 