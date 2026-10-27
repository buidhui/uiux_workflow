# Rà trường hợp biên

Dùng ở D2 Design Strategy, bước 6, sau khi đã có flow, danh sách màn và bảng state theo `flow-analysis.md`. Vai khi rà: người rà bi quan, giả định mọi thứ có thể hỏng sẽ hỏng, và rà trước khi vẽ. Trường hợp tìm ra sau khi đã dựng UI tốn công sửa hơn nhiều so với tìm ở bước này.

Không phân tích lại nghiệp vụ. Cách xử lý trên giao diện là đề xuất của UIUX; xử lý cần một luật nghiệp vụ mà PRD chưa có (ai được làm, giới hạn bao nhiêu, có khôi phục được không) thì ghi `❓PO`, không tự đặt luật.

## 1. Độ sâu và thứ tự

| Độ sâu | Áp dụng | Phạm vi rà |
|---|---|---|
| Rút gọn | Màn logic thường | Các nhóm cấp màn áp dụng cho màn đó, cộng corner checklist của domain |
| Đầy đủ | Màn logic phức tạp | Năm câu cấp flow cho mọi flow chứa màn, năm nhóm cấp màn, cộng corner checklist của domain |

Độ sâu của từng màn theo bảng "Độ sâu theo từng màn" của `engine/protocol/design-levels.md`. Thứ tự rà: cấp flow, sau đó cấp màn, sau đó corner checklist. Nhóm không áp dụng cho màn thì ghi "không áp dụng" kèm lý do, như ô "không" của bảng state.

## 2. Năm câu cấp flow

| # | Câu hỏi | Cần trả lời |
|---|---|---|
| 1 | Người dùng huỷ giữa chừng | Về màn nào? Dữ liệu đã nhập còn không? Flow nhiều bước: quay lại bước trước có giữ dữ liệu không? Rời màn khi có thay đổi chưa lưu thì hỏi lại không? |
| 2 | Phụ thuộc chưa sẵn sàng | Dữ liệu nguồn chưa có, dịch vụ không phản hồi: flow dừng ở bước nào, người dùng thấy gì, có đường đi tiếp không? |
| 3 | Lặp thao tác | Bấm nút hai lần, gửi lại cùng một yêu cầu: chặn bằng cách nào (vô hiệu nút sau lần bấm đầu, trạng thái đang xử lý)? |
| 4 | Dữ liệu đổi giữa các bước | Người khác sửa hoặc xoá bản ghi đang thao tác: phát hiện lúc nào, báo gì, người dùng làm gì tiếp? |
| 5 | Phiên đăng nhập quá hạn giữa flow dài | Mất dữ liệu gì? Đăng nhập lại có quay về đúng bước không? |

Nhánh còn thiếu thì bổ sung vào sơ đồ và chi tiết flow trong `flow-map.md`, ghi "phát hiện khi rà trường hợp biên", trước khi rà cấp màn. Câu 4 thường cần luật nghiệp vụ (bản sửa nào được giữ): PRD không nói thì `❓PO`.

## 3. Năm nhóm cấp màn

Mỗi nhóm có câu hỏi kiểm và state nhận kết quả trong bảng bảy state của `screen-states.md`.

Nhập liệu. Áp dụng cho màn có trường nhập. State nhận kết quả: Error (lỗi nhập liệu).
- Trường nào bắt buộc? Định dạng và giới hạn ký tự là gì? PRD không nói thì `❓PO`.
- Nhập trùng (tạo bản ghi trùng tên) thì sao? Dán dữ liệu lạ, dữ liệu nhập từ tệp sai định dạng thì sao?
- Chuỗi tiếng Việt dài nhất có vừa trường và nhãn không?
- Mỗi lỗi có thông điệp cụ thể nêu cách sửa, đặt ngay dưới trường, có chữ đi kèm và không chỉ dựa vào màu? Kiểm khi người dùng rời trường, không kiểm theo từng phím gõ.
- Có phòng lỗi trước khi báo lỗi không: vô hiệu lựa chọn không hợp lệ, điền sẵn giá trị mặc định hợp lý, hiện gợi ý định dạng ngay trong trường?
- Control của design system chưa có trạng thái lỗi thì ghi `GAP`.

