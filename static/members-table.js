document.addEventListener('DOMContentLoaded', function() {
    fetchDataAndCreateTable();
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
    createTableHead(table);
    createTableBody(table, members, ixpList);
    container.appendChild(table);
}

function createTableHead(table) {
    let thead = table.createTHead();
    let headerRow = thead.insertRow();
    let headers = ['AS Number', 'Member Since', 'Name', 'Peering Policy', 'Contact Email', 'Colocation'];
    headers.forEach(text => {
        let th = document.createElement('th');
        th.textContent = text;
        headerRow.appendChild(th);
    });
}

function createTableBody(table, members, ixpList) {
    let tbody = table.createTBody();
    members.forEach(member => {
        let row = tbody.insertRow();

        row.insertCell().textContent = member.asnum;
        row.insertCell().textContent = member.member_since;
        row.insertCell().textContent = member.name;
        row.insertCell().textContent = member.peering_policy;

        let contactEmail = member.contact_email ? member.contact_email.join(', ') : 'No email provided';
        row.insertCell().textContent = contactEmail;

        // Find and display colocation based on ixp_id
        let colo = getColoForIXP(member.connection_list, ixpList);
        row.insertCell().textContent = colo;
    });
}

function getColoForIXP(connectionList, ixpList) {
    if (!connectionList || !connectionList.length) return 'No colocation data';

    // Assuming the first connection's ixp_id is what we need. Adjust as necessary.
    let ixpId = connectionList[0].ixp_id;
    let ixp = ixpList.find(ix => ix.ixp_id === ixpId);

    return ixp && ixp.switch && ixp.switch.length ? ixp.switch[0].colo : 'No colocation data';
}
