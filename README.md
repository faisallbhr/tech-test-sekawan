## PHP

-   **Versi**: 8.3.4

## Database

-   **Database**: MySQL
-   **Versi**: 8.0.30

## Framework dan Library yang Digunakan

-   **Framework**: Laravel 11
-   **Library Frontend**: React Inertia

## Daftar Akun

| Role       | Email                | Password   |
| ---------- | -------------------- | ---------- |
| Admin      | `admin@mail.com`     | `password` |
| Approver 1 | `approver1@mail.com` | `password` |
| Approver 2 | `approver2@mail.com` | `password` |
| Approver 3 | `approver3@mail.com` | `password` |
| Approver 4 | `approver4@mail.com` | `password` |

## Alur penggunaan

-   Login sebagai admin lalu membuat pesanan
-   Admin memilih approver sesuai level
-   Approver menyetujui/menolak berdasarkan level (jika level sebelumnya belum menyetujui, maka reservasi kendaraan tidak muncul)
-   Jika salah satu approver menolak, maka reservasi kendaraan tidak dilanjutkan
