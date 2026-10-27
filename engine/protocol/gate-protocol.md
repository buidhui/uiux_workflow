# Gate Protocol

Mỗi stage kết thúc ở một điểm Designer xác nhận. Gate để chặn sai sót ở từng tầng: sửa sai ở chiến lược tốn ít công hơn sửa trên Figma, sửa trên Figma tốn ít công hơn sửa sau khi Dev làm. Người duyệt là Designer, trừ Alignment Gate nơi các bên đồng thuận chiến lược. BA, PO, Dev trả lời câu hỏi và góp ý.

## Các gate

| Gate | Sau stage | Người xác nhận | Mục tiêu |
|---|---|---|---|
| Context checkpoint | D1 | Designer | AI hiểu đúng PRD và bối cảnh. Gộp vào Strategy Gate khi D1 và D2 chạy liền |
| Strategy Gate | D2 | Designer | Chiến lược thiết kế đúng và đủ trước khi đưa các bên đọc |
| Alignment Gate | D3 | Các bên theo KB mục 2, Designer xác nhận lần cuối | Các bên đã đồng thuận chiến lược, không còn chỉnh sửa. Chỉ sau gate này mới vẽ lên Figma |
| UX Brief Gate | E1 | Designer | Bố cục, nội dung chữ, hướng thị giác (L3), component đề xuất (L2) đúng trước khi làm UI. Bỏ khi E1 nén |
| UI Gate | R1 | Designer, cùng Reviewer khi có | UI và prototype đúng chiến lược, đúng design system, góp ý bắt buộc đã xử lý |
| Dev Feasibility Gate | Trong R1, khi Dev có ý kiến | Designer, trao đổi với Dev | Phương án chỉnh khả thi để làm |
| Delivery Gate | H1 | Designer | Đủ màn, state, prototype, ghi chú bàn giao; file thiết kế UX trên repo PO đã cập nhật link |

Alignment Gate là điểm duy nhất bên ngoài tham gia đồng thuận, ở cấp chiến lược. Phần chi tiết sau đó do Designer quyết định; PO muốn xem thiết kế cuối thì xem trên Figma và prototype.

## Trước khi mở gate
- Checklist của stage đã đạt mục `[BLOCK]`. Review độc lập đã xong nếu màn cần.
- Đánh dấu stage `[?]` trong `state.md`.

## Thông điệp hoàn thành
1. Tiêu đề: `# <Tên stage> xong`.
2. Bảng kết quả bằng số: số flow, số màn theo mức thiết kế, số state, số trường hợp biên bắt buộc, số câu hỏi BA, PO còn mở.
3. Kết quả review nếu có: điểm, verdict, finding còn mở.
4. Chỗ để mở: đường dẫn file, link frame Figma, sơ đồ flow.
5. Câu hỏi duyệt bằng hộp chọn, bốn lựa chọn dưới đây.

## Bốn cách phản hồi

| Phản hồi | Khi nào | Hệ quả |
|---|---|---|
| Approved | Đã ổn, đi tiếp | Ghi DEC. Chụp bản duyệt nếu stage có Archive `yes`. `[x]`. Sang stage kế |
| Approved with Notes | Cơ bản ổn, cần lưu ý ở bước sau | Như Approved; ghi chú lưu vào DEC và đưa vào bước Load của stage sau |
| Need Revision | Chưa đạt | `[R]`. Lời Designer là phản hồi. Sửa đúng phần nêu, chạy lại review nếu artifact đổi, trình lại |
| Blocked | Thiếu thông tin cần BA, PO, Dev xác nhận | Ghi Parked kèm danh sách câu chờ, dạng tin nhắn dán thẳng. Designer gọi `/ux` khi có câu trả lời |

Parked có ba lý do, ghi rõ trong `state.md`: Blocked (không đi tiếp được nếu chưa có câu trả lời), chờ đồng thuận ở D3, và chờ góp ý ở R1 (có hạn; tới hạn không ai góp ý thì Designer quyết định đi tiếp).

Từ lần Need Revision thứ ba, AI đề xuất Approved with Notes kèm điều kiện cụ thể, để không lặp vô hạn; Designer vẫn quyết định.

## Đọc câu trả lời của Designer
- "ok", "duyệt", "approved": Approved.
- Duyệt kèm ghi chú ("ok nhưng bước sau nhớ ..."): Approved with Notes.
- Duyệt kèm chỉ thị sửa nhỏ ("ok, đổi tên màn 3"): Approved, làm việc được yêu cầu, nói một dòng đã làm gì.
- "dừng hôm nay": ghi Parked, nói cách tiếp tục.
- Câu hỏi: trả lời, sau đó kết thúc lượt.
- Không rõ: hỏi một câu ngắn. Không suy đoán là duyệt.

## Ghi chép sau Approved
1. `decisions.md`: một dòng DEC, cột Nguyên văn là lời Designer không sửa chữ.
2. Stage có Archive `yes` (D2, D3, E1, R1, H1): chép artifact vào `archive/<slug>/<artifact>-v<N>-<YYYYMMDD>.md`, không ghi đè, không bao giờ sửa file trong archive.
3. `state.md`: `[x]`, bảng Versions, stage kế tiếp, việc kế tiếp.
4. Frontmatter artifact: `status: approved`, `approved_at`, `version` thành số nguyên kế tiếp.
5. Dòng tiến độ: `Progress: <đã xong>/<tổng stage> · Next: <tên stage kế>`.
6. Đề xuất một dòng: commit thư mục intent và các file KB vừa đổi trong repo sản phẩm, message `<slug>: <mã stage> approved`. Commit khi Designer đồng ý; push lên remote của sản phẩm chỉ khi Designer yêu cầu. Việc chưa commit qua nhiều ngày dễ mất khi đổi máy hoặc xoá nhầm.
