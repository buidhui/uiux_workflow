# Changelog

Thay đổi của engine UIUX-Workflow theo từng phiên bản. Mỗi bản có mục Nâng cấp khi repo sản phẩm cần làm thêm việc ngoài `git pull engine main`. Repo sản phẩm lấy bản mới theo `USER-GUIDE.md` mục A5; phần riêng của sản phẩm (`domain/`, `intents/`, `adhoc/`, `memory/`) giữ nguyên.

## Còn mở

| Việc | Ghi chú |
|---|---|
| Chạy thật trọn luồng E1 đến H1 | D1 đến D3 đã chạy thật một lần; nửa sau chưa chạy |
| Chạy thử làn chỉ HTML với một thư viện frontend thật | Cần mẫu bảng ánh xạ component kit sang code (Product KB mục 7) |
| Hiệu chỉnh `engine/knowledge/scorecard.md` | Agent và Designer chấm độc lập cùng một bộ màn, theo mục Hiệu chỉnh của file |
| Kiểm các khả năng ghi "Kiểm khi cài" ở `USER-GUIDE.md` mục A3 trên một file thật | Dựng instance, lưu version, đọc design context; ghi kết quả vào `.uiux/setup.md` |
| Chạy thử `/setup` trên một máy chưa cài gì, với từng lựa chọn Figma | Mới chạy trên một máy đã có sẵn công cụ |
| Lộ trình AI-DLC | Sau khi luồng theo SDLC vận hành ổn định: thêm stage wireframe ở 1.6 Rough Mockups, góp ý story ở 2.4, D2 và D3 nhận đầu vào từ user stories ở 2.5 |

## v0.11 - 2026-11-11

Agent review độc lập đổi tên từ UX Lead thành AI Reviewer (`engine/agents/ai-reviewer.md`, `.claude/agents/ai-reviewer.md`), cùng cách gọi với agent review của PO-Workflow; agent chấm điểm và nêu verdict, không phê duyệt. README: mục 1.2 Vòng đời của một intent giới thiệu mã stage ngay từ đầu và chứa sơ đồ tổng thể; bỏ mục vị trí trong vòng đời sản phẩm và mục lộ trình AI-DLC; dùng "thiết kế" thay cho "vẽ"; giải thích rõ câu hỏi cho PO và Designer.

Nâng cấp repo sản phẩm: sau `git pull engine main`, máy đã thêm tên công cụ Figma vào dòng `tools` của `.claude/agents/ux-lead.md` thì chép lại phần thêm đó sang `.claude/agents/ai-reviewer.md`; khi git báo xung đột ở file này, giữ tên file mới và dòng `tools` của máy.

## v0.10 - 2026-11-10

Đầu ra theo từng màn. Màn L1 đi làn chỉ HTML (không qua Figma) khi sản phẩm đạt ba điều kiện: Dev nhận bàn giao bằng HTML, có thư viện component frontend kèm bảng ánh xạ, người duyệt chấp nhận xem trên trình duyệt; màn L2, L3 đi Figma + HTML. E2 chỉ chạy cho màn Figma + HTML; E3 có chế độ dựng HTML làm thiết kế chính, tự kiểm và chế độ ghi chú bàn giao; R1 review được trên HTML; H1 bàn giao bằng HTML ghim theo commit và cập nhật lại Figma cho màn đã có. README viết lại thành bản giới thiệu quy trình: phạm vi, vai trò, đầu ra, nguyên lý, stage, mức thiết kế, kiểm tra chất lượng, kết nối với PO-Workflow và AI-DLC, cơ sở phương pháp; lịch sử và việc còn mở chuyển sang `CHANGELOG.md`.

Nâng cấp repo sản phẩm: bổ sung ba điều kiện vào `domain/domain.md` mục 2, 6, 7, 11; intent đang chạy giữ đầu ra Figma + HTML cho mọi màn.

## v0.9 - 2026-10-27