Quyền. Áp dụng cho màn hoặc phần tử có phân quyền. State nhận kết quả: Permission.
- Đối chiếu từng vai trong ma trận vai và quyền của PRD: vai này thấy gì, làm được gì trên màn? Ma trận thiếu thì `❓PO`, không tự đặt quyền.
- Vai không có quyền vào màn bằng link trực tiếp thì thấy gì?
- Hành động bị chặn thể hiện theo cách nào (mục 6)? Có đường xin quyền không? Có bản chỉ xem không?

Hệ thống và mạng. Áp dụng cho màn gọi máy chủ. State nhận kết quả: Loading, Error.
- Mất mạng khi gửi: dữ liệu đã nhập có được giữ không?
- Quá thời gian chờ hoặc lỗi máy chủ: thông điệp nói gì, có nút thử lại không?
- Lỗi một phần: một vùng tải được, một vùng lỗi thì màn hiển thị gì?
- Không tìm thấy: bản ghi bị xoá trước khi mở thì màn hiển thị gì?
- Xung đột: hai người cùng sửa một bản ghi thì ai được lưu, người còn lại thấy gì?
- Thao tác chạy lâu: có trạng thái đang xử lý và chặn gửi lặp không? Có lưu nháp tự động không, trạng thái lưu hiện ở đâu?

Giới hạn dữ liệu. Áp dụng cho màn có danh sách, số liệu, tải tệp. State nhận kết quả: Empty, Default với dữ liệu biên. Nhóm này tách khỏi Nhập liệu.
- Danh sách có 0 mục, 1 mục, ở trang cuối, chạm số mục tối đa thì hiển thị gì? Empty có lời gọi hành động không?
- Đổi trang có giữ bộ lọc và cách sắp xếp không?
- Giá trị biên: số 0, số âm, ngày trong quá khứ, ngày rất xa trong tương lai?
- Tải tệp: giới hạn dung lượng, loại tệp, vượt hạn mức thì thông điệp nói gì?
- Chữ tràn vùng chứa: cắt ở đâu, xem đầy đủ bằng cách nào?
- Người dùng lần đầu khác người đã có dữ liệu ở điểm nào?

Không hoàn tác. Áp dụng cho màn có xoá, huỷ, gửi, ghi đè, ngừng kích hoạt, nộp bản cuối. Kết quả: hộp xác nhận có mã SCR riêng, state Success của màn gọi. Xử lý theo mục 4.
- Thao tác có thu hồi được không? Hậu quả có lớn không (tiền, ảnh hưởng người khác, không làm lại được)?
- Người dùng có thể hiểu sai kết quả của thao tác không?
- Người dùng có thể mất dữ liệu chưa lưu không (rời màn, phiên quá hạn)?

## 4. Thao tác không hoàn tác

Tiêu chí: thao tác không thu hồi được sau khi thực hiện, không chỉ là thao tác làm mất dữ liệu. "Gửi thông báo tới mọi thành viên" không xoá gì nhưng không thu hồi được, nên thuộc nhóm này.

| Tình huống | Cách xử lý |
|---|---|
| Hoàn tác được | Ưu tiên cho hoàn tác thay cho hỏi xác nhận: thông báo ngắn kèm nút Hoàn tác |
| Không hoàn tác được | Hộp thoại xác nhận chặn luồng: tiêu đề nêu hành động, nội dung nêu hậu quả cụ thể, hai nút Huỷ và hành động; không đóng khi bấm ra ngoài |
| Có xoá mềm và xoá hẳn | Hộp xác nhận nói rõ khôi phục được không và khôi phục ở đâu |

