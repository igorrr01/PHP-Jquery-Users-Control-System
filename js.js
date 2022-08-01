$( document ).ready(function() {

	$(document).on('click','.modalUser',function(){

	//Сбрасываем уведомления
	$('#result_form').html('');

    let data_id = $(this).data('id');

	// Задаем значения в модальном окне 
	if(data_id){
		let nameFirstLast = $(`[data-rowId='${data_id}']`).find('.username').text().split(' ');
		$('#first-name').val(nameFirstLast[0]);
		$('#last-name').val(nameFirstLast[1]);
		$('#delete-user-id').val(data_id);
		$('#delete-user-first-name').val(nameFirstLast[0]);
		$('#delete-user-last-name').val(nameFirstLast[1]);

		let toggle = $(`[data-rowId='${data_id}']`).find('.stat').val() == 1 ? "true" : "";
		$('#toggle').prop('checked', toggle);

		let role = $(`[data-rowId='${data_id}']`).find('.role').html() == 'User' ? "2" : "3";
	    $(`#list option:nth-child(${role})`).prop('selected', true);

		// Задаем скрытому полю айди
		let intro = $('#u-id');
		intro.prop('value', data_id);

	}else{
		$('#first-name').val('');
		$('#last-name').val('');
		$('#toggle').prop('checked', 1);
		$(`#list option:nth-child(1)`).prop('selected', true);
	}

	if(typeof(data_id) != 'undefined'){
		$('#UserModalLabel').text('Edit user');  // Change text to edit
		$('#btn').text('Save');  // Change text to edit
	}else{
		$('#UserModalLabel').text('Add user');  // Change text to add
		$('#btn').text('Add');  // Change text to edit
	}

  	});

	// Для избежания конфликтов select
	$(document).on('click','#customSelect',function(){
		$('.custom-select option:first').prop('selected', true);
	})

	$(document).on('click','.customSelect',function(){
		$('.custom-select option:first').prop('selected', true);
	})

	let cBox;
    $(document).on('click','.listbtn',function(){
		cBox = [];
		// Собираем выбранный чекбоксы в массив
		$("input[type=checkbox]:checked").each(function(){
    		cBox.push($(this).attr("value"));
    	});
		// Удаляем пустые элементы с массива
		cBox = cBox.filter(function (el) {
    		return (el != null && el != "" || el === 0);
		});

		if(cBox.length == 0){
			$('#empty-list-modal').modal('show')
			$('#empty-list-modal-c').html('<b>Error:</b> Users is not selected!'); 
			return false
		}

		// Выбранный селект
		let selectedValue = $(".custom-select option:selected").attr("value");
		if(typeof(selectedValue) == 'undefined'){
			selectedValue = $("#customSelect option:selected").attr("value");
		}

		if(typeof(selectedValue) == 'undefined'){
			$('#empty-list-modal').modal('show')
			$('#empty-list-modal-c').html('<b>Error:</b> Action is not selected!');
		}

		if(selectedValue == 3){
			$('#delete-list-modal').modal('show')
			$('#delete-list-modal-c').html(`Are you sure you want to delete ${cBox.length} users?`);
		}else{
			sendAjax(cBox, selectedValue);
		}
	});  

$("#deleteTrue").click(
	function(){
		selectedValue = 3;
		sendAjax(cBox, selectedValue);
		$('#delete-list-modal').modal('hide');
	}
);

function sendAjax(cBox, selectedValue) {
          $.ajax({
            url: 'update.php',
            type: 'POST',
            data: {'cBox': cBox, 'selectedValue': selectedValue},
            dataType: 'html',
            success: function(data){
            	let nf = $.parseJSON(data);
            	let notfoundNames = '';
            	if(nf.not_found_ids){
	            	nf.not_found_ids.forEach(function(elem) {
	            		notfoundNames += '<i class="fas fa-user"></i> ' + $(`[data-rowId='${elem}']`).find('.username').text() + ', ';
					})
            	}
					cBox.forEach(function(elem) {
						let result = $.parseJSON(data);
						let v;
						if(result.not_found_ids){
							v = result.not_found_ids.indexOf(elem);
							$('#info-modal').modal('show')
							$('#info-modal-c').html(`Users ${notfoundNames} is not found`);
						}else{
							v = -1;
						}
						if(selectedValue == 1){
							if(v == -1){
								$(`[data-rowId='${elem}']`).find('.status').html('<div style="text-align:center"><i class="fa fa-circle active-circle"></i></div>');
								$(`[data-rowId='${elem}']`).find('.modalUser').attr('data-status','1');
							}
						}else if(selectedValue == 2){
							if(v == -1){
								$(`[data-rowId='${elem}']`).find('.status').html('<div style="text-align:center"><i class="fa fa-circle not-active-circle"></i></div>');
								$(`[data-rowId='${elem}']`).find('.modalUser').attr('data-status','2');
							}
						}else if(selectedValue == 3){
							if(v == -1){
								$(`[data-rowId='${elem}']`).remove();
								//cBox = cBox.filter(function(f) { return f !== elem })
								//console.log(cBox)
							}
							$('#all-items').prop('checked', false);
												
						}else{
							return false;
						}

						$('.custom-select option:first').prop('selected', true);

					});
            }
          })
      }
    	

$("#all-items").click( function() {

  let countSelected = $('div#checklist input:checked').length;
  let countSelectedAll = $('div#checklist .custom-control-input').length;

  if(countSelected == countSelectedAll){
	$('input:checked').prop('checked', false);
  }else if($('#all-items').attr('checked', true)){
	    let check=document.getElementsByTagName('input');
	    for(let i=0;i<check.length;i++){
	  		if(check[i].type=='checkbox'){
	   			check[i].checked=true;
	  		}
	 	}
	}

})

// Получаем все элементы с классом custom-control-input которые находятся в элементе div с id="checklist"
// Снимаем галочку с выбрать все при нажатии на чекбокс любого человека

 let countSelected;
 let countSelectedAll;

$(document).on('click','div#checklist .custom-control-input',function(){

 countSelected = $('div#checklist input:checked').length;
 countSelectedAll = $('div#checklist .custom-control-input').length;

  if(countSelected == countSelectedAll){
  	$('#all-items').prop('checked', true);
  }  

  if(countSelected != countSelectedAll){
  	  $('#all-items').prop('checked', false);
  }

})

    $("#btn").click(
		function(){
			sendAjaxForm('result_form', 'ajax_form', 'action_ajax_form.php');
			return false; 
		}
	);

	$(document).on('click','.deleteUser',function(){

    let data_id = $(this).data('id');
    let nameFirstLast = $(`[data-rowId='${data_id}']`).find('.username').text().split(' ');

    $('#del-u-id').val(data_id);
	$('#UserModalLabelDel').text('Are you sure you want to delete the user '+nameFirstLast[0]+' '+nameFirstLast[1]);  // Add text when del. user

	})

});

