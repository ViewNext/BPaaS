Integración con portales y aplicaciones de terceros

1)	Requisitos de la aplicación. BPaaS es una biblioteca de recursos predefinidos para AngularJS. Para utilizarlos, la aplicación web debe basarse en:
•	HTML5
•	CSS3
•	AngularJS v1.3 o superior

2)	Carga de la librería “BPaaS”. Está compuesta de varios archivos con código Javascript/Angular y CSS necesario para la ejecución de los módulos:
a.	Archivos Javascript con funciones comunes, declaraciones de variables globales, factorías, servicios  y otros recursos necesarios para la expansión y funcionamiento de las directivas.
b.	Archivos .CSS que gestionan la presentación visual de las directivas.
Estos archivos se declaran en la sección <HEAD> de la página donde se quieren insertar las directivas AngularJS disponibles. La lista definitiva se indica al final de este documento y se actualizará en versiones sucesivas. 
Para utilizar los recursos de BPaaS, el programador debe inyectar la librería “OrangeLib” como dependencia en su módulo angular:
angular.module('myApp', ['ionic','OrangeLib','chart.js']);
  En este ejemplo, el modulo “myApp” es el declarado como “ng-app” en la aplicación maestra, y utiliza IONIC como framework AngularJS. A esta dependencia se añade la librería “OrangeLib” y “chart-js”, necesaria para generar diagramas. El desarrollador puede añadir otras dependencias y librerías si fuera necesario. 
  
3)	Carga del archivo javascript con el código de cada una de las directivas que se desee incorporar. A la fecha de este documento, la lista de directivas es la siguiente:

Directiva	Contenido
inputUserLevel	Selector de rol de usuario (“Gestor”, “Soporte”, “Comercial”)
inputMsisdn	Captura número de teléfono (MSISDN)
profileData	Datos del perfil de cuenta de cliente a partir del MSISDN
invoiceList	lista de últimas 6 facturas
chartInvoices	Gráfico de las 6 últimas facturas
invoiceDetailNav	Información de detalle de la factura
invoiceLineDetail	información de detalle de  consumos y cargos de una línea dentro de una factura concreta
mdgInit	Carga inicial de datos MDG para un MSISDN
mdgLineInfo	Información MDG de una línea seleccionada
mdgInfoLineaMovil	Información MDG de una línea de móvil
mdgInfoLineaFijo	Información MDG detallada de una línea de fijo

El nombre del archivo es el mismo que el de la propia directiva, con extensión “.js”.  Así, por ejemplo, en la sección <HEAD>  del archivo HTML donde se quiera insertar la directiva “inputMsisdn” deberá aparecer la siguiente etiqueta:

< script src="https://satellite-cms-des.int.si.orange.es/static/BPaaS/js/inputMsisdn.js"></script>

4)	Inserción de directivas AngularJS dentro del código de la página. La directiva se inserta en el código HTML siguiendo las reglas de nomenclatura y asignación de AngularJS, tanto como tag ad-hoc como clase. Por ejemplo, la directiva “inputUserLevel” puede añadirse a cualquier página o sección utilizando las dos variantes:

<div class=’input-user-level’ …. ></div>
<input-user-level …. ></input-user-level>

Las directivas pueden tener parámetros de entrada, especificados en sus atributos, o no.  En el caso de las directivas disponibles, se actualizan los contenidos visuales automáticamente al cambiar el valor de los parámetros de entrada. Sea por ejemplo: 

<input-msisdn  msisdn="BPaaSCatalog.msisdn" />

 El usuario podrá introducir un número de teléfono y la propia directiva valida que sea un número correcto de móvil o teléfono. Al teclear un número correcto, todas las demás directivas insertadas en la página que dependen de este dato, se actualizan y modifican los contenidos en pantalla.
 
Si se quiere inicializar una directiva con un valor concreto (por ejemplo para insertar directivas en un portal B2B donde el número de teléfono siempre será el mismo), se puede declarar como constante: 

<profile-data msisdn="{{BPaaSCatalog.msisdn=635658400}}" />

Este ejemplo fuerza la carga de datos de perfil de cliente para el número predefinido “635658400”, con lo que no sería necesario incorporar la directiva “inputMsisdn” para introducir el número de teléfono. Esta asignación afecta también a todas las directivas que operan con el valor de BPaaSCatalog.msisdn como parámetro (BPaaSCatalog es un objeto javascript global de la librería). Si lo que se desea es cargar una directiva concreta con un valor especificado pero que no afecte a otras directivas, simplemente se indica como constante:

<profile-data msisdn="{{635658400}}" />

Maquetación y adaptación visual (ajustes CSS)
Las directivas se pueden insertar dentro de cualquier espacio en el área visual de la página. Están diseñadas con técnica responsivo y en general se adaptan a las dimensiones del espacio disponible, aunque queda a criterio del webmaster modificar las clases CSS propias de la librería BPaaS. En otros documentos se especificarán las clases y atributos CSS que definen los aspectos visuales de cada una de las directivas creadas.



 
 


