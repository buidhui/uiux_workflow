# User Guide: UIUX-Workflow

Hướng dẫn cho Designer. Phần A là cài đặt, làm một lần trên mỗi máy. Phần B đi từng bước một việc từ lúc PRD được duyệt tới lúc bàn giao. Phương pháp và lý do ở [README.md](README.md).

## Phần A. Cài đặt

### A1. Cài nhanh

Designer làm hai việc:

1. Cài Claude Code và đăng nhập: tiện ích Claude Code trong VS Code, ứng dụng Claude desktop, hoặc Claude Code trong terminal.
2. Mở Claude Code ở thư mục bất kỳ và gửi:
   ```
   Cài đặt UIUX-Workflow từ https://github.com/buidhui/uiux-workflow
   ```
   Sản phẩm đã có repo UIUX-Workflow riêng thì gửi link repo đó.

AI chạy lệnh `/setup` (`engine/commands/setup.md`): tải repo, kiểm công cụ trên máy, hỏi cách kết nối Figma, nối repo của PO, kiểm tra, sau đó chỉ việc kế tiếp. Các việc dưới đây cần Designer thao tác; AI hướng dẫn từng thao tác và chờ xác nhận:

| Việc | Khi nào |
|---|---|
| Đăng nhập Figma hoặc bật connector Figma trong claude.ai | Lựa chọn A |
| Bật Dev Mode MCP Server trong Figma desktop | Lựa chọn B |
| Tạo token Figma, tự chạy lệnh có token trong terminal, cài plugin Desktop Bridge | Lựa chọn C |
| Xin quyền truy cập repo của PO | Khi chưa có quyền |
| Cài Git hoặc Node.js | Khi máy chưa có và lựa chọn cần đến |
| Mở lại Claude Code tại thư mục repo | Sau khi thêm kết nối Figma, hoặc khi phiên cài đặt không mở tại thư mục repo |

Cài đặt dừng giữa chừng thì mở Claude Code tại thư mục repo và gõ "tiếp tục cài đặt"; AI làm tiếp từ bước đã dừng. Trạng thái cài đặt của từng máy nằm ở `.uiux/setup.md`, không đưa lên git. Gõ `/setup` khi cần kiểm lại hoặc đổi lựa chọn.

Các mục A2 đến A7 mô tả từng lựa chọn, dùng khi Designer muốn tự cài hoặc khi một bước tự động gặp lỗi.

### A2. Công cụ AI và công cụ nền

| Cách | Khi nào dùng | Cách chạy quy trình |
|---|---|---|
| Claude Code trong VS Code, ứng dụng desktop hoặc terminal | Cách chính, được hỗ trợ đầy đủ | Mở thư mục repo. Lệnh `/ux`, `/new-intent` và các lệnh khác có sẵn |
| Công cụ AI khác đọc được repo (ví dụ Codex, Cursor) | Team đang dùng công cụ đó | Công cụ đọc `AGENTS.md`. Lệnh là file Markdown trong `engine/commands/`; yêu cầu AI đọc file lệnh, sau đó làm theo, ví dụ "đọc `engine/commands/ux.md` và làm theo". Kết nối Figma cài theo cách của công cụ đó, giữ tên server ở mục A3 |

Với công cụ khác Claude Code, agent review độc lập có thể không chạy được như một agent riêng. Khi đó mở một phiên mới, đưa đúng các file mà `review-protocol.md` liệt kê và yêu cầu đóng vai UX Lead theo `engine/agents/ux-lead.md`; phiên review không được thấy hội thoại thiết kế.

| Công cụ nền | Cần cho | Cách cài |
|---|---|---|
| Git | Tải repo, làm việc với repo của PO | macOS: chạy `xcode-select --install` và bấm Cài đặt. Windows: tải từ git-scm.com |
| Claude Code CLI (lệnh `claude` trong terminal) | Thêm kết nối Figma lựa chọn B, C | Theo tài liệu cài đặt của Claude Code |
| Node.js bản LTS | Lựa chọn C; script kiểm prototype tự động (tuỳ chọn) | Tải từ nodejs.org. Script cài theo `engine/scripts/README.md` |

