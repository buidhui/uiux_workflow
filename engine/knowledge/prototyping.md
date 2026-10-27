# Prototyping

Dùng ở D2 (flow prototype, tuỳ chọn) và E3 (prototype HTML). Mục tiêu: người xem thao tác trọn luồng, đổi state, đổi vai, hiểu tính năng mà không đọc tài liệu.

## Hai loại

| | Flow prototype | Prototype HTML |
|---|---|---|
| Khi nào | D2, trước khi đồng thuận, flow mới phức tạp | E3, sau khi có UI trên Figma |
| Độ trung thực | Khung xám, chữ thật, không màu thương hiệu | Giống sản phẩm thật: component và theme theo KB mục 7 |
| Mục đích | Các bên thống nhất luồng | PO, Dev, QA, người dùng thử hành vi; tham chiếu cho Dev |
| Nguồn | `flow-map.md`, `design-strategy.md` | Frame Figma, `flow-map.md`, `ux-brief.md` |

## Chuẩn chung
- Một file `index.html`, mở trực tiếp bằng trình duyệt, không cần server, không gọi API thật. Thư viện tải từ CDN theo KB mục 7.
- Điều hướng bằng hash (`#/scr-1`), nút quay lại của trình duyệt dùng được.
- Thanh "Prototype" cố định ở cạnh trên: tên tính năng, version, bảng điều khiển.
- Bảng điều khiển: vai, bộ dữ liệu (bình thường, rỗng, nhiều, chuỗi dài), ép state (loading, error, disabled, permission).
- Dữ liệu mẫu đặt trong một khối dữ liệu ở đầu file, tiếng Việt thật, đủ dài để thấy nhịp.
- Hành vi theo rule đã thống nhất trong PRD và chiến lược thiết kế. Rule chưa được xác định: hiện chú thích "chưa xác định", không tự đặt.
- Accessibility cơ bản: nhãn cho trường nhập, thứ tự tab hợp lý, focus nhìn thấy được.
- Mỗi màn có `id` trùng mã màn để đối chiếu với Figma và chiến lược.

## Prototype HTML
- Cấu trúc từng màn lấy từ Figma; giá trị màu, chữ, khoảng cách lấy từ theme của thư viện component, không lấy số rời từ Figma.
- Component kit sang component code theo bảng ánh xạ trong KB mục 7. Component kit chưa có trong code: dựng bằng HTML, CSS theo token, ghi vào `prototype-report.md`.
- Sau mỗi vòng sửa ở R1, cập nhật prototype cùng Figma; `prototype-report.md` ghi version Figma đã lấy.

## Flow prototype
- Mỗi màn là một khung xám với tiêu đề, các vùng chính, nút điều hướng thật, chữ thật.
- Không màu thương hiệu, không icon chi tiết; mục tiêu là thể hiện luồng.

## Không làm
- Không đưa dữ liệu thật của khách hàng vào dữ liệu mẫu.
- Không gọi API, không lưu dữ liệu ra ngoài trình duyệt.

## Cách kiểm prototype

Dùng bậc cao nhất máy đang có, ghi bậc đã dùng vào báo cáo:

| Bậc | Cách | Kết luận được ghi |
|---|---|---|
| 1 | Công cụ điều khiển trình duyệt có trong phiên (ví dụ một MCP điều khiển trình duyệt): mở file, đi trọn từng flow, chụp từng màn, đọc lỗi console | Đã chạy thử |
| 2 | Script `engine/scripts/prototype-audit.mjs` (cài theo `engine/scripts/README.md`), hoặc trình duyệt trên máy chạy không giao diện: chụp từng màn ở các cỡ màn hình, kiểm cấu trúc và lỗi console | Đã chụp màn; tương tác chưa kiểm |
| 3 | Không chạy được trình duyệt: kiểm cú pháp JavaScript, kiểm mọi mã màn trong điều hướng có màn tương ứng; nhờ Designer mở file, đi một flow và xác nhận | Chưa chạy thử; ghi vào Limitation, nêu Designer đã xác nhận flow nào |

Không ghi "đã chạy thử" khi chỉ đạt bậc 3.
- Không trình bày prototype như sản phẩm đã làm xong.
