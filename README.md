# UIUX-Workflow

UIUX-Workflow là quy trình thiết kế dành cho UI/UX Designer làm việc cùng AI. Quy trình bắt đầu khi PRD của PO đã được duyệt và kết thúc khi thiết kế được bàn giao cho Dev. Designer cùng AI đọc hiểu PRD, xây dựng chiến lược thiết kế, đưa chiến lược lên repo của PO để các bên đồng thuận, sau đó mới thiết kế bằng UI kit của sản phẩm và dựng prototype HTML thao tác được. AI đảm nhận việc đọc tài liệu, phân tích, dựng giao diện, đo kiểm và soạn tài liệu; Designer ra quyết định và phê duyệt ở cuối mỗi stage.

Mọi quyết định, câu trả lời và bản đã duyệt được lưu trong repo git của sản phẩm. Phần quy trình dùng chung (engine) tách khỏi knowledge base của từng sản phẩm (Product KB), nên một bản engine dùng được cho nhiều sản phẩm.

| Tài liệu | Người đọc | Nội dung |
|---|---|---|
| README.md | Mọi người | Giới thiệu quy trình: phạm vi, nguyên lý, stage, mức thiết kế, kiểm tra chất lượng, cơ sở phương pháp |
| [USER-GUIDE.md](USER-GUIDE.md) | Designer | Phần A: cài đặt, cách kết nối Figma, repo của PO. Phần B: từng bước một việc từ PRD tới bàn giao |
| [DOMAIN-SETUP.md](DOMAIN-SETUP.md) | Người phụ trách quy trình | Mười một mục của Product KB, cách đưa một sản phẩm vào quy trình |
| [GLOSSARY.md](GLOSSARY.md) | Mọi người | Thuật ngữ và họ mã |
| [AGENTS.md](AGENTS.md) | Công cụ AI | Quy tắc AI phải tuân thủ; `CLAUDE.md` chỉ nạp lại file này |
| [CHANGELOG.md](CHANGELOG.md) | Người phụ trách quy trình | Thay đổi của từng phiên bản, cách nâng cấp, việc còn mở |

## Mục lục

