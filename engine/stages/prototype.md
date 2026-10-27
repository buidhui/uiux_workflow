---
description: Stage E3 Prototype. Prototype HTML tương tác từ UI trên Figma để các bên thao tác thử luồng và state; tuỳ chọn nối flow trên Figma. Gọi qua /ux
argument-hint: <intent-slug>
---
# E3 Prototype

| | |
|---|---|
| Stage | E3 Prototype |
| Slug | prototype |
| Phase | execution |
| Execution | always khi có flow mới hoặc màn mới; CR trên màn có sẵn khi Designer yêu cầu |
| Produces | `execution/prototype/index.html` · `prototype-report.md` · liên kết điều hướng giữa frame trên Figma (tuỳ) |
| Consumes | frame Figma của E2 (bắt buộc) · `design-strategy.md`, `flow-map.md` · `ux-brief.md` khi có · KB mục 7 frontend stack |
| Requires | ui-design |
| Áp dụng | Mọi màn trong phạm vi |
| Reviewer | none, R1 xem prototype cùng thiết kế |
| Archive | no; file nằm trong intent, version ở `prototype-report.md` |
| Template | `engine/templates/prototype-report.md` |
| Checklist | `engine/verification/prototype.md` |
| Knowledge | `engine/knowledge/prototyping.md` · `accessibility.md` · KB mục 7, mục 9 (ngưỡng vùng chạm) · script `engine/scripts/prototype-audit.mjs` (tuỳ chọn) |

Chạy theo `engine/protocol/stage-protocol.md`.

## Mục đích
Đầu ra của luồng gồm cả prototype HTML. Prototype cho PO, Dev, QA và người dùng thử thao tác trọn luồng, đổi state, đổi vai, để hiểu luồng mà không cần đọc tài liệu. Đây là phần AWS AI-DLC không có; AWS dừng ở mockup dạng văn bản.

## Vì sao HTML là đầu ra chính, Figma prototype là phụ
| | HTML prototype | Figma prototype |
|---|---|---|
| Đổi state, đổi vai, dữ liệu rỗng hoặc lỗi | Có, bằng bảng điều khiển | Phải vẽ mỗi state một frame và nối tay |
| Logic theo rule của PRD (validate, rẽ nhánh) | Có | Rất hạn chế |
| Giống sản phẩm thật | Cao khi dùng đúng thư viện component của frontend (KB mục 7) | Giống thiết kế, không giống hành vi thật |
| AI kiểm được | Có, chạy và chụp màn hình được | Ghi được tương tác nhưng không chạy thử được |
| Rủi ro | Lệch với Figma nếu sửa một bên | Ít lệch vì dùng chính frame |
| Chia sẻ | Một file, mở trình duyệt; hoặc link | Link Figma, người xem cần quyền |

Vì vậy: HTML là đầu ra chính. Figma prototype chỉ nối điều hướng giữa các frame theo flow chính, khi Designer muốn trình bày trong Figma. Figma là nguồn sự thật về giao diện; HTML là nguồn sự thật về hành vi trong phạm vi prototype.

## Các bước
1. Lấy cấu trúc từng màn từ Figma (đọc design context của frame), nội dung chữ thật, state đã vẽ. Không đọc được Figma (lựa chọn D ở `USER-GUIDE.md` mục A3): dựng từ chiến lược, UX Brief và ảnh Designer gửi; ghi trong `prototype-report.md` rằng cấu trúc lấy từ ảnh.
2. Dựng `index.html` một file theo `prototyping.md`: điều hướng theo `flow-map.md`; dùng thư viện component và theme theo KB mục 7, không có thì HTML và CSS theo token của KB; bảng điều khiển đổi state, vai, bộ dữ liệu; dữ liệu mẫu thực tế.
3. Hành vi theo rule đã thống nhất: validate, điều kiện hiện, quyền. Rule chưa được xác định thì hiện chú thích, không tự đặt.
4. Kiểm theo bậc ở `prototyping.md` mục Cách kiểm prototype: mở bằng trình duyệt, đi trọn từng flow, chụp màn hình từng màn, so với frame Figma, ghi điểm lệch và bậc kiểm đã dùng.
5. Figma prototype (tuỳ): nối điều hướng giữa frame theo flow chính trong khu vực nháp, theo `figma-protocol.md`. Không nói đã chạy thử.

## Generate
`prototype-report.md`: version, Figma version đã lấy, flow và màn đã có, state chuyển được, vai chuyển được, phần chỉ minh hoạ, điểm lệch với Figma, cách mở.

## Kết thúc
Không có gate riêng: prototype đi cùng UI vào R1, được dùng ở vòng góp ý. Nói một dòng: số flow bấm được, số state chuyển được, cách mở.
