---
description: Stage H1 Handoff & Done. Delivery summary, ghi chú bàn giao trên Figma, checklist trước bàn giao, change log cuối, nội dung cập nhật task. Delivery Gate. Gọi qua /ux
argument-hint: <intent-slug>
---
# H1 Handoff & Done

| | |
|---|---|
| Stage | H1 Handoff & Done |
| Slug | handoff |
| Phase | delivery |
| Execution | always |
| Produces | `delivery/handoff/delivery-summary.md` · ghi chú bàn giao trên Figma · file thiết kế UX trên repo PO đã cập nhật link · nội dung cập nhật task |
| Consumes | `design-strategy.md`, `feedback.md` (bắt buộc) · `flow-map.md`, `ux-brief.md`, `build-report.md`, `design-review.md` (tuỳ) · frame ở page chính |
| Requires | review-refine |
| Áp dụng | Cả intent |
| Reviewer | none |
| Archive | yes |
| Template | `engine/templates/delivery-summary.md` |
| Checklist | `engine/verification/handoff.md` |
| Knowledge | KB mục 2 (file thiết kế UX trên repo PO), mục 5, mục 7 (cách gọi trong code), mục 11 (nơi bàn giao, công cụ task) |

Chạy theo `engine/protocol/stage-protocol.md`. Tương ứng Step 8 và Step 9 trong tài liệu hướng dẫn cũ.

## Mục đích
Dev làm được mà không phải hỏi lại những điều đã quyết định, và task được đóng có dấu vết.

## Các bước
1. Kiểm file Figma theo checklist trước bàn giao: đủ màn, đủ state, tên frame và layer rõ, link sẵn sàng; prototype khớp bản Figma cuối.
2. Lưu version có tên trên Figma cho bản bàn giao (`<slug> handoff v<N>`), hoặc nhờ Designer lưu khi công cụ không lưu được. Mọi link bàn giao kèm version này: link frame và tên version, hoặc link mở đúng version khi công cụ cho phép. Không bàn giao bằng link "bản mới nhất": file còn thay đổi sau khi Dev đã nhận.
3. Ghi chú bàn giao ngay trên Figma cạnh frame, hoặc bằng annotation khi công cụ cho phép: điều kiện hiện từng state, tương tác chính, giới hạn ký tự và cách cắt chữ dài, trường hợp biên và permission, điểm Dev được tự quyết định, `GAP` kèm cách xử lý tạm. Figma là nơi Dev đọc; không chép lại thiết kế sang Markdown.
4. `delivery-summary.md` là mục lục và checklist, không chép lại thiết kế: tóm tắt tính năng; màn kèm link; bảng state lấy từ `design-strategy.md` và frame thật; tương tác và trường hợp biên chỉ ghi điểm Dev dễ sót, phần còn lại trỏ về ghi chú trên Figma; góp ý Dev đã xử lý; việc còn treo; ngoài phạm vi và Nice-to-have; checklist Dev kiểm khi làm.
5. Cập nhật file thiết kế UX trên repo của PO: cột Figma (kèm version bàn giao) của danh sách màn, link prototype, thay đổi so với bản đã đồng thuận (nếu có, kèm lý do). Theo quy ước ở KB mục 2; xem diff, commit khi Designer duyệt. Mã màn trong file này là nơi Story List của PO lấy mã màn.
6. Change log cuối: tóm tắt quyết định đã thống nhất và các vòng sửa, từ `decisions.md` và `feedback.md`.
7. Nội dung cập nhật task: đoạn ngắn để chuyển task sang Done trên công cụ ghi ở KB mục 11. Đăng lên công cụ đó chỉ khi Designer yêu cầu; mặc định trình nội dung để Designer tự đăng.

## Gate
Delivery Gate. Trình: số màn, số state, ghi chú bàn giao đã có trên bao nhiêu màn, việc còn treo, link Figma cuối. Sau Approved: app-map trạng thái "đã bàn giao". Intent xong, chạy vòng học một lần.

## Sau khi xong
Dev góp ý khi đang làm (khó làm, thiếu state): mở lại R1 cho màn liên quan, không tạo intent mới; xong thì cập nhật ghi chú trên Figma và `delivery-summary.md` lên version mới. Góp ý làm đổi phạm vi: `/change-request`.
