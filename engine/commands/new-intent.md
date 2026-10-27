---
description: Tạo intent thiết kế mới và chạy ngay D1 Context Overview. Hỏi bù thông tin domain tối thiểu nếu còn thiếu
argument-hint: <tên tự do> [mô tả, đường dẫn tài liệu, link Jira, link Figma]
---
# /new-intent

Tạo việc và đi thẳng vào D1, không dừng giữa chừng. Đường đi (mức thiết kế từng màn, số gate) được xác nhận một lần ở Context checkpoint, khi AI đã đọc xong tài liệu.

## Đầu vào
`$ARGUMENTS`: tên do Designer đặt, có thể kèm mô tả, đường dẫn tài liệu, link Jira hoặc Lark, link Figma, ảnh wireframe của PO, design ref, hoặc đường dẫn một file review ở `adhoc/` (việc cải tiến do Designer tự khởi xướng). Thiếu tên thì lấy tên từ tài liệu, không hỏi.

Slug: PO đã có mã intent thì dùng đúng mã đó, để một việc có cùng mã ở repo PO và repo UIUX. Chưa có mã: bỏ dấu, chữ thường, gạch nối, tiền tố ngày `YYMMDD-`. Trùng slug đã có: báo và hỏi dùng tiếp hoặc đặt tên khác.

## 1. Domain tối thiểu
Chưa có `.uiux/setup.md` hoặc trạng thái khác `xong`: chạy `/setup` trước, sau đó quay lại bước này.

Đọc `domain/domain.md`; chưa có file thì chép khung từ `engine/templates/domain/` sang `domain/` trước. Sáu thông tin dưới đây phải có để chạy việc; thiếu thì hỏi bù trong một lượt, ghi vào `domain.md`, không bắt Designer làm hết `DOMAIN-SETUP.md`:
1. Sản phẩm, nền tảng, breakpoint chính (KB mục 1)
2. Repo của PO và cách đồng thuận chiến lược thiết kế (KB mục 2)
3. File UI kit và hướng dẫn dùng kit; mức sẵn sàng, không chắc thì 0 (KB mục 5)
4. File Figma thiết kế, khu vực nháp cho AI (KB mục 6)
5. Thư viện component frontend cho prototype (KB mục 7)
6. Nơi nhận góp ý và công cụ quản lý task (KB mục 11)

Đã có đủ thì bỏ qua bước này, không hỏi lại.

## 2. Scaffold
Tạo `intents/<slug>/`:
```
intent.md        từ engine/templates/intent.md
state.md         từ engine/templates/state.md
decisions.md     từ engine/templates/decisions.md
memory.md        từ engine/templates/memory.md
inputs/          tài liệu yêu cầu, wireframe, ảnh màn cũ; inputs/refs/ cho design ref
discovery/  execution/  delivery/  archive/
```
Thư mục con của stage tạo khi stage chạy. Thư mục rỗng có `.gitkeep`.

Ghi vào `intent.md` mục Nguồn yêu cầu: repo và đường dẫn intent của PO, version PRD đã duyệt. PRD chưa được duyệt thì báo Designer: luồng bắt đầu từ PRD đã duyệt; muốn đọc trước bản nháp thì ghi rõ mức hoàn thiện là Nháp.

Có mô tả thì ghi nguyên văn vào `inputs/request-<YYYYMMDD>.md`. Có link thì ghi vào `intent.md` mục Nguồn yêu cầu. Chưa có tài liệu nào thì dừng ở đây, nói Designer đặt file vào `inputs/` hoặc dán link, sau đó nói "bắt đầu".

## 3. Chạy D1
Ghi `state.md` khung (bảng Stages đủ tám stage, chưa đánh `[S]`), sau đó chạy ngay `engine/stages/context-overview.md`. Mức thiết kế từng màn và đường đi được ước tính ở D1, xác nhận ở Context checkpoint.
