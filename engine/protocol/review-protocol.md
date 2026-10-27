# Review Protocol

Review độc lập do agent `ux-lead` làm. Agent không thấy cuộc hội thoại, không thấy lý luận của AI soạn thảo hoặc AI dựng màn. Đó là chủ đích: màn do AI dựng không được chính AI đó chấm.

## Hai chế độ

| Chế độ | Khi nào | Đầu ra |
|---|---|---|
| Scope review | Khi Designer muốn, bằng `/ux-review <design-strategy.md>` | `reviews/review-design-strategy-<NN>.md` |
| Design review | Trong R1 cho màn mà `design-levels.md` yêu cầu, hoặc khi Designer muốn; hoặc `/ux-review --shadow` | `delivery/review-refine/design-review.md`, hoặc `adhoc/<slug>/design-review.md` |

## Gọi reviewer
- Dùng Task gọi agent `ux-lead` trong `.claude/agents/`.
- Truyền đường dẫn, không dán nội dung: command của stage, artifact cần review, artifact đầu vào, `GLOSSARY.md`, file knowledge liên quan, mục Product KB liên quan, file review lần trước nếu có.
- Design review: AI điều phối đo số liệu trên Figma trước, ghi vào `delivery/review-refine/context.md` (node của từng section, biến đang gán, text style, kích thước, tương phản tính từ giá trị thật), sau đó truyền đường dẫn file này. Agent có quyền đọc Figma (ảnh chụp, metadata, biến) để tự nhìn thiết kế và kiểm lại số đo; không có quyền ghi. Không có số đo do AI điều phối thì agent tự đo, nhưng không được dựa vào nhận xét của AI điều phối về tính thẩm mỹ.
- Không truyền: `memory.md`, bản nháp, lý luận của AI soạn thảo.
- Nói với Designer một câu: "Để UX Lead xem qua trước khi anh/chị đọc."

## Tiêu chí scope review
1. Mỗi user task có flow, mỗi bước flow có màn. Thiếu là finding.
2. Mỗi màn khai đủ bảy state theo `screen-states.md`, mỗi state có lý do.
3. Edge case Must đã vào scope, hoặc được ghi rõ là ngoài phạm vi kèm lý do.
4. Biên rõ: trong phạm vi, ngoài phạm vi, để sau.
5. Không có màn, flow ngoài yêu cầu gốc mà chưa có quyết định của Designer.
6. Câu hỏi cho PO còn mở được đánh dấu chặn hoặc không chặn đúng.
7. `GAP` của design system đã ghi, không giả định component hoặc state chưa có.

## Tiêu chí design review
Bảy trục và thang điểm theo `engine/knowledge/scorecard.md`. Màn L3 thêm tiêu chí bám reference lock: đặc điểm giữ lại có mặt, điều đã loại bỏ không xuất hiện. Mỗi finding có vị trí (node), hiện trạng đo được, giá trị đích (tên biến hoặc text style của domain), mức độ, cách sửa cụ thể. Nhận xét bằng mắt ghi nhãn `visual judgment`. `GAP` của design system không trừ điểm Designer.

## File review scope

```markdown
# Review: design-strategy · lần <NN>
**Verdict:** READY | NOT-READY
**Reviewer:** ux-lead · **Date:** <ISO>

## Prior findings
| ID | Now | Severity | Note |
|---|---|---|---|

## New findings
| Severity | Location | Finding | Required action |
|---|---|---|---|

## Summary
```

| Mức | Nghĩa | Chặn READY |
|---|---|---|
| Critical | Không thiết kế đúng được từ bản này: thiếu màn, thiếu flow, mâu thuẫn | Có |
| Major | Thiết kế được nhưng sẽ phải làm lại hoặc gây hiểu lầm | Có, khi quá hai Major |
| Minor | Nên sửa, không chặn | Không |

## Tại gate
- Finding của design review đi vào feedback matrix của R1, cùng góp ý của BA, Dev, Reviewer.
- Approved khi còn finding mở: ghi Accepted risk vào `decisions.md`.
- Designer bác một finding: ghi `Rejected: <lý do nguyên văn>`.
- Không chép lịch sử review vào artifact.

## Shadow, review một màn có sẵn
`/ux-review --shadow <link Figma | ảnh>`: không cần intent. Trước khi gọi agent, tóm tắt màn hoặc luồng để Designer xác nhận hiểu đúng. Không có scope nên trục Requirement fit là N/A, thang điểm quy đổi lại theo `scorecard.md`. Mục đích dùng cho rà soát định kỳ màn đang chạy, ví dụ heuristic evaluation trước khi mở sản phẩm cho khách mới.
