function showModal() {
  document.getElementById("passwordModal").classList.remove("hidden");
}
const cardContainer = document.getElementById("cardContainer");
const addCardBtn = document.getElementById("addCardBtn");
const cardTitleInput = document.getElementById("cardTitle");

addCardBtn.addEventListener("click", () => {
  const title = cardTitleInput.value.trim();
  if (!title) return alert("Please enter card name!");

  // Create card elements
  const card = document.createElement("div");
  card.className = "card-box";

  const h2 = document.createElement("h2");
  h2.textContent = title;

  const uploader = document.createElement("div");
  uploader.className = "memory-uploader";

  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = "image/*";

  const nameInput = document.createElement("input");
  nameInput.type = "text";
  nameInput.placeholder = "Enter memory name";

  const uploadBtn = document.createElement("button");
  uploadBtn.textContent = "Add Memory";

  const gallery = document.createElement("div");
  gallery.className = "card-gallery";

  uploadBtn.onclick = () => {
    const file = fileInput.files[0];
    const name = nameInput.value.trim() || "Untitled";

    if (!file || !file.type.startsWith("image/")) {
      alert("Upload valid image");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const wrapper = document.createElement("div");
      wrapper.className = "memory-wrapper";

      const img = document.createElement("img");
      img.src = e.target.result;
      img.alt = name;

      const caption = document.createElement("div");
      caption.className = "memory-caption";
      caption.textContent = name;

      const del = document.createElement("button");
      del.className = "delete-btn";
      del.innerHTML = "✖";
      del.onclick = () => wrapper.remove();

      wrapper.appendChild(img);
      wrapper.appendChild(del);
      wrapper.appendChild(caption);
      gallery.appendChild(wrapper);

      nameInput.value = "";
      fileInput.value = "";
    };
    reader.readAsDataURL(file);
  };

  uploader.appendChild(fileInput);
  uploader.appendChild(nameInput);
  uploader.appendChild(uploadBtn);

  card.appendChild(h2);
  card.appendChild(uploader);
  card.appendChild(gallery);
  cardContainer.appendChild(card);

  cardTitleInput.value = "";
});

function checkPassword() {
  const pass = document.getElementById("passwordInput").value;
  if (pass === "sabari123") {
    document.getElementById("passwordModal").classList.add("hidden");
    document.getElementById("secretGallery").style.display = "block";
  } else {
    alert("❌ Wrong password!");
  }
  document.addEventListener("mousemove", function (e) {
  const sparkle = document.createElement("div");
  sparkle.classList.add("sparkle");
  sparkle.style.left = `${e.pageX}px`;
  sparkle.style.top = `${e.pageY}px`;
  document.body.appendChild(sparkle);

  setTimeout(() => {
    sparkle.remove();
  }, 600); // disappears after 0.6 seconds
});
const imageUpload = document.getElementById("imageUpload");
const gallery = document.querySelector(".secret-gallery");

imageUpload.addEventListener("change", function () {
  const file = this.files[0];
  if (file && file.type.startsWith("image/")) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const img = document.createElement("img");
      img.src = e.target.result;
      img.alt = "New Memory";
      img.classList.add("star-image");
      gallery.appendChild(img);
    };
    reader.readAsDataURL(file);
  } else {
    alert("Please upload a valid image file.");
  }
});

}
const imageUpload = document.getElementById("imageUpload");
const memoryName = document.getElementById("memoryName");
const gallery = document.querySelector(".secret-gallery");

// Load stored memories
window.onload = function () {
  const stored = JSON.parse(localStorage.getItem("memories") || "[]");
  stored.forEach(addMemoryToGallery);
};

imageUpload.addEventListener("change", function () {
  const file = this.files[0];
  if (!file || !file.type.startsWith("image/")) return;

  const name = memoryName.value.trim() || "Untitled Memory";
  const reader = new FileReader();

  reader.onload = function (e) {
    const memory = {
      src: e.target.result,
      name: name,
      id: Date.now()
    };

    // Save to localStorage
    const existing = JSON.parse(localStorage.getItem("memories") || "[]");
    existing.push(memory);
    localStorage.setItem("memories", JSON.stringify(existing));

    addMemoryToGallery(memory);
    memoryName.value = "";
  };

  reader.readAsDataURL(file);
});

// Add image to gallery
function addMemoryToGallery(memory) {
  const wrapper = document.createElement("div");
  wrapper.className = "memory-wrapper";
  wrapper.setAttribute("data-id", memory.id);

  const img = document.createElement("img");
  img.src = memory.src;
  img.alt = memory.name;

  const caption = document.createElement("div");
  caption.className = "memory-caption";
  caption.textContent = memory.name;

  const del = document.createElement("button");
  del.className = "delete-btn";
  del.innerHTML = "✖";
  del.onclick = function () {
    // Remove from DOM
    wrapper.remove();
    // Remove from storage
    let current = JSON.parse(localStorage.getItem("memories") || "[]");
    current = current.filter(m => m.id !== memory.id);
    localStorage.setItem("memories", JSON.stringify(current));
  };

  wrapper.appendChild(img);
  wrapper.appendChild(del);
  wrapper.appendChild(caption);
  gallery.appendChild(wrapper);
  del.onclick = function () {
  // 1. Remove from DOM
  wrapper.remove();

  // 2. Remove from localStorage
  let current = JSON.parse(localStorage.getItem("memories") || "[]");
  current = current.filter(m => m.id !== memory.id);
  localStorage.setItem("memories", JSON.stringify(current));
};

}
