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
			invalidArgumentType: 'Неправильный тип аргумента.',
			errorOnRequest: 'Произошла ошибка при запросе данных: ',
			noDataSourceUrl: 'Необходимо установить опцию dataSourceUrl, чтобы igTree смог произвести запрос данных с указанного URL.',
			incorrectPath: 'Узел не найден по указанному пути: ',
			incorrectNodeObject: 'Указанный аргумент не соответствует узлу jQuery.',
			setOptionError: 'Динамические изменения следующей опции не поддерживаются: '
		}
	});

}
