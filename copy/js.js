$( document ).ready(function() {


//начал менять модальные окна

	$('a[data-toggle=modal], button[data-toggle=modal]').click(function (element) {

    let data_id = $(this).data('id');
    let data_firstname = $(this).data('firstname');
    let data_lastname = $(this).data('lastname');
    let data_role = $(this).data('role');
    let data_status = $(this).data('status');

	console.log(data_id);

	// Задаем значения в модальном окне 
	$('#first-name').val(data_firstname);
	$('#last-name').val(data_lastname);
	$('#delete-user-id').val(data_id);
	$('#delete-user-first-name').val(data_firstname);
	$('#delete-user-last-name').val(data_lastname);

	let intro = $('#u-id');
	intro.prop('value', data_id);

	$('#UserModalLabelDel').text('Are you sure you want to delete the user '+data_firstname+' '+data_lastname);  // Add text when del. user

	if(data_status == 1){
		$('#toggle').prop('checked', true);
	}else{
		$('#toggle').removeProp('checked'); 
	}

	if(data_id !==""){
		$('#UserModalLabel').text('Edit user');  // Change text to edit
	}

	if(data_role !== ""){
			if(data_role === 1){
     			$('#list option:nth-child(2)').prop('selected', true);
     		}else{
     			$('#list option:nth-child(3)').prop('selected', true);     			
     		}
	}

  	})

    $("#btn").click(
		function(){
			sendAjaxForm('result_form', 'ajax_form', 'action_ajax_form.php');
			return false; 
		}
	);

/*  $(document).on('click','#editDel',function(){
console.log(1111);

})*/


	$('a[data-target="#delete-user-form-modal"], button[data-target="#delete-user-form-modal"]').click(function (element) {
    let data_id = $(this).data('id');
    $('#del-u-id').val(data_id);

console.log(2222);

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
        	//console.log(result.firstName); // Отпровка json возврата в консоль
        	if(result.status == false){
        		$('#result_form').html('<div class="alert alert-danger" role="alert"><b>Error:</b> Fields must not be empty!</div>');
        	}else{
        		$('#user-form-modal').modal('hide');
        		console.log(result);
//'+ result.uId +' data-first-name='+ result.firstName +' data-last-name='+ result.lastName +' data-role='+ result.role +'
        		if(result.action == 'add'){
        			// Скрываем div 
        			$("div[id='user-not-found']").remove();





/*	        		let check = '<div class="custom-control custom-control-inline custom-checkbox custom-control-nameless m-0 align-top" id="check"><input type="checkbox" class="custom-control-input" id="item-1"><label class="custom-control-label" for="item-1"></label></div>';
	        		let editDel = ``;
	        		let role = result.roleSelect == 1 ? "User" : "Admin";
	        		let status = result.status == 1 ? "<div style='text-align:center;'><i class='fa fa-circle active-circle'></i></div>" : "<div style='text-align:center;'><i class='fa fa-circle not-active-circle'></i></div>";
	        		let data = [[check, result.firstName + ' ' + result.lastName, role, status, editDel]]

					$.each(data,function(index,value){
					    $("#table").append('<tr></tr>') 
					    $.each(value,function(value,celda){
					        $('tr:last ').append('<td>' + celda + '</td>');
					    })                   
					})*/

					let role = result.roleSelect == 1 ? "User" : "Admin";
	        		let status = result.toggle == 1 ? "<div style='text-align:center;'><i class='fa fa-circle active-circle'></i></div>" : "<div style='text-align:center;'><i class='fa fa-circle not-active-circle'></i></div>";

					$('table').append(`
						<tr data-rowId = '${result.uId}'>
							<td>	
								<div class="custom-control custom-control-inline custom-checkbox custom-control-nameless m-0 align-top" id="check">
									<input type="checkbox" class="custom-control-input" id="item-1"><label class="custom-control-label" for="item-1"></label>
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
                          	<td>
	                            <div class="btn-group align-top" id="editDel">
	                              <button class="btn btn-sm btn-outline-secondary badge" type="button" data-toggle="modal"
	                                data-target="#user-form-modal" 
	                                data-id="${result.uId}"
	                                data-firstname="${result.firstName}"
	                                data-lastname="${result.lastName}"
	                                data-role="${role}"
	                                data-status="${status}"
	                                >Edit</button>
	                              <button id="delete" class="btn btn-sm btn-outline-secondary badge" type="button" data-toggle="modal"
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

				}else if(result.action == 'delete'){
					$('#delete-user-form-modal').modal('hide');
					$(`[data-rowId='${result.uId}']`).remove();
					console.log()
				}

        	}
    	},
    	error: function(response) { // Данные не отправлены
            $('#result_form').html('Ошибка. Данные не отправлены.');
    	}
 	});
}