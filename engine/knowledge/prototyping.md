# Prototyping

Dùng ở D2 (flow prototype, tuỳ chọn) và E3 (prototype HTML, và thiết kế chính của màn chỉ HTML). Mục tiêu: người xem thao tác trọn luồng, đổi state, đổi vai, hiểu tính năng mà không đọc tài liệu.

## Hai loại

| | Flow prototype | Prototype HTML |
|---|---|---|
| Khi nào | D2, trước khi đồng thuận, flow mới phức tạp | E3: sau khi có UI trên Figma (màn Figma + HTML), hoặc dựng trực tiếp sau D3 (màn chỉ HTML) |
| Độ trung thực | Khung xám, chữ thật, không màu thương hiệu | Giống sản phẩm thật: component và theme theo KB mục 7 |
| Mục đích | Các bên thống nhất luồng | PO, Dev, QA, người dùng thử hành vi; tham chiếu cho Dev |
| Nguồn | `flow-map.md`, `design-strategy.md` | Frame Figma hoặc UX Brief nén, `flow-map.md`, `ux-brief.md` |

## Chuẩn chung
- Một file `index.html`, mở trực tiếp bằng trình duyệt, không cần server, không gọi API thật. Khung file, cách tải thư viện và dữ liệu mẫu theo mục Chuẩn file.
- Điều hướng bằng hash (`#/scr-1`), nút quay lại của trình duyệt dùng được.
- Thanh "Prototype" cố định ở cạnh trên: tên tính năng, version, bảng điều khiển.
- Bảng điều khiển: vai, bộ dữ liệu (bình thường, rỗng, nhiều, chuỗi dài), ép state (loading, error, disabled, permission).
- Dữ liệu mẫu đặt trong một khối dữ liệu ở đầu file, tiếng Việt thật, đủ dài để thấy nhịp.
- Hành vi theo rule đã thống nhất trong PRD và chiến lược thiết kế. Rule chưa được xác định: hiện chú thích "chưa xác định", không tự đặt.
- Accessibility cơ bản: nhãn cho trường nhập, thứ tự tab hợp lý, focus nhìn thấy được.
- Mỗi màn có `id` trùng mã màn để đối chiếu với Figma và chiến lược.

## Chuẩn file

Prototype là file được commit và ghim link khi bàn giao; với màn chỉ HTML, file còn là thiết kế chính. Vì vậy cùng một commit phải hiển thị giống nhau ở mọi lần mở, trên mọi máy.

- Khung: `<!doctype html>`, `<html lang="vi">` (theo ngôn ngữ của sản phẩm), `<meta charset="utf-8">`, `<title>` có tên tính năng.
- Ba thẻ meta định danh, đặt trong `<head>`:

  ```html
  <meta name="uiux-intent" content="<slug của intent>">
  <meta name="uiux-screens" content="SCR1, SCR2, SCR3">
  <meta name="uiux-version" content="<version ghi ở prototype-report.md>">
  ```

  `uiux-screens` liệt kê mọi mã màn có trong file, khớp bảng màn của `design-strategy.md`. AI Reviewer và script dùng ba thẻ này để đối chiếu file với chiến lược và báo cáo.
- Thư viện component, theme, icon tải từ CDN theo KB mục 7, URL ghi đúng version đầy đủ, ví dụ `antd@5.12.3`. Không dùng `latest` hoặc version rút gọn như `@5`: khi thư viện ra bản mới, URL không ghim version làm commit đã duyệt hiển thị khác đi.
- Ảnh và icon riêng đặt trong thư mục prototype hoặc nhúng dạng data URI. Không trỏ ra ngoài thư mục bằng `../`, không dùng đường dẫn tuyệt đối trên máy, không lấy ảnh từ dịch vụ ảnh ngẫu nhiên.
- Dữ liệu mẫu ổn định: không dùng `Math.random()`, `Date.now()`, `new Date()` không tham số; ngày giờ tính từ một mốc cố định khai trong khối dữ liệu. Nhờ vậy ảnh chụp của các vòng review so sánh được với nhau.
- Không dùng `iframe`, `object`, `embed`, `form` có `action`, `meta http-equiv="refresh"`; không gọi `fetch`, `XMLHttpRequest`, WebSocket.

Kiểm bằng `node engine/scripts/prototype-lint.mjs <thư mục prototype>`. Script chỉ cần Node.js bản 18 trở lên, không cần cài gói, và kiểm thêm cú pháp JavaScript của từng khối script cùng liên kết `#/...` không có màn tương ứng. Lỗi phải sửa trước khi trình gate. Cảnh báo được xét từng trường hợp, ví dụ font tải từ Google Fonts khi KB mục 7 ghi cách tải này. Máy không có Node thì AI rà theo danh sách trên và ghi vào Limitation.

## Prototype HTML
- Cấu trúc từng màn lấy từ Figma; giá trị màu, chữ, khoảng cách lấy từ theme của thư viện component, không lấy số rời từ Figma.
- Component kit sang component code theo bảng ánh xạ trong KB mục 7. Component kit chưa có trong code: dựng bằng HTML, CSS theo token, ghi vào `prototype-report.md`.
- Sau mỗi vòng sửa ở R1, cập nhật prototype cùng Figma; `prototype-report.md` ghi version Figma đã lấy. Màn chỉ HTML sửa thẳng trong file.

