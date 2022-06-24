// Data of form input add product tab
export const productAddFormData = [
    {
        title: 'Image',
        section: 'image',
        data: '',
        type: 'file',
    },
    {
        title: 'Name',
        section: 'name',
        data: '',
        type: 'text',
    },
    {
        title: 'Price',
        section: 'price',
        data: '',
        type: 'number',
    },
    {
        title: 'Discount',
        section: 'discount',
        data: '',
        type: 'number',
    },
    {
        title: 'Description',
        section: 'description',
        data: '',
        type: 'text-area',
    },
];

// Table head of tab orders
export const ordersTableHead = [
    'Image',
    'Title',
    'Price',
    'Add To Cart',
    'Total',
    'Remove',
];

// Table head of tab orders
export const cartTableHead = [
    'Image',
    'Title',
    'Price',
    'Quantity',
    'Total',
    'Remove',
];

// Data of form input checkout
export const checkoutOrderListData = [
    {
        id: 'firstName',
        title: 'First Name', 
        type: 'text',
        data: ""
    },
    {
        id: 'lastName',
        title: 'Last Name', 
        type: 'text',
        data: ""
    },
    {
        id: 'companyName',
        title: 'Company Name', 
        type: 'text',
        data: ""
    },
    {
        id: 'email',
        title: 'Email', 
        type: 'email',
        data: ""
    },
    {
        id: 'phone',
        title: 'Phone', 
        type: 'number',
        data: ""
    },
    {
        id: 'country',
        title: 'Country', 
        type: 'checkbox',
        data: ""
    },
    {
        id: 'address',
        title: 'Address', 
        type: 'text',
        data: ""
    },
    {
        id: 'postCode',
        title: 'PostCode/ZIP', 
        type: 'number',
        data: ""
    },
    
]

export const productBillData = [
    {
        text: "Wonderful Chair",
        data: "$139.00"
    },
    {
        text: "Your Product Name",
        data: "$100.00"
    },
    {
        text: "Wonderful Chair",
        data: "$141.00"
    },
    {
        text: "Subtotal",
        data: "$380.00"
    },
    {
        text: "Shipping",
        data: "Free"
    },
    {
        text: "Total",
        data: "$139.00"
    },
]