### A3. Kết nối Figma

Có bốn lựa chọn. Một máy có thể cài nhiều lựa chọn cùng lúc. Quy trình chạy được với mọi lựa chọn; lựa chọn nào thiếu khả năng thì bước tương ứng chuyển sang cách làm thay thế ở bảng "Lựa chọn nào cho stage nào".

Lựa chọn A, connector Figma của claude.ai. Kết nối từ tài khoản claude.ai, dùng được trong Claude Code khi đăng nhập cùng tài khoản.
1. Vào claude.ai, mục Settings, Connectors, chọn Figma, đăng nhập Figma.
2. Mở Claude Code, gõ `/mcp`, kiểm tra Figma có trong danh sách.
3. Tài khoản Figma cần quyền sửa file đích nếu muốn AI ghi vào Figma.

Lựa chọn B, Figma Dev Mode MCP server trên máy. Server chạy cùng ứng dụng Figma desktop, chỉ đọc.
1. Mở Figma desktop, vào Preferences, bật Dev Mode MCP Server.
2. Thêm vào Claude Code: `claude mcp add --transport http --scope user figma-desktop http://127.0.0.1:3845/mcp`. Địa chỉ theo tài liệu của Figma tại thời điểm viết; kiểm tra lại trong tài liệu của Figma nếu kết nối thất bại.
3. Figma desktop phải đang mở khi AI làm việc. Lỗi kết nối bị từ chối (connection refused) thường do Figma chưa mở hoặc server chưa bật.

Lựa chọn C, figma-console MCP và plugin Desktop Bridge. Đọc và ghi qua plugin chạy trong Figma desktop. Cần lựa chọn này khi công cụ dựng kit của sản phẩm (Product KB mục 5) chạy qua figma-console.
1. Tạo personal access token trong Figma, mục Settings, Security, quyền đọc file và thư viện.
2. Trong cửa sổ terminal riêng, thay `<token>` và chạy: `claude mcp add figma-console --scope user -e FIGMA_ACCESS_TOKEN=<token> -- npx -y figma-console-mcp@latest`. Chạy riêng để token không đi qua hội thoại với AI.
3. Cài plugin Desktop Bridge theo tài liệu của `figma-console-mcp`. Trong Figma desktop, mở file cần làm, chạy Plugins, Development, Figma Desktop Bridge. Giữ cửa sổ plugin mở trong lúc AI làm việc.
4. Token hết hạn không báo lỗi; tìm kiếm qua REST trả về rỗng. Gặp kết quả rỗng bất thường thì kiểm tra token trước.

Lựa chọn D, không kết nối. Designer gửi ảnh chụp màn hình hoặc ảnh xuất từ Figma, và link frame để ghi vào tài liệu. AI đọc ảnh. Mọi việc ghi vào Figma do Designer làm.

Sau khi thêm server ở lựa chọn B hoặc C, mở lại Claude Code để kết nối có hiệu lực.

Khả năng của từng lựa chọn:

| Việc | A. Connector claude.ai | B. Dev Mode MCP | C. figma-console | D. Không kết nối |
|---|---|---|---|---|
| Đọc cấu trúc frame, design context | Có | Có | Có | Không, chỉ đọc ảnh |
| Chụp ảnh frame | Có | Có | Có | Designer gửi ảnh |
| Đọc biến, token | Có | Có | Có | Không |
| Tìm component trong thư viện | Có | Hạn chế | Có, qua plugin | Không |
| Dựng instance, sửa frame | Có, qua lệnh chạy Plugin API | Không | Có | Không |
| Lưu version có tên | Kiểm khi cài | Không | Kiểm khi cài | Designer lưu |
| Ghi annotation, note | Kiểm khi cài | Không | Có | Designer ghi |
| Vẽ sơ đồ trên FigJam | Có | Không | Hạn chế | Không |
| Cần Figma desktop mở | Không | Có | Có | Không |
| Cần token | Không | Không | Có | Không |

"Kiểm khi cài" nghĩa là khả năng phụ thuộc phiên bản công cụ. Lần đầu cần dùng, AI thử trên khu vực nháp và ghi kết quả vào `.uiux/setup.md`.

