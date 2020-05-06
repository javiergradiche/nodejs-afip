const Afip = require('./src/Afip')

class AfipServices {
  
  fe(){
    const options = {
      production: false,
      cert: 'company.crt',
      key: 'company.key',
      res_folder: './certs',
      ta_folder: './ta',
      CUIT: 23280794899
    }

    const date = new Date(Date.now() - ((new Date()).getTimezoneOffset() * 60000)).toISOString().split('T')[0];

    const data = {
      'CantReg' 		: 1, // Cantidad de comprobantes a registrar
      'PtoVta' 		  : 1, // Punto de venta
      'CbteTipo' 		: 6, // Tipo de comprobante (ver tipos disponibles) 
      'Concepto' 		: 1, // Concepto del Comprobante: (1)Productos, (2)Servicios, (3)Productos y Servicios
      'DocTipo' 		: 80, // Tipo de documento del comprador (ver tipos disponibles)
      'DocNro' 		  : 20111111112, // Numero de documento del comprador
      'CbteDesde' 	: 2, // Numero de comprobante o numero del primer comprobante en caso de ser mas de uno
      'CbteHasta' 	: 2, // Numero de comprobante o numero del ultimo comprobante en caso de ser mas de uno
      'CbteFch' 		: parseInt(date.replace(/-/g, '')), // (Opcional) Fecha del comprobante (yyyymmdd) o fecha actual si es nulo
      'ImpTotal' 		: 189.3, // Importe total del comprobante
      'ImpTotConc' 	: 0, // Importe neto no gravado
      'ImpNeto' 		: 150, // Importe neto gravado
      'ImpOpEx' 		: 0, // Importe exento de IVA
      'ImpIVA' 		  : 31.5, //Importe total de IVA
      'ImpTrib' 		: 7.8, //Importe total de tributos
      'FchServDesde' 	: null, // (Opcional) Fecha de inicio del servicio (yyyymmdd), obligatorio para Concepto 2 y 3
      'FchServHasta' 	: null, // (Opcional) Fecha de fin del servicio (yyyymmdd), obligatorio para Concepto 2 y 3
      'FchVtoPago' 	: null, // (Opcional) Fecha de vencimiento del servicio (yyyymmdd), obligatorio para Concepto 2 y 3
      'MonId' 		  : 'PES', //Tipo de moneda usada en el comprobante (ver tipos disponibles)('PES' para pesos argentinos) 
      'MonCotiz' 		: 1, // Cotización de la moneda usada (1 para pesos argentinos)  
      'Tributos' 		: [ // (Opcional) Tributos asociados al comprobante
        {
          'Id' 		  :  99, // Id del tipo de tributo (ver tipos disponibles) 
          'Desc' 		: 'Ingresos Brutos', // (Opcional) Descripcion
          'BaseImp' : 150, // Base imponible para el tributo
          'Alic' 		: 5.2, // Alícuota
          'Importe' : 7.8 // Importe del tributo
        }
      ], 
      'Iva' 			: [ // (Opcional) Alícuotas asociadas al comprobante
        {
          'Id' 		  : 5, // Id del tipo de IVA (ver tipos disponibles) 
          'BaseImp' : 150, // Base imponible
          'Importe' : 31.5 // Importe 
        }
      ], 
      'Opcionales' 	: [ // (Opcional) Campos auxiliares
        {
          'Id' 		: 17, // Codigo de tipo de opcion (ver tipos disponibles) 
          'Valor' : 2 // Valor 
        }
      ]
    };
    
    const afip = new Afip(options);
    return afip.ElectronicBilling.createVoucher(data);
  };
}

module.exports = AfipServices;