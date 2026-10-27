# Đọc tài liệu yêu cầu

Dùng ở D1 Context Overview. Mục tiêu: hiểu yêu cầu đủ để thiết kế. UIUX không phân tích lại nghiệp vụ và không viết lại yêu cầu của PO; câu yêu cầu chưa đủ để thiết kế thành câu hỏi `❓PO`. Kết quả ghi vào `context-overview.md` theo template.

## 1. Thứ tự đọc

1. Đọc toàn bộ tài liệu trước khi ghi. Xác định tên tính năng, module, khu vực sản phẩm.
2. Xác định loại và mức hoàn thiện của tài liệu (mục 2).
3. Tóm tắt mục tiêu tính năng: vì sao tính năng có mặt, theo mục tiêu nghiệp vụ, chưa nói tới giao diện.
4. Liệt kê vai: vai làm gì, cần gì trên giao diện; quyền chỉ ở mức ảnh hưởng hiển thị (mục 6).
5. Phân loại từng câu (mục 3) và kiểm câu yêu cầu (mục 4).
6. Chuyển yêu cầu chức năng thành user task (mục 5).
7. Đối chiếu đầu vào: có gì, thiếu gì; tách Confirmed, Assumption, Open question; soạn câu hỏi và đánh giá mức sẵn sàng (mục 9).

## 2. Loại tài liệu và mức hoàn thiện

| Loại | Nhận diện | Cách đọc | Thường thiếu |
|---|---|---|---|
| PRD đã duyệt | Có mã US, AC, BR; có thể có sơ đồ trạng thái | Giữ nguyên mã. Mỗi US có giao diện là nguồn user task; AC cho biết kết quả thấy được; BR cho biết rule hiển thị và rule chặn thao tác | Nội dung chữ, state lỗi, quyền hiển thị chi tiết |
| User stories rời | Vai, hành động, lợi ích; AC có hoặc không | Mỗi story một hoặc nhiều user task | Quan hệ giữa các story, thứ tự trong flow |
| CR notes | Danh sách thay đổi trên màn có sẵn | Theo mục 7 | Tên màn thật, phạm vi "tương tự" |
| Mô tả miệng, ticket ngắn | Vài câu, không mã | Mọi điều rút ra là Assumption cho tới khi PO xác nhận | Gần như mọi rule |
| Danh sách finding Designer chọn sửa | Mã finding, màn, mô tả lỗi | Mỗi finding là một thay đổi; nguồn là Designer | Không thiếu yêu cầu; kiểm màn bị chạm |

Sơ đồ trạng thái trong PRD: liệt kê các trạng thái dữ liệu mà màn phải hiển thị, chuyển trạng thái nào do thao tác người dùng, trạng thái nào khoá thao tác. Phần khoá thao tác là nguồn cho state Disabled ở D2 (`screen-states.md`).

Mức hoàn thiện đánh giá theo đầu vào có mặt:

| Đầu vào | Mức cần |
|---|---|
| Tài liệu yêu cầu (PRD, user stories, CR notes) | Bắt buộc |
| Tên tính năng | Bắt buộc |
| Bối cảnh sản phẩm, vai người dùng, rule nghiệp vụ | Nên có |
| Ghi chú design system, ảnh màn tham chiếu, wireframe của PO | Tuỳ chọn |

## 3. Phân loại câu

| Loại | Nhận diện | Ghi vào |
|---|---|---|
| Yêu cầu chức năng | Hệ thống hoặc người dùng làm gì: "cho phép tải danh sách", "gửi thông báo khi duyệt" | Mục 4 của context-overview, thành user task |
| Yêu cầu phi chức năng | Chất lượng: hiệu năng, bảo mật, khả năng dùng, ngôn ngữ | Loại chạm giao diện (song ngữ, dùng ngoại tuyến, responsive, thời gian chờ cần trạng thái tải) đánh dấu ⚑, ghi dưới bảng user task |
| Ràng buộc | Nghiệp vụ, pháp lý, nền tảng: "chỉ quản trị viên", "theo chuẩn X", "chỉ trên web" | Vai và quyền (mục 2 của context-overview) hoặc business context |
| Phần nền | Bối cảnh, lời giải thích, lời chào | Đọc để hiểu; phần cần cho thiết kế tóm vào business context, không thành user task |

Yêu cầu phi chức năng vượt khả năng của design system hiện có (ví dụ chế độ tối khi thư viện chỉ có giao diện sáng): đánh dấu ⚑, ghi Open question để D2 đối chiếu kit và gap log (KB mục 5). Không hứa trong chiến lược.

