# Product KB: một sản phẩm cần chuẩn bị gì

Tài liệu này cho người đưa UIUX-Workflow vào một sản phẩm. Nó định nghĩa knowledge base (KB) mà luồng cần để chạy hiệu quả: gồm những gì, mức nào là đủ, lấy từ đâu, ai cập nhật. Designer dùng hằng ngày đọc [USER-GUIDE.md](USER-GUIDE.md).

## 1. Engine và Product KB

Engine là phần không phụ thuộc sản phẩm, nằm ở `engine/`: stage, lệnh, protocol, template, checklist, agent, kiến thức nghề UIUX. Product KB là phần riêng của sản phẩm, nằm ở `domain/` với manifest `domain.md`; khung KB ở `engine/templates/domain/`. Command chỉ trỏ "KB mục N", không ghi cứng dữ kiện sản phẩm; đổi sản phẩm là thay KB.

Nguyên tắc quan trọng nhất: trỏ tới nguồn có sẵn, không chép. PRD và KB nghiệp vụ nằm ở repo của PO; dữ liệu UI kit nằm ở nơi công cụ dựng kit của sản phẩm lưu, nếu sản phẩm dùng công cụ đó; màn hình nằm trên Figma. `domain.md` ghi đường dẫn tới các nguồn đó. Chỉ viết file mới trong KB cho nội dung chưa có ở nguồn nào.

## 2. Mười một mục của Product KB

Mức: Tối thiểu là thiếu thì luồng không chạy được; Hiệu quả là có thì AI làm đúng và nhanh hơn rõ rệt; Thêm là tốt nếu có.

| Mục | Nội dung | Mức | Stage dùng | Thiếu thì sao | Nguồn nên trỏ tới |
|---|---|---|---|---|---|
| 1. Sản phẩm và người dùng | Module, nền tảng, breakpoint, vai và mục tiêu, ngôn ngữ, nhịp sprint | Tối thiểu | D1, D2, E2 | AI đoán nền tảng và vai, gán sai mức | Tài liệu sản phẩm, KB của PO |
| 2. Nguồn yêu cầu và đồng thuận | Repo và đường dẫn intent của PO, PRD và mức hoàn thiện cần có, template file thiết kế UX của PO, quy ước commit, cách đồng thuận, quy ước mã màn | Tối thiểu | D1, D3, H1 | Không đọc được PRD, không đẩy được chiến lược, không qua được Alignment | Repo của PO (ví dụ PO-Workflow) |
| 3. Kiến thức nghiệp vụ | KB nghiệp vụ của PO, thuật ngữ, thực thể và vòng đời trạng thái hiển thị | Hiệu quả | D1, D2 | Hỏi lại PO những điều đã có; state không khớp vòng đời của PRD | KB của PO, chỉ đọc |
| 4. App hiện có | App-map hoặc screen register, khung chung của màn, pattern theo loại màn, màn mẫu để nhân bản, ảnh màn | Hiệu quả | D2, E2, R1, H1 | Thiết kế lệch pattern app, dựng lại khung từ đầu | Screen register của công cụ dựng kit (nếu có), file Figma |
| 5. Design system và UI kit | File design system và UI kit, hướng dẫn dùng kit trên màn, luật design system, gap log, người phụ trách, công cụ dựng kit cho `/kit-proposal`, mức sẵn sàng | Tối thiểu: file kit và mức sẵn sàng. Hiệu quả: hướng dẫn dùng kit và gap log | D2, E1, E2, R1 | Không gán được L1, L2; AI không dựng UI bằng instance; gap không về tay người phụ trách kit | Hướng dẫn dùng kit và gap log ở nơi công cụ dựng kit lưu (nếu có), file Figma |
| 6. Figma workspace | File thiết kế, cấu trúc page, khu vực nháp cho AI, quy ước tên frame, changelog và version, người cấp quyền | Tối thiểu | E2, E3, R1, H1 | AI ghi sai vị trí, không có nơi an toàn để dựng | File Figma |
| 7. Frontend stack | Thư viện component của frontend thật và version, theme ở dạng code, icon, font, cách tải trong một file HTML, bảng ánh xạ component kit sang code (điều kiện để màn L1 đi làn chỉ HTML) | Hiệu quả | D2, E3 | Prototype chỉ giống thiết kế, không giống hành vi thật | Repo frontend, cấu hình theme |
| 8. Nội dung | Giọng văn, thuật ngữ sản phẩm, câu mẫu | Hiệu quả | D2, E1, E2 | Chữ trên màn mỗi nơi một cách | Content guide có sẵn, hoặc `content-guide.md` |
| 9. Chuẩn chất lượng | Mức accessibility, ngưỡng vùng chạm, corner checklist giao diện, điều chỉnh thang điểm | Hiệu quả | D2, R1 | Review dùng chuẩn chung, sót góc riêng của sản phẩm | `corner-checklist.md` |
| 10. Tham chiếu | Brand guideline, thư viện design ref, sản phẩm tham khảo | Thêm | E1 | Màn L3 phải tìm ref từ đầu | `assets/refs/`, brand guideline |
| 11. Người và kênh | PO, Dev PIC, QA PIC, nơi nhận góp ý, công cụ quản lý task, Dev nhận bàn giao bằng HTML hay cần Figma | Tối thiểu: nơi góp ý và công cụ task | D3, R1, H1 | Không biết gửi ai, đóng task ở đâu | Danh bạ team |

