$( document ).ready(function() {

// Чистим модаьное окно
$('#user-form-modal').on('hidden.bs.modal', function (e) {
    document.getElementById("ajax_form").reset();
  })

	$(document).on('click','.modalUser',function(){

    let data_id = $(this).data('id');
    let data_firstname = $(this).data('firstname');
    let data_lastname = $(this).data('lastname');
    let data_role = $(this).data('role');
    let data_status = $(this).data('status');

	// Задаем значения в модальном окне 
	$('#first-name').val(data_firstname);
	$('#last-name').val(data_lastname);
	$('#delete-user-id').val(data_id);
	$('#delete-user-first-name').val(data_firstname);
	$('#delete-user-last-name').val(data_lastname);

	// Меняем поля при едите
	if(typeof(data_id) != 'undefined'){
		if(data_status == 1){
			$('#toggle').prop('checked', true);
		}else{
			$('#toggle').removeProp('checked'); 
		}

		if(data_role !== ""){
				if(data_role === 1){
	     			$('#list option:nth-child(2)').prop('selected', true);
	     		}else{
	     			$('#list option:nth-child(3)').prop('selected', true);     			
	     		}
		}

	// Задаем скрытому полю айди
	let intro = $('#u-id');
	intro.prop('value', data_id);
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


    $(document).on('click','.listbtn',function(){

			// Собираем выбранный чекбоксы в массив
			let cBox = [];
			$("input[type=checkbox]:checked").each(function(){
    			cBox.push($(this).attr("value"));
    		});
			// Удаляем пустые элементы с массива
			cBox = cBox.filter(function (el) {
    			return (el != null && el != "" || el === 0);
			});

			if(cBox.length == 0){
				$('#empty-list-modal').modal('show')
				$('#empty-list-modal-c').text('Users is not selected!');  // Change text to edit
			}


			// Выбранный селект
			let selectedValue = $(".custom-select option:selected").attr("value");
			if(typeof(selectedValue) == 'undefined'){
				selectedValue = $("#customSelect option:selected").attr("value");
				console.log(selectedValue)
			}

			if(typeof(selectedValue) == 'undefined'){
				$('#empty-list-modal').modal('show')
				$('#empty-list-modal-c').text('Action is not selected!');  // Change text to edit
			}

			console.log(cBox)
			console.log(selectedValue)

          $.ajax({
            url: 'update.php',
            type: 'POST',
            data: {'cBox': cBox, 'selectedValue': selectedValue},
            dataType: 'html',
            success: function(data){
            	$.ajax({
  				type: "POST",
  				url: "/index.php",
  				data: "",
  				dataType: "html",
  				cache: false,
  				success: function(data) {
					cBox.forEach(function(elem) {
						if(selectedValue == 1){
							$(`[data-rowId='${elem}']`).find('.status').html('<div style="text-align:center"><i class="fa fa-circle active-circle"></i></div>');
						}else if(selectedValue == 2){
							$(`[data-rowId='${elem}']`).find('.status').html('<div style="text-align:center"><i class="fa fa-circle not-active-circle"></i></div>');
						}else if(selectedValue == 3){
							$(`[data-rowId='${elem}']`).load(`index.php [data-rowId='${elem}']` );

							$('#all-items').prop('checked', false);
												
						}else{
							return false;
						}

						$('.custom-select option:first').prop('selected', true);

					});
      			}
			});

            }
          })
			return false; 
		}
	);      	

$("#all-items").click( function() {

	if($('#all-items').attr('checked', true)){
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
$('div#checklist .custom-control-input').change(function(){

  let countSelected = $('div#checklist input:checked').length;
  let countSelectedAll = $('div#checklist .custom-control-input').length;

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
 	let data_firstname = $(this).data('firstname');
    let data_lastname = $(this).data('lastname');
    $('#del-u-id').val(data_id);

	$('#UserModalLabelDel').text('Are you sure you want to delete the user '+data_firstname+' '+data_lastname);  // Add text when del. user

	console.log(data_id);

	    $("#btnDel").click(
			function(){
				sendAjaxForm('result_form', 'ajax_form_del', 'action_ajax_form.php');
				return false; 
			}
		);    
	})

});

// Ajax Send Form
function sendAjaxForm(result_form, ajax_form, url) {
    $.ajax({
        url:     url, //url страницы (action_ajax_form.php)
        type:     "POST", //метод отправки
        dataType: "html", //формат данных
        data: $("#"+ajax_form).serialize(),  // Сеарилизуем объект
        success: function(response) { //Данные отправлены успешно
        	let result = $.parseJSON(response);
        	if(result.status == false){
        		$('#result_form').html('<div class="alert alert-danger" role="alert"><b>Error:</b> Fields must not be empty!</div>');
        	}else{
        		$('#user-form-modal').modal('hide');
        		console.log(result);
        		if(result.action == 'add'){
        			$('#result_form').hide();
        			// Скрываем div 
        			$("div[id='user-not-found']").remove();

					let role = result.roleSelect == 1 ? "User" : "Admin";
	        		let status = result.toggle == 1 ? "<div style='text-align:center;'><i class='fa fa-circle active-circle'></i></div>" : "<div style='text-align:center;'><i class='fa fa-circle not-active-circle'></i></div>";

					$('table').append(`
						<tr data-rowId = '${result.uId}'>
							<td>	
								<div class="custom-control custom-control-inline custom-checkbox custom-control-nameless m-0 align-top" id="checklist">
                              		<input type="hidden" class="form-control" id="list-action" name="list-action" value="true">
                                	<input type="checkbox" name="az" class="custom-control-input" id="item-${result.uId}" value="${result.uId}">
                                	<label class="custom-control-label" for="item-${result.uId}"></label>
                              	</div>
							</td>
							<td class="username">
								${result.firstName} ${result.lastName}
							</td>
							<td class="role">
                              ${role}
                          	</td>
							<td class="status">
                              ${status}
                          	</td>
                          	<td class="button">
                          	<div class="badge">
	                              <button class="btn modalUser" type="button" data-toggle="modal"
	                                data-target="#user-form-modal" 
	                                data-id="${result.uId}"
	                                data-firstname="${result.firstName}"
	                                data-lastname="${result.lastName}"
	                                data-role="${result.roleSelect}"
	                                data-status="${result.toggle}"
	                                >Edit</button>
	                                </div>
	                                <div class="badge">
	                              <button class="btn deleteUser" type="button" data-toggle="modal"
	                                data-target="#delete-user-form-modal" 
	                                data-firstname="${result.firstName}"
	                                data-lastname="${result.lastName}"
	                                data-id="${result.uId}">
	                                <i class="fa fa-trash"></i></button>
	                                </div>
                          	</td>
						</tr>
						`)

				}else if(result.action == 'edit'){
					$(`[data-rowId='${result.uId}']`).find('.username').text(result.firstName + ' ' + result.lastName);

					if(result.roleSelect == 1){
						$(`[data-rowId='${result.uId}']`).find('.role').text('User');
					}else{
						$(`[data-rowId='${result.uId}']`).find('.role').text('Admin');
					}

					if(result.toggle == 1){
						$(`[data-rowId='${result.uId}']`).find('.status').html('<div style="text-align:center"><i class="fa fa-circle active-circle"></i></div>');
					}else{
						$(`[data-rowId='${result.uId}']`).find('.status').html('<div style="text-align:center"><i class="fa fa-circle not-active-circle"></i></div>');
					}

					$(`[data-rowId='${result.uId}']`).find('.button').html(`<div class="btn-group align-top" id="editDel">
						<div class="badge">
	                              <button class="btn modalUser" type="button" data-toggle="modal"
	                                data-target="#user-form-modal" 
	                                data-id="${result.uId}"
	                                data-firstname="${result.firstName}"
	                                data-lastname="${result.lastName}"
	                                data-role="${result.roleSelect}"
	                                data-status="${result.toggle}"
	                                >Edit</button>
	                                </div>
	                                <div class="badge">
	                              <button class="btn deleteUser" type="button" data-toggle="modal"
	                                data-target="#delete-user-form-modal" 
	                                data-firstname="${result.firstName}"
	                                data-lastname="${result.lastName}"
	                                data-id="${result.uId}">
	                                <i class="fa fa-trash"></i></button>
	                                </div>
	                            </div>`);
					let intro = $('#u-id');
					intro.prop('value', '');
					
				}else if(result.action == 'delete'){
					$('#delete-user-form-modal').modal('hide');
					$(`[data-rowId='${result.uId}']`).remove();
				}
        	}
    	},
    	error: function(response) { // Данные не отправлены
            $('#result_form').html('Ошибка. Данные не отправлены.');
    	}
 	});
}