## 4. Chuẩn câu yêu cầu đủ để thiết kế

| Tiêu chí | Câu không đạt | Cách xử lý |
|---|---|---|
| Một ý | "Thêm trường ngày giao dự kiến và cho phép sửa trạng thái đơn hàng" | Tách thành hai user task, cùng giữ mã gốc. Câu của PO giữ nguyên |
| Không mơ hồ | "Hiển thị thông tin cần thiết của chứng chỉ" | `❓PO`: thông tin nào hiển thị, kèm gợi ý lựa chọn |
| Kiểm chứng được | "Màn đăng ký dễ dùng", "tải nhanh" | `❓PO`: kèm đề xuất tiêu chí đo để PO chọn |

Dùng năm thành phần để kiểm một câu đã đủ hoặc chưa: điều kiện, chủ thể, hành động, đối tượng, ràng buộc. Thiếu thành phần nào ảnh hưởng tới giao diện thì hỏi đúng thành phần đó. Cấu trúc này dùng để kiểm và để viết user task; không dùng để viết lại câu của PO.

## 5. Từ yêu cầu ra user task

User task gồm vai, hành động, đối tượng, điều kiện; viết sao cho nhìn giao diện biết vai đó làm được hoặc chưa.

| UT | User task | Vai | Yêu cầu gốc | Nguồn |
|---|---|---|---|---|
| UT-01 | Khi đơn hàng đang chờ xác nhận, nhân viên bán hàng huỷ đơn sau khi nhập lý do | Nhân viên bán hàng | US3 Huỷ đơn hàng | [req:US3] |
| UT-02 | Học viên tải chứng chỉ của khoá học đã hoàn thành về máy | Học viên | US5 Tải chứng chỉ | [req:US5] |

- Mỗi yêu cầu chức năng có giao diện sinh ít nhất một user task. Một yêu cầu cho nhiều vai mà thao tác khác nhau thì mỗi vai một task.
- Yêu cầu không viết được thành user task (ví dụ "hệ thống lưu nhật ký thao tác") là phía hệ thống: ghi vào dòng "Không chạm giao diện". Nghi có mặt giao diện (người dùng xem nhật ký ở đâu) thì thành `❓PO`.
- Không thêm task ngoài tài liệu. Task suy ra ghi `[suy ra]` và đưa vào Assumption.
- AC của PO dùng nguyên văn, gắn mã. Không soạn AC mới. AC thiếu kết quả thấy được trên giao diện thì thành `❓PO`.

## 6. Vai và quyền ở mức hiển thị

- Chỉ ghi điều ảnh hưởng tới hiển thị: vai nào vào được màn, thấy phần tử nào, làm được thao tác nào. Không dựng ma trận quyền đầy đủ của nghiệp vụ.
- Tài liệu không nói vai nào dùng tính năng: câu hỏi chặn, hỏi trước khi đi tiếp.
- Điểm quyền chưa rõ ghi `❓PO`. Phần này là nguồn cho state Permission ở D2.

## 7. CR notes: ba bẫy

| Bẫy | Dấu hiệu | Cách xử lý |
|---|---|---|
| Tham chiếu viết tắt | "MH Xem", "màn chi tiết", "popup cũ" | Xác định màn thật qua app-map (KB mục 4) và ảnh khoanh vùng. Ảnh dùng để xác định màn, không thay nội dung ghi chú. Không xác định được thì hỏi |
| Lệnh "sửa tương tự" | "Sửa tương tự ở bản mobile", "các màn còn lại làm giống" | Mỗi màn được nhắc thành một dòng mirror riêng, không bỏ sót |
| Một mục nhiều thay đổi | Một gạch đầu dòng chứa thêm trường, đổi nhãn, đổi rule | Tách mỗi dòng một màn một thay đổi |

D1 bóc CR notes thành danh sách: màn, loại (thêm, sửa, bỏ, mirror), thay đổi, nền tảng và breakpoint. Mục mơ hồ đánh dấu `?` và gom hỏi một lượt. D2 hoàn thiện thành bản kê thay đổi, thêm ánh xạ component. Ghi kèm state bị kéo theo: thêm trường bắt buộc thì state Error của form đổi theo.

## 8. Đọc wireframe của PO

Wireframe của PO là ý định của PO; bản thiết kế do Designer làm.

