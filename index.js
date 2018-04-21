
let myFacebookToken;

$(document).ready(() => {

    myFacebookToken = prompt("Please enter your Facebook Token:", "");

    if (myFacebookToken == null || myFacebookToken == "") {

        alert("No usr Token found");

    } else {

        getAllDetails();

    }

    $('.post-p').click(function() {
      if ($('.hide').is(":hidden")) {
        $('.hide').css('display','block');
        $('.x').css('display','none');
      }
    });

    $('.about-p').click(function() {
      if ($('.x').is(":hidden")) {
        $('.x').css('display','block');
        $('.hide').css('display','none');
      }
    });

});

let getAllDetails = () => {




    $.ajax({
        type: 'GET',
        dataType: 'json',
        async: true,
        url: 'https://graph.facebook.com/me?fields=name,posts,cover,birthday,education,location,hometown,picture.type(large)&access_token=' + myFacebookToken,

        success: (response) => {

            $('#dataSection').css('display', 'block');

            $('#name').append(response.name);

            $('#userName').append(response.name);

            $('#hometown').append(response.hometown.name);

            // $('#post1').append(response.posts.data[0].story);
            //
            // $('#post2').append(response.posts.data[1].message);

            $("#birthday").append(response.birthday);

            $('#current').append(response.location.name);

            $('#profilePhoto').html('<img src="' + response.picture.data.url + '" class="img-fluid profileHeight"/>');

            $('#cover').css('background-image', 'url(' + response.cover.source + ')');


            for (var i = 0; i < 30; i++) {
              if (response.posts.data[i].story == undefined) {
                $('#post2').append(response.posts.data[i].message +'</br>')
              } else {
                $('#post1').append(response.posts.data[i].story+'</br>');
              }
            }


        }, error: (err) => {

            console.log(err.responseJSON.error.message);
            alert(err.responseJSON.error.message)

        }

    });// end ajax call

}
