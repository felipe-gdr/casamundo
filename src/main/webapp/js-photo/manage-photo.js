/**
 * 
 */
function carregaPhoto (app, label, labelId){		
	var $image = $('#img-' + labelId).first();
	var $downloadingImage = $('#img-' + labelId);
	$downloadingImage.load(function(){
	  $image.attr("src", $(this).attr("src"));	
	});
//	$downloadingImage.attr("src", "http://" + localStorage.urlServidor + ":8080/" + app + "/rest/upload/images?image=" + label);
	$("#img-" + labelId).attr("src", "http://" + localStorage.urlServidor + ":8080/" + app + "/rest/upload/images?image=" + label);
};

function montaPhoto (app, assunto, fotosDiv, id, id2, label){
	var id = id.replace( /\s/g, '' ).replace(/[^a-zA-Z 0-9]/g, '');
	var id2 = id2.replace( /\s/g, '' ).replace(/[^a-zA-Z 0-9]/g, '');
	var labelId = label.replace( /\s/g, '' ).replace(/[^a-zA-Z 0-9]/g, '');
	var labelId = label.replace( /\s/g, '' ).replace(/[^a-zA-Z 0-9]/g, '');
    var url = "http://" + localStorage.urlServidor + ":8080/" + app + "/rest/upload/files?prefix=" + id + "_" + id2 + "_" + labelId,
    uploadButton = $('<button/>')
        .addClass('btn btn-primary')
        .prop('disabled', true)
        .text('Carregando...')
        .on('click', function () {
            var $this = $(this),
                data = $this.data();
            delete data.form;
            $this
                .off('click')
                .text('Abort')
                .on('click', function () {
                    $this.remove();
                    data.abort();
                });
            data.submit().always(function () {
                $this.remove();
            });
        });
    $('#upload-img-' + labelId).fileupload({
        url: url,
        dataType: 'multipart/form-data',
        autoUpload: true,
        singleFileUploads: true,
        redirect: false,
        acceptFileTypes: /(\.|\/)(gif|jpe?g|png|pdf|mp4)$/i,
        maxFileSize: 999000,
        // Enable image resizing, except for Android and Opera,
        // which actually support image resizing, but fail to
        // send Blob objects via XHR requests:
        disableImageResize: /Android(?!.*Chrome)|Opera/
            .test(window.navigator.userAgent),
        previewMaxWidth: 200,
        previewMaxHeight: 200,
        previewCrop: false
    }).on('fileuploadadd', function (e, data) {
    	$('#img-div-' + labelId).remove();
    	data.context = $('<div id="img-div-' + labelId + '"/>').appendTo('#files-' + labelId);
        $.each(data.files, function (index, file) {
            var node = $('<p/>')
                    .append("");
            node.appendTo(data.context);
           	$("#" + labelId).val(id + "_" + id2 + "_" + labelId + "_" + mudaSufixo(file.name));
	        $('#img-' + labelId).remove();
        });
    }).on('fileuploadprocessalways', function (e, data) {
        var index = data.index,
            file = data.files[index],
            node = $(data.context.children()[index]);
        if (file.preview) {
            node
                .prepend('<br>')
                .prepend(file.preview);
        }
        if (file.error) {
            node
                .append('<br>')
                .append($('<span class="text-danger"/>').text(file.error));
        }
        if (index + 1 === data.files.length) {
            data.context.find('button')
                .text('Carregar')
                .prop('disabled', !!data.files.error);
        }
    }).on('fileuploadprogressall', function (e, data) {
        var progress = parseInt(data.loaded / data.total * 100, 10);
        $('#progress-' + labelId + ' .progress-bar').css(
            'width',
            progress + '%'
        );
    }).on('fileuploaddone', function (e, data) {
        $.each(data.result.files, function (index, file) {
            if (file.url) {
                var link = $('<a>')
                    .attr('target', '_blank')
                    .prop('href', file.url);
                $(data.context.children()[index])
                    .wrap(link);
            } else if (file.error) {
                var error = $('<span class="text-danger"/>').text(file.error);
                $(data.context.children()[index])
                    .append('<br>')
                    .append(error);
            }
        });
    }).on('fileuploadfail', function (e, data) {
        $.each(data.files, function (index) {
        });
    }).prop('disabled', !$.support.fileInput)
        .parent().addClass($.support.fileInput ? undefined : 'disabled');
		
};

function carregaImagem (label, nomeFoto){
	
	var labelId = label.replace( /\s/g, '' ).replace(/[^a-zA-Z 0-9]/g, '') + z + "-" + i;

	var $image = $('#img-' + labelId).first();
	var $downloadingImage = $('#img-' + labelId);
	$downloadingImage.load(function(){
			  $image.attr("src", $(this).attr("src"));	
			});
			
	$downloadingImage.attr("src", "http://" + localStorage.urlServidor + ":8080/vistorias/rest/documento/images?image=" + nomeFoto);
};
function mudaSufixo(fileName){
	return fileName.replace("mp4","jpg").replace("jpeg","jpg").replace("png","jpg").replace("gif","jpg");
};