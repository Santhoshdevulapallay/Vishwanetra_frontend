# 👁️ Eye Care Management App

A modern **React + TypeScript** web application for managing patient records and monitoring monthly revenue in an eye care clinic.  

This app helps healthcare providers keep track of **patient information, prescriptions, and financial data** — all in one place.  

---

## ✨ Features

- 🏠 **Home Dashboard**
  - Overview of patient records
  - Monthly revenue stats & charts

- 📋 **Patient Records**
  - View all patients with details
  - Manage medical and prescription history

- ➕ **Add Patient Records**
  - Simple form to add new patients into the system
  - Validations for clean data entry

- 👀 **View Patients**
  - List of patients with search/filter functionality
  - Quick access to individual patient records

- 💊 **Prescriptions**
  - Manage prescription details for patients

- 📊 **Monthly Revenue**
  - Track revenue statistics to monitor clinic growth

- ⚡ **Extras**
  - Responsive layout with reusable UI components
  - Built with `React`, `TypeScript`, and `Vite`
  - Organized project structure for scalability

---

## 📂 Project Structure

```bash
src/
 ├── components/
 │   ├── AppSidebar.tsx        # Sidebar navigation
 │   ├── LoginForm.tsx         # Login form
 │   ├── Navbar.tsx            # Top navigation bar
 │   └── ui/                   # UI components
 ├── pages/
 │   ├── Admin.tsx             # Admin panel
 │   ├── Dashboard.tsx         # Dashboard (overview + revenue)
 │   ├── Index.tsx             # Home page
 │   ├── NotFound.tsx          # 404 page
 │   ├── PatientRecords.tsx    # Patient records listing
 │   ├── Prescription.tsx      # Prescription details
 ├── services/
 │   ├── httpService.ts        # API service wrapper
 │   └── patientRecordService.ts # Patient-related API calls
 ├── App.tsx                   # Main app component
 ├── main.tsx                  # App entry point
 └── vite-env.d.ts             # Vite TypeScript env definitions
```

## Sample Pages
Home:
![Blog Screenshot](https://github.com/Santhoshdevulapallay/Vishwanetra_frontend/blob/main/public/Home_page.png)
Add Patient:
![Blog Screenshot](https://github.com/Santhoshdevulapallay/Vishwanetra_frontend/blob/main/public/AddPatient.png)
Prescription:
![Blog Screenshot](https://github.com/Santhoshdevulapallay/Vishwanetra_frontend/blob/main/public/Prescription.png)
