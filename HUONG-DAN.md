# Hướng dẫn chạy và triển khai từ A đến Z

**Dự án:** Mega Story *Tìm lại sắc đỏ Kim Hoàng*
**Trang đang chạy:** https://tim-lai-sac-do-kim-hoang.vercel.app
**Mã nguồn:** https://github.com/ndchien2004/tim-lai-sac-do-kim-hoang

Tài liệu này dành cho cả người chưa từng chạy một dự án web. Bạn chỉ cần làm lần lượt từng bước.

---

## Mục lục

1. [Dự án gồm những gì](#1-dự-án-gồm-những-gì)
2. [Cài đặt công cụ (làm một lần)](#2-cài-đặt-công-cụ-làm-một-lần)
3. [Lấy mã nguồn về máy](#3-lấy-mã-nguồn-về-máy)
4. [Cài thư viện](#4-cài-thư-viện)
5. [Chạy trang trên máy](#5-chạy-trang-trên-máy)
6. [Cấu trúc thư mục](#6-cấu-trúc-thư-mục)
7. [Sửa nội dung](#7-sửa-nội-dung)
8. [Build bản chính thức](#8-build-bản-chính-thức)
9. [Đưa lên mạng với Vercel](#9-đưa-lên-mạng-với-vercel)
10. [Xử lý lỗi thường gặp](#10-xử-lý-lỗi-thường-gặp)
11. [Bảng lệnh tóm tắt](#11-bảng-lệnh-tóm-tắt)

---

## 1. Dự án gồm những gì

Đây là một **trang web tĩnh, một trang duy nhất**, cuộn dọc kể chuyện. Trang không có backend và không có cơ sở dữ liệu.

| Thành phần | Vai trò |
|---|---|
| **Vite 8** | Chạy trang khi phát triển và đóng gói ra file tĩnh |
| **GSAP + ScrollTrigger** | Hiệu ứng theo cuộn: hiện dần, ghim dòng thời gian, vẽ nét, đếm số |
| **Lenis** | Cuộn mượt |
| **Fontsource** | Font Playfair Display, Literata, Be Vietnam Pro (có tiếng Việt), đóng gói sẵn, không cần mạng |
| HTML / CSS / JavaScript thuần | Không dùng React hay framework nào khác |

---

## 2. Cài đặt công cụ (làm một lần)

### 2.1. Node.js (bắt buộc)

Vite 8 cần **Node.js 20.19 trở lên**, hoặc **22.12 trở lên**. Nên cài bản **LTS** mới nhất.

1. Vào https://nodejs.org và tải bản **LTS**.
2. Cài như phần mềm bình thường. Bấm *Next* cho đến hết, giữ mặc định.
3. Mở cửa sổ dòng lệnh:
   - **Windows:** bấm Start, gõ `cmd` hoặc `PowerShell`, rồi Enter.
   - **macOS:** mở *Terminal* (Cmd + Space, gõ `Terminal`).
4. Kiểm tra cài đặt:

```bash
node -v
```

```bash
npm -v
```

Nếu hiện số phiên bản, ví dụ `v22.x.x` và `10.x.x`, là đã cài xong.

### 2.2. Git (không bắt buộc)

Chỉ cần Git nếu bạn muốn tải code từ GitHub hoặc đẩy thay đổi lên để tự cập nhật trang.

- Tải ở https://git-scm.com rồi cài, giữ mặc định.
- Kiểm tra:

```bash
git --version
```

### 2.3. Trình soạn code (khuyên dùng)

Nên dùng **Visual Studio Code**: https://code.visualstudio.com

Khi đã mở thư mục dự án trong VS Code, bấm `` Ctrl + ` `` (macOS: `` Cmd + ` ``) để mở dòng lệnh ngay bên trong. Dòng lệnh này đã đứng sẵn trong thư mục dự án.

---

## 3. Lấy mã nguồn về máy

Bạn chọn **một** trong hai cách sau.

### Cách A: dùng file zip

1. Giải nén `tim-lai-sac-do-kim-hoang-source.zip`. Bạn sẽ được thư mục `tim-lai-sac-do-kim-hoang`.
2. Mở dòng lệnh và đi vào thư mục đó. Thay đường dẫn bằng chỗ bạn đã giải nén:

```bash
cd Đường/dẫn/tới/tim-lai-sac-do-kim-hoang
```

Mẹo trên Windows: mở thư mục trong File Explorer, bấm vào thanh địa chỉ, gõ `cmd` rồi Enter. Dòng lệnh sẽ mở sẵn trong thư mục đó.

### Cách B: dùng Git

```bash
git clone https://github.com/ndchien2004/tim-lai-sac-do-kim-hoang.git
```

```bash
cd tim-lai-sac-do-kim-hoang
```

---

## 4. Cài thư viện

Chạy lệnh sau **một lần** trong thư mục dự án:

```bash
npm install
```

Lệnh này tạo thư mục `node_modules` chứa GSAP, Lenis, Vite và font. Mất khoảng 10 đến 60 giây tùy mạng.

> Không cần đưa `node_modules` vào zip hay lên GitHub. Ai cần thì chạy lại `npm install`.

---

## 5. Chạy trang trên máy

```bash
npm run dev
```

Dòng lệnh sẽ hiện ra một dòng như sau:

```
  ➜  Local:   http://localhost:5173/
```

Mở trình duyệt và vào **http://localhost:5173**.

- **Tự tải lại:** khi bạn sửa và lưu file, trang tự cập nhật, không cần tải lại thủ công.
- **Xem trên điện thoại cùng Wi-Fi:** chạy `npm run dev -- --host`, rồi mở địa chỉ `Network: http://192.168.x.x:5173` hiện ra trên dòng lệnh.
- **Dừng:** bấm `Ctrl + C` trong dòng lệnh.

---

## 6. Cấu trúc thư mục

```
tim-lai-sac-do-kim-hoang/
├── index.html          Toàn bộ nội dung bài viết (chữ, ảnh, video)
├── src/
│   ├── main.js         Cuộn mượt, menu, phát video, toàn bộ hiệu ứng
│   └── styles.css      Giao diện: màu, font, bố cục, responsive
├── public/             File tĩnh, được giữ nguyên khi build
│   ├── favicon.svg
│   ├── apple-touch-icon.png
│   └── images/         Ảnh thực địa, ảnh tư liệu, bản đồ
├── package.json        Tên dự án, lệnh chạy, thư viện
├── package-lock.json   Khóa phiên bản thư viện (đừng sửa tay)
├── README.md           Giới thiệu ngắn
└── HUONG-DAN.md        Tài liệu này
```

Thứ tự các phần trong `index.html`:

| Phần | Thẻ trong `index.html` |
|---|---|
| Ảnh bìa | `<section class="hero" id="top">` |
| Mở đầu | `<section class="opening" id="opening">` |
| Dòng thời gian | `<section class="timeline-section" id="dong-thoi-gian">` |
| Phần 01 · Biết (có video phỏng vấn) | `<section id="chapter-1">` |
| Phần 02 · Mất (có bản đồ) | `<section id="chapter-2">` |
| Phần 03 · Tìm | `<section id="chapter-3">` |
| Phần 04 · Làm | `<section id="chapter-4">` |
| Gieo mầm di sản (đoạn ngắn) | `<section class="school-note" id="gieo-mam">` |
| Lời kết | `<section class="epilogue" id="loi-ket">` |
| Chân trang, tài liệu tham khảo, nguồn ảnh | `<footer class="site-footer">` |

---

## 7. Sửa nội dung

Bạn chạy `npm run dev` trước, rồi vừa sửa vừa xem trên trình duyệt.

### 7.1. Sửa chữ

Mở `index.html`, tìm đoạn chữ cần sửa bằng `Ctrl + F` (macOS: `Cmd + F`), sửa rồi lưu.

- Đoạn văn nằm trong `<p>...</p>`.
- Tiêu đề nằm trong `<h2>`, `<h3>`, `<h4>`.
- Chữ in đậm dùng `<strong>...</strong>`, chữ nghiêng dùng `<em>...</em>`.

> Chỉ sửa phần chữ nằm giữa các thẻ. Đừng xóa nhầm dấu `<` hoặc `>` hay các `class="..."`.

### 7.2. Thay hoặc thêm ảnh

1. Chép ảnh vào `public/images/`. Đặt tên không dấu, không khoảng trắng, ví dụ `co-binh-in-tranh.jpg`.
2. Trong `index.html`, đổi đường dẫn ở `src="/images/ten-anh.jpg"` và sửa `alt="..."` để mô tả ảnh.
3. Nên nén ảnh trước khi dùng, ví dụ bằng https://squoosh.app. Ảnh ngang rộng khoảng 1600px là đủ, ảnh nhỏ khoảng 800px.
4. Ghi nguồn ảnh vào mục **Nguồn ảnh** ở cuối `index.html` (tìm `photo-credits`).

### 7.3. Video phỏng vấn

Trang có **một khung video** ở Phần 01, tiêu đề *Full buổi phỏng vấn cô Bình*. Để đổi video, tìm `data-video=` trong `index.html` rồi thay link:

```html
<figure class="video-slot video-slot--wide reveal" data-video="LINK_VIDEO">
```

| Nguồn | Dạng link dán vào |
|---|---|
| Google Drive | `https://drive.google.com/file/d/ID/view` |
| YouTube | `https://www.youtube.com/watch?v=XXXX` hoặc `https://youtu.be/XXXX` |
| Vimeo | `https://vimeo.com/123456789` |
| Facebook | Link bài video công khai |
| File riêng | `/videos/ten-file.mp4` (chép file vào `public/videos/`) |

Lưu ý:
- **Google Drive:** file phải để chế độ chia sẻ *Bất kỳ ai có đường liên kết*. Ngay sau khi tải lên, Drive có thể báo *"still being processed"* vài phút đến vài chục phút. Đợi Drive xử lý xong là xem được.
- **Video quay dọc:** thêm `data-ratio="9 / 16"` vào thẻ `figure`.
- **Bỏ trống `data-video=""`:** khung sẽ hiện ảnh bìa kèm nhãn *"Video sẽ sớm được cập nhật"*.

### 7.4. Đổi màu, font, khoảng cách

Mở `src/styles.css`. Ngay đầu file có khối `:root { ... }` chứa các biến chính:

| Biến | Ý nghĩa |
|---|---|
| `--red`, `--red-2`, `--red-deep` | Các tông đỏ chủ đạo |
| `--gold` | Màu vàng nhấn |
| `--surface`, `--page`, `--paper` | Màu nền |
| `--ink`, `--ink-2`, `--ink-3` | Màu chữ |
| `--max` | Độ rộng tối đa của nội dung (1320px) |
| `--measure` | Độ rộng một cột chữ để dễ đọc |

Đổi giá trị một biến là toàn trang đổi theo.

### 7.5. Hiệu ứng

- Phần tử nào có class `reveal` sẽ tự hiện dần khi cuộn tới. Muốn khối mới có hiệu ứng thì thêm `reveal` vào `class`.
- Các hiệu ứng riêng (dòng thời gian, bản đồ, đếm số...) nằm trong `src/main.js`.
- Nếu người xem bật *giảm chuyển động* trong hệ điều hành, mọi hiệu ứng tự tắt.

---

## 8. Build bản chính thức

```bash
npm run build
```

Lệnh này tạo thư mục **`dist/`**: HTML, CSS và JS đã nén, kèm toàn bộ ảnh trong `public/`. Đây là thư mục đem đi đăng lên mạng.

Để xem thử bản build trước khi đăng:

```bash
npm run preview
```

Sau đó mở http://localhost:4173.

> Không nên mở `dist/index.html` bằng cách nhấp đúp. Trang dùng đường dẫn tuyệt đối `/images/...`, nên cần chạy qua máy chủ, ví dụ `npm run preview` hoặc Vercel.

---

## 9. Đưa lên mạng với Vercel

### 9.1. Cách đang dùng: tự động qua GitHub

Dự án Vercel `tim-lai-sac-do-kim-hoang` đã nối với repo GitHub `ndchien2004/tim-lai-sac-do-kim-hoang`. Mỗi lần có code mới trên nhánh `main`, Vercel tự build và cập nhật trang sau khoảng 1 phút.

Quy trình sửa và cập nhật trang:

```bash
git add -A
```

```bash
git commit -m "Mô tả ngắn thay đổi"
```

```bash
git push origin main
```

Bạn theo dõi tiến trình ở https://vercel.com, vào dự án rồi mở tab **Deployments**. Khi trạng thái là **Ready** thì trang đã cập nhật. Nếu trình duyệt vẫn hiện bản cũ, bấm `Ctrl + Shift + R` (macOS: `Cmd + Shift + R`).

Nếu đã push mà Vercel không tạo bản mới:
- Vào **Deployments**, chọn bản mới nhất, bấm **⋯** rồi **Redeploy**.
- Hoặc kiểm tra lại kết nối ở **Settings → Git** của dự án.

### 9.2. Tự tạo dự án Vercel mới (khi chuyển sang tài khoản khác)

1. Đưa code lên một repo GitHub của bạn.
2. Vào https://vercel.com/new, chọn **Import** repo đó.
3. Vercel tự nhận ra **Vite**. Giữ cấu hình sau:
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`
4. Bấm **Deploy**. Bạn sẽ có link dạng `ten-du-an.vercel.app`.

### 9.3. Gắn tên miền riêng (tùy chọn)

Vào dự án Vercel, mở **Settings → Domains**, thêm tên miền, rồi trỏ DNS theo hướng dẫn Vercel hiện ra.

### 9.4. Đăng ở nơi khác

Thư mục `dist/` là web tĩnh thuần, nên đăng được ở mọi nơi: Netlify (kéo thả thư mục `dist`), GitHub Pages, Cloudflare Pages, hoặc hosting thường. Với hosting thường, chép toàn bộ nội dung `dist/` vào thư mục gốc (`public_html`).

> Nếu trang đặt trong thư mục con, ví dụ `domain.com/kim-hoang/`, hãy build bằng lệnh `npx vite build --base=./`. Khi đó cần sửa các đường dẫn ảnh `/images/...` trong `index.html` thành `./images/...`.

---

## 10. Xử lý lỗi thường gặp

| Hiện tượng | Cách xử lý |
|---|---|
| `'npm' is not recognized` / `command not found: npm` | Chưa cài Node.js, hoặc chưa mở lại dòng lệnh sau khi cài. Cài Node rồi **mở cửa sổ dòng lệnh mới**. |
| Báo lỗi yêu cầu Node phiên bản cao hơn | Cài lại Node.js bản LTS mới (≥ 20.19 hoặc ≥ 22.12). |
| `Could not read package.json` / `ENOENT` | Dòng lệnh chưa đứng trong thư mục dự án. Dùng `cd` vào đúng thư mục có file `package.json`. |
| `Port 5173 is in use` | Vite tự chuyển sang cổng khác, bạn xem địa chỉ hiện ra. Hoặc tắt cửa sổ dòng lệnh cũ đang chạy. |
| `npm install` lỗi mạng hoặc chạy rất lâu | Kiểm tra mạng rồi chạy lại. Nếu vẫn lỗi, xóa thư mục `node_modules` và chạy `npm install` lần nữa. |
| Ảnh không hiện | Kiểm tra tên file đúng từng chữ, kể cả hoa/thường (Vercel phân biệt `Anh.jpg` với `anh.jpg`). Ảnh phải nằm trong `public/images/`. |
| Video báo *still being processed* | Google Drive đang xử lý video, bạn chờ thêm. |
| Video báo không có quyền xem | Đổi chia sẻ Drive thành *Bất kỳ ai có đường liên kết*. |
| Sửa xong trên mạng chưa đổi | Đợi Vercel báo *Ready*, rồi bấm `Ctrl + Shift + R`. Nếu vẫn chưa đổi, xem mục 9.1. |
| Trang trắng hoặc mất hiệu ứng | Bấm `F12`, mở tab **Console** để xem lỗi. Thường do sửa nhầm `main.js` hoặc làm hỏng thẻ HTML. |

---

## 11. Bảng lệnh tóm tắt

| Lệnh | Tác dụng |
|---|---|
| `npm install` | Cài thư viện (lần đầu, hoặc khi đổi `package.json`) |
| `npm run dev` | Chạy trang để sửa, tại http://localhost:5173 |
| `npm run dev -- --host` | Như trên, xem được từ điện thoại cùng Wi-Fi |
| `npm run build` | Đóng gói ra thư mục `dist/` |
| `npm run preview` | Xem bản build, tại http://localhost:4173 |
| `git add -A` → `git commit -m "..."` → `git push origin main` | Đẩy thay đổi lên GitHub, Vercel tự cập nhật trang |

---

*Bản đồ dùng dữ liệu © OpenStreetMap contributors (giấy phép ODbL). Nguồn ảnh và tài liệu tham khảo được ghi ở chân trang web.*