1. [Tổng quan](#1-tổng-quan)
2. [Nguyên lý nền](#2-nguyên-lý-nền)
3. [Quy trình](#3-quy-trình)
4. [Từng stage](#4-từng-stage)
5. [Kiểm tra chất lượng](#5-kiểm-tra-chất-lượng)
6. [Kết nối với PO-Workflow và AI-DLC](#6-kết-nối-với-po-workflow-và-ai-dlc)
7. [Cài đặt, cấu trúc repo và nâng cấp](#7-cài-đặt-cấu-trúc-repo-và-nâng-cấp)
8. [Cơ sở phương pháp](#8-cơ-sở-phương-pháp)

## 1. Tổng quan

### 1.1 Phạm vi

Mỗi yêu cầu thiết kế là một intent, lưu tại `intents/<slug>/`. Intent đi qua tám stage thuộc ba phase: Discovery & Strategy hiểu yêu cầu và thống nhất chiến lược thiết kế; Design Execution dựng giao diện và prototype; Review, Refine & Deliver rà soát, xử lý góp ý và bàn giao. Độ sâu của từng bước được quyết định theo từng màn, dựa trên mức thiết kế của màn đó.

| Áp dụng cho | Không áp dụng cho |
|---|---|
| Tính năng mới hoặc thay đổi có giao diện, sau khi PRD được duyệt | Phân tích nghiệp vụ, viết PRD: việc của PO |
| Từ đọc PRD tới bàn giao thiết kế cho Dev | Dựng UI kit, design system: việc của người phụ trách kit |
| Thiết kế bằng UI kit có sẵn trên Figma, prototype HTML, thiết kế bằng HTML cho màn đơn giản | Thiết kế API, dữ liệu, chọn thư viện code: việc của Dev |
| Thay đổi sau khi chiến lược đã đồng thuận; góp ý của Dev sau bàn giao | Viết test case: việc của QA |
| Rà soát màn đang chạy, không cần intent | Quản lý tiến độ thay cho công cụ quản lý task |

Điều kiện bắt đầu: PRD đã được duyệt; sản phẩm có Product KB ở mức Tối thiểu theo [DOMAIN-SETUP.md](DOMAIN-SETUP.md). Khi Product KB chưa đủ, lệnh tạo intent hỏi bù sáu thông tin tối thiểu ở lần đầu.

### 1.2 Vai trò

| Vai | Trách nhiệm |
|---|---|
| AI | Đọc PRD và Product KB trước khi hỏi; phân tích flow, màn, state, trường hợp biên; đề xuất mức thiết kế; dựng giao diện bằng instance của UI kit hoặc bằng HTML; dựng prototype; đo và tự kiểm; soạn file thiết kế UX, ghi chú bàn giao; đánh dấu `❓PO`, `❓Designer` ở phần chưa rõ thay vì suy đoán |
| Designer | Phê duyệt hoặc yêu cầu sửa ở mỗi gate; quyết định mức thiết kế, đầu ra của màn, hướng thị giác, phương án; tự dựng giao diện cho màn cần sáng tạo hoặc khi muốn; xử lý góp ý |
| UX Lead | Agent review độc lập, chỉ đọc thiết kế và tài liệu được giao, không tiếp cận hội thoại giữa Designer và AI; chấm điểm theo bảy trục và kết luận verdict |
| PO | Cung cấp PRD đã duyệt; trả lời câu hỏi; cùng các bên đồng thuận chiến lược thiết kế ở D3. PO không duyệt chi tiết thiết kế; muốn xem bản cuối thì xem trên Figma và prototype |
| BA, Dev, QA | Trả lời câu hỏi; góp ý ở R1; Dev nêu ý kiến về khả năng làm; nhận bàn giao |
| Người phụ trách kit | Nhận đề xuất bổ sung component, quyết định việc dựng vào UI kit |
| Người phụ trách quy trình | Duy trì engine và Product KB, tổng hợp bài học |

### 1.3 Đầu ra bàn giao

| Đầu ra | Người nhận | Thời điểm |
|---|---|---|
| Chiến lược thiết kế, đưa vào file thiết kế UX trên repo của PO | PO, Dev, QA | D3; cập nhật link ở H1 |
| Thiết kế trên Figma, ghim version bàn giao | Dev, QA | H1; cho màn đi Figma + HTML |
| File HTML: prototype của mọi màn, đồng thời là thiết kế chính của màn chỉ HTML, ghim theo commit | PO, Dev, QA | E3; ghim ở H1 |
| `delivery-summary.md`: mục lục bàn giao và checklist cho Dev | Dev | H1 |
| Đề xuất bổ sung UI kit, ghi trong gap log | Người phụ trách kit | Khi gặp phần tử kit chưa có |

### 1.4 Đặc điểm chính

| Đặc điểm | Cơ chế |
|---|---|
| Thống nhất chiến lược trước khi vẽ | D3 đưa chiến lược lên repo của PO; giao diện chỉ được dựng sau khi Alignment Gate qua |
| Độ sâu theo từng màn | Mức L1, L2, L3 kết hợp độ phức tạp logic quyết định UX Brief, review và đầu ra của màn |
| Đầu ra gọn cho màn đơn giản | Màn chỉ ghép component có sẵn được thiết kế và bàn giao bằng HTML, không qua Figma, khi sản phẩm đủ điều kiện |
| Dùng đúng UI kit của sản phẩm | Giao diện dựng bằng instance của kit; phần tử kit chưa có được ghi `GAP` và đề xuất qua `/kit-proposal`, không tự vẽ |
| An toàn với file Figma | AI chỉ ghi vào khu vực nháp, lưu version có tên trước mỗi lần ghi |
| Quyết định được lưu vết | Lời duyệt và câu trả lời ghi nguyên văn trong `decisions.md`; bản đã duyệt chụp vào `archive/` |
| Chất lượng đo được | Checklist có mục chặn, review độc lập, script kiểm sơ đồ và prototype; không báo xong khi chưa đo |
| Dùng chung cho nhiều sản phẩm và công cụ | Engine tách khỏi Product KB; bốn cách kết nối Figma; chạy được với công cụ AI khác qua `AGENTS.md`; cài từ link repo bằng `/setup` |

### 1.5 Khác biệt so với thiết kế trực tiếp bằng AI hội thoại

| Khía cạnh | Dùng trực tiếp AI hội thoại | UIUX-Workflow |
|---|---|---|
| Hiểu yêu cầu | AI suy luận từ đoạn mô tả được dán vào | AI đọc PRD và Product KB, tách Confirmed, Assumption, Open question; điểm chưa rõ thành câu hỏi cho PO |
| Thông tin còn thiếu | AI tự bổ sung | AI đánh dấu `❓PO` hoặc dừng ở câu hỏi chặn |
| Bám design system | AI tự chọn màu, chữ, component | Chỉ dùng component và token của UI kit; phần thiếu ghi `GAP` |
| State và trường hợp biên | Phụ thuộc người hỏi có nhớ hay không | Bảy state cho mỗi màn, rà trường hợp biên theo danh mục, độ sâu theo mức của màn |
| Kiểm soát chất lượng | Designer tự rà bằng mắt | Checklist, review độc lập theo thang điểm, script kiểm, chuẩn WCAG 2.2 mức AA |
| Lưu vết và bàn giao | Phân tán trong lịch sử hội thoại | Quyết định ghi nguyên văn; link bàn giao ghim version Figma hoặc commit HTML |

## 2. Nguyên lý nền

| Nguyên lý | Áp dụng trong quy trình |
|---|---|
| AI làm, Designer kiểm soát | Gate cuối mỗi stage; AI không tự quyết định thay Designer, chỉ đề xuất dưới nhãn Recommendation |
| Hiểu trước, đồng thuận trước, vẽ sau | D1, D2 trước khi dựng; D3 chờ các bên đồng thuận; giao diện chỉ dựng sau Alignment Gate |
| Không phân tích lại nghiệp vụ | PRD là đầu vào; khác biệt ghi thành Ý kiến về PRD với lập trường và lý do; không sửa PRD |
| Bên ngoài tham gia ở cấp chiến lược | Các bên đồng thuận ở D3; chi tiết thiết kế do Designer quyết định |
| Độ sâu theo độ khó của từng màn | Mức thiết kế L1, L2, L3 và độ phức tạp logic; đầu ra theo mức |
| Dùng những gì đã có | Component của UI kit, pattern của màn liền kề; phần thiếu chỉ đề xuất bổ sung kit |
| Không sửa thiết kế chính | Khu vực nháp trên Figma, lưu version trước khi ghi |
| Kết quả phải đo được | Số đo, ảnh chụp, checklist; điều chưa kiểm được ghi vào mục Limitation |

## 3. Quy trình

### 3.1 Sơ đồ

```mermaid
flowchart LR
  PRD[PRD đã duyệt trên repo PO] --> D1
  subgraph P1[Discovery & Strategy]
    D1[D1 Context Overview] --> D2[D2 Design Strategy] --> D3[D3 Alignment]
  end
  D3 -->|đẩy file thiết kế UX| PO[(Repo PO)]
  PO -->|các bên đồng thuận| D3
  subgraph P2[Design Execution]
    E1[E1 UX Brief<br/>màn L2, L3] --> E2[E2 UI trên Figma] --> E3[E3 Prototype HTML]
  end
  subgraph P3[Review, Refine & Deliver]
    R1[R1 Review & Refine] --> H1[H1 Handoff & Done]
  end
  D3 --> E1
  D3 -->|màn L1 Figma + HTML| E2
  D3 -->|màn L1 chỉ HTML| E3
  E3 --> R1
  E2 -.->|kit thiếu| KP[kit-proposal]
  H1 -->|cập nhật link Figma, HTML| PO
```

### 3.2 Các stage

| Phase | Stage | Mục đích | Đầu ra | Gate |
|---|---|---|---|---|
| Discovery & Strategy | D1 Context Overview | Đọc hiểu PRD và bối cảnh; user task; câu hỏi cho PO | `context-overview.md` | Context checkpoint |
| | D2 Design Strategy | Flow, màn, bảy state, trường hợp biên, mức và đầu ra của từng màn, ánh xạ UI kit, accessibility, ý kiến về PRD; flow prototype khi cần | `design-strategy.md`, `flow-map.md` | Strategy Gate |
| | D3 Alignment | Đưa chiến lược lên repo của PO theo template của PO; chờ các bên đồng thuận | File thiết kế UX trên repo PO | Alignment Gate |
| Design Execution | E1 UX Brief | Màn L2: đề xuất component; màn L3: design ref, chọn hướng thị giác; bố cục, nội dung chữ. Màn L1 nén vào D2 | `ux-brief.md` | UX Brief Gate |
| | E2 UI Design | Giao diện trên Figma bằng instance của UI kit, trong khu vực nháp; tự kiểm. Chỉ cho màn Figma + HTML | Frame Figma, `build-report.md` | Không, sang E3 |
| | E3 Prototype | HTML thao tác được trọn luồng, đổi state, đổi vai. Màn chỉ HTML: HTML là thiết kế chính, có chế độ ghi chú bàn giao | `index.html`, `prototype-report.md` | Không, sang R1 |
| Review, Refine & Deliver | R1 Review & Refine | Review độc lập; góp ý của BA, Dev; xử lý khả năng làm với Dev; sửa thiết kế | `feedback.md`, `design-review.md` | UI Gate |
| | H1 Handoff & Done | Ghi chú bàn giao; ghim version; cập nhật file thiết kế UX trên repo PO | `delivery-summary.md` | Delivery Gate |

### 3.3 Mức thiết kế và đầu ra của màn

Mỗi màn được gán một mức thiết kế ở D2, Designer duyệt ở Strategy Gate. Mức quyết định UX Brief, người dựng giao diện và việc màn có cần Figma hay không.

| Mức | Màn như thế nào | Đầu ra | Đi thêm gì |
|---|---|---|---|
| L1 Có sẵn | Ghép từ component đã có: form, bảng, CRUD, màn quản trị, vận hành nội bộ; thay đổi ở luồng, trạng thái, field, câu chữ | Chỉ HTML, khi sản phẩm đạt ba điều kiện dưới đây; nếu không thì Figma + HTML | UX Brief nén vào chiến lược; AI dựng giao diện |
| L2 Mở rộng | Có component hoặc pattern chưa có trong design system | Figma + HTML | UX Brief có wireframe và đề xuất component; `/kit-proposal` |
| L3 Sáng tạo | Hình ảnh, thương hiệu, màn cho khách hàng cần chỉnh tới từng pixel, motion, landing | Figma + HTML | Design ref bắt buộc; chọn một trong hai đến ba hướng thị giác; Designer dẫn phần giao diện |

Ba điều kiện để màn L1 đi làn chỉ HTML, khai một lần trong Product KB:

| Điều kiện | Mục Product KB |
|---|---|
| Dev nhận bàn giao bằng HTML, không cần Dev Mode hoặc Code Connect của Figma | Mục 11 |
| Có thư viện component frontend tải được trong một file HTML, kèm bảng ánh xạ component kit sang code | Mục 7 |
| Người duyệt chấp nhận xem thiết kế trên trình duyệt | Mục 2 |

Màn đã có trên Figma mà được sửa bằng HTML thì H1 cập nhật lại màn đó trên Figma, để file Figma không cũ dần. Trục thứ hai là độ phức tạp logic (thường hoặc phức tạp), quyết định độ sâu rà trường hợp biên, đặc tả hành vi và việc review độc lập có bắt buộc hay không. Chi tiết ở `engine/protocol/design-levels.md`.

### 3.4 Đường đi của một intent

| Tình huống | Số gate |
|---|---|
| Thay đổi trên màn có sẵn, mọi màn L1, logic thường | 4: D1 chạy liền D2 nên Context checkpoint gộp vào Strategy Gate; làn chỉ HTML không có E2 |
| Mọi màn L1, có flow mới hoặc màn logic phức tạp | 5 |
| Có ít nhất một màn L2 hoặc L3 | 6, thêm UX Brief Gate |

Alignment Gate chờ các bên bên ngoài, thường là điểm dài nhất về thời gian; Designer làm việc khác trong lúc chờ. Dev Feasibility Gate chỉ mở khi Dev có ý kiến về khả năng làm.

### 3.5 Gate và phản hồi

Mỗi gate trình bảng kết quả bằng số, đường dẫn để mở, và bốn lựa chọn phản hồi theo hướng dẫn trước đây của team:

| Phản hồi | Hệ quả |
|---|---|
| Approved | Ghi quyết định nguyên văn, chụp bản duyệt vào `archive/`, sang stage kế; AI đề xuất commit |
| Approved with Notes | Như Approved; ghi chú được đưa vào bước đầu của stage sau |
| Need Revision | Sửa đúng phần được nêu, chạy lại review nếu artifact đổi, trình lại |
| Blocked | Tạm dừng, soạn sẵn câu hỏi cho PO, BA, Dev; tiếp tục khi có câu trả lời |

Từ lần Need Revision thứ ba, AI đề xuất Approved with Notes kèm điều kiện cụ thể để tránh lặp vô hạn; Designer vẫn quyết định.

## 4. Từng stage

D1 Context Overview: AI đọc PRD và tài liệu của PO, tóm tắt tính năng, vai, việc người dùng làm trên giao diện, phần wireframe của PO đã quyết định, ước tính các màn và mức của từng màn, câu hỏi cho PO kèm tin nhắn soạn sẵn.

D2 Design Strategy: AI lập sơ đồ flow (Mermaid, đã kiểm cú pháp), danh sách màn gắn user story, bảy state cho mỗi màn, trường hợp biên theo mức Must, Should, Optional, mức và đầu ra của từng màn, ánh xạ vùng màn hình sang component của kit, điểm lưu ý về accessibility, ý kiến về PRD. Với flow mới phức tạp, AI dựng thêm flow prototype khung xám để các bên thao tác thử trước buổi đồng thuận.

D3 Alignment: AI đưa các mục chiến lược mà các bên cần đọc vào file thiết kế UX trên repo của PO, theo template của PO. Repo chỉ đọc hoặc không có repo: AI xuất file để Designer gửi. AI đọc kết quả đồng thuận, sửa chiến lược khi có quyết định đổi.

E1 UX Brief: màn L2 có đề xuất component mới dựa trên style hiện có để Designer chọn; màn L3 có phân tích design ref, hai đến ba hướng thị giác và reference lock. Mọi màn có thứ bậc thông tin, wireframe dạng khối, nội dung chữ thật, tương tác và state.

E2 UI Design: với màn Figma + HTML, AI lưu version, dựng trong khu vực nháp bằng instance của kit, chia đợt với màn lớn, tự kiểm chín tiêu chí bằng số đo. Màn L3 do Designer dẫn.

E3 Prototype: một file HTML, mở bằng trình duyệt, có bảng điều khiển đổi vai, đổi bộ dữ liệu, ép state. Màn Figma + HTML lấy cấu trúc từ frame Figma; màn chỉ HTML dựng trực tiếp bằng component của frontend theo bảng ánh xạ, có chế độ ghi chú bàn giao. Kiểm theo ba bậc, từ chạy thật trên trình duyệt tới Designer tự xác nhận.

R1 Review & Refine: vòng 1, agent UX Lead review độc lập và chấm điểm; vòng 2, góp ý của BA, Dev, Reviewer được gom vào feedback matrix. Ý kiến của Dev về khả năng làm mở Dev Feasibility Gate với hai đến ba phương án kèm trade-off.

H1 Handoff & Done: ghi chú bàn giao trên Figma hoặc trong file HTML; lưu version Figma và commit file HTML để ghim link; cập nhật file thiết kế UX trên repo PO; soạn `delivery-summary.md` và nội dung chuyển task sang Done. Kết thúc intent bằng một lượt hỏi bài học cần lưu.

Designer không cần nhớ lệnh: nói tự nhiên, AI định tuyến theo bảng trong `AGENTS.md`.

| Lệnh | Việc |
|---|---|
| `/setup` | Cài đặt trên máy mới, kiểm lại hoặc đổi cách kết nối Figma |
| `/new-intent` | Tạo việc từ PRD đã duyệt, hỏi bù Product KB tối thiểu, chạy ngay D1 |
| `/ux` | Làm bước kế tiếp hoặc tiếp tục phần chưa hoàn tất |
| `/ux-status` | Trạng thái các việc, kiểm lệch với repo PO và Figma |
| `/ux-review` | Review độc lập chiến lược, hoặc `--shadow` cho màn đang chạy |
| `/change-request` | Đổi chiến lược đã đồng thuận |
| `/kit-proposal` | Đề xuất bổ sung component vào UI kit; chỉ đề xuất, không dựng |
| `/ds-lookup` | Tra luật design system và cách dùng kit |
| `/new-domain` | Dựng Product KB cho một sản phẩm |

## 5. Kiểm tra chất lượng

| Lớp kiểm | Cơ chế |
|---|---|
| Checklist từng stage | Mục `[BLOCK]` chặn gate cho tới khi đạt |
| Tự kiểm giao diện | Chín tiêu chí trên Figma ở E2 (độ phủ, biến, instance, chữ, icon, mode và breakpoint, accessibility, bố cục, nhất quán); bộ tự kiểm riêng cho màn chỉ HTML ở E3 |
| Review độc lập | Agent UX Lead không thấy hội thoại thiết kế; chấm bảy trục (Requirement fit, Flow và IA, Heuristic, Visual hierarchy, Consistency, Accessibility, Responsive và nội dung); bắt buộc cho màn L2, L3 và màn logic phức tạp |
| Script | `mermaid-lint.mjs` kiểm cú pháp sơ đồ ở D2; `prototype-audit.mjs` kiểm prototype theo từng màn ở nhiều cỡ màn hình |
| Accessibility | WCAG 2.2 mức AA: tương phản, vùng chạm, focus, tên trợ năng, không chỉ dựa vào màu; ngưỡng riêng của sản phẩm khai ở Product KB mục 9 |
| An toàn file thiết kế | Đọc trước, ghi sau; chỉ ghi vào khu vực nháp; lưu version trước khi ghi |
| Trung thực về mức đã kiểm | Không báo xong khi chưa đo hoặc chưa chụp; không ghi "đã chạy thử" khi chưa chạy được trên trình duyệt; phần chưa kiểm ghi vào Limitation |

Kiến thức nghề dùng khi làm và khi kiểm nằm ở `engine/knowledge/`: đọc yêu cầu, phân tích flow, rà trường hợp biên, bảy state, UX writing tiếng Việt, design ref, trực quan hoá dữ liệu, prototype, heuristic, accessibility, thang chấm review.

## 6. Kết nối với PO-Workflow và AI-DLC

### 6.1 PO-Workflow

| PO-Workflow | UIUX-Workflow |
|---|---|
| 2.42 PRD được duyệt | `/new-intent`, D1 đọc PRD |
| 2.43 Design Alignment: PO tạo khung file thiết kế UX và giao Design PIC | D2 viết chiến lược; D3 đưa vào file đó |
| Decision Brief, các PIC duyệt | Alignment Gate chờ kết quả này |
| Story List lấy mã màn từ file thiết kế UX | H1 cập nhật link Figma, link HTML trong file đó |
| Thay đổi yêu cầu đi change request trên PRD | `/change-request` của UIUX, chạy lại D3 cho phần đổi |

Đường dẫn, template và quy ước cụ thể nằm ở Product KB mục 2, không ghi cứng trong engine. Sơ đồ trong file thiết kế UX qua được `mermaid-lint.mjs` thì cũng qua được bước kiểm sơ đồ của PO-Workflow.

### 6.2 Đối chiếu với AWS AI-DLC

| | AWS AI-DLC | UIUX-Workflow |
|---|---|---|
| Người làm | Design Agent: wireframe, interaction design, accessibility, design system compliance | Designer cùng AI |
| Thời điểm | 1.6 Rough Mockups ở Ideation; 2.5 Refined Mockups ở Inception, sau User Stories, trước Domain Design | Sau khi PRD được duyệt: D2 chiến lược, D3 đồng thuận, sau đó E1 đến H1 |
| Đầu ra | Toàn bộ là Markdown: wireframes, user flow, mockups, interaction spec, design system mapping, accessibility checklist | Chiến lược Markdown, giao diện trên Figma hoặc HTML, prototype HTML |
| Duyệt | Product Lead review mang tính tham vấn; người duyệt ở gate | Strategy Gate do Designer; Alignment Gate do các bên; review độc lập ở R1 |

Mục 1 đến 4 của `design-strategy.md` đặt theo bốn artifact của stage 2.5 Refined Mockups, để việc chuyển sang AI-DLC sau này ít phải đổi.

### 6.3 Lộ trình AI-DLC

Giai đoạn hiện tại theo SDLC: thiết kế bắt đầu từ PRD đã duyệt. Khi chuyển sang AI-DLC, thiết kế tham gia sớm hơn:

| AI-DLC | Việc của UIUX-Workflow |
|---|---|
| 1.6 Rough Mockups, sau Scope Definition | Stage mới: wireframe khung và user flow từ intent và scope, trước khi có PRD; dùng lại flow prototype |
| 2.4 User Stories | Designer góp ý story ở mức giao diện |
| 2.5 Refined Mockups | D2 và D3 hiện tại, đầu vào đổi từ PRD sang user stories và requirements |
| Construction | E2, E3, R1, H1 hiện tại |

## 7. Cài đặt, cấu trúc repo và nâng cấp

Cài đặt: cài Claude Code và đăng nhập, sau đó mở Claude Code ở thư mục bất kỳ và gửi `Cài đặt UIUX-Workflow từ https://github.com/buidhui/uiux-workflow`. AI tải repo và hướng dẫn từng bước: kết nối Figma, nối repo của PO, kiểm tra. Các việc Designer phải tự thao tác và cách cài tay ở [USER-GUIDE.md](USER-GUIDE.md) Phần A. Dành cho AI nhận yêu cầu cài đặt: tải repo về thư mục Designer chọn, đọc `engine/commands/setup.md` và làm theo từ bước 0.

Quy trình chạy được với bốn cách kết nối Figma (kể cả không kết nối và gửi ảnh), với repo của PO có quyền push, chỉ đọc hoặc không có repo, và với công cụ AI khác Claude Code. Phần việc AI không làm được với một lựa chọn có cách thay thế ghi ở USER-GUIDE mục A3.

| Thư mục | Nội dung | Thuộc về |
|---|---|---|
| `engine/` | Stage, lệnh, protocol, template (gồm khung Product KB), checklist, kiến thức nghề, agent, script | Quy trình dùng chung |
| `.claude/` | Lối tắt lệnh và agent cho Claude Code, trỏ vào `engine/` | Quy trình dùng chung |
| `AGENTS.md`, `CLAUDE.md` và các tài liệu ở thư mục gốc | Quy tắc cho AI và tài liệu của quy trình | Quy trình dùng chung |
| `domain/` | Product KB của sản phẩm; repo engine chỉ có README | Sản phẩm |
| `intents/` | Hồ sơ từng việc thiết kế | Sản phẩm |
| `adhoc/` | Kết quả của việc một lượt, review màn đang chạy | Sản phẩm |
| `memory/` | Bài học của team | Sản phẩm |
| `.uiux/` | Trạng thái cài đặt và cách kết nối Figma của từng máy; không commit | Từng máy |

Mỗi intent có cấu trúc:

```
intents/<slug>/
├── intent.md          PRD và intent của PO, file Figma, prototype, design ref
├── state.md           màn, mức, đầu ra, stage, frame, version đã đẩy
├── decisions.md       quyết định nguyên văn, câu trả lời, rủi ro chấp nhận, change request
├── memory.md          quan sát của AI, xét khi đóng intent
├── inputs/            tài liệu, wireframe của PO, ảnh màn cũ; inputs/refs/ cho design ref
├── discovery/         D1, D2, D3
├── execution/         E1, E2, E3 (prototype ở execution/prototype/)
├── delivery/          R1, H1
└── archive/           bản chụp lúc duyệt, không chỉnh sửa
```

Mỗi sản phẩm dùng một repo riêng, tạo từ repo engine. Lấy bản engine mới bằng `git pull engine main`: bản mới chỉ đổi phần dùng chung, phần của sản phẩm giữ nguyên. Việc cần làm thêm khi nâng cấp ghi ở mục Nâng cấp của từng phiên bản trong [CHANGELOG.md](CHANGELOG.md). Product KB gồm mười một mục, ưu tiên trỏ tới nguồn có sẵn (repo PO, dữ liệu UI kit, Figma) thay vì chép; định nghĩa ở [DOMAIN-SETUP.md](DOMAIN-SETUP.md).

## 8. Cơ sở phương pháp

| Nguồn | Phần áp dụng trong quy trình |
|---|---|
| Hướng dẫn UI/UX Workflow cùng AI trước đây của team | Ba phase, các bước từ đọc yêu cầu tới bàn giao, gate, bốn cách phản hồi, bảy state cấp màn, feedback matrix, Dev Feasibility, prompt mẫu và lỗi thường gặp |
| [AWS AI-DLC Workflows](https://github.com/awslabs/aidlc-workflows), giấy phép MIT-0 | Vai Design Agent và stage 1.6, 2.5: bốn mục đầu của chiến lược thiết kế; kiến thức về interaction pattern, UX, accessibility (đã sửa theo WCAG 2.2); cấu trúc stage và gate, qua PO-Workflow |
| PO-Workflow | Điểm nhận và đẩy file thiết kế UX (stage 2.43); tách engine khỏi knowledge base của sản phẩm; hồ sơ intent, nhật ký quyết định, archive; định dạng câu hỏi; reviewer độc lập; vòng bài học; quy tắc kiểm sơ đồ Mermaid |
| Bộ skill VIC (quy trình UI/UX và design system) | Discovery chi tiết, bản kê thay đổi, screen contract, rà trường hợp biên, flow map, review chấm điểm bảy trục, fix-prompt, luật thao tác Figma, review màn đang chạy, tra luật design system |
| `refero-design` | Design ref, phân tích ref, chống trung bình hoá, reference lock |
| Các bộ skill dựng UI kit trên Figma | Gap log, đề xuất bổ sung kit dừng ở bước đề xuất, không vẽ tay phần kit còn thiếu |
| [ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill), giấy phép MIT | Bảng chọn biểu đồ theo dạng dữ liệu; script kiểm prototype HTML theo nhiều cỡ màn hình |
| WCAG 2.2, W3C | Chuẩn accessibility mức AA |
| Mười heuristic của Jakob Nielsen; cognitive walkthrough | Trục Heuristic của review |

Với mỗi nguồn, quy trình chỉ giữ phương pháp; tên biến, file key, tên sản phẩm và số liệu không có nguồn đã được bỏ. Mục Nguồn ở cuối mỗi file trong `engine/knowledge/` ghi rõ phần đã lấy, đã sửa và đã bỏ. Thay đổi của từng phiên bản nằm trong [CHANGELOG.md](CHANGELOG.md).