Lựa chọn nào cho stage nào:

| Stage | Cần | Lựa chọn đủ | Khi không đủ |
|---|---|---|---|
| D2 | Đọc màn liền kề | A, B, C | D: Designer gửi ảnh màn liền kề |
| E1 vẽ wireframe trên Figma (tuỳ chọn) | Ghi | A, C | Wireframe dạng khối văn bản trong `ux-brief.md` |
| E2 AI dựng UI | Ghi, tìm component | A, C | Designer dựng; AI tự kiểm bằng cách đọc (A, B, C) hoặc qua ảnh (D) |
| E3 prototype | Đọc design context | A, B, C | D: dựng từ chiến lược, UX Brief và ảnh; độ giống thấp hơn, ghi trong `prototype-report.md` |
| R1 review | Đọc, chụp ảnh, đọc biến | A, B, C | D: review qua ảnh; mọi nhận xét ghi nhãn Visual judgment, các trục cần số đo ghi N/A |
| H1 ghi chú bàn giao | Ghi | A, C | Designer ghi theo nội dung AI soạn |

Agent review và tên server: agent `ux-lead` chỉ được đọc Figma. Danh sách công cụ của agent nằm ở dòng `tools` của `.claude/agents/ux-lead.md`, đã có tên công cụ đọc của lựa chọn A, B (tên server `figma-desktop`) và C (tên server `figma-console`). Khi dùng server với tên khác, thêm tên công cụ chụp ảnh và đọc của server đó vào dòng `tools`, theo dạng `mcp__<tên server>__<tên công cụ>`; xem tên bằng lệnh `/mcp`.

### A4. Repo của PO

| Trường hợp | Khi nào | D3 và H1 làm gì |
|---|---|---|
| Repo git, Designer có quyền push | Team PO dùng PO-Workflow hoặc repo tài liệu | AI sửa file thiết kế UX trong intent của PO, Designer xem diff, AI commit, push khi Designer yêu cầu |
| Repo git, Designer chỉ có quyền đọc | Quy ước của PO không cho Designer push | AI soạn nội dung file; Designer gửi PO, hoặc mở pull request nếu quy ước cho phép |
| Không có repo; PRD trên Lark, Confluence, Google Docs | Team PO chưa dùng repo | AI xuất file thiết kế UX ở `discovery/alignment/`; Designer đưa lên nơi PO dùng; xác nhận của PO dán nguyên văn vào `decisions.md` |

Cách làm việc với PO ghi ở Product KB mục 2. Đường dẫn repo của PO trên máy ghi ở `.uiux/setup.md`.

### A5. Repo sản phẩm và bản cập nhật engine

Repo `buidhui/uiux-workflow` là engine, chưa gắn sản phẩm. Mỗi sản phẩm dùng một repo riêng chứa engine và dữ liệu của sản phẩm đó. Trong repo, phần chung (`engine/`, `.claude/`, tài liệu ở thư mục gốc) tách khỏi phần riêng của sản phẩm (`domain/`, `intents/`, `adhoc/`, `memory/`) và phần riêng của từng máy (`.uiux/`); bảng đầy đủ ở `AGENTS.md` mục Cấu trúc.

| Tình huống | Cách làm |
|---|---|
| Sản phẩm đã có repo UIUX-Workflow | Cài từ link repo sản phẩm. Product KB đã có, không cần dựng lại |
| Sản phẩm mới | Cài từ link engine. `/setup` đổi tên remote `origin` thành `engine`; sau đó chạy `/new-domain`. Người phụ trách tạo repo sản phẩm khi cần chia sẻ cho Designer khác |
| Lấy bản cập nhật engine | `git pull engine main` trong repo sản phẩm. Bản mới chỉ đổi phần chung; phần riêng giữ nguyên. Khi khung Product KB ở `engine/templates/domain/` có mục mới, bổ sung vào `domain/domain.md` theo ghi chú của phiên bản đó trong bảng Lịch sử của README |
| Không dùng git | Quy trình vẫn chạy; mất lịch sử thay đổi và không chia sẻ được với Designer khác. Sao lưu thư mục `intents/` định kỳ |

