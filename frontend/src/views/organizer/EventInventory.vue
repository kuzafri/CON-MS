<script setup>
import { ProductService } from '@/service/ProductService'; //all the product template stored here
import { FilterMatchMode } from '@primevue/core/api';
import { useToast } from 'primevue/usetoast';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

// Initialize route and router first
const route = useRoute();
const router = useRouter();
const toast = useToast();

// Then use route.params
const eventId = route.params.id;

// Rest of your variables
const dt = ref();
const products = ref([]);
const productDialog = ref(false);
const deleteProductDialog = ref(false);
const deleteProductsDialog = ref(false);
const product = ref({});
const selectedProducts = ref();
const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS }
});
const submitted = ref(false);

onMounted(async () => {
    await fetchInventory();
});

const fetchInventory = async () => {
    try {
        const response = await axios.get(`http://localhost:5001/api/events/${eventId}/inventory`);
        products.value = response.data;
    } catch (error) {
        console.error('Error fetching inventory:', error);
        toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to load inventory', life: 3000 });
    }
};

// const statuses = ref([
//     { label: 'INSTOCK', value: 'instock' },
//     { label: 'LOWSTOCK', value: 'lowstock' },
//     { label: 'OUTOFSTOCK', value: 'outofstock' }
// ]);

// function formatCurrency(value) {
//     if (value) return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
//     return;
// }

function changeQuantity(product, change) {
    // Ensure quantity doesn't go below 0
    product.quantity = Math.max(0, (product.quantity || 0) + change);

    // Optional: Add a toast notification for quantity change
    if (change > 0) {
        toast.add({ severity: 'info', summary: 'Quantity Increased', detail: `${product.name} quantity updated`, life: 2000 });
    } else if (change < 0) {
        toast.add({ severity: 'info', summary: 'Quantity Decreased', detail: `${product.name} quantity updated`, life: 2000 });
    }
}

function openNew() {
    product.value = {};
    submitted.value = false;
    productDialog.value = true;
}

function hideDialog() {
    productDialog.value = false;
    submitted.value = false;
}

async function saveProduct() {
    submitted.value = true;

    if (product.value.name?.trim()) {
        try {
            if (product.value._id) {
                // Update existing item
                const response = await axios.put(`http://localhost:5001/api/events/${eventId}/inventory/${product.value._id}`, product.value);
                products.value[findIndexById(product.value._id)] = response.data;
                toast.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
            } else {
                // Create new item
                const response = await axios.post(`http://localhost:5001/api/events/${eventId}/inventory`, product.value);
                products.value.push(response.data);
                toast.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
            }

            productDialog.value = false;
            product.value = {};
            await fetchInventory();
        } catch (error) {
            toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to save product', life: 3000 });
        }
    }
}

function editProduct(prod) {
    product.value = { ...prod };
    productDialog.value = true;
}

function confirmDeleteProduct(prod) {
    product.value = prod;
    deleteProductDialog.value = true;
}

async function deleteProduct() {
    try {
        await axios.delete(`http://localhost:5001/api/events/${eventId}/inventory/${product.value._id}`);
        await fetchInventory();
        deleteProductDialog.value = false;
        product.value = {};
        toast.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
    } catch (error) {
        toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete product', life: 3000 });
    }
}

function findIndexById(id) {
    let index = -1;
    for (let i = 0; i < products.value.length; i++) {
        if (products.value[i]._id === id) {
            index = i;
            break;
        }
    }
    return index;
}

function createId() {
    let id = '';
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
}

function exportCSV() {
    dt.value.exportCSV();
}

function confirmDeleteSelected() {
    deleteProductsDialog.value = true;
}

async function deleteSelectedProducts() {
    try {
        const itemIds = selectedProducts.value.map((p) => p._id);
        await axios.post(`http://localhost:5001/api/events/${eventId}/inventory/delete-multiple`, {
            itemIds: itemIds
        });
        await fetchInventory();
        deleteProductsDialog.value = false;
        selectedProducts.value = null;
        toast.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
    } catch (error) {
        toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete products', life: 3000 });
    }
}

// Add props definition
const props = defineProps({
    id: String
});

