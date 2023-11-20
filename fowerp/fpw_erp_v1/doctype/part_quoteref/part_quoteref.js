// Copyright (c) 2023, anzhi and contributors
// For license information, please see license.txt

frappe.ui.form.on('Part QuoteRef', {
	setup(frm) {
		frappe.db.get_single_value("User Information", "name_abb").then(function(username) {
			frm.set_value('created_by', username);
		});
	}
});

