$(function() {
  $('#list-players').on('click', function() {
    $.ajax({
        url: '/players',
        contentType: 'application/json',
        success: function(response) {
          var tbodyEl = $('tbody');

          tbodyEl.html('');

          response.players.forEach(function(player) {
            tbodyEl.append('\
              <tr>\
                  <td class="id" valign="top">' + player.id + '</td>\
                  <td valign="top"><input type="text" class="name" value="' + player.name + '"></td>\
                  <td valign="top"><input type="text" class="team" value="' + player.team + '"></td>\
                  <td valign="top"><textarea class="description" cols="30" rows="10">' + player.description + '</textarea></td>\
                  <td valign="top"><textarea class="image" cols="30" rows="10">' + player.image + '</textarea></td>\
                  <td><img src="' + player.image + '"></img></td>\
                  <td valign="top">\
                      <button class="edit-player">Edit</button>\
                      <button class="remove-player">Remove</button>\
                  </td>\
              </tr>\
            ');
          });
        }
    });
  });


  $('#create-form').on('submit', function(event) {
    event.preventDefault();
    var createName = $('#create-name');
    var createTeam = $('#create-team');
    var createDescription = $('#create-description');
    var createImage = $('#create-image');

    $.ajax({
        url: '/players',
        method: 'POST',
        contentType: 'application/json',
        // data: JSON.stringify({ name: createInput.val() name: createInput.val() }),
        data: JSON.stringify({ name: createName.val(), team: createTeam.val(), description: createDescription.val(), image: createImage.val() }),
        success: function(response) {
            console.log(response);
            createName.val('');
            createTeam.val('');
            createDescription.val('');
            createImage.val('');

            $('#list-players').click();
        }
    });
  });

  $('table').on('click', '.edit-player', function() {
    var rowEl = $(this).closest('tr');
    var id = rowEl.find('.id').text();
    var newName = rowEl.find('.name').val();
    var newTeam = rowEl.find('.team').val();
    var newDescription = rowEl.find('.description').val();
    var newImage  = rowEl.find('.image').val();

    $.ajax({
        url: '/players/' + id,
        method: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify({ newName: newName, newTeam: newTeam, newDescription: newDescription, newImage: newImage }),
        success: function(response) {
            console.log(response);
            $('#list-players').click();
        }
    });
  });

  $('table').on('click', '.remove-player', function() {
  var rowEl = $(this).closest('tr');
  var id = rowEl.find('.id').text();

    $.ajax({
      url: '/players/' + id,
      method: 'DELETE',
      contentType: 'application/json',
      success: function(response) {
          console.log(response);
          $('#list-players').click();
      }
    });
  });
});