AI chỉ commit và push khi Designer yêu cầu.

### A6. UI kit và prototype

| Tình huống | Cách làm |
|---|---|
| Sản phẩm có UI kit trên Figma và hướng dẫn dùng kit | Khai trong Product KB mục 5; AI dùng kit ở D2, E2 |
| Có UI kit nhưng chưa có hướng dẫn dùng | AI đọc thư viện trên Figma (A, C); hướng dẫn dùng kit được viết dần theo việc |
| Chưa có UI kit | Mức sẵn sàng 0; Designer dựng UI; mọi màn có phần chưa có trong app được xếp tối thiểu L2 |
| Có công cụ dựng kit (ví dụ một bộ skill dựng kit) | Khai trong Product KB mục 5; `/kit-proposal` chuyển đề xuất cho công cụ đó ở bước đề xuất |
| Không có công cụ dựng kit | `/kit-proposal` ghi đề xuất vào gap log; người phụ trách kit đọc và xử lý |
| Muốn AI kiểm prototype tự động ở nhiều cỡ màn hình | Cài script theo `engine/scripts/README.md`; không cài thì AI dùng cách kiểm bậc thấp hơn ở `prototyping.md` |
| Biết thư viện component của frontend | Prototype dùng thư viện đó qua CDN, giống sản phẩm thật nhất |
| Không biết thư viện frontend, hoặc thư viện không tải được trong một file HTML | Prototype dùng HTML và CSS theo token của Product KB |
| Cần chia sẻ prototype cho người không có repo | Gửi file `index.html`; người nhận mở bằng trình duyệt, không cần cài đặt. Nếu môi trường có công cụ đăng trang (ví dụ artifact của claude.ai), có thể đăng thành link riêng tư |
| Muốn trình bày prototype trong Figma | Nối điều hướng giữa frame (lựa chọn A hoặc C); không có thì Designer nối tay |

### A7. Kiểm tra sau khi cài

`/setup` tự chạy các bước này ở cuối. Tự kiểm tay:

1. Mở repo bằng Claude Code, gõ `/` và thấy `/ux`, `/new-intent`.
2. Gửi "đọc giúp frame <link>" để kiểm kết nối Figma; với lựa chọn D, gửi một ảnh.
3. Gửi "liệt kê intent trong repo của PO" để kiểm đường dẫn repo của PO.
4. Product KB ở mức Tối thiểu (`DOMAIN-SETUP.md`). Khi chưa có, chạy `/new-domain`, hoặc để lần `/new-intent` đầu tiên hỏi bù.

## Phần B. Làm một việc từ PRD tới bàn giao

Ví dụ xuyên suốt: tính năng Chứng chỉ, ba màn. Danh sách chứng chỉ ghép từ bảng và bộ lọc có sẵn trong kit (L1). Chi tiết chứng chỉ cần một khối lịch sử cấp mà kit chưa có (L2). Trang chứng chỉ công khai để người học chia sẻ, cần gây ấn tượng (L3).

### Bước 1. Tạo việc khi PRD đã duyệt

```
PRD tính năng Chứng chỉ đã duyệt, intent <đường dẫn intent của PO>.
Trang chứng chỉ công khai cần làm mới, ref đây: <link 1>, <link 2>.
```

Hoặc `/new-intent Chứng chỉ <đường dẫn>`. AI tạo việc và đọc PRD ngay.

### Bước 2. D1 Context Overview

AI trình tóm tắt tính năng, các vai, việc người dùng làm trên giao diện, phần wireframe của PO đã quyết định, các màn dự kiến và mức của từng màn, số lần duyệt dự kiến, câu hỏi cho PO kèm tin nhắn chép gửi được.

Designer sửa phần AI hiểu sai, gửi câu hỏi cho PO, sau đó phản hồi `Approved`. Câu hỏi chặn chưa có trả lời thì `Blocked`.

### Bước 3. D2 Design Strategy (Strategy Gate)

