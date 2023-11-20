# Copyright (c) 2023, anzhi and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class SelectedPayment(Document):
    def before_save(self):

        quote_ref = frappe.get_doc('Part Quote', {'name': self.quote_number})

        if quote_ref:
            # 更新 "status" 字段为 "accepted"
            quote_ref.status = 'Accepted'
            quote_ref.save()
        else:
            frappe.msgprint('未找到匹配的 报价单 记录。')
        
        received_payment = frappe.get_doc ('Received Payment', {'name': self.payment})

        if received_payment:

            received_payment.payment_status = 'Close'
            received_payment.save()
        else:
            frappe.msgprint('未找到匹配的 Selected Payment 记录。')