| Thường đã quyết định | Thường vẽ tạm |
|---|---|
| Có màn này, có trường hoặc cột này | Bố cục, vị trí các vùng |
| Thứ tự các bước trong luồng | Loại component (bảng hoặc thẻ, modal hoặc trang) |
| Thao tác có mặt trên màn | Màu, icon, chữ minh hoạ |

Không chắc một phần thuộc cột nào thì hỏi PO. Phần đã quyết định mà Designer muốn khác: ghi thành ý kiến Đề xuất sửa ở D2, không tự đổi.

## 9. Thông tin thiếu, câu hỏi và mức sẵn sàng

- Mỗi thông tin xếp vào một trong ba: Confirmed (có trong tài liệu hoặc đã xác nhận), Assumption (AI suy ra), Open question (cần PO, BA hoặc Designer trả lời).
- Thông tin thiếu chia hai mức: chặn (ảnh hưởng tới màn, flow, vai) và không chặn (bổ sung được ở E1).
- Câu hỏi cho PO: cụ thể, một câu một ý, đọc riêng vẫn hiểu, kèm gợi ý lựa chọn khi có thể; gom một lượt.

| Câu hỏi kém | Câu hỏi dùng được |
|---|---|
| "Phân quyền ra sao?" | "US3: quản lý cửa hàng có huỷ được đơn của nhân viên khác không? Gợi ý: A huỷ được mọi đơn · B chỉ đơn của cửa hàng mình" |
| "Rỗng thì hiện gì?" | "Danh sách chứng chỉ khi học viên chưa hoàn thành khoá nào: có dẫn tới danh sách khoá học không?" |

Chưa sang D2 khi còn câu hỏi chặn phạm vi: vai chưa rõ, yêu cầu chức năng cốt lõi còn mơ hồ. Mức sẵn sàng trình ở Context checkpoint.

Câu AI tự kiểm trước khi trình:
- Tính năng giải quyết vấn đề gì, cho vai nào?
- Mỗi yêu cầu chức năng có giao diện đã có user task chưa?
- Câu nào gộp nhiều ý, mơ hồ, không kiểm chứng được?
- Tham chiếu màn nào chưa xác định được màn thật?
- Có vòng đời trạng thái không; trạng thái nào khoá thao tác?
- Nền tảng và breakpoint đã rõ chưa?
- Có thao tác không hoàn tác không?

## Nguồn

- `vic-screen-discovery/references/intake.md` mục 1 (phân loại câu, chuẩn câu yêu cầu), mục 3 (từ yêu cầu ra user task)
- `uiux-requirement-intake/SKILL.md` bước 1 đến 7 (thứ tự đọc, đầu vào, thông tin thiếu, câu hỏi, mức sẵn sàng)
- `vic-design-generate/references/screen-contract.md` mục 1 (ba bẫy của CR notes)
- Hướng dẫn cũ của team, Step 1 Context Overview (đầu ra, tách Confirmed, Assumption, Open question)

Đã bỏ hoặc sửa so với nguồn:
- Bỏ bước dựng Role Matrix đầy đủ (xem, tạo, sửa, xoá) và bước soạn Acceptance Criteria: việc của PO; chỉ giữ vai và quyền ở mức hiển thị, dùng nguyên AC của PO.
- Bỏ tham chiếu ISO 29148 và Garrett ở dạng luật cứng; giữ ba tiêu chí câu yêu cầu.
- Bỏ việc viết lại câu yêu cầu theo cấu trúc chuẩn; cấu trúc năm thành phần chỉ dùng để kiểm và viết user task, câu không đạt thành `❓PO`.
- Bỏ giới hạn chế độ màu và breakpoint riêng của design system gốc; tổng quát thành yêu cầu vượt khả năng design system, đối chiếu ở D2.
- Bỏ cột component và mã node của bảng bóc CR notes: ánh xạ component làm ở D2.
- Bỏ ví dụ gốc gắn sản phẩm; thay bằng ví dụ đơn hàng, chứng chỉ, đăng ký.
- Bỏ độ dài tóm tắt cố định của intake; độ dài theo template context-overview.
- Đổi mã FR-ID sang mã gốc của PO và `UT-NN` theo GLOSSARY; đổi nhãn biểu tượng xác nhận, giả định, thiếu sang Confirmed, Assumption, Open question và `❓PO`.
- Bỏ mục "Designer Confirmation Needed" và kết luận Ready, Not Ready riêng: Context checkpoint đảm nhận.
