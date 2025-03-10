const API_BASE_URL = "http://127.0.0.1:8000/api";

const fetchAPI = async (endpoint: string, options = {}) => {
  const res = await fetch(`${API_BASE_URL}/${endpoint}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!res.ok) throw new Error(`Error: ${res.statusText}`);
  return res.json();
};
export interface Author {
  id: string;
  name: string;
}

// Book Interface
export interface Book {
  id: string;
  name: string;
  price: string;
  author: string;
}
export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
}
// 🔹 Books API
export const getBooks = () => fetchAPI("books/");
export const getBook = (id: string) => fetchAPI(`books/${id}/`);
export const addBook = (book: any) =>
  fetchAPI("books/", { method: "POST", body: JSON.stringify(book) });
export const updateBook = (id: string, book: any) =>
  fetchAPI(`books/${id}/`, { method: "PUT", body: JSON.stringify(book) });
export const deleteBook = (id: string) =>
  fetchAPI(`books/${id}/`, { method: "DELETE" });

// 🔹 Authors API
export const getAuthors = () => fetchAPI("authors/");
export const getAuthor = (id: string) => fetchAPI(`authors/${id}/`);
export const addAuthor = (author: any) =>
  fetchAPI("authors/", { method: "POST", body: JSON.stringify(author) });
export const updateAuthor = (id: string, author: any) =>
  fetchAPI(`authors/${id}/`, { method: "PUT", body: JSON.stringify(author) });
export const deleteAuthor = (id: string) =>
  fetchAPI(`authors/${id}/`, { method: "DELETE" });

// 🔹 Categories API
export const getCategories = () => fetchAPI("categories/");
export const getCategory = (id: string) => fetchAPI(`category/${id}/`);
export const addCategory = (category: any) =>
  fetchAPI("categories/", { method: "POST", body: JSON.stringify(category) });
export const updateCategory = (id: string, category: any) =>
  fetchAPI(`category/${id}/`, {
    method: "PUT",
    body: JSON.stringify(category),
  });
export const deleteCategory = (id: string) =>
  fetchAPI(`category/${id}/`, { method: "DELETE" });

// 🔹 Publishers API
export const getPublishers = () => fetchAPI("publisher/");
export const getPublisher = (id: string) => fetchAPI(`publisher/${id}/`);
export const addPublisher = (publisher: any) =>
  fetchAPI("publisher/", { method: "POST", body: JSON.stringify(publisher) });
export const updatePublisher = (id: string, publisher: any) =>
  fetchAPI(`publisher/${id}/`, {
    method: "PUT",
    body: JSON.stringify(publisher),
  });
export const deletePublisher = (id: string) =>
  fetchAPI(`publisher/${id}/`, { method: "DELETE" });

// 🔹 Customers API
export const getCustomers = () => fetchAPI("customer/");
export const getCustomer = (id: string) => fetchAPI(`customer/${id}/`);
export const addCustomer = (customer: any) =>
  fetchAPI("customer/", { method: "POST", body: JSON.stringify(customer) });
export const updateCustomer = (id: string, customer: any) =>
  fetchAPI(`customer/${id}/`, {
    method: "PUT",
    body: JSON.stringify(customer),
  });
export const deleteCustomer = (id: string) =>
  fetchAPI(`customer/${id}/`, { method: "DELETE" });

// 🔹 Employees API
export const getEmployees = () => fetchAPI("employee/");
export const getEmployee = (id: string) => fetchAPI(`employee/${id}/`);
export const addEmployee = (employee: any) =>
  fetchAPI("employee/", { method: "POST", body: JSON.stringify(employee) });
export const updateEmployee = (id: string, employee: any) =>
  fetchAPI(`employee/${id}/`, {
    method: "PUT",
    body: JSON.stringify(employee),
  });
export const deleteEmployee = (id: string) =>
  fetchAPI(`employee/${id}/`, { method: "DELETE" });

// 🔹 Order Details API
export const getOrderDetails = () => fetchAPI("orderdetail/");
export const getOrderDetail = (id: string) => fetchAPI(`orderdetail/${id}/`);
export const addOrderDetail = (orderDetail: any) =>
  fetchAPI("orderdetail/", {
    method: "POST",
    body: JSON.stringify(orderDetail),
  });
export const updateOrderDetail = (id: string, orderDetail: any) =>
  fetchAPI(`orderdetail/${id}/`, {
    method: "PUT",
    body: JSON.stringify(orderDetail),
  });
export const deleteOrderDetail = (id: string) =>
  fetchAPI(`orderdetail/${id}/`, { method: "DELETE" });

// 🔹 Order Items API
export const getOrderItems = () => fetchAPI("orderitem/");
export const getOrderItem = (id: string) => fetchAPI(`orderitem/${id}/`);
export const addOrderItem = (orderItem: any) =>
  fetchAPI("orderitem/", { method: "POST", body: JSON.stringify(orderItem) });
export const updateOrderItem = (id: string, orderItem: any) =>
  fetchAPI(`orderitem/${id}/`, {
    method: "PUT",
    body: JSON.stringify(orderItem),
  });
export const deleteOrderItem = (id: string) =>
  fetchAPI(`orderitem/${id}/`, { method: "DELETE" });

// 🔹 Users API
export const getUsers = () => fetchAPI("user/");
export const getUser = (id: string) => fetchAPI(`user/${id}/`);
export const addUser = (user: any) =>
  fetchAPI("user/", { method: "POST", body: JSON.stringify(user) });
export const updateUser = (id: string, user: any) =>
  fetchAPI(`user/${id}/`, { method: "PUT", body: JSON.stringify(user) });
export const deleteUser = (id: string) =>
  fetchAPI(`user/${id}/`, { method: "DELETE" });

// 🔹 Inventory API
export const getInventory = () => fetchAPI("inverntory/");
export const getInventoryItem = (id: string) => fetchAPI(`inverntory/${id}/`);
export const addInventory = (inventory: any) =>
  fetchAPI("inverntory/", { method: "POST", body: JSON.stringify(inventory) });
export const updateInventory = (id: string, inventory: any) =>
  fetchAPI(`inverntory/${id}/`, {
    method: "PUT",
    body: JSON.stringify(inventory),
  });
export const deleteInventory = (id: string) =>
  fetchAPI(`inverntory/${id}/`, { method: "DELETE" });
