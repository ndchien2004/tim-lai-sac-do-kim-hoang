# Tìm lại sắc đỏ Kim Hoàng — Mega Story

Trang longform cuộn dọc một trang về hành trình phục dựng dòng tranh đỏ Kim Hoàng.

## Công nghệ

- **Vite**: dev server và build tĩnh
- **GSAP + ScrollTrigger**: animation theo cuộn (reveal, parallax, ghim timeline ngang, vẽ nét SVG, đếm số)
- **Lenis**: cuộn mượt
- **Fontsource** (tự host, có subset tiếng Việt): Playfair Display (tiêu đề), Literata (văn bản), Be Vietnam Pro (nhãn/UI)

## Chạy dự án

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # xuất ra dist/
npm run preview  # xem bản build
```

## Cấu trúc

```
index.html        Toàn bộ nội dung bài (sửa chữ trực tiếp ở đây)
src/styles.css    Hệ thống giao diện: biến màu/chữ ở :root, chia theo từng phần
src/main.js       Cuộn mượt, header, mục lục, thanh so sánh, toàn bộ animation
public/           favicon và ảnh tĩnh (đặt ảnh/video thật vào đây)
```

## Thay nội dung

- **Chữ**: sửa trong `index.html`. Mỗi chương là một `<section id="chapter-N">`.
- **Màu, font, khoảng cách**: chỉnh biến trong `:root` ở đầu `src/styles.css`.
- **Ảnh thật**: chép vào `public/images/` rồi dùng `<img src="/images/ten-anh.jpg" alt="...">`
  ở vị trí các khối minh họa (ví dụ `.village-visual`, `.portrait-paper`, `.woodblock`).
- **Animation**: phần tử có class `reveal` sẽ tự hiện dần khi cuộn tới.

## Khả năng truy cập

- Khi người dùng bật *giảm chuyển động* (`prefers-reduced-motion`), mọi animation và cuộn mượt đều tắt.
- Nếu JavaScript lỗi, sau 3,5 giây nội dung vẫn tự hiện ra.
- Trang có skip link, hỗ trợ điều hướng bằng bàn phím, và có nhãn ARIA cho mục lục và thanh so sánh.

## Gắn video phỏng vấn

Trang có 5 khối video (`<figure class="video-slot" data-video="">`). Khi `data-video` để trống, khối hiện ảnh bìa và nhãn "Video sẽ sớm được cập nhật". Muốn gắn video, dán link vào `data-video`:

| Nguồn | Ví dụ giá trị `data-video` |
|---|---|
| YouTube | `https://www.youtube.com/watch?v=XXXXXXXXXXX` hoặc `https://youtu.be/XXXXXXXXXXX` |
| Vimeo | `https://vimeo.com/123456789` |
| Google Drive | `https://drive.google.com/file/d/ID/view` (file phải để chế độ "Bất kỳ ai có đường liên kết") |
| Facebook | link bài video công khai |
| File riêng | `/videos/ten-file.mp4` (đặt file vào `public/videos/`) |

Video quay dọc (điện thoại): thêm `data-ratio="9 / 16"` vào thẻ `figure`.

| Khối | Vị trí | Nội dung dự kiến |
|---|---|---|
| Video 01 | Mở đầu | Cô Bình mở cửa căn phòng vẽ |
| Video 02 | Phần 01 | Chuyện năm 18 tuổi |
| Video 03 | Phần 03 | Tấm ván bên họ ngoại |
| Video 04 | Phần 04 | Những mẻ giấy hỏng |
| Video 05 | Phần 05 | Điều cô muốn trao lại |

Bản đồ ở Phần 01 dùng dữ liệu © OpenStreetMap (ODbL), file nền ở `public/images/ban-do-kim-hoang.svg`.
