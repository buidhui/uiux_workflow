# Glossary

Thuật ngữ và họ mã của UIUX-Workflow. Tên phản hồi và state theo hướng dẫn cũ của team; thuật ngữ khung (intent, stage, engine) dùng chung với PO-Workflow; tên artifact thiết kế đối chiếu với AWS AI-DLC. Khi nói với Designer, dùng từ thường theo bảng ở `engine/protocol/stage-protocol.md`.

## Khung

| Thuật ngữ | Nghĩa trong UIUX-Workflow | Nguồn |
|---|---|---|
| Intent | Một yêu cầu thiết kế đi trọn vòng, thường ứng với một intent của PO, có thư mục riêng trong `intents/` | PO-Workflow |
| Phase | Discovery & Strategy, Design Execution, Review, Refine & Deliver | Repo, theo hướng dẫn cũ của team |
| Stage | Một bước có artifact riêng: D1, D2, D3, E1, E2, E3, R1, H1 | Repo |
| Mức thiết kế | L1 Có sẵn, L2 Mở rộng, L3 Sáng tạo, gán cho từng màn; cùng độ phức tạp logic quyết định độ sâu. Định nghĩa ở `engine/protocol/design-levels.md` | Repo |
| Độ phức tạp logic | Thường, Phức tạp, gán cho từng màn | Repo |
| Gate | Context checkpoint, Strategy Gate, Alignment Gate, UX Brief Gate, UI Gate, Dev Feasibility Gate, Delivery Gate | Repo, theo hướng dẫn cũ |
| Phản hồi tại gate | Approved, Approved with Notes, Need Revision, Blocked | Hướng dẫn cũ của team |
| Parked | Việc tạm dừng: Blocked, chờ đồng thuận ở D3, chờ góp ý ở R1 | Repo |
| Questions file · State file · Decision log · Memory | `<slug>-questions.md`, `state.md`, `decisions.md`, `memory.md` | PO-Workflow |
| Learnings | Vòng học, một lần khi đóng intent | PO-Workflow, rút gọn |
| Archive | Bản chụp lúc duyệt, chỉ cho D2, D3, E1, R1, H1 | PO-Workflow, rút gọn |
| Engine | Phần không phụ thuộc sản phẩm: protocol, command, template, checklist, agent, kiến thức nghề | PO-Workflow |
| Product KB | Phần riêng của sản phẩm trong `domain/`, manifest `domain.md` mười một mục, ưu tiên trỏ tới nguồn có sẵn. Định nghĩa ở `DOMAIN-SETUP.md` | Repo |
| Live source · Pinned record | Nguồn sống được đọc lại khi chạm tới; bản cố định thì hỏi người phụ trách khi nghi ngờ | PO-Workflow |

## Khái niệm UIUX

