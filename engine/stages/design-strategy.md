---
description: Stage D2 Design Strategy. Từ PRD đã hiểu ra chiến lược thiết kế: flow, màn, state, trường hợp biên, mức thiết kế từng màn, ánh xạ UI kit, accessibility, ý kiến về PRD. Strategy Gate. Gọi qua /ux
argument-hint: <intent-slug>
---
# D2 Design Strategy

| | |
|---|---|
| Stage | D2 Design Strategy |
| Slug | design-strategy |
| Phase | discovery |
| Execution | always |
| Produces | `discovery/design-strategy/design-strategy.md` · `flow-map.md` khi có flow mới hoặc màn mới · `flow-prototype.html` khi cần (tuỳ) · `design-strategy-questions.md` |
| Consumes | `context-overview.md` (bắt buộc) · PRD và artifact của PO theo KB mục 2 · app-map, screen register, màn liền kề trên Figma chỉ đọc · kit usage và gap log theo KB mục 5 |
| Requires | context-overview |
| Áp dụng | Cả intent; độ sâu rà trường hợp biên theo từng màn |
| Reviewer | none; Designer có thể gọi `/ux-review design-strategy.md` |
| Archive | yes |
| Template | `engine/templates/design-strategy.md` · `engine/templates/flow-map.md` |
| Checklist | `engine/verification/design-strategy.md` |
| Knowledge | `engine/protocol/design-levels.md` · `engine/knowledge/flow-analysis.md` · `screen-states.md` · `edge-case-sweep.md` · `accessibility.md` · `prototyping.md` (flow prototype) · `data-visualization.md` (màn có biểu đồ) · KB mục 4, 5, 9 |

Chạy theo `engine/protocol/stage-protocol.md`. Tương ứng Step 2, 3 của hướng dẫn cũ, và stage 2.5 Refined Mockups của AWS AI-DLC ở mức chiến lược (README mục "AWS AI-DLC làm phần thiết kế như thế nào").

## Mục đích
Biến PRD thành chiến lược thiết kế đủ để các bên (PO, Dev, QA) đọc và đồng thuận trước khi vẽ: thiết kế những màn nào, theo flow nào, mỗi màn có state nào, trường hợp biên nào, dùng component nào của UI kit, phần nào kit còn thiếu, màn nào cần sáng tạo, và Designer có ý kiến gì về PRD. Chưa vẽ UI.

## Các bước
1. Flow: flow chính, phụ, lỗi; sơ đồ Mermaid, mỗi node là một màn có mã, nhãn mũi tên là thao tác người dùng. PRD có vòng đời trạng thái thì màn hiển thị trạng thái phải khớp sơ đồ trạng thái của PRD.
2. Màn: danh sách màn mới, sửa, mirror; mỗi màn ghi user story mà nó phục vụ; vị trí trong app; màn hiện có bị ảnh hưởng. Mỗi user story có giao diện trong PRD phải có ít nhất một màn. CR trên màn có sẵn dùng bản kê thay đổi.
3. State: mỗi màn bảy state theo `screen-states.md`.
4. Mức thiết kế: mỗi màn L1, L2, L3 và độ phức tạp logic theo `design-levels.md`, kèm lý do, đối chiếu kit usage và gap log của module chứa màn (KB mục 5). Hộp xác nhận, modal, drawer có nội dung riêng được cấp mã SCR riêng, để Story List và QA trỏ tới được.
5. Ánh xạ UI kit: vùng chính của mỗi màn dùng component nào của kit. Phần kit chưa có ghi `GAP` và đề xuất hướng xử lý: dùng tạm component có sẵn, hoặc đề xuất bổ sung vào kit qua `/kit-proposal` (đề xuất, chưa dựng).
6. Trường hợp biên và permission: bước riêng, độ sâu theo từng màn. Gắn mức Must, Should, Optional.
7. Accessibility: mức theo KB mục 9; điểm cần lưu ý từng màn (tương phản, bàn phím, nhãn, cỡ chữ).
8. Màn L3: hướng sáng tạo ở mức ý định (vì sao cần khác biệt, cảm giác muốn tạo), design ref đã có hoặc cần có. Chưa chọn hướng thị giác chi tiết, việc đó ở E1.
9. Ý kiến về PRD: mỗi dòng một lập trường Đồng ý, Đề xuất sửa, Phản đối, kèm mã yêu cầu và lý do. Không sửa PRD.
10. Rủi ro và câu hỏi: câu hỏi cho PO, Dev, QA; chặn hoặc không.
11. Flow prototype (tuỳ chọn): flow mới phức tạp, nhiều nhánh, hoặc Designer muốn các bên thao tác thử luồng trước khi họp, thì sinh `flow-prototype.html` mức khung xám theo `prototyping.md` mục Flow prototype.

## Ask
- Flow hoặc màn phát sinh ngoài yêu cầu gốc: Designer quyết định có đề xuất không; ngoài phạm vi thì vào Nice-to-have hoặc thành ý kiến Đề xuất sửa PRD.
- Modal, drawer hoặc page khi không suy được từ pattern app.
- Mức thiết kế khi lưỡng lự.
- Màn nào AI dựng UI, màn nào Designer dựng.
- Có cần flow prototype không.

## Generate
- `design-strategy.md` theo template: bản đầy đủ dùng nội bộ, có bảng duyệt từng dòng. Mọi màn L1 có thêm UX Brief nén (component và nội dung chữ từng màn).
- `flow-map.md`: phụ lục phân tích, chỉ khi có flow mới hoặc màn mới.
- `GAP` mới ghi vào gap log của module theo KB mục 5; module chưa khai nơi lưu gap log thì ghi vào `domain/gap-log.md`. Không để GAP chỉ nằm trong chiến lược.

## Gate
Strategy Gate. Designer duyệt từng dòng của bảng duyệt. AI không tự quyết định: đổi flow chính; thêm màn ngoài yêu cầu gốc; modal hoặc page lệch pattern của app; mức thiết kế của màn; ý kiến Đề xuất sửa hoặc Phản đối PRD; assumption thuộc nhóm thao tác không hoàn tác.
Sau Approved: stage kế là D3 Alignment, nơi chiến lược được đẩy lên repo của PO.
