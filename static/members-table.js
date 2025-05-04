document.addEventListener('DOMContentLoaded', function() {
    fetchDataAndCreateTable();
    addSearchFunctionality();
});

async function fetchDataAndCreateTable() {
    try {
        const response = await fetch('https://manager.sonix.network/api/v4/member-export/ixf/1.0');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        if (data.member_list && data.ixp_list) {
            createTable(data.member_list, data.ixp_list);
        } else {
            console.error('Required data not found in the response');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

function createTable(members, ixpList) {
    let container = document.getElementById('table-container');
    if (!container) {
        console.error('Table container element not found');
        return;
    }

    let table = document.createElement('table');
    table.setAttribute('id', 'members-table');
    table.className = 'table table-hover'; // Class names from Hugo Universal Theme
    createTableHead(table);
    createTableBody(table, members, ixpList);
    container.appendChild(table);
}

function createTableHead(table) {
    let thead = table.createTHead();
    let headerRow = thead.insertRow();
    let headers = ['AS Number', 'Member Since', 'Name', 'Peering Policy', 'Colocation', 'IXP', 'Speed'];
    headers.forEach((text, index) => {
        let th = document.createElement('th');
        th.textContent = text;
        th.setAttribute('data-sort-direction', 'asc'); // Default sort direction

        // Add arrow container
        let arrowContainer = document.createElement('div');
        arrowContainer.className = 'arrows';

        let ascArrow = document.createElement('span');
        ascArrow.className = 'asc';
        ascArrow.textContent = '▲'; // Ascending arrow

        let descArrow = document.createElement('span');
        descArrow.className = 'desc';
        descArrow.textContent = '▼'; // Descending arrow

        arrowContainer.appendChild(ascArrow);
        arrowContainer.appendChild(descArrow);
        th.appendChild(arrowContainer);

        // Add click event for sorting
        th.addEventListener('click', () => {
            sortTable(table, index, th);
        });

        headerRow.appendChild(th);
    });
}

function createTableBody(table, members, ixpList) {
    let tbody = table.createTBody();
    members.forEach(member => {
        if (member.connection_list && member.connection_list.length > 0) {
            member.connection_list.forEach(connection => {
                if (connection.if_list && connection.if_list.length > 0) {
                    connection.if_list.forEach(iface => {
                        let row = createTableRow(tbody, member, connection, iface, ixpList);
                        tbody.appendChild(row);
                    });
                } else {
                    let row = createTableRow(tbody, member, connection, null, ixpList);
                    tbody.appendChild(row);
                }
            });
        } else {
            let row = createTableRow(tbody, member, null, null, ixpList);
            tbody.appendChild(row);
        }
    });
}

function createTableRow(tbody, member, connection, iface, ixpList) {
    let row = tbody.insertRow();

    // Make AS Number a link
    let asCell = row.insertCell();
    let link = document.createElement('a');
    link.href = `https://www.peeringdb.com/asn/${member.asnum}`;
    link.textContent = member.asnum;
    link.target = "_blank";
    asCell.appendChild(link);

    // Format the member_since date
    let memberSince = new Date(member.member_since).toISOString().split('T')[0];
    row.insertCell().textContent = memberSince;

    row.insertCell().textContent = member.name;
    row.insertCell().textContent = member.peering_policy;

    let colo = connection ? getColoForConnection(connection, ixpList) : 'No colocation data';
    row.insertCell().textContent = colo;

    let ixpShortname = connection ? getIXPShortname(connection.ixp_id, ixpList) : 'Unknown IXP';
    row.insertCell().textContent = ixpShortname;

    // Display the connection speed in Gbps
    let speedGbps = iface ? (iface.if_speed / 1000).toFixed(0) : '0';
    row.insertCell().textContent = `${speedGbps}G`;

    return row;
}

function getColoForConnection(connection, ixpList) {
    let ixp = ixpList.find(ix => ix.ixp_id === connection.ixp_id);
    if (ixp && ixp.switch && ixp.switch.length) {
        let colos = (connection.if_list || []).map(iface => {
            let switchInfo = ixp.switch.find(sw => sw.id === iface.switch_id);
            return switchInfo ? switchInfo.colo : 'No colocation data';
        });
        // Remove duplicates and join the unique colocation sites
        return [...new Set(colos)].join(', ');
    }
    return 'No colocation data';
}

function getIXPShortname(ixpId, ixpList) {
    let ixp = ixpList.find(ix => ix.ixp_id === ixpId);
    return ixp ? ixp.shortname : 'Unknown IXP';
}

function sortTable(table, columnIndex, header) {
    let sortDirection = header.getAttribute('data-sort-direction');
    let multiplier = sortDirection === 'asc' ? 1 : -1;
    let rows = Array.from(table.getElementsByTagName('tr')).slice(1);

    // Sort logic
    if (columnIndex === 6) { // Speed column
        rows.sort((a, b) => {
            let speedA = parseFloat(a.cells[columnIndex].textContent.replace('G', ''));
            let speedB = parseFloat(b.cells[columnIndex].textContent.replace('G', ''));
            return (speedA - speedB) * multiplier;
        });
    } else {
        rows.sort((a, b) => {
            let textA = a.cells[columnIndex].textContent.trim();
            let textB = b.cells[columnIndex].textContent.trim();
            return textA.localeCompare(textB) * multiplier;
        });
    }

    // Toggle the sort direction
    header.setAttribute('data-sort-direction', sortDirection === 'asc' ? 'desc' : 'asc');

    // Highlight the active arrow
    table.querySelectorAll('th').forEach(th => {
        th.classList.remove('active', 'active-desc');
    });

    if (sortDirection === 'asc') {
        header.classList.add('active');
    } else {
        header.classList.add('active-desc');
    }

    // Rebuild the table body with sorted rows
    while (table.rows.length > 1) {
        table.deleteRow(1);
    }
    rows.forEach(row => table.appendChild(row));
}

function addSearchFunctionality() {
    let input = document.createElement('input');
    input.setAttribute('id', 'search-input');
    input.className = 'form-control';
    input.setAttribute('type', 'text');
    input.setAttribute('placeholder', 'Search...');
    input.addEventListener('keyup', filterTable);
    document.getElementById('table-container').prepend(input);
}

function filterTable() {
    let input = document.getElementById('search-input');
    let filter = input.value.toUpperCase();
    let table = document.getElementById('members-table');
    let tr = table.getElementsByTagName('tr');

    for (let i = 1; i < tr.length; i++) {
        let row = tr[i];
        let text = Array.from(row.getElementsByTagName('td')).map(td => td.textContent).join(' ');
        row.style.display = text.toUpperCase().includes(filter) ? '' : 'none';
    }
}

function calculateTotalSpeed(members) {
    let totalSpeedMbps = members.reduce((total, member) => {
        return total + member.connection_list.reduce((connectionTotal, connection) => {
            return connectionTotal + (connection.if_list ? connection.if_list.reduce((interfaceTotal, iface) => {
                return interfaceTotal + iface.if_speed;
            }, 0) : 0);
        }, 0);
    }, 0);
    let totalSpeedTbps = (totalSpeedMbps / 1000000).toFixed(0); // Convert Mbps to Tbps
    return totalSpeedTbps;
}