AI hỏi vài câu: modal hoặc trang riêng, màn phát sinh ngoài yêu cầu, mức của màn, màn nào AI dựng UI. Sau đó trình `design-strategy.md`:
- Danh sách màn gắn user story, mức thiết kế.
- Sơ đồ luồng, bảy state từng màn, trường hợp biên.
- Component của UI kit cho từng vùng; phần kit còn thiếu và cách xử lý tạm.
- Accessibility, màn cần sáng tạo, ý kiến về PRD, rủi ro và câu hỏi.

Luồng mới phức tạp: nói "làm flow prototype" để có bản khung xám thao tác thử, gửi kèm cho các bên.

Designer duyệt từng dòng của bảng duyệt, nhất là mức của từng màn và ý kiến về PRD. Phản hồi `Approved` hoặc `Need Revision`.

### Bước 4. D3 Alignment (Alignment Gate)

AI render chiến lược vào file thiết kế UX theo template của PO. Khi có quyền push vào repo của PO, AI cho Designer xem diff, commit khi Designer đồng ý, push khi Designer yêu cầu. Khi repo chỉ đọc hoặc không có repo, AI lưu file trong intent để Designer gửi PO.

Việc chuyển sang trạng thái chờ đồng thuận. Designer làm việc khác. Sau buổi họp hoặc khi PO báo:
```
PO họp xong rồi, làm tiếp.
```
AI pull repo PO, đọc kết quả. Có quyết định đổi thiết kế thì AI sửa chiến lược, đẩy lại. Các bên đã đồng ý và không còn chỉnh sửa thì Designer phản hồi `Approved`. Từ đây mới vẽ lên Figma.

### Bước 5. E1 UX Brief (chỉ khi có màn mở rộng hoặc sáng tạo)

- Màn sáng tạo: AI phân tích design ref, đưa hai đến ba hướng; Designer chọn một. Chưa có ref thì AI dừng lại và hỏi.
- Màn mở rộng: AI đề xuất cách làm phần kit chưa có; Designer chọn. AI chạy `/kit-proposal` để ghi đề xuất cho người phụ trách kit; màn dùng xử lý tạm trong lúc chờ.
- Mọi màn: thứ bậc thông tin, wireframe dạng khối, nội dung chữ, tương tác, state.

Phản hồi tại UX Brief Gate.

### Bước 6. E2 UI Design

Khi công cụ Figma có quyền ghi (mục A3), kit có hướng dẫn dùng và mức sẵn sàng cho phép, AI dựng màn L1, L2 bằng instance của kit:
1. AI lưu version Figma, sau đó dựng trong khu vực nháp; thiết kế chính không bị sửa.
2. Màn lớn thì AI trình kế hoạch chia đợt; Designer duyệt, xem ảnh chụp cuối mỗi đợt, góp ý thì AI sửa ngay.
3. Gặp phần kit chưa có: AI dùng xử lý tạm đã ghi và chạy `/kit-proposal`; không tự vẽ component.

Màn sáng tạo, mọi màn Designer muốn tự làm, và mọi màn khi công cụ Figma không có quyền ghi: Designer dựng trên Figma, dán link (hoặc ảnh với lựa chọn không kết nối) vào chat; AI đọc và tự kiểm.

### Bước 7. E3 Prototype

AI sinh prototype HTML một file từ màn trên Figma: thao tác được trọn luồng, có bảng điều khiển đổi vai, đổi bộ dữ liệu (rỗng, nhiều, chuỗi dài), ép state (đang tải, lỗi, không có quyền). Mở bằng trình duyệt. Muốn trình bày trên Figma thì nói "nối prototype trên Figma"; AI nối điều hướng giữa các frame.

### Bước 8. R1 Review & Refine (UI Gate)

Vòng 1: reviewer độc lập chấm điểm, chỉ lỗi kèm vị trí, số đo, cách sửa. Designer sửa lỗi bắt buộc.

Vòng 2: AI soạn tin nhắn mời BA, Dev, Reviewer góp ý kèm link Figma và cách mở prototype. Góp ý tới thì dán vào chat; AI gom vào feedback matrix. Dev nói khó làm thì AI đưa phương án kèm trade-off. Mỗi vòng sửa, AI lưu version Figma và cập nhật prototype.

Phản hồi `Approved` khi không còn góp ý bắt buộc. Sau đó Designer chuyển frame từ khu vực nháp sang page chính.

