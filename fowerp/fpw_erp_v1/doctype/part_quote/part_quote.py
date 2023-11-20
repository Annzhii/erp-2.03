# Copyright (c) 2023, anzhi and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
class PartQuote(Document):
    pass
@frappe.whitelist()
def create_production(doc_name, part_quoteref,part_quantity):
    new_production = frappe.get_doc({
        "doctype": "Part Production",
        "part_quote_number": doc_name,
        "part_quoteref": part_quoteref,
        "quantity": part_quantity,
    })
    new_production.insert()
    frappe.msgprint("生产单已成功创建或更新")
@frappe.whitelist()
def create_purchase(part_quote_name):
    # 获取当前报价单的
    part_quote = frappe.get_doc("Part Quote", part_quote_name)
    # 获取当前报价单中选中的产品
    selected_part_quoteref = part_quote.get("part_quoteref")
    for item in selected_part_quoteref:
        # 获取产品里的材料
        item_doc = frappe.get_doc("Part QuoteRef", item.part_item)
        selected_materials = item_doc.get("material_table")
        for smaterial in selected_materials:
            # 创建购买单
            purchase = frappe.get_doc({
                "doctype":"Purchase",
                "material": smaterial.material,
                "quantity": smaterial.proportion * item.quantity,
                "quote_number": part_quote_name,
            })
            # 如果需要相同的材料，那不重复创建，而是把数量相加
            existing_purchase = frappe.db.get_all('Purchase', filters={'material': smaterial.material, 'quote_number': part_quote_name}, fields=['quantity','name'])
            if existing_purchase:
                existing_purchase[0].quantity+= purchase.quantity
                frappe.msgprint(str(existing_purchase[0].name))#测试
                frappe.db.set_value('Purchase', existing_purchase[0].name, 'quantity', existing_purchase[0].quantity)
            else:
                purchase.insert()

    frappe.msgprint("购买单已成功创建或更新")