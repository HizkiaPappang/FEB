document.addEventListener("alpine:init", () => {
  Alpine.data("products", () => ({
    items: [
      { id: 1, name: "steak", img: "steak.jpg", price: 30000 },
      { id: 2, name: "hamburger", img: "hamburger.jpg", price: 15000 },
      { id: 3, name: "salad", img: "salad.jpg", price: 15000 },
      { id: 4, name: "tacos", img: "tacos.jpg", price: 15000 },
      { id: 5, name: "soup", img: "soup.jpg", price: 20000 },
    ],
  }));

  Alpine.store("cart", {
    items: [],
    total: 0,
    quantity: 0,
    add(newItem) {
      //cek barang yang sama
      const cartItem = this.items.find((item) => item.id === newItem.id);

      //jika belum ada di cart

      if (!cartItem) {
        this.items.push({ ...newItem, quantity: 1, total: newItem.price });
        this.quantity++;
        this.total += newItem.price;
      } else {
        //kalau barang sudah ada di cart cek apakah barang beda atau sama
        this.items = this.items.map((item) => {
          //jika barang berbeda
          if (item.id !== newItem.id) {
            return item;
          } else {
            //jika barang sudah ada tambah quantity dan sub total
            item.quantity++;
            item.total = item.price * item.quantity;
            this.quantity++;
            this.total += item.price;
            return item;
          }
        });
      }
    },
    remove(id) {
      //ambil item yang mau di remove
      const cartItem = this.items.find((item) => item.id === id);

      //jika item lebih dari 1

      if (cartItem.quantity > 1) {
        this.items = this.items.map((item) => {
          // jika bukan barang yang diklik
          if (item.id !== id) {
            return item;
          } else {
            item.quantity--;
            item.total = item.price * item.quantity;
            this.quantity--;
            this.total -= item.price;
            return item;
          }
        });
      } else if (cartItem.quantity === 1) {
        this.items = this.items.filter((item) => item.id !== id);
        this.quantity--;
        this.total -= cartItem.price;
      }
    },
  });
});

// konversi ke rupiah
const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};
