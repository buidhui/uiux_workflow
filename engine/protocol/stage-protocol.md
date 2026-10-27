# Stage Protocol

Nghi thức chung cho mọi stage, áp cho intent nằm trong `intents/`. Mỗi stage command chỉ mô tả phần riêng của nó và trỏ về đây. Khung tham khảo PO-Workflow, rút gọn cho nhịp làm việc của Designer: ít lượt dừng hơn, nhiều hình hơn, Figma là nơi làm việc chính.

File đi kèm: `gate-protocol.md` (duyệt), `question-format.md` (hỏi và ghi câu trả lời), `review-protocol.md` (review độc lập), `design-levels.md` (mức thiết kế và độ phức tạp từng màn), `figma-protocol.md` (thao tác Figma). Thuật ngữ và họ mã: `GLOSSARY.md` ở gốc repo.

## Người dùng là Designer

Designer đang làm thiết kế của họ, không học quy trình. Nói về công việc: màn, flow, state, quyết định. Không dùng từ của hệ thống khi nói với Designer; dùng từ thường theo bảng dưới. Việc chỉ là ghi chép thì làm trong im lặng.

| Từ trong repo | Nói với Designer |
|---|---|
| intent | yêu cầu, việc |
| gate | duyệt |
| delta table | bản kê thay đổi |
| design-strategy | chiến lược thiết kế |
| GAP | thư viện chưa có |
| L1, L2, L3 | màn có sẵn, màn mở rộng, màn sáng tạo |

Designer nói tự nhiên, gửi ảnh khoanh vùng, dán link Figma bất kỳ lúc nào. Ảnh và link được ưu tiên đọc trước khi hỏi.

## Khối metadata ở đầu mỗi stage command

| Khoá | Nghĩa |
|---|---|
| Stage | Mã và tên: `D2 Design Strategy` |
| Slug | kebab-case, trùng tên file command và tên thư mục artifact |
| Phase | `discovery` (Discovery & Strategy), `execution` (Design Execution), `delivery` (Review, Refine & Deliver) |
| Execution | `always`, hoặc `conditional` kèm điều kiện |
| Produces | Artifact sinh ra, kèm questions file |
| Consumes | Artifact đọc vào, ghi rõ bắt buộc hoặc tuỳ |
| Requires | Stage phải xong trước |
| Áp dụng | Màn nào, theo `design-levels.md` |
| Reviewer | `ux-lead` hoặc `none` |
| Archive | `yes` khi artifact có người ngoài Designer dùng; `no` khi chỉ là bước trung gian |
| Template · Checklist · Knowledge | Đường dẫn file |

## Sáu bước

### 1. Load
- Đọc `state.md` của intent. Stage này phải là stage kế tiếp hoặc stage chưa hoàn tất. Nếu không, dừng và hỏi Designer.
- Đọc `decisions.md`, `domain/domain.md` (Product KB: các mục command của stage liệt kê, và mục 5 mức sẵn sàng), `intent.md`, artifact trong Consumes, file knowledge mà command liệt kê, `memory/team.md`.
- Không hỏi lại câu đã có đáp án trong `decisions.md` hoặc questions file trước đó.
- Đánh dấu stage `[-]`. Stage `[-]` hoặc `[R]` từ phiên trước: tiếp tục từ phần chưa hoàn tất. Stage `[?]`: trình lại gate, không làm lại.

### 2. Ask
- Hỏi bằng hộp chọn theo `question-format.md`, ghi vào `<slug>-questions.md` trong thư mục của stage. Designer trả lời bằng lời hoặc bằng ảnh cũng được; AI ghi lại vào file.
- Câu hỏi về nghiệp vụ không hỏi Designer quyết định. Ghi vào mục "Câu hỏi cho BA, PO" của artifact với `❓PO`, ở dạng dán thẳng được vào tin nhắn. Câu đó chặn stage chỉ khi đáp án làm đổi danh sách màn hoặc flow chính; chặn thì gate dùng phản hồi Blocked.
- Câu có cờ Chặn còn trống: dừng ở bước này.

