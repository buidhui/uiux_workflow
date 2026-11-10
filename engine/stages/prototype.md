---
description: Stage E3 Prototype. Prototype HTML tương tác: dựng từ UI trên Figma cho màn Figma + HTML, dựng trực tiếp làm thiết kế chính cho màn chỉ HTML; tuỳ chọn nối flow trên Figma. Gọi qua /ux
argument-hint: <intent-slug>
---
# E3 Prototype

| | |
|---|---|
| Stage | E3 Prototype |
| Slug | prototype |
| Phase | execution |
| Execution | always khi có màn chỉ HTML, flow mới hoặc màn mới; CR trên màn có sẵn đi Figma + HTML thì chạy khi Designer yêu cầu |
| Produces | `execution/prototype/index.html` · `prototype-report.md` · liên kết điều hướng giữa frame trên Figma (tuỳ) |
| Consumes | frame Figma của E2 (bắt buộc cho màn Figma + HTML) · `design-strategy.md` có UX Brief nén (bắt buộc cho màn chỉ HTML), `flow-map.md` · `ux-brief.md` khi có · KB mục 7 frontend stack và bảng ánh xạ component |
| Requires | ui-design; khi E2 ghi `[S]` thì ux-brief, hoặc alignment khi E1 nén |
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

Vì vậy: HTML là đầu ra chính. Figma prototype chỉ nối điều hướng giữa các frame theo flow chính, khi Designer muốn trình bày trong Figma. Với màn Figma + HTML, Figma là nguồn sự thật về giao diện, HTML là nguồn sự thật về hành vi. Với màn chỉ HTML, HTML là nguồn sự thật về cả giao diện và hành vi.

## Hai chế độ trong cùng một file

| | Màn Figma + HTML | Màn chỉ HTML |
|---|---|---|
| Nguồn cấu trúc | Frame Figma đã dựng ở E2 | UX Brief nén trong `design-strategy.md`, pattern của màn liền kề |
| Component | Theo bảng ánh xạ kit sang code; component chưa có trong code thì HTML, CSS theo token | Chỉ component có trong bảng ánh xạ của KB mục 7. Cần component ngoài bảng thì dừng: màn lên L2, đi Figma + HTML, ghi DEC |
| Tự kiểm | So với frame Figma | Tự kiểm theo `prototyping.md` mục Màn chỉ HTML, thay cho S1 đến S9 trên Figma |
| Ghi chú bàn giao | Trên Figma ở H1 | Trong file, ở chế độ ghi chú bàn giao của bảng điều khiển |

## Các bước
0. Màn chỉ HTML: chỉ dựng khi D3 đã qua, như màn vẽ trên Figma. Dựng theo `prototyping.md` mục Màn chỉ HTML, sau đó làm tiếp từ bước 2.
1. Lấy cấu trúc từng màn từ Figma (đọc design context của frame), nội dung chữ thật, state đã vẽ. Không đọc được Figma (lựa chọn D ở `USER-GUIDE.md` mục A3): dựng từ chiến lược, UX Brief và ảnh Designer gửi; ghi trong `prototype-report.md` rằng cấu trúc lấy từ ảnh.
2. Dựng `index.html` một file theo `prototyping.md`: điều hướng theo `flow-map.md`; dùng thư viện component và theme theo KB mục 7, không có thì HTML và CSS theo token của KB; bảng điều khiển đổi state, vai, bộ dữ liệu; dữ liệu mẫu thực tế.
3. Hành vi theo rule đã thống nhất: validate, điều kiện hiện, quyền. Rule chưa được xác định thì hiện chú thích, không tự đặt.
4. Kiểm theo bậc ở `prototyping.md` mục Cách kiểm prototype: mở bằng trình duyệt, đi trọn từng flow, chụp màn hình từng màn, ghi bậc kiểm đã dùng. Màn Figma + HTML: so với frame Figma, ghi điểm lệch. Màn chỉ HTML: chạy tự kiểm của mục Màn chỉ HTML.
5. Figma prototype (tuỳ): nối điều hướng giữa frame theo flow chính trong khu vực nháp, theo `figma-protocol.md`. Không nói đã chạy thử.

## Generate
`prototype-report.md`: version, Figma version đã lấy, đầu ra của từng màn, flow và màn đã có, kết quả tự kiểm của màn chỉ HTML, state chuyển được, vai chuyển được, phần chỉ minh hoạ, điểm lệch với Figma, cách mở.

## Kết thúc
Không có gate riêng: prototype đi cùng UI vào R1, được dùng ở vòng góp ý. Nói một dòng: số flow bấm được, số state chuyển được, cách mở.
