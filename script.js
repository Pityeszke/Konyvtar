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
    { azonosito: 2, cim: "A Pál utcai fiúk", szerzo: "Molnár Ferenc", kiadasEve: 1907, kolcsonozve: false },
    { azonosito: 3, cim: "Tüskevár", szerzo: "Fekete István", kiadasEve: 1957, kolcsonozve: false },
    { azonosito: 4, cim: "A kőszívű ember fiai", szerzo: "Jókai Mór", kiadasEve: 1869, kolcsonozve: false },
    { azonosito: 5, cim: "Légy jó mindhalálig", szerzo: "Móricz Zsigmond", kiadasEve: 1920, kolcsonozve: false },
    { azonosito: 6, cim: "A kis herceg", szerzo: "Antoine de Saint-Exupéry", kiadasEve: 1943, kolcsonozve: false },
    { azonosito: 7, cim: "Harry Potter és a bölcsek köve", szerzo: "J.K. Rowling", kiadasEve: 1997, kolcsonozve: false },
    { azonosito: 8, cim: "A Gyűrűk Ura", szerzo: "J.R.R. Tolkien", kiadasEve: 1954, kolcsonozve: false },
    { azonosito: 9, cim: "Az arany ember", szerzo: "Jókai Mór", kiadasEve: 1872, kolcsonozve: false },
    { azonosito: 10, cim: "A három testőr", szerzo: "Alexandre Dumas", kiadasEve: 1844, kolcsonozve: false },
    { azonosito: 11, cim: "Pride and Prejudice", szerzo: "Jane Austen", kiadasEve: 1813, kolcsonozve: false },
    { azonosito: 12, cim: "Moby Dick", szerzo: "Herman Melville", kiadasEve: 1851, kolcsonozve: false },
    { azonosito: 13, cim: "A dzsungel könyve", szerzo: "Rudyard Kipling", kiadasEve: 1894, kolcsonozve: false },
    { azonosito: 14, cim: "Robinson Crusoe", szerzo: "Daniel Defoe", kiadasEve: 1719, kolcsonozve: false },
    { azonosito: 15, cim: "A nagy Gatsby", szerzo: "F. Scott Fitzgerald", kiadasEve: 1925, kolcsonozve: false },
    { azonosito: 16, cim: "Ábel a rengetegben", szerzo: "Tamási Áron", kiadasEve: 1932, kolcsonozve: false },
    { azonosito: 17, cim: "Micimackó", szerzo: "A. A. Milne", kiadasEve: 1926, kolcsonozve: false },
    { azonosito: 18, cim: "A varázshegy", szerzo: "Thomas Mann", kiadasEve: 1924, kolcsonozve: false },
    { azonosito: 19, cim: "Fahrenheit 451", szerzo: "Ray Bradbury", kiadasEve: 1953, kolcsonozve: false },
    { azonosito: 20, cim: "A 22-es csapdája", szerzo: "Joseph Heller", kiadasEve: 1961, kolcsonozve: false },
    { azonosito: 21, cim: "A nyomorultak", szerzo: "Victor Hugo", kiadasEve: 1862, kolcsonozve: false },
    { azonosito: 22, cim: "Száz év magány", szerzo: "Gabriel García Márquez", kiadasEve: 1967, kolcsonozve: false },
];
window.borrowBook = borrowBook;
window.returnBook = returnBook;
window.deleteBook = deleteBook;

render();