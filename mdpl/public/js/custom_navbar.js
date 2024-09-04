frappe.ready(function () {
    // Define the HTML content as a string
    var customNavbarHtml = `
    {% if not only_static %}

    {% if frappe.session.user != 'Guest' %}
    <!-- <button id="customer-link" class="btn btn-primary" onclick="redirectToGeneralLedger()">{{ _('GL Butto--n') }}</button> -->
    <li class="nav-item dropdown logged-in" id="website-post-login" data-label="website-post-login" style="display: none">
        <a href="#" class="nav-link nav-avatar" data-toggle="dropdown">
            <span class="user-image-wrapper"></span>
        </a>
        <ul class="dropdown-menu dropdown-menu-right" role="menu">
            {%- for child in post_login -%}
            {%- if child.url -%}
            <a class="dropdown-item" href="{{ child.url | abs_url }}"  {% if child.open_in_new_tab %} target="_blank" {% endif %} rel="nofollow">
                {{ child.label }}
            </a>
            {%- endif -%}
            {%- endfor -%}
            <a class="dropdown-item switch-to-desk hidden" href="/app">{{ _('Switch To Desk') }}</a>
        </ul>
    </li>
    {% endif %}

    {% if not hide_login %}
    <li class="nav-item">
        <a class="nav-link btn-login-area" href="/login">{{ _("Login") }}</a>
    </li>
    {% endif %}
{% endif %}
    `;

    // Function to redirect when the button is clicked
    function redirectToGeneralLedger() {
        frappe.call({
            method: 'mdpl.navbarlogic.get_customer_for_user',
            args: {
                user_email: frappe.session.user
            },
            callback: function (r) {
                if (r.message) {
                    var customerName = r.message;
                    var targetUrl = '/app/query-report/General%20Ledger?company=Mahesh+Distributor&party_type=Customer&party=' + encodeURIComponent(customerName);
                    window.location.href = targetUrl;
                } else {
                    console.error('No customer found for user.');
                }
            }
        });
    }

    // Inject custom HTML into the DOM
    document.querySelector('.navbar').innerHTML = customNavbarHtml;
});
