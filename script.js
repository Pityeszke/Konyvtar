// Könyv adatstruktúra: { azonosito, cim, szerzo, kiadasEve, kolcsonozve }
let books = [];

// Könyv hozzáadása
function addBook(cim, szerzo, kiadasEve) {
    const azonosito = books.length ? Math.max(...books.map(b => b.azonosito)) + 1 : 1;
    const uj = { azonosito, cim, szerzo, kiadasEve, kolcsonozve: false };
    books = [...books, uj];
    render();
}

// Könyv kölcsönzése
function borrowBook(id) {
    books = books.map(b => b.azonosito === id ? { ...b, kolcsonozve: true } : b);
    render();
}

// Könyv visszavétele
function returnBook(id) {
    books = books.map(b => b.azonosito === id ? { ...b, kolcsonozve: false } : b);
    render();
}

// Könyv törlése
function deleteBook(id) {
    books = books.filter(b => b.azonosito !== id);
    render();
}

// Elérhető könyvek listázása
function availableBooks() {
    return books.filter(b => !b.kolcsonozve);
}

// Kölcsönzött könyvek listázása
function borrowedBooks() {
    return books.filter(b => b.kolcsonozve);
}

// Szerző szerinti szűrés
function filterByAuthor(szerzo) {
    return books.filter(b => b.szerzo.toLowerCase().includes(szerzo.toLowerCase()));
}

// Könyvek száma
function bookCount() {
    return books.length;
}

// Kölcsönzött könyvek száma (reduce)
function borrowedCount() {
    return books.reduce((acc, b) => acc + (b.kolcsonozve ? 1 : 0), 0);
}

// HTML felület
function render() {
    const app = document.getElementById('app');
    app.innerHTML = `
        <h1>Könyvtár</h1>
        <form id="addForm">
            <input required placeholder="Cím" id="cim">
            <input required placeholder="Szerző" id="szerzo">
            <input required type="number" placeholder="Kiadás éve" id="ev" min="1000" max="2100">
            <button>Hozzáad</button>
        </form>
        <div>
            <input id="authorFilter" placeholder="Szerző szerinti szűrés">
        </div>
        <div>
            <b>Összes könyv:</b> ${bookCount()} | 
            <b>Kölcsönzött:</b> ${borrowedCount()} | 
            <b>Elérhető:</b> ${availableBooks().length}
        </div>
        <table>
            <thead>
                <tr>
                    <th>Cím</th><th>Szerző</th><th>Kiadás éve</th><th>Státusz</th><th>Művelet</th>
                </tr>
            </thead>
            <tbody>
                ${books.map(b => `
                    <tr>
                        <td>${b.cim}</td>
                        <td>${b.szerzo}</td>
                        <td>${b.kiadasEve}</td>
                        <td>${b.kolcsonozve ? 'Kölcsönzött' : 'Elérhető'}</td>
                        <td>
                            ${!b.kolcsonozve ? `<button onclick="borrowBook(${b.azonosito})">Kölcsönzés</button>` : `<button onclick="returnBook(${b.azonosito})">Visszavét</button>`}
                            <button onclick="deleteBook(${b.azonosito})">Törlés</button>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;

    document.getElementById('addForm').onsubmit = e => {
        e.preventDefault();
        addBook(
            document.getElementById('cim').value,
            document.getElementById('szerzo').value,
            parseInt(document.getElementById('ev').value)
        );
        e.target.reset();
    };

    document.getElementById('authorFilter').oninput = function() {
        const szerzo = this.value;
        books = szerzo ? filterByAuthor(szerzo) : window._allBooks || books;
        if (!window._allBooks) window._allBooks = [...books];
        render();
        document.getElementById('authorFilter').value = szerzo;
    };
}

// Induló mintaadatok
books = [
    { azonosito: 1, cim: "Egri csillagok", szerzo: "Gárdonyi Géza", kiadasEve: 1901, kolcsonozve: false },
    { azonosito: 2, cim: "Egri csillagok", szerzo: "Gárdonyi Géza", kiadasEve: 1901, kolcsonozve: false },
    { azonosito: 3, cim: "Egri csillagok", szerzo: "Gárdonyi Géza", kiadasEve: 1901, kolcsonozve: false },
    { azonosito: 4, cim: "Egri csillagok", szerzo: "Gárdonyi Géza", kiadasEve: 1901, kolcsonozve: false },
    { azonosito: 5, cim: "Egri csillagok", szerzo: "Gárdonyi Géza", kiadasEve: 1901, kolcsonozve: false },
    { azonosito: 6, cim: "Egri csillagok", szerzo: "Gárdonyi Géza", kiadasEve: 1901, kolcsonozve: false },
    { azonosito: 7, cim: "Egri csillagok", szerzo: "Gárdonyi Géza", kiadasEve: 1901, kolcsonozve: false },
    { azonosito: 8, cim: "Egri csillagok", szerzo: "Gárdonyi Géza", kiadasEve: 1901, kolcsonozve: false },
    { azonosito: 9, cim: "Egri csillagok", szerzo: "Gárdonyi Géza", kiadasEve: 1901, kolcsonozve: false },
    { azonosito: 10, cim: "Egri csillagok", szerzo: "Gárdonyi Géza", kiadasEve: 1901, kolcsonozve: false },
    { azonosito: 11, cim: "Egri csillagok", szerzo: "Gárdonyi Géza", kiadasEve: 1901, kolcsonozve: false },
    { azonosito: 12, cim: "Egri csillagok", szerzo: "Gárdonyi Géza", kiadasEve: 1901, kolcsonozve: false },
    { azonosito: 13, cim: "Egri csillagok", szerzo: "Gárdonyi Géza", kiadasEve: 1901, kolcsonozve: false },
    { azonosito: 14, cim: "Egri csillagok", szerzo: "Gárdonyi Géza", kiadasEve: 1901, kolcsonozve: false },
    { azonosito: 15, cim: "Egri csillagok", szerzo: "Gárdonyi Géza", kiadasEve: 1901, kolcsonozve: false },
    { azonosito: 16, cim: "Egri csillagok", szerzo: "Gárdonyi Géza", kiadasEve: 1901, kolcsonozve: false },
    { azonosito: 17, cim: "Egri csillagok", szerzo: "Gárdonyi Géza", kiadasEve: 1901, kolcsonozve: false },
    { azonosito: 18, cim: "Egri csillagok", szerzo: "Gárdonyi Géza", kiadasEve: 1901, kolcsonozve: false },
    { azonosito: 19, cim: "Egri csillagok", szerzo: "Gárdonyi Géza", kiadasEve: 1901, kolcsonozve: false },
    { azonosito: 20, cim: "Egri csillagok", szerzo: "Gárdonyi Géza", kiadasEve: 1901, kolcsonozve: false },
    { azonosito: 21, cim: "Egri csillagok", szerzo: "Gárdonyi Géza", kiadasEve: 1901, kolcsonozve: false },
    { azonosito: 22, cim: "Egri csillagok", szerzo: "Gárdonyi Géza", kiadasEve: 1901, kolcsonozve: false },
    { azonosito: 23, cim: "Pál utcai fiúk", szerzo: "Molnár Ferenc", kiadasEve: 1907, kolcsonozve: true }
];

window.borrowBook = borrowBook;
window.returnBook = returnBook;
window.deleteBook = deleteBook;

render();