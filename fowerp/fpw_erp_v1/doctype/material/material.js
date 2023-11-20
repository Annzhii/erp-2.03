// Copyright (c) 2023, anzhi and contributors
// For license information, please see license.txt

frappe.ui.form.on('Material', {
    material_type(frm) {
        var type = frm.doc.material_type; // 获取 "类型" 字段的值
        frm.toggle_display("plastic_grade", true);
        // 根据 "类型" 的不同值来显示或隐藏其他字段
        if (type === "Plastic/塑料") {
            frm.toggle_display(['plastic_type','plastic_grade','supplier'], true); // 显示字段
            frm.toggle_display(['material','size'], false); // 隐藏字段
        } else if (type === "Metal/金属") {
            frm.toggle_display(['size','material','supplier'], true); // 显示字段
            frm.toggle_display(['plastic_type','plastic_grade'], false); // 隐藏字段
        } else if (type === "Packing Supply/包装用品") {
            frm.toggle_display(['size','material','supplier'], true); // 显示字段
            frm.toggle_display(['plastic_type','plastic_grade'], false); // 隐藏字段
        } else {
            frm.toggle_display(['size','material','supplier'], true); // 显示字段
            frm.toggle_display(['plastic_type','plastic_grade'], false); // 隐藏字段
        }
    }
});
