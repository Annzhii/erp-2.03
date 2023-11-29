// Copyright (c) 2023, anzhi and contributors
// For license information, please see license.txt

frappe.ui.form.on('Part Production', {
    refresh: function(frm) {
		//购买按钮,如果供应商已经确认则继续，否则弹窗提示
		frm.add_custom_button('确认', function() {
			var filedValue1 = frm.doc.supplier;
			var filedValue4 = frm.doc.unit_price;
			if (!filedValue1 || !filedValue4) {
				frappe.msgprint('请确认供应商或价格');
				return;
			}
			frm.set_value("status","已确认");
			frm.save();
			frm.print_doc();
		 })
		//签收按钮，如果时间和签收数量不为空，则继续，否则弹窗提示
		frm.add_custom_button('签收', function() {
			var filedValue2 = frm.doc.delivery_date;
			var filedValue3 = frm.doc.delivery_quantity;
			if (!filedValue2 || !filedValue3){
				frappe.msgprint('请确认签收数量或者签收时间');
				return;
			}
			frm.set_value("status","已签收");
			frm.save();
		 })
	}
	
})
