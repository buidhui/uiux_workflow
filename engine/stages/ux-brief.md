---
description: Stage E1 UX Brief & Wireframe. Bố cục, logic tương tác, nội dung chữ; đề xuất component mới cho màn L2; design ref và hướng thị giác cho màn L3. UX Brief Gate. Gọi qua /ux
argument-hint: <intent-slug>
---
# E1 UX Brief & Wireframe

| | |
|---|---|
| Stage | E1 UX Brief & Wireframe |
| Slug | ux-brief |
| Phase | execution |
| Execution | conditional: có ít nhất một màn L2 hoặc L3. Mọi màn L1 thì nén vào D2, ghi `[S] nén vào D2` |
| Produces | `execution/ux-brief/ux-brief.md` · wireframe trong khu vực nháp trên Figma (tuỳ) · `ux-brief-questions.md` |
| Consumes | `design-strategy.md` đã đồng thuận ở D3 (bắt buộc) · `flow-map.md` · design ref trong `inputs/refs/` (bắt buộc cho màn L3) · pattern màn liền kề |
| Requires | alignment |
| Áp dụng | Màn L2, L3 viết đầy đủ; màn L1 trong cùng intent giữ phần nén từ D2 |
| Reviewer | none |
| Archive | yes |
| Template | `engine/templates/ux-brief.md` |
| Checklist | `engine/verification/ux-brief.md` |
| Knowledge | `engine/protocol/design-levels.md` · `engine/knowledge/ux-writing-vi.md` · `reference-research.md` (L3) · `data-visualization.md` (màn có biểu đồ) · KB mục 5 (design system, kit), mục 8 (nội dung), mục 10 (tham chiếu), `assets/` |

Chạy theo `engine/protocol/stage-protocol.md`. Tương ứng Step 5 và Step 5.1 trong tài liệu hướng dẫn cũ.

## Mục đích
Xác định cách màn hoạt động và được sắp xếp trước khi làm UI chi tiết. Với màn mở rộng và màn sáng tạo, đây là bước Designer chọn hướng; làm UI trước khi chọn hướng là làm lại.

## Theo mức của màn
- L1 (khi đi cùng màn khác): giữ UX Brief nén từ D2, không viết lại.
- L2: mục tiêu màn; thứ bậc thông tin; wireframe; component có sẵn dùng ở đâu; đề xuất component mới cho phần thiếu, dựa trên pattern cũ gần nhất và style hiện có, mỗi đề xuất mô tả chức năng tương tự component đã có, đánh dấu assumption; nội dung chữ; tương tác; mô tả state.
- L3: bắt đầu từ design ref. Designer đã gửi ref thì phân tích theo cấu trúc (thứ tự khối, lưới, vị trí hành động) và cảm quan (mật độ, nhịp, phân cấp), không lấy màu, số đo, font từ ref. Chưa có ref thì đề xuất nghiên cứu theo `reference-research.md` hoặc phản hồi Blocked. Đưa hai đến ba hướng, Designer chọn một; ghi reference lock (hướng chính, ba đến năm đặc điểm giữ, điều loại bỏ). Sau đó wireframe và các phần như L2.

## Wireframe
Mặc định mô tả bằng khối văn bản theo vùng trong `ux-brief.md`. Designer muốn xem trên Figma thì vẽ wireframe mức thấp trong khu vực nháp theo `figma-protocol.md`, dùng khối xám và chữ thật, không dùng màu hoặc component chi tiết.

## Ask
- Chọn hướng (L3), chọn đề xuất component (L2).
- Thứ bậc thông tin khi có nhiều cách hợp lý.
- Nội dung chữ còn thiếu.

## Generate
`ux-brief.md` theo template, mỗi màn một khối. Đề xuất component mới được Designer chọn: chạy `/kit-proposal` để ghi vào gap log và chuyển người phụ trách kit; màn dùng xử lý tạm cho tới khi kit có.

## Gate
UX Brief Gate. Trình: số màn theo mức, hướng đã chọn cho màn L3, component mới đề xuất, link wireframe. Stage kế: E2.
