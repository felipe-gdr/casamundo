
function itemPriceTable(id){
	
	var priceTableJson = JSON.parse(localStorage.getItem("pricetableitens"));
	var priceTable =
		{
			id : "",
			name : "",
			description : "",
			net : "",
			gross : "",
			vendor : ""
		};

    $.each(priceTableJson.itens, function (w, priceTableItem) {
    	if (priceTableItem.id == id){
			priceTable.id = priceTableItem.id;
			priceTable.name = priceTableItem.name;
			priceTable.description = priceTableItem.description;
			priceTable.net = priceTableItem.net;
			priceTable.gross = priceTableItem.gross;
			priceTable.vendor = priceTableItem.vendor;
    	};
    });
    
	return priceTable;
	
};

}