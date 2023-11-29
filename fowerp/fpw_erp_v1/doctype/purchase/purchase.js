// Copyright (c) 2023, anzhi and contributors
// For license information, please see license.txt

frappe.ui.form.on('Purchase', {
    refresh: function(frm) {
		//确认按钮，确认采购数量后点击
        frm.add_custom_button('确认', function() {
		   frm.set_value("status","已确认");
		   frm.save();
        })
		//购买按钮,如果供应商已经确认则继续，否则弹窗提示
		frm.add_custom_button('购买', function() {
			var filedValue1 = frm.doc.supplier;
			if (!filedValue1) {
				frappe.msgprint('请确认供应商');
				return;
			}
			frm.set_value("status","已购买");
			frm.save();
			frm.print_doc();
		 })
		//签收按钮，如果时间和签收数量不为空，则继续，否则弹窗提示
		frm.add_custom_button('签收', function() {
			var filedValue2 = frm.doc.
			frm.set_value("status","已签收");
			frm.save();
		 })
	}
	
})