const EventRequest = ref({
    id: props.id || eventId
    // title: 'REBEL 3.0: Because of You',
    // date: '13th January 2025',
    // time: '3:00 PM - 4:00 PM',
    // audience: '1500 pax',
    // type: 'Paid Entry',
    // status: 'Pending'
});

const handleBack = () => {
    // Encode the ID to properly handle special characters like '/'
    const encodedId = encodeURIComponent(EventRequest.value.id);
    router.push(`/organizer/viewevent/event-details/${encodedId}`);
};

// function getStatusLabel(status) {
//     switch (status) {
//         case 'INSTOCK':
//             return 'success';

//         case 'LOWSTOCK':
//             return 'warn';

//         case 'OUTOFSTOCK':
//             return 'danger';

//         default:
//             return null;
//     }
// }
</script>
<template>
    <div class="p-4">
        <button @click="handleBack" class="flex items-center text-blue-600 hover:text-blue-700 pb-4"><span class="mr-2">←</span> Back to Event Details</button>
        <div class="card">
            <Toolbar class="mb-6">
                <template #start>
                    <Button label="New" icon="pi pi-plus" severity="secondary" class="mr-2" @click="openNew" />
                    <Button label="Delete" icon="pi pi-trash" severity="secondary" @click="confirmDeleteSelected" :disabled="!selectedProducts || !selectedProducts.length" />
                </template>

                <template #end>
                    <Button label="Export" icon="pi pi-upload" severity="secondary" @click="exportCSV($event)" />
                </template>
            </Toolbar>

            <DataTable
                ref="dt"
                v-model:selection="selectedProducts"
                :value="products"
                dataKey="id"
                :paginator="true"
                :rows="10"
                :filters="filters"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                :rowsPerPageOptions="[5, 10, 25]"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
            >
                <template #header>
                    <div class="flex flex-wrap gap-2 items-center justify-between">
                        <h4 class="m-0">Manage Products</h4>
                        <IconField>
                            <InputIcon>
                                <i class="pi pi-search" />
                            </InputIcon>
                            <InputText v-model="filters['global'].value" placeholder="Search..." />
                        </IconField>
                    </div>
                </template>

                <Column selectionMode="multiple" style="width: 3rem" :exportable="false"></Column>
                <!-- <Column field="code" header="Code" sortable style="min-width: 12rem"></Column> -->
                <Column field="name" header="Name" sortable style="min-width: 16rem"></Column>
                <!-- <Column header="Image">
                    <template #body="slotProps">
                        <img :src="`https://primefaces.org/cdn/primevue/images/product/${slotProps.data.image}`" :alt="slotProps.data.image" class="rounded" style="width: 64px" />
                    </template>
                </Column> -->
                <!-- <Column field="price" header="Price" sortable style="min-width: 8rem">
                    <template #body="slotProps">
                        {{ formatCurrency(slotProps.data.price) }}
                    </template>
                </Column> -->
                <Column field="category" header="Category" sortable style="min-width: 10rem"></Column>
                <!-- <Column field="rating" header="Reviews" sortable style="min-width: 12rem">
                    <template #body="slotProps">
                        <Rating :modelValue="slotProps.data.rating" :readonly="true" />
                    </template>
                </Column> -->
                <!-- <Column field="inventoryStatus" header="Status" sortable style="min-width: 12rem">
                    <template #body="slotProps">
                        <Tag :value="slotProps.data.inventoryStatus" :severity="getStatusLabel(slotProps.data.inventoryStatus)" />
                    </template>
                </Column> -->

                <Column header="Quantity" style="min-width: 12rem">
                    <template #body="slotProps">
                        <div class="flex items-center gap-2">
                            <Button icon="pi pi-minus" class="p-button-rounded p-button-text p-button-sm" @click="changeQuantity(slotProps.data, -1)" />
                            <span class="font-bold">{{ slotProps.data.quantity || 0 }}</span>
                            <Button icon="pi pi-plus" class="p-button-rounded p-button-text p-button-sm" @click="changeQuantity(slotProps.data, 1)" />
                        </div>
                    </template>
                </Column>

                <Column :exportable="false" style="min-width: 12rem">
                    <template #body="slotProps">
                        <Button icon="pi pi-pencil" outlined rounded class="mr-2" @click="editProduct(slotProps.data)" />
                        <Button icon="pi pi-trash" outlined rounded severity="danger" @click="confirmDeleteProduct(slotProps.data)" />
                    </template>
                </Column>
            </DataTable>
        </div>

        <Dialog v-model:visible="productDialog" :style="{ width: '450px' }" header="Product Details" :modal="true">
            <div class="flex flex-col gap-6">
                <!-- <img v-if="product.image" :src="`https://primefaces.org/cdn/primevue/images/product/${product.image}`" :alt="product.image" class="block m-auto pb-4" /> -->
                <div>
                    <label for="name" class="block font-bold mb-3">Name</label>
                    <InputText id="name" v-model.trim="product.name" required="true" autofocus :invalid="submitted && !product.name" fluid />
                    <small v-if="submitted && !product.name" class="text-red-500">Name is required.</small>
                </div>
                <!-- <div>
                    <label for="description" class="block font-bold mb-3">Description</label>
                    <Textarea id="description" v-model="product.description" required="true" rows="3" cols="20" fluid />
                </div> -->
                <!-- <div>
                    <label for="inventoryStatus" class="block font-bold mb-3">Inventory Status</label>
                    <Select id="inventoryStatus" v-model="product.inventoryStatus" :options="statuses" optionLabel="label" placeholder="Select a Status" fluid></Select>
                </div> -->

                <div>
                    <span class="block font-bold mb-4">Category</span>
                    <div class="grid grid-cols-12 gap-4">
                        <div class="flex items-center gap-2 col-span-6">
                            <RadioButton id="category1" v-model="product.category" name="category" value="Venue Equipments" />
                            <label for="category1">Venue Equipments</label>
                        </div>
                        <div class="flex items-center gap-2 col-span-6">
                            <RadioButton id="category2" v-model="product.category" name="category" value="Audio-Visual Equipments" />
                            <label for="category2">Audio-Visual Equipments</label>
                        </div>
                        <div class="flex items-center gap-2 col-span-6">
                            <RadioButton id="category3" v-model="product.category" name="category" value="Musical Instruments" />
                            <label for="category3">Musical Instruments</label>
                        </div>
                        <div class="flex items-center gap-2 col-span-6">
                            <RadioButton id="category4" v-model="product.category" name="category" value="Safety Equipements" />
                            <label for="category4">Safety Equipements</label>
                        </div>
                    </div>
                </div>

                <div class="grid grid-cols-12 gap-4">
                    <!-- <div class="col-span-6">
                        <label for="price" class="block font-bold mb-3">Price</label>
                        <InputNumber id="price" v-model="product.price" mode="currency" currency="USD" locale="en-US" fluid />
                    </div> -->
                    <div class="col-span-6">
                        <label for="quantity" class="block font-bold mb-3">Quantity</label>
                        <InputNumber id="quantity" v-model="product.quantity" integeronly fluid />
                    </div>
                </div>
            </div>

            <template #footer>
                <Button label="Cancel" icon="pi pi-times" text @click="hideDialog" />
                <Button label="Save" icon="pi pi-check" @click="saveProduct" />
            </template>
        </Dialog>

        <Dialog v-model:visible="deleteProductDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
            <div class="flex items-center gap-4">
                <i class="pi pi-exclamation-triangle !text-3xl" />
                <span v-if="product"
                    >Are you sure you want to delete <b>{{ product.name }}</b
                    >?</span
                >
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" text @click="deleteProductDialog = false" />
                <Button label="Yes" icon="pi pi-check" @click="deleteProduct" />
            </template>
        </Dialog>

        <Dialog v-model:visible="deleteProductsDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
            <div class="flex items-center gap-4">
                <i class="pi pi-exclamation-triangle !text-3xl" />
                <span v-if="product">Are you sure you want to delete the selected products?</span>
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" text @click="deleteProductsDialog = false" />
                <Button label="Yes" icon="pi pi-check" text @click="deleteSelectedProducts" />
            </template>
        </Dialog>
    </div>
</template>