### 3. Generate
- Viết artifact theo template, giữ đúng heading. Xoá mọi chữ hướng dẫn mẫu. Mục không có nội dung thì bỏ hẳn.
- Artifact nội bộ (context-overview, flow-map, design-strategy mục 8 trở đi, ux-brief, build-report, design-review, feedback): thẻ nguồn ở mỗi khối khẳng định theo `question-format.md`. Mục Assumptions & Open Questions bắt buộc, không có thì ghi "None".
- Artifact bàn giao (design-strategy mục 1 đến 7, file thiết kế UX trên repo PO, delivery-summary, prototype, fix-prompt, tin nhắn gửi BA, PO, Dev): không thẻ nguồn, không từ ngữ quy trình, mã kèm nội dung.
- Flow và quan hệ màn thể hiện bằng sơ đồ (Mermaid trong file), không chỉ bằng bảng. Cách vẽ và cách kiểm cú pháp theo `diagram-protocol.md`.
- Mã ổn định theo `GLOSSARY.md`. Mã đã cấp không đánh lại.
- Tên file ổn định. Phiên bản và trạng thái ở frontmatter `version`, `status`.
- Stage ghi vào Figma: theo `figma-protocol.md`, không có ngoại lệ.

### 4. Verify
- Chạy checklist của stage. Mục `[BLOCK]` chưa đạt thì sửa trước, chưa trình gate.
- Review độc lập theo `review-protocol.md` khi `design-levels.md` yêu cầu cho màn đó. Không tự sửa theo finding, finding đi vào gate.

### 5. Note
- Trong lúc làm, thêm dòng vào `memory.md` của intent dưới một trong bốn mục Interpretations, Deviations, Tradeoffs, Open questions. Không hỏi Designer ở bước này.
- Designer sửa AI cùng một lỗi lần thứ hai trong intent: hỏi ngay một câu có muốn ghi thành bài học không.

### 6. Gate
Theo `gate-protocol.md`.

## Vòng học, một lần mỗi intent
Khi intent xong hoặc đóng: đưa các dòng trong `memory.md` thành danh sách chọn, hỏi "Có gì cần nhớ cho lần sau không?". Dòng được giữ: đối chiếu với `AGENTS.md`, ghi vào `memory/team.md` dạng `- <nội dung> (learned YYYY-MM-DD)`. Không hỏi ở từng gate.

## Stage nén hoặc bỏ qua
- E1 nén vào D2 khi mọi màn L1: ghi `[S] nén vào D2`, không mở gate.
- E2 khi Designer tự dựng UI: ghi link frame, AI chỉ tự kiểm, sang E3.
- E3 bỏ qua với CR trên màn có sẵn khi Designer không yêu cầu: ghi `[S]` kèm lý do.
- D1 chạy liền D2 với CR mọi màn L1 logic thường: không mở Context checkpoint riêng.

## Nâng mức giữa chừng
Phát hiện màn cần mức cao hơn theo `design-levels.md`: nói ngay, tại gate gần nhất đề xuất nâng mức và thêm bước còn thiếu cho màn đó.

## Góp ý thiết kế khác với đổi phạm vi
Góp ý của BA, Dev, Reviewer, Designer khác lên thiết kế (đổi vị trí nút, đổi cách hiển thị, chỉnh cho khả thi) mà không đổi chiến lược đã đồng thuận: ghi vào feedback matrix của R1 và xử lý trong phase, không cần `/change-request`. Chỉ khi chiến lược đã đồng thuận ở D3 phải đổi (thêm, bớt màn, đổi flow, yêu cầu đổi) mới chuyển sang `/change-request`.

## Luôn đúng
- Tách `Fact`, `Assumption`, `Open Question`, `Recommendation`. Không tự điền dữ kiện.
- Không phân tích lại nghiệp vụ. Không sửa yêu cầu của PO; điểm chưa rõ ghi `❓PO`.
- Không quyết định thay Designer.
- Thứ UI kit chưa có: `GAP`, ghi vào gap log của sản phẩm (KB mục 5), đề xuất bổ sung bằng `/kit-proposal`, không tự chế.
- Domain pack là bản chụp. Chạm vùng nào thì đọc lại nguồn sống vùng đó, nhất là thư viện Figma và app-map.
- Một stage một lượt. Mỗi stage kết thúc ở gate.