## Màn chỉ HTML

Màn L1 đi làn chỉ HTML theo `engine/protocol/design-levels.md` mục Đầu ra theo từng màn. HTML là thiết kế chính và là nguồn bàn giao cho Dev, nên chuẩn cao hơn prototype minh hoạ.

Dựng:
- Chỉ dùng component có trong bảng ánh xạ kit sang code (KB mục 7), đúng variant và property. Không dựng component mới bằng HTML, CSS rời. Cần component ngoài bảng: dừng, màn lên L2.
- Màu, chữ, khoảng cách, bo góc lấy từ theme hoặc token của thư viện; không đặt số rời.
- Bố cục theo pattern của màn liền kề và khung chung của app (KB mục 4).
- Đủ bảy state theo `screen-states.md`, chuyển được bằng bảng điều khiển; đủ vai khi có phân quyền.
- Chữ thật theo `ux-writing-vi.md` và KB mục 8; bộ dữ liệu chuỗi dài.
- Hiển thị đúng ở các breakpoint của design system.

Chế độ ghi chú bàn giao: một nút trong bảng điều khiển bật lớp ghi chú cạnh từng vùng của màn. Nội dung như ghi chú bàn giao trên Figma: điều kiện hiện từng state, tương tác chính, giới hạn ký tự và cách cắt chữ dài, trường hợp biên và quyền, điểm Dev được tự quyết định, `GAP` kèm xử lý tạm. Ghi chú nằm trong cùng file, tắt mặc định.

Tự kiểm, thay cho S1 đến S9 trên Figma:

| Kiểm | Cách |
|---|---|
| Độ phủ | Mọi màn, mọi dòng trong bảng màn và bản kê thay đổi có trong file |
| Component | Mọi phần tử tương tác thuộc component trong bảng ánh xạ; không có phần tử dựng rời |
| Token | Không có mã màu, cỡ chữ, khoảng cách viết số rời trong CSS riêng của file |
| State và vai | Bảy state và các vai chuyển được bằng bảng điều khiển |
| Chữ | Chữ thật, chuỗi dài nhất không vỡ bố cục, dấu tiếng Việt không bị cắt |
| Breakpoint và accessibility | `prototype-audit.mjs` ở các breakpoint của design system: không tràn ngang, vùng chạm, focus, tên trợ năng, tương phản; số tương phản là gần đúng, nghi ngờ thì đo bằng giá trị token |
| Nhất quán | Ảnh chụp đặt cạnh màn liền kề của app: cùng khung, cùng pattern |

Version: file được commit trước khi trình UI Gate và Delivery Gate; link bàn giao ghi kèm mã commit.

## Flow prototype
- Mỗi màn là một khung xám với tiêu đề, các vùng chính, nút điều hướng thật, chữ thật.
- Không màu thương hiệu, không icon chi tiết; mục tiêu là thể hiện luồng.

## Không làm
- Không đưa dữ liệu thật của khách hàng vào dữ liệu mẫu.
- Không gọi API, không lưu dữ liệu ra ngoài trình duyệt.
- Không trình bày prototype như sản phẩm đã làm xong.

## Cách kiểm prototype

Dùng bậc cao nhất máy đang có, ghi bậc đã dùng vào báo cáo:

| Bậc | Cách | Kết luận được ghi |
|---|---|---|
| 1 | Công cụ điều khiển trình duyệt có trong phiên (ví dụ một MCP điều khiển trình duyệt): mở file, đi trọn từng flow, chụp từng màn, đọc lỗi console | Đã chạy thử |
| 2 | Script `engine/scripts/prototype-audit.mjs` (cài theo `engine/scripts/README.md`), hoặc trình duyệt trên máy chạy không giao diện: chụp từng màn ở các cỡ màn hình, kiểm cấu trúc và lỗi console | Đã chụp màn; tương tác chưa kiểm |
| 3 | Không chạy được trình duyệt: kết quả của `prototype-lint.mjs` (khung file, tài nguyên ngoài, cú pháp JavaScript, liên kết màn); nhờ Designer mở file, đi một flow và xác nhận | Chưa chạy thử; ghi vào Limitation, nêu Designer đã xác nhận flow nào |

Ở mọi bậc, chạy `prototype-lint.mjs` theo mục Chuẩn file trước.

Không ghi "đã chạy thử" khi chỉ đạt bậc 3.

## Nguồn

- Hướng dẫn UI/UX Workflow cùng AI trước đây của team: prototype HTML một file, bảng điều khiển đổi state và vai.
- `ui-ux-pro-max-skill` (giấy phép MIT): script kiểm prototype theo nhiều cỡ màn hình, chuyển thành `prototype-audit.mjs`.
- AWS AI-DLC, HTML artifact protocol và sensor `html-shape` trên nhánh `feature/review-ui-html-artifacts` (giấy phép MIT-0, chưa vào bản chính khi tham khảo ngày 11/11/2026): file tự đủ, meta định danh, nội dung ổn định giữa các lần mở, kiểm cấu trúc tĩnh. `prototype-lint.mjs` viết mới theo các ý này.
- Đã bỏ từ AWS: cấm mọi tài nguyên ngoài và quy định script chỉ là phần phụ, vì prototype cần thư viện frontend và JavaScript để thao tác được; phần review dành riêng trong file, vì review của quy trình ghi ở `design-review.md`.