$(document).on('click','#btnDel',function(){
	sendAjaxForm('result_form', 'ajax_form_del', 'action_ajax_form.php');
		return false; 
	}
);    

// Ajax Send Form
function sendAjaxForm(result_form, ajax_form, url) {
    $.ajax({
        url:     url, 
        type:     "POST", 
        dataType: "html", 
        data: $("#"+ajax_form).serialize(), 
        success: function(response) { 
        	let result = $.parseJSON(response);
        	if(result.status == false){
        		if(result.error.role == 0){
        			$('#result_form').html('<div class="alert alert-danger" role="alert"><b>Error:</b> Role must be selected!</div>');
        		}else{
        			$('#result_form').html('<div class="alert alert-danger" role="alert"><b>Error:</b> Fields must not be empty!</div>');
        		}

        		if(result.error.code == 110){
        			$('#UserModalLabelDel').html('<div class="alert alert-danger" role="alert"><b>Error:</b> User is not found!</div>');
        		}

        		if(result.error.code == 111){
        			$('#result_form').html('<div class="alert alert-danger" role="alert"><b>Error:</b> User is not found!</div>');
        		}

        	}else{
        		$('#user-form-modal').modal('hide');
        		console.log(result);
        		if(result.action == 'add'){

        			$('#result_form').html('');
        			// Скрываем div 
        			$("div[id='user-not-found']").remove();
        			// Снимаем все галочки
        			$('#all-items').prop('checked', false);

					let role = result.user.roleSelect == 1 ? "User" : "Admin";
	        		let status = result.user.toggle == 1 ? "<input class='stat' type='hidden' value='1'><div style='text-align:center;'><i class='fa fa-circle active-circle'></i>" : "<input class='stat' type='hidden' value='0'><div style='text-align:center;'><i class='fa fa-circle not-active-circle'></i></div>";

					$('table').append(`
						<tr data-rowId = '${result.user.uId}'>
							<td>	
								<div class="custom-control custom-control-inline custom-checkbox custom-control-nameless m-0 align-top" id="checklist">
                              		<input type="hidden" class="form-control" id="list-action" name="list-action" value="true">
                                	<input type="checkbox" name="az" class="custom-control-input" id="item-${result.user.uId}" value="${result.user.uId}">
                                	<label class="custom-control-label" for="item-${result.user.uId}"></label>
                              	</div>
							</td>
							<td class="username">${result.user.firstName} ${result.user.lastName}</td>
							<td class="role">${role}</td>
							<td class="status">${status}</td>
                          	<td class="button">
                          	<div class="badge">
	                              <button class="btn modalUser" type="button" data-toggle="modal"
	                                data-target="#user-form-modal" 
	                                data-id="${result.user.uId}"
	                                >Edit</button>
	                                </div>
	                                <div class="badge">
	                              <button class="btn deleteUser" type="button" data-toggle="modal"
	                                data-target="#delete-user-form-modal" 
	                                data-id="${result.user.uId}">
	                                <i class="fa fa-trash"></i></button>
	                                </div>
                          	</td>
						</tr>
						`)

				}else if(result.action == 'edit'){
					$(`[data-rowId='${result.user.uId}']`).find('.username').text(result.user.firstName + ' ' + result.user.lastName);

					if(result.user.roleSelect == 1){
						$(`[data-rowId='${result.user.uId}']`).find('.role').text('User');
					}else{
						$(`[data-rowId='${result.user.uId}']`).find('.role').text('Admin');
					}

					if(result.user.toggle == 1){
						$(`[data-rowId='${result.user.uId}']`).find('.status').html('<div style="text-align:center"><i class="fa fa-circle active-circle"></i></div>');
					}else{
						$(`[data-rowId='${result.user.uId}']`).find('.status').html('<div style="text-align:center"><i class="fa fa-circle not-active-circle"></i></div>');
					}

					$(`[data-rowId='${result.user.uId}']`).find('.button').html(`<div class="btn-group align-top" id="editDel">
						<div class="badge">
	                              <button class="btn modalUser" type="button" data-toggle="modal"
	                                data-target="#user-form-modal" 
	                                data-id="${result.user.uId}"
	                                >Edit</button>
	                                </div>
	                                <div class="badge">
	                              <button class="btn deleteUser" type="button" data-toggle="modal"
	                                data-target="#delete-user-form-modal" 
	                                data-id="${result.user.uId}">
	                                <i class="fa fa-trash"></i></button>
	                                </div>
	                            </div>`);
					let intro = $('#u-id');
					intro.prop('value', '');
					
				}else if(result.action == 'delete'){
					$('#delete-user-form-modal').modal('hide');
					$(`[data-rowId='${result.user.uId}']`).remove();
				}
        	}
    	},
    	error: function(response) { 
            $('#result_form').html('Ошибка. Данные не отправлены.');
    	}
 	});
}