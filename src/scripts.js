var $ = require('jquery');

$(document).ready(function(){
//Making a GET Ajax request
$.ajax({
	url:"/tasks",
	method:"GET",
	contentType:"application/json",
	success:function(response){
		if(response.length==0){
			$('form.output-form').hide();
			$('ul.no-tasks-ul').append('<li>'+'You currently dont have any tasks...'+'</li>');
		}else{
			$('form.output-form').show();
			$('table.output-table tbody').empty();
			//iterating through tasks in the response object
			for(var i=0;i<response.length;i++){
			$('table.output-table tbody').append(
				'<tr>'+
					'<td class="id-row">'+[i+1]+'</td>'+
					'<td class="task-row">'+'<input type="text" id="task-id" value="'+response[i]+'">'+'</td>'+
					'<td>'+
						'<input type="submit" class="update-button" value="update">'+
						'<input type="submit" value="delete" class="delete-button">'+
					'</td>'+
				'</tr>'
			  );
			}
		}
	}
});
//end of a GET ajax requests

//making a post request to the server with ajax
$('input.submit-button').click(function(event){
	event.preventDefault();
	var task = document.getElementById('task-name').value;
	if(task==""){
		$('ul.task-error-ul').empty();
		$('ul.task-error-ul').append('<li>'+'Task not written..'+'</li>');
	}else{
		//making ajax post request to the server
		$.ajax({
			url:"/tasks",
			method:"POST",
			contentType:"application/json",
			data:JSON.stringify({
				task:task
			}),
			success:function(response){
				$('ul.task-error-ul').empty();
				//showing the table that gets hidden when there are no tasks from the server
				$('form.output-form').show();
				if(response=="task exists.."){
					$('ul.task-error-ul').append('<li>'+response+'</li>');
				}else{
				//clearing the 'you have no tasks' message
				$('ul.no-tasks-ul').empty();	
				//emptying the table	
				$('table.output-table tbody').empty();	
				//iterating through tasks in the response object
				for(var j=0;j<response.length;j++){
				$('table.output-table tbody').append(
						'<tr>'+
							'<td class="id-row">'+[j+1]+'</td>'+
							'<td>'+'<input type="text" id="task-id" value="'+response[j]+'">'+'</td>'+
							'<td>'+
								'<input type="submit" class="update-button" value="update">'+
								'<input type="submit" value="delete" class="delete-button">'+
							'</td>'+
						'</tr>'
					);
				  }
				}
			}
		});
	}
}); 
//end of post request

//making a put ajax requests to the server
$('table.output-table').on('click','.update-button',function(event){
	event.preventDefault();
	var rowl = $(this).closest('tr');
	var id = rowl.find('.id-row').text();
	var task = rowl.find('#task-id').val();
	if(task==""){
		alert('task cannot be empty');
	}else{
		$.ajax({
			url:"/tasks",
			method:"PUT",
			contentType:"application/json",
			data:JSON.stringify({
				task:task,
				id:id
			}),
			success:function(response){
				if(response=="task already exists.."){
					alert(response);
					$.ajax({
						url:"/tasks",
						method:"GET",
						contentType:"application/json",
						success:function(response){
							if(response.length==0){
							$('form.output-form').hide();
							$('ul.no-tasks-ul').append('<li>'+'You currently dont have any tasks...'+'</li>');
							}else{
							$('form.output-form').show();
							$('table.output-table tbody').empty();
							//iterating through tasks in the response object
							for(var i=0;i<response.length;i++){
							$('table.output-table tbody').append(
							'<tr>'+
								'<td class="id-row">'+[i+1]+'</td>'+
								'<td class="task-row">'+'<input type="text" id="task-id" value="'+response[i]+'">'+'</td>'+
								'<td>'+
									'<input type="submit" class="update-button" value="update">'+
									'<input type="submit" value="delete" class="delete-button">'+
								'</td>'+
							'</tr>'
						);
						}
					}
		}
});
				}else{
				//clearing the 'you have no tasks' message
				$('ul.no-tasks-ul').empty();	
				//emptying the table	
				$('table.output-table tbody').empty();	
				//iterating through tasks in the response object
				for(var k=0;k<response.length;k++){
				$('table.output-table tbody').append(
						'<tr>'+
							'<td class="id-row">'+[k+1]+'</td>'+
							'<td>'+'<input type="text" id="task-id" value="'+response[k]+'">'+'</td>'+
							'<td>'+
								'<input type="submit" class="update-button" value="update">'+
								'<input type="submit" value="delete" class="delete-button">'+
							'</td>'+
						'</tr>'
					);
				  }
				}
				
			}
		});
		//end of a ajax put request
	}
});
//end of a put ajax request

//sending delete ajax requests to the server
$('table.output-table').on('click','.delete-button',function(event){
	event.preventDefault();
	var rowl = $(this).closest('tr');
	var task = rowl.find('#task-id').val();
	
	$.ajax({
		url:"/tasks",
		method:"delete",
		contentType:"application/json",
		data:JSON.stringify({
			task:task
		}),
		success:function(response){
			$('ul.no-tasks-ul').empty();	
			//emptying the table	
			$('table.output-table tbody').empty();	
			//checking if there is still tasks
			if(response.length==0){
				$('form.output-form').hide();
				$('ul.no-tasks-ul').append('<li>'+'You currently dont have any tasks...'+'</li>');
			}else{
			//iterating through tasks in the response object
			for(var m=0;m<response.length;m++){
				$('table.output-table tbody').append(
						'<tr>'+
							'<td class="id-row">'+[m+1]+'</td>'+
							'<td>'+'<input type="text" id="task-id" value="'+response[m]+'">'+'</td>'+
							'<td>'+
								'<input type="submit" class="update-button" value="update">'+
								'<input type="submit" value="delete" class="delete-button">'+
							'</td>'+
						'</tr>'
					);
				  }
			}	  
		}
	});
});
//end of delete request
});