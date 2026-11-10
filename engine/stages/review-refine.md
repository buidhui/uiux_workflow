---
description: Stage R1 Review & Refine. Review độc lập, gom góp ý của BA, Dev, Reviewer thành feedback matrix, xử lý khả thi với Dev, cập nhật UI và change log. UI Gate. Gọi qua /ux
argument-hint: <intent-slug>
---
# R1 Review & Refine

| | |
|---|---|
| Stage | R1 Review & Refine |
| Slug | review-refine |
| Phase | delivery |
| Execution | always |
| Produces | `delivery/review-refine/feedback.md` · `design-review.md` và `context.md` khi có review độc lập · `fix-prompt.md` khi cần · Figma hoặc file HTML đã cập nhật |
| Consumes | frame Figma của màn Figma + HTML, file HTML và ảnh chụp của màn chỉ HTML (bắt buộc) · `design-strategy.md` (bắt buộc) · `ux-brief.md`, `build-report.md`, prototype (khi có) · góp ý của BA, Dev, Reviewer (Designer dán vào hoặc lấy từ comment Figma, Jira) |
| Requires | prototype, hoặc ui-design khi E3 bỏ qua |
| Áp dụng | Review độc lập bắt buộc cho màn L2, L3 và màn logic phức tạp; màn L1 logic thường khi Designer muốn |
| Reviewer | ux-lead |
| Archive | yes |
| Template | `engine/templates/feedback.md` · `engine/templates/design-review.md` · `engine/templates/fix-prompt.md` |
| Checklist | `engine/verification/review-refine.md` |
| Knowledge | `engine/knowledge/scorecard.md` · `heuristics.md` · `accessibility.md` · `screen-states.md` · KB mục 5, 9, 11 |

Chạy theo `engine/protocol/stage-protocol.md`, review theo `review-protocol.md`. Tương ứng Step 7 và nhánh Dev comment về tính khả thi trong tài liệu hướng dẫn cũ.

## Mục đích
Thiết kế đúng phạm vi, đúng design system, đúng chuẩn nghề, mọi góp ý bắt buộc đã xử lý, và Dev làm được.

## Hai vòng, theo thứ tự
Vòng 1, nội bộ, nhanh: sửa xong lỗi do AI review tìm ra trước khi đưa thiết kế cho người khác xem.
1. Review độc lập cho màn cần: AI đo số liệu, ghi `context.md`; agent `ux-lead` tự xem thiết kế qua quyền đọc Figma, ghi `design-review.md` với bảng điểm, verdict, finding. Màn L3 thêm tiêu chí bám reference lock. Màn chỉ HTML: số đo lấy từ CSS đã tính của trình duyệt và từ báo cáo `prototype-audit.mjs`, ảnh chụp từng màn ở các breakpoint ghi vào `context.md`; trục Consistency chấm theo bảng ánh xạ component ở KB mục 7.
2. Finding vào feedback matrix trong `feedback.md`. Designer sửa tay, hoặc AI sửa trong khu vực nháp khi được yêu cầu. Màn chỉ HTML: AI sửa thẳng trong file HTML.
3. Soạn sẵn tin nhắn mời BA, Dev, Reviewer góp ý: link frame hoặc file HTML, cách mở prototype, điều cần họ xem, hạn góp ý.

Vòng 2, góp ý của người khác, không đồng bộ:
4. Chờ góp ý: ghi Parked, lý do "chờ góp ý tới <ngày>". Trạng thái này khác Blocked: Designer làm việc khác trong lúc chờ.
5. Góp ý tới lúc nào thì nhận lúc đó, kể cả khi stage khác đang chạy: Designer dán vào chat hoặc cho link comment, AI ghi ngay vào matrix. Mỗi dòng: người góp ý, nội dung nguyên văn, phân loại (BA, Dev, Design, lỗi UX, lỗi UI), mức (bắt buộc, tuỳ chọn), hướng xử lý, trạng thái.
6. Góp ý cần BA xác nhận: gom thành tin nhắn dán thẳng; chặn thì Blocked. Góp ý làm đổi chiến lược đã đồng thuận ở D3: chuyển `/change-request`.
7. Xử lý: sau mỗi vòng sửa, lưu version có mô tả là các dòng đã xử lý (Figma: version có tên; HTML: commit); cập nhật prototype cho khớp; ghi change log vào `feedback.md`. Chạy lại tự kiểm cho phần đã sửa, chấm lại các trục bị trừ nếu có review độc lập.

Không ai góp ý tới hạn: Designer quyết định đi tiếp với Approved with Notes, ghi rõ "chưa có góp ý của <ai>".

## Dev Feasibility Gate
Mở khi Dev nói một phần UI khó làm hoặc chưa hợp lý về kỹ thuật, trước hoặc sau UI Gate nhưng trước Delivery Gate:
- Xác định vấn đề nằm ở component, layout, state, tương tác hoặc dữ liệu.
- Đưa hai đến ba phương án, giữ mục tiêu UX nếu có thể, ghi trade-off từng phương án.
- Soạn sẵn tin nhắn trả lời Dev.
- Designer chọn phương án; ghi DEC kèm nguyên văn của Dev; cập nhật UI và matrix.

## UI Gate
Trình bảng điểm (khi có review), số góp ý theo trạng thái, góp ý bắt buộc còn mở, change log. Không đánh dấu xong khi còn góp ý bắt buộc chưa xử lý, trừ khi Designer chọn Approved with Notes và ghi rõ lý do.
Verdict review xấu thì thêm lựa chọn xuất fix-prompt: đọc lại scope, đo lại thiết kế hiện tại, viết `fix-prompt.md` tự chứa.
Sau Approved: Designer chuyển frame từ khu vực nháp sang page chính (màn Figma + HTML); AI cập nhật node hoặc màn HTML trong `state.md` và app-map. Stage kế: H1.