Khung Product KB mục 5, 6 có bảng theo module cho sản phẩm có nhiều module dùng kit và file Figma riêng; D2 có cột Module. Gap log luôn có nơi ghi dự phòng `domain/gap-log.md`. Kiểm prototype HTML theo ba bậc, không ghi "đã chạy thử" khi chưa chạy được trình duyệt. Slug intent dùng mã intent của PO khi có. Hộp xác nhận, modal có mã SCR. Sau mỗi gate AI đề xuất commit. H1 ghim version Figma cho mọi link bàn giao. Viết đủ knowledge nghề: đọc yêu cầu, phân tích flow, rà trường hợp biên, UX writing tiếng Việt, design ref, heuristic, accessibility theo WCAG 2.2, thang chấm review có công thức chia theo số màn (chưa hiệu chỉnh). Thống nhất mã màn `SCR<n>` trong template. Thêm `data-visualization.md` (chọn biểu đồ theo câu hỏi) và script `engine/scripts/prototype-audit.mjs` kiểm prototype HTML tự động (bậc 2), dựa trên ui-ux-pro-max-skill (MIT). Thêm `engine/protocol/diagram-protocol.md` (cách vẽ sơ đồ flow màn, bảng lỗi cú pháp đã thử trên Mermaid 11.12) và script `engine/scripts/mermaid-lint.mjs` kiểm cú pháp sơ đồ, cùng bộ quy tắc với `po-tools.py check` của PO-Workflow; D2 kiểm sơ đồ trước gate.

Nâng cấp repo sản phẩm: bổ sung bảng module vào `domain/domain.md` mục 5, 6 khi cần; intent đã tạo giữ slug cũ.

## v0.8.1 - 2026-10-22

Bỏ tên công ty và đường dẫn cụ thể của một công cụ dựng kit khỏi README, USER-GUIDE, DOMAIN-SETUP; viết lại thành điều kiện đúng với mọi sản phẩm

## v0.8 - 2026-10-22

Tách phần chung và phần riêng theo cơ chế của PO-Workflow. Engine chuyển từ `.claude/` sang `engine/` (`stages/` cho tám stage, `commands/` cho lệnh tiện ích); khung Product KB sang `engine/templates/domain/`; dữ liệu sản phẩm ở `domain/`, `intents/`, `adhoc/`, `memory/`; trạng thái cài đặt của máy ở `.uiux/`. `.claude/` chỉ còn lối tắt; bỏ lệnh riêng của từng stage, `/ux` là lối vào. Luật vận hành chuyển sang `AGENTS.md`, `CLAUDE.md` chỉ trỏ về.

Nâng cấp repo sản phẩm tạo từ v0.7 trở về trước: chuyển dữ liệu ở `.claude/knowledge/domain/`, `.claude/intents/`, `.claude/adhoc/`, `.claude/memory/`, `.claude/local/` sang thư mục mới trước khi `git pull engine main`.

## v0.7 - 2026-10-22

Gộp `SETUP.md` vào USER-GUIDE thành Phần A; thêm lệnh `/setup` tự cài đặt từ link repo và làm tiếp sau khi mở lại; trạng thái cài đặt và cách kết nối Figma của từng máy chuyển sang `.uiux/setup.md` (không đưa lên git), bỏ khỏi Product KB mục 6; repo sản phẩm dùng remote `engine` để lấy bản cập nhật engine

## v0.6 - 2026-10-22

Thêm `SETUP.md` với bốn cách kết nối Figma, ba trường hợp repo PO, cách kiểm tra sau khi cài; thêm `AGENTS.md` cho công cụ AI khác; `figma-protocol.md` thêm mục Công cụ kết nối; agent UX Lead đọc được Figma qua mọi lựa chọn và làm việc được với ảnh; USER-GUIDE thêm tình huống ngoài luồng chuẩn; viết lại văn phong toàn bộ tài liệu theo dạng văn viết

## v0.5 - 2026-10-22

Luồng theo SDLC bắt đầu từ PRD đã duyệt; D2 thành Design Strategy, thêm D3 Alignment đẩy chiến lược lên repo PO và chờ đồng thuận; thêm E3 Prototype HTML; bỏ dựng component, thay bằng `/kit-proposal`; Product KB mười một mục; đối chiếu và lộ trình AWS AI-DLC

## v0.1 đến v0.4 - 2026-10-13

Khung, rút nghi thức, mức thiết kế theo màn, tối ưu luồng
