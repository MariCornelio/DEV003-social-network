module.exports = 'test-file-stub';
// esta linea permite que un archivo de prueba que importa un
// modulo que aún no se ha creado se ejecute sin errores
// 'STUB' proporciona una implementación mínima que sólo devuelve
// test-file-stub cuando se importa. Entonces puede reemplazar 
// temporalmente el módulo real de la prueba :)