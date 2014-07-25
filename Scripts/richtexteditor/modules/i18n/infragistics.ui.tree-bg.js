/*!
* Infragistics.Web.ClientUI Tree localization resources 12.1.20121.2059
*
* Copyright (c) 2011-2012 Infragistics Inc.
*
* http://www.infragistics.com/
*
*/

$.ig = $.ig || {};

if (!$.ig.Tree) {
	$.ig.Tree = {};

	$.extend($.ig.Tree, {
		locale: {
			invalidArgumentType: 'Подаденият аргумент е от невалиден тип.',
			errorOnRequest: 'Проблем при извличане на данните: ',
			noDataSourceUrl: 'igTree изисква опцията dataSourceUrl да бъде попълнена, за да се оправят заявки за данни.',
			incorrectPath: 'Връх със следната пътека не беше намерен: ',
			incorrectNodeObject: 'Подаденият аргумент не е jQuery елемент.',
			setOptionError: 'Стойността на следната опция не може да бъде променяна след инициализация: '
		}
	});

}
