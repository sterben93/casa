$(document).ready(publica);

function publica() {
    $("#formularioInm").progression({
            tooltipWidth: '200',
		    tooltipPosition: 'right',
            tooltipOffset: '50',
		    showProgressBar: true,
		    showHelper: true,
		    tooltipFontSize: '14',
		    tooltipFontColor: 'fff',
		    progressBarBackground: 'fff',
		    progressBarColor: '6EA5E1',
		    tooltipBackgroundColor:'222',
		    tooltipPadding: '10',
		    tooltipAnimate: true
    });
    $('#profilePhotoFileUpload').change(handleFileSelect);   
  }
/**
 * Metodo para mostrar las imagenes que se an seleccionado
 * @param   object evt
 */
function handleFileSelect(evt) {
    $('#list').html("");
    var files = evt.target.files;
    for (var i = 0, f; f = files[i]; i++) {
      if (!f.type.match('image.*')) {
        continue;
      }
      var reader = new FileReader();
      reader.onload = (function(theFile) {
        return function(e) {
         var span = $('<span/>').append($('<img/>',{
              'width':'100',
              'height':'100',
              'src':e.target.result,
              'title':escape(theFile.name)
          }));
            $('#list').append(span);
        };
      })(f);
      reader.readAsDataURL(f);
    }
}
