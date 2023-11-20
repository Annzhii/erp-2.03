// Copyright (c) 2023, anzhi and contributors
// For license information, please see license.txt

frappe.ui.form.on('Part Quote', {
    refresh: function(frm) {
        frm.add_custom_button('匹配款项', () => {
           var ref = frm.doc;
            frappe.new_doc('Selected Payment', {quote_number:ref.name}   
            )
            .then(() => {
                console.log('文档已成功保存到数据库。');
            })
        })
        frm.add_custom_button('生产', () => {
            var doc_name = frm.doc.name;
            var child_table = frm.doc["part_quoteref"];
            var clickcount = 0;
            // 使用foeEach历遍子表单part quoteref，为每行都创建一个表单
            if (clickcount === 0) {
                child_table.forEach(function(item, index){
                    frappe.call({
                        method:"fowerp.fpw_erp_v1.doctype.part_quote.part_quote.create_production",//调用py代码
                        args: {
                            'doc_name' : doc_name,
                            'part_quoteref' : item.part_item,
                            'part_quantity' : item.quantity
                        },
                    })
                })
                 //点击次数加1
                clickcount++;
                 //禁用按钮
                frm.remove_custom_button('生产');
            }
        })
        frm.add_custom_button('创建采购单' , function(){
            frappe.call({
                method:"fowerp.fpw_erp_v1.doctype.part_quote.part_quote.create_purchase",
                args: {
                    'part_quote_name': frm.doc.name
                },
            })
        })
    }
})
