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
			invalidArgumentType: '提供された引数のタイプは無効です。',
			errorOnRequest: 'データを取得するときにエラーが発生しました: ',
			noDataSourceUrl: 'igTree コントロールは、その URL にデータの要求を送信するために dataSourceUrl を提供する必要があります。',
			incorrectPath: '指定したパスにノードが見つかりませんでした: ',
			incorrectNodeObject: '指定した引数は jQuery ノード要素ではありません。',
			setOptionError: '次のオプションはランタイムで変更できません: '
		}
	});

}
