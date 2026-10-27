# Knowledge pack nghề UIUX

Kiến thức chung cho vai UI/UX Designer, không phụ thuộc sản phẩm. Khác với `domain/`, là Product KB của sản phẩm đang cài. Stage và lệnh ghi file nào cần đọc. Mỗi file có mục Nguồn ở cuối: file nguồn đã dùng, phần đã bỏ hoặc sửa so với nguồn.

| File | Nội dung | Stage đọc | Tình trạng |
|---|---|---|---|
| `requirement-reading.md` | Thứ tự đọc, loại tài liệu và mức hoàn thiện, phân loại câu, chuẩn câu yêu cầu, user task, vai và quyền ở mức hiển thị, ba bẫy của CR notes, đọc wireframe của PO, câu hỏi cho PO | D1 | Đã viết |
| `flow-analysis.md` | Phân rã mục tiêu thành flow và bước, loại flow, từ bước ra màn, định vị màn (page, modal, drawer, bottom sheet, hộp xác nhận), ảnh hưởng lên màn hiện có, gán mức thiết kế, ví dụ | D2 | Đã viết |
| `edge-case-sweep.md` | Năm câu cấp flow, năm nhóm cấp màn, thao tác không hoàn tác, Must, Should, Optional, hành động bị chặn theo quyền, đặc tả hành vi | D2 | Đã viết |
| `screen-states.md` | Bảy state cấp màn, quy tắc khai | D2, E1, E2, R1, H1 | Đã viết |
| `ux-writing-vi.md` | Nguyên tắc chữ trên giao diện tiếng Việt: nút, lỗi, trạng thái rỗng, xác nhận, nhãn, chuỗi dài nhất | D2, E1, E2 | Đã viết |
| `reference-research.md` | Design ref cho màn L3: nguồn theo thứ tự ưu tiên, phân tích ref, chống trung bình hoá, reference lock | E1, R1 | Đã viết |
| `prototyping.md` | Flow prototype và prototype HTML: chuẩn chung, bảng điều khiển, dữ liệu mẫu, ba bậc kiểm | D2, E3 | Đã viết |
| `data-visualization.md` | Chọn biểu đồ theo câu hỏi của người dùng, khi nào không dùng, màu và nhãn, phương án bảng, state của khối biểu đồ, GAP | D2, E1, R1 | Đã viết |
| `heuristics.md` | Nguyên tắc chấm, mười heuristic của Nielsen, cognitive walkthrough, phân cấp thị giác, dịch chuẩn ngành sang thước của domain, viết finding | R1 | Đã viết |
| `accessibility.md` | WCAG 2.2 mức AA: tương phản, vùng chạm, focus, tên cho trình đọc màn hình, không chỉ dựa vào màu, chữ tiếng Việt có dấu, kiểm ở Figma hoặc ở code | E2, R1 | Đã viết |
| `scorecard.md` | Bảy trục, công thức trừ điểm chia theo số màn, luật trần, verdict, cách hiệu chỉnh | R1, `/ux-review` | Đã viết, chưa hiệu chỉnh |

Nguồn chung của bộ này: bộ skill `claude-skills-uiux-vic` (gồm `refero-design`), kiến thức Design Agent của AWS AI-DLC (`core/knowledge/aidlc-design-agent/`, MIT-0), WCAG 2.2 của W3C, mười heuristic của Nielsen, bảng biểu đồ của ui-ux-pro-max-skill (MIT), hướng dẫn cũ của team `User Guide_UI-UX- Workflow w AI.md`. Khi lấy thêm từ nguồn: chỉ giữ phương pháp; không mang tên biến, node, file key, tên sản phẩm của nguồn; không mang số liệu không có nguồn.

Một số quy tắc trong bộ này do engine tự đặt, không có trong nguồn (ví dụ sàn và trần của công thức trừ điểm, phần chữ tiếng Việt có dấu). Mục Nguồn của từng file ghi rõ những quy tắc đó.
