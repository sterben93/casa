/* global jsonUsuario */
/* global json */
/* global datos */

/*
 * Proporciona las funciones necesarias para que funcione la paguina registro
 */
$(document).ready(function (){
	sesion();
    $('#enviar').click(function (){
        <div class="form-group">
    		            <label for="nombre">Nombre</label>
    		            <input name="nombre" type="text" class="form-control" id="nombre" placeholder="Nombre">
                    </div>
                    <!--
                    <div class="form-group">
	    	            <label for="rfc">RFC</label>
	    	            <input name="rfc" type="text" class="form-control" id="rfc" placeholder="RFC">
                    </div>
                    -->
                    <div class="form-group">
	    	            <label for="email">Email</label>
	    	            <input name="email" type="email" class="form-control" id="email" placeholder="Email">
                    </div>
                    <div class="form-group">
		                <label for="password">Contraseña</label>
		                <input name="password" type="password" class="form-control" id="password">
                    </div>
                    <div class="form-group">
		                <label for="password2">Repita la contraseña</label>
		                <input type="password" class="form-control" id="password2">
                    </div>
                    <div class="form-group">
		                <label for="tipo">Tipo de persona</label>
                        <select name="tipo" id="tipo" class="form-control" required="required">
                            <option value="None">--Tipo de Persona</option>
                            <option value="1">Moral</option>
                            <option value="2">Fisica</option>
                        </select>
                    </div>
    });
});
