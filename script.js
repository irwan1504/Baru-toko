AOS.init();

let dataKeranjang = [];

const tombolBeli = document.querySelectorAll(".beli");
const listKeranjang = document.getElementById("list-keranjang");
const subtotalEl = document.getElementById("subtotal");
const diskonEl = document.getElementById("diskon");
const totalHargaEl = document.getElementById("total-harga");
const checkoutBtn = document.getElementById("checkout");

const btnKeranjang = document.getElementById("btn-keranjang");
const boxKeranjang = document.getElementById("keranjang");
const tutupKeranjang = document.getElementById("tutup-keranjang");

// Tambah produk
tombolBeli.forEach(btn => {
    btn.addEventListener("click", function() {
        const nama = this.dataset.produk;
        const harga = parseInt(this.dataset.harga);
        const itemAda = dataKeranjang.find(item => item.nama === nama);
        if(itemAda) itemAda.jumlah++;
        else dataKeranjang.push({nama, harga, jumlah:1});
        tampilkanKeranjang();
        boxKeranjang.classList.add("active");
    });
});

// Tampilkan keranjang
function tampilkanKeranjang() {
    listKeranjang.innerHTML = "";
    let subtotal = 0;

    dataKeranjang.forEach((item,index) => {
        subtotal += item.harga * item.jumlah;

        const li = document.createElement("li");
        li.innerHTML = `
            <div>
                <strong>${item.nama}</strong><br>
                Rp${item.harga} x ${item.jumlah}
            </div>
            <div class="kontrol-jumlah">
                <button class="kurang" data-index="${index}">−</button>
                <span>${item.jumlah}</span>
                <button class="tambah" data-index="${index}">+</button>
                <button class="kontrol-hapus" data-index="${index}">X</button>
            </div>
        `;
        listKeranjang.appendChild(li);
    });

    // Hitung diskon
    let diskon = 0;
    if(subtotal >= 200000) diskon = subtotal*0.15;
    else if(subtotal >=100000) diskon = subtotal*0.10;

    subtotalEl.textContent = subtotal;
    diskonEl.textContent = diskon;
    totalHargaEl.textContent = subtotal - diskon;

    // Event tombol tambah/kurang/hapus
    document.querySelectorAll(".tambah").forEach(btn => {
        btn.onclick = () => { 
            const idx = btn.dataset.index;
            dataKeranjang[idx].jumlah++;
            tampilkanKeranjang();
        };
    });

    document.querySelectorAll(".kurang").forEach(btn => {
        btn.onclick = () => { 
            const idx = btn.dataset.index;
            dataKeranjang[idx].jumlah--;
            if(dataKeranjang[idx].jumlah<=0) dataKeranjang.splice(idx,1);
            tampilkanKeranjang();
        };
    });

    document.querySelectorAll(".kontrol-hapus").forEach(btn => {
        btn.onclick = () => { 
            const idx = btn.dataset.index;
            dataKeranjang.splice(idx,1);
            tampilkanKeranjang();
        };
    });
}

// Checkout WA
checkoutBtn.onclick = () => {
    if(dataKeranjang.length===0){ alert("Keranjang kosong!"); return; }

    let pesan="Halo, saya ingin pesan:\n\n";
    let totalBayar = 0;

    dataKeranjang.forEach(item => {
        pesan+=`${item.nama} x${item.jumlah} - Rp${item.harga*item.jumlah}\n`;
        totalBayar += item.harga*item.jumlah;
    });

    let diskon = 0;
    if(totalBayar >= 200000) diskon = totalBayar*0.15;
    else if(totalBayar >=100000) diskon = totalBayar*0.10;
    totalBayar -= diskon;

    pesan += `\nTotal: Rp${totalBayar}`;
    const noWA="6282345577334";
    window.open(`https://wa.me/${noWA}?text=${encodeURIComponent(pesan)}`,"_blank");
}

// Slide keranjang
btnKeranjang.onclick = ()=> boxKeranjang.classList.add("active");
tutupKeranjang.onclick = ()=> boxKeranjang.classList.remove("active");