## 3. Ba mức đầy đủ

| Mức | Có gì | Luồng làm được |
|---|---|---|
| Tối thiểu | Mục 1, 2, 5 (file kit, mức sẵn sàng), 6, 11 | Mọi stage chạy. AI đọc PRD, ra chiến lược, đẩy lên repo PO, review, bàn giao. UI do Designer dựng khi kit chưa có hướng dẫn dùng |
| Hiệu quả | Thêm mục 3, 4, 5 đầy đủ, 7, 8, 9 | AI gán mức chính xác, dựng UI màn L1 bằng instance, prototype giống sản phẩm thật, review theo chuẩn của sản phẩm |
| Đầy đủ | Thêm mục 10 | Màn L3 có sẵn kho ref |

`/new-intent` tự hỏi bù khi thiếu mức Tối thiểu. Mục Hiệu quả dày dần theo từng việc.

## 4. KB được cập nhật như thế nào

| Thời điểm | Ghi gì | Vào đâu |
|---|---|---|
| D2 | Gap thấy được từ PRD | Gap log (mục 5) |
| D3 | Quy ước mới về cách đồng thuận | Mục 2 |
| E1 | Component mới Designer chọn | Gap log qua `/kit-proposal` |
| E2, R1 | Gap gặp khi dựng và review; pattern mới được thống nhất | Gap log; hướng dẫn dùng kit nếu người phụ trách kit cho phép |
| E3 | Ánh xạ component kit sang code | Mục 7 |
| H1 | Màn đã bàn giao | App-map hoặc screen register (mục 4) |
| Đóng intent | Bài học | `memory/team.md` |

Nguồn sống (repo PO, Figma, thư mục dữ liệu kit) được đọc lại khi intent chạm tới, hoặc khi bản trong KB quá một tháng. Nguồn cố định (brand guideline) thì hỏi người phụ trách khi nghi ngờ.

## 5. Dựng Product KB

1. Tạo repo sản phẩm từ repo engine: gửi "Cài đặt UIUX-Workflow từ <link engine>" và chọn sản phẩm mới, hoặc clone tay và đổi tên remote `origin` thành `engine` (`USER-GUIDE.md` mục A5). Repo engine có `domain/`, `intents/`, `adhoc/` trống và `memory/team.md` bản trống, không cần dọn.
2. Chạy `/new-domain`: AI chép khung từ `engine/templates/domain/` sang `domain/`, hỏi theo mười một mục, ghi `domain/domain.md`, ưu tiên điền đường dẫn tới nguồn có sẵn.
3. Điền đủ mức Tối thiểu. Kiểm từng đường dẫn mở được.
4. Mục 5: sản phẩm đã có hướng dẫn dùng kit và gap log ở nơi công cụ dựng kit lưu thì trỏ tới; chưa có thì dùng `gap-log.md` trong KB và viết hướng dẫn dùng kit dần theo việc.
5. Mục 7: ghi thư viện component và theme của frontend; bảng ánh xạ component kit sang code viết dần ở E3.
6. Chạy thử một intent.

## 6. Quy ước file Figma để AI đọc nhanh

- Frame màn có mã: `SCR-012 / Danh sách đơn hàng / desktop / default`
- Các state của cùng một màn nằm cùng hàng, cùng tiền tố
- Page hoặc section theo module, flow; đọc từ trái sang phải theo luồng
- Có page hoặc section nháp riêng cho AI; bản cũ tách khỏi page chính
- Logic ngầm như điều kiện rẽ nhánh, quyền có note cạnh màn

## 7. Checklist Product KB đã sẵn sàng

- [ ] Mục 1, 2, 5, 6, 11 điền đủ phần Tối thiểu, đường dẫn mở được
- [ ] Repo của PO pull được; tìm được một intent mẫu và template file thiết kế UX
- [ ] File UI kit mở được; mức sẵn sàng ghi đúng định nghĩa
- [ ] Có khu vực nháp cho AI trên Figma; công cụ MCP đọc và ghi được vào khu vực đó
- [ ] Gap log có nơi ghi, biết người phụ trách kit
- [ ] Biết thư viện component frontend để làm prototype
- [ ] Engine sạch tên sản phẩm: `grep -rni "<tên sản phẩm>\|<tên công ty>" engine .claude AGENTS.md` trả về rỗng
