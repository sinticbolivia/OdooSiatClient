(function(){
    const elActividad = document.querySelector('[name=actividad_economica] select');
    const elProductosSin = document.querySelector('[name=codigo_producto_sin_selector] select');
    function filterProducts(codigoActividad, reset)
    {
        if( !codigoActividad )
            return false;
        codigoActividad = codigoActividad.replaceAll('"', '');
        if( reset )
            elProductosSin.value = '"0"';
        console.log(`Filtering productos for: codigoActividad`);
        elProductosSin.querySelectorAll('option').forEach( (op) => {
            if( op.value != '"0"' )
            {
                console.log(codigoActividad, op.value.replaceAll('"', ''));
                if( op.value.replaceAll('"', '').includes(`${codigoActividad}:`) )
                    op.style = 'display:block;';
                else
                    op.style = 'display:none;';
            }

        });
    }
    if( !elActividad || !elProductosSin )
        return false;
    const codigoActividad = elActividad.value || null;
    elActividad.addEventListener('change', function()
    {
        const val = elActividad.value;
        filterProducts(val, true);
    });
    filterProducts(codigoActividad, false);
})();
