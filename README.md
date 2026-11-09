# Tìm lại sắc đỏ Kim Hoàng — Mega Story

Trang longform cuộn dọc một trang về hành trình phục dựng dòng tranh đỏ Kim Hoàng.

> **Hướng dẫn chạy, sửa nội dung và triển khai chi tiết: xem [HUONG-DAN.md](HUONG-DAN.md).**

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
src/main.js       Cuộn mượt, header, mục lục, phát video, toàn bộ animation
public/           favicon và ảnh tĩnh (đặt ảnh/video thật vào đây)
```

## Thay nội dung

- **Chữ**: sửa trong `index.html`. Mỗi chương là một `<section id="chapter-N">`.
- **Màu, font, khoảng cách**: chỉnh biến trong `:root` ở đầu `src/styles.css`.
- **Ảnh**: chép vào `public/images/` rồi dùng `<img src="/images/ten-anh.jpg" alt="...">`.
- **Animation**: phần tử có class `reveal` sẽ tự hiện dần khi cuộn tới.

## Khả năng truy cập

- Khi người dùng bật *giảm chuyển động* (`prefers-reduced-motion`), mọi animation và cuộn mượt đều tắt.
- Nếu JavaScript lỗi, sau 3,5 giây nội dung vẫn tự hiện ra.
- Trang có skip link, hỗ trợ điều hướng bằng bàn phím, và có nhãn ARIA cho mục lục và khung video.

## Video phỏng vấn

Trang có một khung video (`<figure class="video-slot" data-video="...">`) ở Phần 01, đang nhúng buổi phỏng vấn cô Bình từ Google Drive. Muốn đổi video, thay link trong `data-video` (hỗ trợ Google Drive, YouTube, Vimeo, Facebook, file `.mp4`). Chi tiết ở mục 7.3 của [HUONG-DAN.md](HUONG-DAN.md).

Bản đồ ở Phần 02 dùng dữ liệu © OpenStreetMap (ODbL), file nền ở `public/images/ban-do-kim-hoang.svg`.
