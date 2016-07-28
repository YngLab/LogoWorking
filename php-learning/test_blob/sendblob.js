sendblob = function() {
	blob = new Blob(["i am a blob"], {type:'text/plain'});
	var data ={"request" : "test"};
	//var formData = new FormData();
	//formData.append('blobData', "blob");

	$.ajax({
		type: "POST",
		url: "php/upload.php",
		//data: formData,
		data: data,
		dataType: 'json',
		processData: false,
		contentType: false,

		success:function(data, dataType){
			window.alert(data);
		},
		error: function(XMLHttpRequest, textStatus, errorThrown){
			//console.log("error");
			window.alert('Error : ' + errorThrown);
		}
	});
	//window.alert();
	return false;
};