### Bước 9. H1 Handoff & Done (Delivery Gate)

AI ghi chú bàn giao cạnh frame trên Figma, cập nhật file thiết kế UX trên repo PO (link Figma từng màn, link prototype), viết `delivery-summary.md`, soạn nội dung chuyển task sang Done. Designer xem diff, gửi link cho Dev, cập nhật task, phản hồi `Approved`. AI hỏi một câu cuối: có gì cần nhớ cho lần sau.

Dev góp ý trong lúc làm: nói "Dev góp ý về chứng chỉ: ...". AI mở lại bước review cho màn đó.

### Tình huống ngoài luồng chuẩn

| Tình huống | Cách làm |
|---|---|
| PRD chưa được duyệt | Luồng bắt đầu từ PRD đã duyệt. Muốn đọc trước bản nháp thì tạo việc như thường; AI ghi mức hoàn thiện của PRD là Nháp. Khi bản đã duyệt đến, chạy `/change-request` cho phần khác biệt |
| CR trên màn có sẵn, mọi màn L1, logic thường | AI chạy D1 liền với D2, không dừng ở D1; bốn gate (`design-levels.md`) |
| Designer tự đề xuất cải tiến một màn đang chạy | Chạy `/ux-review --shadow` trên màn đó, sau đó `/new-intent` với file review làm đầu vào |
| Không có kết nối Figma | Gửi ảnh và link frame; AI làm mọi việc chỉ cần đọc, Designer làm phần ghi vào Figma (mục A3) |
| Sản phẩm chưa có UI kit | Designer dựng UI; AI vẫn làm chiến lược, prototype, review, bàn giao |
| PO đổi yêu cầu sau khi đã đồng thuận | Nói "PO đổi yêu cầu"; AI mở `/change-request`, chạy lại D3 cho phần đổi |
| Dev góp ý sau khi đã bàn giao | Nói "Dev góp ý về <tính năng>: ..."; AI mở lại R1 cho màn liên quan |
| Người xem prototype không có repo | Gửi file `index.html`; mở bằng trình duyệt, không cần cài đặt |
| Dùng công cụ AI khác Claude Code | Yêu cầu AI đọc `AGENTS.md`; review độc lập chạy ở một phiên riêng |

### Phản hồi tại các điểm duyệt

| Phản hồi | Khi nào |
|---|---|
| `Approved` | Đã ổn, đi tiếp. Trả lời "ok" hoặc "duyệt" được hiểu là Approved |
| `Approved with Notes:` kèm ghi chú | Cơ bản ổn, cần lưu ý ở bước sau |
| `Need Revision:` kèm điểm cần sửa | Chưa đạt |
| `Blocked:` kèm câu hỏi | Chờ PO, Dev, QA trả lời |

### Việc nhỏ, không cần tạo việc

Sửa chữ vài nút, góp ý nhanh một màn, hỏi cách dùng component: hỏi trực tiếp, AI thực hiện ngay. Review một màn đang chạy: `/ux-review --shadow <link Figma hoặc ảnh>`. Kit thiếu một component: `/kit-proposal <mô tả>`.

### Dừng giữa chừng

Nói "dừng hôm nay". Hôm sau nói "làm tiếp" hoặc `/ux`. Xem mọi việc: "tới đâu rồi" hoặc `/ux-status`.

### Lỗi thường gặp

| Hiện tượng | Nói với AI |
|---|---|
| AI hiểu sai PRD | "Đọc lại PRD, tách Confirmed, Assumption, Open question, không tự suy luận" |
| AI tự mở rộng phạm vi | "Chỉ làm trong chiến lược đã đồng thuận, đề xuất thêm đưa vào Nice-to-have" |
| Thiếu state | "Kiểm lại bảy state cho từng màn" |
| UI lệch kit | "Đối chiếu kit, chỉ ra component nào lệch, thay bằng component có sẵn" |
| Prototype lệch Figma | "Cập nhật prototype theo bản Figma mới nhất" |
| AI gán sai mức của màn | "Màn này dùng component có sẵn" hoặc "màn này cần làm mới" |
