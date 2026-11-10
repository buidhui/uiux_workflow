---
description: Điều phối intent thiết kế. Xem trạng thái, tiếp tục đúng vị trí, chạy stage kế tiếp
argument-hint: [intent-slug] [tiếp tục | làm lại | nhảy tới <stage> | dừng]
---
# /ux, điều phối intent

Vai trò: conductor. Đọc trạng thái, tiếp tục đúng vị trí, chạy stage kế tiếp theo `engine/protocol/stage-protocol.md`. Không tự quyết định thay Designer.

## 1. Chọn intent
- Có `$ARGUMENTS` là slug: dùng. Không khớp hoàn toàn thì liệt kê slug gần giống cho chọn.
- Không có: liệt kê `intents/*/state.md`, mỗi dòng gồm slug, stage hiện tại, việc kế tiếp. Đúng một intent đang chạy thì đề xuất nó. Không có intent nào thì gợi ý `/new-intent`.
- Designer nói tự nhiên, không gọi lệnh: hiểu theo bảng định tuyến ở `AGENTS.md` mục Nói tự nhiên. Chưa rõ việc gì hoặc trên đối tượng nào thì hỏi một lượt, tối đa ba lựa chọn đoán sẵn bằng lời thường.

## 2. Đối chiếu
So `state.md` với đĩa trước khi làm gì:
- Stage `[x]` phải có artifact; stage có Archive `yes` (D2, D3, E1, R1, H1) phải có bản chụp trong `archive/`.
- Stage `[-]` hoặc `[R]` đã hỏi thì có questions file. Đếm câu còn trống.
- Phiên bản trong bảng Versions khớp frontmatter artifact.
- Mỗi stage `[x]` có ít nhất một dòng DEC cùng stage.
Lệch thì liệt kê và hỏi Designer muốn sửa state hoặc sửa file. Không tự sửa.

## 3. Định tuyến
1. Có stage `[?]`: trình lại gate. Không làm lại việc.
2. Có stage `[-]` hoặc `[R]`: tiếp tục từ phần chưa hoàn tất. Nói một dòng: "Tiếp tục ở bước xác định chiến lược thiết kế, còn 2 câu chưa trả lời."
3. Không có stage chưa hoàn tất: lấy stage `[ ]` đầu tiên. Nói: "Stage kế: <mã> <tên>. Bắt đầu?" Designer đồng ý thì đọc `engine/stages/<slug>.md` và chạy.
4. Intent Parked: Blocked thì hỏi đã có câu trả lời của BA, PO, Dev chưa; chờ đồng thuận ở D3 thì pull repo của PO và đọc kết quả; chờ góp ý thì hỏi đã có góp ý chưa hoặc đã tới hạn chưa. Có thì ghi vào đúng `OQ` hoặc dòng feedback, sau đó tiếp tục.
5. Mọi stage `[x]` hoặc `[S]`: intent xong. Dev góp ý sau bàn giao thì mở lại R1 theo `handoff.md` mục Sau khi xong. Chạy vòng học một lần theo `stage-protocol.md`, kiểm app-map, gap log và file thiết kế UX trên repo PO đã cập nhật, sau đó đóng intent.

## 4. Yêu cầu đặc biệt

| Designer nói | Làm |
|---|---|
| "làm lại stage này" | Hỏi xác nhận. Chụp artifact hiện tại vào `archive/` với hậu tố `-redo`. Đặt stage về `[ ]` |
| "nhảy tới <stage>" | Nói rõ stage nào bị bỏ qua, ghi `[S] nhảy qua`, hỏi xác nhận. Nhảy tới E1, E2, E3 khi D3 chưa qua thì từ chối: chỉ dựng UI, trên Figma hoặc bằng HTML, khi chiến lược đã được các bên đồng thuận |
| "màn này cần làm mới", "thiếu component" | Nâng mức thiết kế của màn theo `design-levels.md`, thêm bước còn thiếu, ghi DEC |
| "dừng hôm nay" | Ghi Parked, nói cách tiếp tục |
| "PO đổi yêu cầu", "bổ sung màn", "bỏ flow" | Chuyển sang `/change-request` |
| "BA góp ý đổi chỗ nút", "dev bảo khó làm" | Góp ý thiết kế: ghi ngay vào feedback matrix, kể cả khi đang ở stage khác; xử lý ở R1. Ý kiến về khả năng làm thì mở Dev Feasibility Gate. Góp ý làm đổi chiến lược đã đồng thuận thì chuyển `/change-request` |

## 5. Trước khi chạy một stage
Đọc theo thứ tự: `engine/protocol/stage-protocol.md`, `domain/domain.md`, command của stage, `state.md`, `decisions.md` theo cột Read when, `intent.md`, `memory/team.md`.

## Luôn
- Trước stage đầu tiên của một phiên, nói một dòng bằng lời thường: việc nào, đang ở bước nào, bước này làm gì.
- Không chạy hai stage trong một lượt.
- Stage command theo slug: context-overview, design-strategy, alignment, ux-brief, ui-design, prototype, review-refine, handoff. Không tìm thấy thì nói rõ, không tự dựng cách làm.
