---
product: ❓Designer
updated: <YYYY-MM-DD>
status: khung, chưa điền
---
# Product KB: ❓Designer

Manifest của knowledge base sản phẩm. Engine đọc file này ở đầu mỗi phiên và ở bước Load của mọi stage; command trỏ về "KB mục N". Mỗi mục ghi dữ kiện ngắn hoặc đường dẫn tới nguồn có sẵn; nguồn đã có ở nơi khác (repo của PO, thư mục dữ liệu của UI kit, file Figma) thì trỏ tới, không chép. Định nghĩa đầy đủ từng mục, mức bắt buộc và cách kiểm: `DOMAIN-SETUP.md`.

## 1. Sản phẩm và người dùng
- Sản phẩm, các ứng dụng con hoặc module:
- Nền tảng và breakpoint chính:
- Vai người dùng và mục tiêu chính của từng vai:
- Ngôn ngữ giao diện:
- Nhịp sprint (độ dài, ngày refinement, ngày planning):

## 2. Nguồn yêu cầu và đồng thuận
- Cách làm việc với tài liệu của PO (repo có quyền push, repo chỉ đọc, không có repo; `USER-GUIDE.md` mục A4):
- Repo của PO và đường dẫn intent:
- Tài liệu đầu vào chính (PRD, user stories) và mức hoàn thiện cần có trước khi bắt đầu:
- Template file thiết kế UX của PO và vị trí đặt file:
- Quy ước commit, branch, ai được sửa file nào:
- Cách đồng thuận chiến lược thiết kế (buổi họp, tài liệu, người ký; với việc nhỏ thì như thế nào):
- Quy ước mã màn và mã yêu cầu dùng chung với PO:

## 3. Kiến thức nghiệp vụ
- KB nghiệp vụ của PO (đường dẫn, chỉ đọc):
- Thuật ngữ nghiệp vụ thường gặp trên giao diện:
- Thực thể chính và vòng đời trạng thái hiển thị trên giao diện:

## 4. App hiện có
- App-map hoặc screen register (đường dẫn):
- Khung chung của màn (header, điều hướng, khung trang):
- Pattern theo loại màn (danh sách, form, chi tiết, dashboard) và màn mẫu để nhân bản:
- Ảnh màn đang chạy (`assets/screens/` hoặc link):

## 5. Design system và UI kit
Sản phẩm có nhiều ứng dụng con hoặc module dùng kit khác nhau: điền bảng dưới, mỗi module một dòng; các dòng còn lại của mục này ghi phần dùng chung.

| Module | File UI kit (link, file key) | Hướng dẫn dùng kit | Gap log | Mức sẵn sàng, ngày kiểm |
|---|---|---|---|---|

- File design system gốc và file UI kit của sản phẩm (link, file key):
- Hướng dẫn dùng kit trên màn (vùng màn hình sang component):
- Luật design system (màu theo vai trò, chữ, khoảng cách, bo góc, layout) hoặc đường dẫn:
- Gap log (đường dẫn, định dạng mục). Chưa có nơi lưu của công cụ dựng kit thì dùng `domain/gap-log.md`:
- Người phụ trách kit, người phụ trách design system:
- Công cụ dựng kit dùng cho `/kit-proposal` (ví dụ skill dựng kit) và cách gọi ở chế độ đề xuất:
- Mức sẵn sàng (0, 1, 2 theo `engine/protocol/figma-protocol.md` mục 1) và lý do:

## 6. Figma workspace
| Module | File thiết kế (link, file key) | Khu vực nháp cho AI |
|---|---|---|

- File thiết kế sản phẩm theo module (link, file key), khi chỉ có một module:
- Cấu trúc page, section; nơi đặt màn chính:
- Khu vực nháp cho AI (page hoặc branch):
- Quy ước đặt tên frame:
- Trang changelog và quy ước lưu version:
- Người cấp quyền sửa file Figma cho Designer mới:

Cách kết nối Figma và kết quả kiểm khả năng là thông tin của từng máy, nằm ở `.uiux/setup.md`, không ghi ở đây.

## 7. Frontend stack cho prototype
- Thư viện component của frontend thật và version:
- Theme hoặc token ở dạng code (file cấu hình, biến CSS) và đường dẫn:
- Bộ icon, font:
- Cách tải trong một file HTML (CDN được phép):

## 8. Nội dung
- Giọng văn, cách xưng hô:
- Thuật ngữ sản phẩm (dùng, không dùng):
- Câu mẫu cho nút, lỗi, trạng thái rỗng, xác nhận:

## 9. Chuẩn chất lượng
- Mức accessibility (ví dụ WCAG 2.1 AA) và ngưỡng vùng chạm:
- Corner checklist giao diện của sản phẩm:
- Điều chỉnh thang điểm review nếu có:

## 10. Tham chiếu
- Brand guideline:
- Thư viện design ref đã dùng (`assets/refs/`):
- Sản phẩm tham khảo, đối thủ:

## 11. Người và kênh
- PO, Dev PIC, QA PIC thường gặp:
- Nơi nhận góp ý (comment Figma, Jira, chat):
- Công cụ quản lý task và cách chuyển Done:

## Thành phần của KB
- `domain.md`, file này
- `design-system.md`, `tokens.md`, `components.md`: chỉ khi sản phẩm chưa có nguồn design system ở nơi khác để trỏ tới
- `gap-log.md`: chỉ khi sản phẩm chưa có gap log ở nơi khác
- `content-guide.md`, `corner-checklist.md`, `frontend-stack.md`
- `app-map/`, `assets/`, `templates/`

Ngoài KB nhưng thuộc về sản phẩm, phải làm mới khi đổi sản phẩm: `memory/team.md`, `intents/`, `adhoc/`.