- Có hoàn tác không, xoá mềm hoặc xoá hẳn là luật nghiệp vụ: PRD không nói thì `❓PO`.
- Thứ tự nút, dạng nút và cách nhấn mạnh hành động nguy hiểm theo design system của domain; design system chưa có cách nhấn mạnh thì ghi `GAP` và hỏi Designer.
- Hộp xác nhận có nội dung riêng được cấp mã SCR riêng. Assumption thuộc nhóm không hoàn tác do Designer duyệt ở Strategy Gate.

## 5. Mức ưu tiên

| Mức | Nghĩa | Ví dụ |
|---|---|---|
| Must | Thiếu thì hỏng nghiệp vụ, mất dữ liệu, hoặc người dùng mắc kẹt không đi tiếp được | Bấm gửi hai lần tạo hai bản ghi; xoá hẳn không có hộp xác nhận |
| Should | Thiếu thì trải nghiệm kém rõ rệt, người dùng vẫn hoàn thành được việc | Tên dài bị cắt, không có cách xem đầy đủ |
| Optional | Bỏ được ở bản đầu, ghi lại để làm sau | Gợi ý định dạng cho trường ít dùng |

Cách xếp:
- Gắn mức ngay khi ghi trường hợp, không để xếp sau.
- Trường hợp Must đưa vào bảng "Trường hợp biên bắt buộc" ở mục 2 của `design-strategy.md`. Must phụ thuộc câu trả lời của PO thì câu hỏi đánh dấu chặn ở mục 7.
- Optional vẫn giữ dòng trong `flow-map.md`; không thiết kế ở intent này thì ghi vào mục Ngoài phạm vi và Nice-to-have. Không xoá trường hợp mà không ghi lại.
- Designer duyệt mức ở Strategy Gate.

## 6. Hành động bị chặn theo quyền

| Cách thể hiện | Khi chọn |
|---|---|
| Ẩn | Mặc định đề xuất: vai này không dùng hành động đó, hiện ra chỉ gây nhiễu |
| Vô hiệu kèm giải thích | Cần cho người dùng biết tính năng tồn tại, hoặc cách để được dùng (xin quyền, vai nào làm được). Giải thích bằng chữ, ví dụ tooltip hoặc dòng chú thích |
| Chỉ xem | Vai được xem dữ liệu nhưng không được sửa: cả màn hoặc một vùng ở dạng đọc |
| Chặn cả màn kèm giải thích | Vai không có quyền vào màn, kể cả khi mở bằng link trực tiếp |

Mặc định ẩn ghi là Assumption để Designer duyệt; chọn cách khác thì ghi lý do. Chặn do trạng thái của dữ liệu (đơn đã duyệt, đợt đã đóng) thuộc state Disabled, không thuộc Permission, theo `screen-states.md`. Kết quả ghi vào bảng Permission của `flow-map.md`: Vai, Màn hoặc phần tử, Thấy gì, Làm được gì, Thể hiện khi bị chặn.

## 7. Đặc tả hành vi

Chỉ đặc tả điểm đắt: bước đã gắn cờ khi phân tích flow, hoặc PRD yêu cầu một hành vi cụ thể. Màn logic phức tạp bắt buộc có đặc tả cho điểm phức tạp theo `design-levels.md`. Không đặc tả mọi thao tác.

| Phần | Trả lời câu hỏi |
|---|---|
| Khởi động | Điều gì bắt đầu hành vi: thao tác của người dùng hoặc điều kiện của hệ thống? |
| Luật | Hành vi diễn ra theo luật nào, giới hạn gì? |
| Phản hồi | Người dùng thấy gì ở từng thời điểm? |
| Lặp hoặc chế độ | Lặp lại thì sao, có chế độ khác không, kết thúc khi nào? |

Ví dụ: Gửi thông báo tới thành viên nhóm. Khởi động: bấm "Gửi" trong hộp xác nhận. Luật: chỉ gửi một lần, nút vô hiệu sau lần bấm đầu. Phản hồi: nút chuyển sang trạng thái đang xử lý; gửi xong thì đóng hộp và hiện thông báo "Đã gửi tới N thành viên". Lặp hoặc chế độ: không lặp; lỗi thì giữ hộp xác nhận, hiện lỗi và cho thử lại.

