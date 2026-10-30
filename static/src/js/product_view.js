(function(){
    const elActividad = document.querySelector('select[name=actividad_economica]');
    const elProductosSin = document.querySelector('select[name=codigo_producto_sin]');
    //const elCodigoProductoSin = document.querySelector('input[name=codigo_producto_sin]');

    function filterProducts(codigoActividad, reset)
    {
        if( !codigoActividad )
            return false;
        codigoActividad = codigoActividad.replaceAll('"', '');
        if( reset )
            elProductosSin.value = '"0"';
        console.log(`Filtering productos for: ${codigoActividad}`);
        elProductosSin.querySelectorAll('option').forEach( (op) => {
            if( op.dataset.actividad == codigoActividad )
                op.style = 'display:block;';
            else
                op.style = 'display:none;';
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
