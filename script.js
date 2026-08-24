const modal = document.getElementById('product-modal');
const modalTitle = document.getElementById('product-modal-title');
const modalDescription = document.getElementById('product-modal-description');
const modalPrice = document.getElementById('product-modal-price');
const modalImage = document.getElementById('modal-product-image');
const colorOptions = document.getElementById('variant-color-options');
const sizeSelect = document.getElementById('size-select');
const addToCartButton = document.getElementById('add-to-cart-button');
const cartKey = 'demo-cart';
let selectedProduct = null;
let selectedColor = null;
let selectedSize = null;
function getCart() { try { return JSON.parse(localStorage.getItem(cartKey) || '[]'); } catch (error) { return []; } }
function setCart(cart) { localStorage.setItem(cartKey, JSON.stringify(cart)); }
function updateCartBadge() { const cart = getCart(); const chooseGift = document.querySelector('.choose-gift'); if (chooseGift) chooseGift.innerHTML = cart.length > 0 ? `CHOOSE GIFT <span>${cart.length}</span>` : 'CHOOSE GIFT <span>→</span>'; }
function openModal(product) { selectedProduct = product; const variants = JSON.parse(product.dataset.variants || '[]'); const sizes = JSON.parse(product.dataset.sizes || '[]'); selectedColor = variants[0]?.label || null; selectedSize = sizes[1] || sizes[0] || 'Choose your size'; modalTitle.textContent = product.dataset.name; modalPrice.textContent = product.dataset.price; modalDescription.textContent = product.dataset.description; modalImage.src = product.dataset.image; modalImage.alt = product.dataset.name; renderOptions(variants, sizes); modal.classList.add('is-open'); modal.setAttribute('aria-hidden', 'false'); }
function closeModal() { modal.classList.remove('is-open'); modal.setAttribute('aria-hidden', 'true'); }
function renderOptions(variants, sizes) { const uniqueColors = [...new Set(variants.map((variant) => variant.label))]; colorOptions.innerHTML = uniqueColors.map((option) => `<button type="button" class="color-option ${selectedColor === option ? 'is-selected' : ''}" data-color="${option}">${option}</button>`).join(''); sizeSelect.innerHTML = sizes.map((size) => `<option value="${size}" ${selectedSize === size ? 'selected' : ''}>${size}</option>`).join(''); colorOptions.querySelectorAll('[data-color]').forEach((button) => button.addEventListener('click', () => { selectedColor = button.dataset.color; renderOptions(variants, sizes); })); sizeSelect.value = selectedSize; sizeSelect.onchange = (event) => { selectedSize = event.target.value; }; }
function addProductToCart() { if (!selectedProduct) return; const cart = getCart(); const variantLabel = `${selectedColor || 'Default'} / ${selectedSize || 'Default'}`; cart.push({ name:selectedProduct.dataset.name, price:selectedProduct.dataset.price, color:selectedColor, size:selectedSize, image:selectedProduct.dataset.image, variant:variantLabel }); if (selectedColor === 'Black' && (selectedSize === 'Medium' || selectedSize === 'M')) cart.push({ name:'Soft Winter Jacket', price:'$189.00', color:'Black', size:'Medium', image:'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80', variant:'Black / Medium', autoAdded:true }); setCart(cart); updateCartBadge(); closeModal(); }
document.querySelectorAll('.product-card').forEach((card) => card.addEventListener('click', () => openModal(card)));
document.querySelectorAll('[data-close-modal]').forEach((trigger) => trigger.addEventListener('click', closeModal));
document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && modal.classList.contains('is-open')) closeModal(); });
addToCartButton.addEventListener('click', addProductToCart);
updateCartBadge();