Đặc tả mô tả hành vi, không mô tả thị giác. Hành vi cần một trạng thái mà design system chưa có (ví dụ nút chưa có trạng thái đang xử lý) vẫn đặc tả, gắn `GAP`.

## 8. Câu hỏi kiểm trước khi trình Strategy Gate

- Mỗi màn logic phức tạp đã qua năm câu cấp flow và năm nhóm cấp màn?
- Nhóm không áp dụng có lý do?
- Mỗi trường hợp có mức, state liên quan và nhãn Confirmed, Assumption hoặc câu hỏi?
- Mỗi thao tác không hoàn tác có hộp xác nhận mang mã SCR, hoặc có cách hoàn tác?
- Mỗi vai trong ma trận quyền có dòng trong bảng Permission?
- Luật nghiệp vụ còn thiếu đã thành `❓PO`; thành phần design system còn thiếu đã thành `GAP` và vào gap log?

## Nguồn
- `claude-skills-uiux-vic/vic-screen-discovery/references/edgecase.md`: năm câu cấp flow, năm nhóm cấp màn, tiêu chí không hoàn tác, ba mức ưu tiên, đặc tả hành vi bốn phần, mặc định ẩn hành động bị chặn.
- `claude-skills-uiux-vic/uiux-edgecase-permission-detector/SKILL.md` bước 1 đến 8: câu hỏi về lỗi, Empty, quyền, giới hạn dữ liệu, xoá mềm và xoá hẳn, rủi ro mất dữ liệu và hiểu sai kết quả; nghĩa của Must, Should, Optional.
- `aidlc-workflows/core/knowledge/aidlc-design-agent/interaction-design-patterns.md` (AWS AI-DLC, MIT-0): kiểm khi rời trường, thông điệp lỗi cụ thể dưới trường, giữ dữ liệu khi quay lại bước trước, lưu nháp tự động, giữ bộ lọc khi đổi trang, phòng lỗi bằng ràng buộc và giá trị mặc định, ưu tiên hoàn tác thay cho hỏi xác nhận.
- Bỏ tên component, thuộc tính và mục tham chiếu của design system gốc trong phần xác nhận xoá và báo lỗi; thay bằng loại component chung và trỏ về design system của domain.
- Bỏ các GAP cụ thể của thư viện gốc (control chưa có trạng thái lỗi, nút chưa có dạng nguy hiểm); giữ quy tắc chung ghi `GAP`.
- Bỏ con số "mất 60% case" khi gộp rà trường hợp biên vào flow (`vic-screen-discovery/SKILL.md`): không có nguồn; giữ ý rà là bước riêng.
- Câu "case tìm sau khi design bắt đầu đắt gấp nhiều lần" của bộ gốc viết lại ở dạng định tính, không nêu bội số.
- Bỏ ví dụ gửi thông báo tới hàng nghìn người dùng, giới hạn 255 ký tự, tên 100 ký tự trong ô 200px của bộ gốc; thay bằng ví dụ trung lập, giới hạn ký tự hỏi PO.
- Bỏ bảy họ mã riêng của skill detector (ERR, ES, PC, DL, DA, RX); mọi trường hợp dùng `EC-NN` theo `GLOSSARY.md`, nhóm ghi ở cột Nhóm.
- Bỏ biểu tượng màu đi kèm mức ưu tiên; dùng Must, Should, Optional.
- Sửa nhãn Must Have, Should Have thành Must, Should theo template `flow-map.md`.
- Bỏ hướng dẫn "hỏi BA/PM"; thay bằng `❓PO` vì engine không phân tích lại nghiệp vụ.
- Thêm cách chặn cả màn kèm giải thích và phân biệt Disabled với Permission theo `screen-states.md`.
- Thêm độ sâu rút gọn và đầy đủ theo `design-levels.md`, và nơi ghi kết quả trong template `flow-map.md`, `design-strategy.md`.