| Thuật ngữ | Nghĩa | Nguồn |
|---|---|---|
| Confirmed · Assumption · Open question | Ba loại thông tin luôn tách riêng | Hướng dẫn cũ của team |
| User task | Hành động cụ thể của một vai trên giao diện, rút từ một yêu cầu | VIC |
| Flow | Chuỗi bước để một vai đạt một mục tiêu: chính, phụ, lỗi | Chuẩn ngành |
| Screen state | Bảy state cấp màn: Default, Empty, Loading, Success, Error, Disabled, Permission. Định nghĩa ở `engine/knowledge/screen-states.md` | Hướng dẫn cũ của team |
| Element state | Hover, pressed, focus, disabled, selected, invalid của phần tử tương tác | Chuẩn ngành |
| Design Strategy | `design-strategy.md`, chiến lược thiết kế từ PRD: màn, luồng và tương tác, thành phần giao diện, accessibility, màn cần sáng tạo, ý kiến về PRD, rủi ro. Mục 1 đến 7 đẩy lên repo PO; phần sau là nội bộ | Repo; bốn mục đầu theo 2.5 Refined Mockups của AWS |
| File thiết kế UX trên repo PO | File do Designer phụ trách trong intent của PO (ví dụ `inception/ux-design/ux-design.md`), render từ Design Strategy theo template của PO | PO-Workflow |
| Alignment | Các bên đồng thuận chiến lược thiết kế trước khi vẽ. Ở PO-Workflow là stage 2.43 Design Alignment với Decision Brief | PO-Workflow |
| Ý kiến về PRD | Mỗi dòng một lập trường Đồng ý, Đề xuất sửa, Phản đối, kèm mã và lý do. Không sửa PRD | PO-Workflow, AWS collaborators protocol |
| Flow prototype | Prototype khung xám ở D2 để thao tác thử luồng trước khi đồng thuận | Repo |
| Prototype HTML | Prototype một file ở E3, thao tác trọn luồng, đổi state, vai, dữ liệu; dùng thư viện component frontend theo Product KB | Repo |
| UX Brief | Bố cục, component, nội dung chữ, tương tác, state từng màn. Nén vào Design Strategy khi mọi màn L1 | Hướng dẫn cũ của team |
| Bản kê thay đổi (delta table) | Dạng phạm vi cho CR trên màn có sẵn: mỗi dòng một màn một thay đổi | VIC |
| Mirror | Dòng cho lệnh "sửa tương tự" ở màn anh em, bản mobile, breakpoint khác | VIC |
| Wireframe của PO | Bản vẽ ý định của PO; tách phần đã quyết định và phần vẽ tạm | Repo |
| Design ref · Reference lock | Ảnh hoặc link tham chiếu, bắt buộc cho màn L3; hướng thị giác đã chọn, dùng làm tiêu chí review | refero-design |
| UI kit | Thư viện component của sản phẩm trên Figma, do người phụ trách kit dựng | Repo |
| GAP · Gap log | Thứ UI kit chưa làm được điều màn cần; nhật ký các GAP của sản phẩm (Product KB mục 5) | VIC, bộ skill dựng kit |
| Kit proposal | Đề xuất bổ sung component vào UI kit bằng `/kit-proposal`; chỉ đề xuất, không dựng | Repo |
| Mức sẵn sàng design system | 0, 1, 2 của cả sản phẩm; quyết định AI có dựng UI ở E2 bằng instance không. Định nghĩa ở `engine/protocol/figma-protocol.md` | Repo |
| Khu vực nháp | Page hoặc branch trên Figma nơi AI ghi; Designer chuyển sang page chính sau UI Gate | Repo |
| Frame tự dựng | Frame thường, tên bắt đầu bằng `~`, ruột ghép từ instance kit, chỉ khi Designer cho phép | VIC |
| App-map · Screen register | Bản đồ màn và flow của app đang chạy (Product KB mục 4) | VIC, bộ skill dựng kit |
| Góp ý thiết kế | Ý kiến lên thiết kế không đổi chiến lược đã đồng thuận; vào feedback matrix | Repo |
| Feedback matrix · Change log | Bảng gom góp ý ở R1; các vòng sửa, mỗi vòng một version có tên trên Figma | Hướng dẫn cũ của team |
| Dev feasibility | Nhánh xử lý khi Dev nói khó làm: phương án, trade-off, tin nhắn trả lời | Hướng dẫn cũ của team |
| Delivery summary | Mục lục và checklist bàn giao ở H1 | Hướng dẫn cũ của team |
| Finding · Scorecard · Verdict · Fix-prompt | Phát hiện của review; điểm trên 100 theo bảy trục; PASS đến FAIL; prompt sửa tự chứa | VIC |

## Họ mã

| Mã | Nghĩa | Stage |
|---|---|---|
| `UT-NN` | User task | D1 |
| `FLOW-NN` | Flow | D2 |
| `SCR` | Màn hình, theo quy ước mã màn dùng chung với PO (Product KB mục 2); mặc định `SCR<n>` trong intent. Hộp xác nhận, modal, drawer có nội dung riêng cũng có mã SCR | D2 |
| `EC-NN` | Trường hợp biên | D2 |
| `GAP-NNN` | Mục trong gap log của sản phẩm | D2 đến R1 |
| `OQ-NN` | Câu hỏi mở cho PO, Dev, QA | D1 đến R1 |
| `FND-NN` | Finding của review | R1, `/ux-review` |
| `Q1` · `DEC1` | Câu hỏi trong questions file; quyết định trong `decisions.md` | |
| Mã của PO | US, AC, BR và mã khác trong PRD; giữ nguyên, dùng làm thẻ truy vết `[req:US3]` | |

## Stage

| Mã | Stage | Slug | Artifact | Gate |
|---|---|---|---|---|
| D1 | Context Overview | context-overview | context-overview.md | Context checkpoint |
| D2 | Design Strategy | design-strategy | design-strategy.md, flow-map.md, flow-prototype.html | Strategy Gate |
| D3 | Alignment | alignment | file thiết kế UX trên repo PO, alignment-log.md | Alignment Gate |
| E1 | UX Brief & Wireframe | ux-brief | ux-brief.md | UX Brief Gate |
| E2 | UI Design | ui-design | frame Figma, build-report.md | |
| E3 | Prototype | prototype | index.html, prototype-report.md | |
| R1 | Review & Refine | review-refine | feedback.md, design-review.md, fix-prompt.md | UI Gate, Dev Feasibility Gate |
| H1 | Handoff & Done | handoff | delivery-summary.md, ghi chú trên Figma | Delivery Gate |

Tiện ích: `/setup`, `/new-intent`, `/ux`, `/ux-status`, `/ux-review`, `/change-request`, `/kit-proposal`, `/ds-lookup`, `/new-domain`.
