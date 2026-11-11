---
description: Review độc lập bằng agent AI Reviewer cho design-strategy của một intent, hoặc review một màn hoặc luồng đang có ở chế độ shadow
argument-hint: <đường dẫn design-strategy.md | --shadow <link Figma | đường dẫn ảnh>>
---
# /ux-review

Theo `engine/protocol/review-protocol.md`. Không sửa artifact, không sửa Figma. Không ghi `state.md` trừ khi được gọi từ một stage.

## Scope review
1. Xác định artifact và intent. Kiểm D1 đã xong; chưa thì báo và hỏi có review tiếp không.
2. Gọi agent `ai-reviewer` chế độ scope review. Truyền đường dẫn: `engine/stages/design-strategy.md`, `design-strategy.md`, `flow-map.md`, `context-overview.md`, `GLOSSARY.md`, `engine/knowledge/screen-states.md`, file domain liên quan, review lần trước nếu có. Yêu cầu ghi `reviews/review-design-strategy-<NN>.md` trong thư mục intent; chưa có thư mục `reviews/` thì tạo.
3. Trình verdict, bảng finding, summary. Designer quyết định: sửa, hoặc ghi disposition vào `decisions.md`.

## Shadow, màn hoặc luồng đang có
1. Tạo `adhoc/<yymmdd-slug>/`. Ghi nguồn (link, node, ảnh) vào `source.md`.
2. Tóm tắt màn hoặc luồng trong năm dòng: màn gì, cho ai, làm được gì. Hỏi Designer xác nhận hiểu đúng, và có tài liệu yêu cầu để đối chiếu không.
3. Có link Figma: đo số liệu theo `review-protocol.md` mục Gọi reviewer, ghi `context.md`. Chỉ có ảnh: ghi rõ mọi nhận xét là visual judgment, các trục cần số đo ghi N/A.
4. Gọi agent `ai-reviewer` chế độ design review. Truyền `context.md`, `source.md`, `engine/knowledge/scorecard.md`, `engine/knowledge/heuristics.md`, `engine/knowledge/accessibility.md`, file domain về design system nếu domain từ mức 1. Yêu cầu ghi `design-review.md` trong thư mục adhoc.
5. Trình điểm, verdict, ba việc nâng điểm nhanh nhất. Designer muốn sửa thì gợi ý tạo intent bằng `/new-intent`, dùng file review làm đầu vào.
