---
description: Cài đặt UIUX-Workflow trên máy của Designer. Tải repo, kiểm công cụ, kết nối Figma, nối repo của PO, kiểm tra, sau đó chỉ việc kế tiếp. Chạy lại được để kiểm hoặc đổi lựa chọn
argument-hint: [link repo sản phẩm hoặc repo engine]
---
# /setup

Cài đặt theo `USER-GUIDE.md` Phần A. Lệnh này làm thay Designer mọi việc chạy được bằng lệnh; việc cần Designer thao tác (đăng nhập, bật tuỳ chọn trong Figma, tạo token, xin quyền) thì hướng dẫn từng thao tác và chờ Designer xác nhận. Mỗi bước xong ghi ngay vào `.uiux/setup.md` để phiên sau làm tiếp đúng bước đã dừng.

Ngôn ngữ với Designer: lời thường, mỗi lần một việc. Không đưa thuật ngữ git hoặc MCP khi Designer không hỏi; khi phải đưa lệnh cho Designer chạy, đưa nguyên lệnh để sao chép.

## 0. Vị trí và trạng thái
- Thư mục đang mở là repo UIUX-Workflow (có `AGENTS.md` và thư mục `engine/`): đọc `.uiux/setup.md`. Có và trạng thái `xong`: hỏi Designer muốn kiểm lại, đổi cách kết nối Figma, hoặc đổi repo của PO; chỉ chạy các bước liên quan. Trạng thái khác: làm tiếp từ bước ghi trong file.
- Thư mục đang mở chưa phải repo này (Designer gửi link từ một phiên khác):
  1. Hỏi sản phẩm đã có repo UIUX-Workflow riêng chưa (repo đã có Product KB). Có: dùng link đó. Chưa: dùng link engine `https://github.com/buidhui/uiux-workflow`.
  2. Hỏi nơi đặt thư mục; đề xuất `~/Documents/uiux-<tên sản phẩm>`, hoặc `~/Documents/uiux-workflow` khi chưa có sản phẩm.
  3. `git clone <link> <thư mục>`. Clone từ link engine cho một sản phẩm mới: đổi tên remote `origin` thành `engine` (`git remote rename origin engine`) để sau này lấy bản cập nhật engine mà không đẩy nhầm dữ liệu sản phẩm lên repo engine.
  4. Đọc `AGENTS.md`, `USER-GUIDE.md` Phần A của repo vừa tải, làm tiếp từ bước 1.

## 1. Kiểm công cụ trên máy
Chạy và báo bảng Có, Thiếu, Cần cho việc gì:

| Kiểm | Lệnh | Cần cho |
|---|---|---|
| Git | `git --version` | Mọi trường hợp |
| Claude Code CLI | `claude --version` | Thêm kết nối Figma lựa chọn B, C |
| Node.js | `node --version` | Lựa chọn C; script kiểm cú pháp sơ đồ `engine/scripts/mermaid-lint.mjs` (không cần cài gói); script kiểm prototype `engine/scripts/` (tuỳ chọn, cài theo `engine/scripts/README.md`) |

Thiếu thì đưa cách cài theo `USER-GUIDE.md` mục A2 để Designer tự cài; không chạy lệnh cần quyền quản trị (`sudo`) thay Designer. Phần thiếu không ảnh hưởng tới lựa chọn Designer sẽ dùng thì ghi nhận và đi tiếp.

## 2. Kết nối Figma
1. Thử công cụ của lựa chọn A (ví dụ `whoami` của connector Figma claude.ai) và kiểm danh sách server bằng `claude mcp list` khi có CLI. Báo những gì đã kết nối được.
2. Hỏi Designer chọn lựa chọn theo bảng ở `USER-GUIDE.md` mục A3, kèm đề xuất:
   - A đã kết nối được: đề xuất A, không cần cài thêm.
   - Designer cần AI dựng UI trên Figma: A hoặc C.
   - Chỉ cần AI đọc Figma, không muốn đăng nhập thêm: B.
   - Không cài được gì: D.
   Chọn nhiều lựa chọn được.
3. Làm theo lựa chọn:
   - A chưa kết nối: hướng dẫn bật connector Figma trong claude.ai và đăng nhập Claude Code bằng cùng tài khoản. Chờ xác nhận.
   - B: hướng dẫn Designer bật Dev Mode MCP Server trong Figma desktop. AI chạy `claude mcp add --transport http --scope user figma-desktop http://127.0.0.1:3845/mcp`.
   - C: hướng dẫn tạo personal access token trong Figma. Đưa lệnh `claude mcp add figma-console --scope user -e FIGMA_ACCESS_TOKEN=<token> -- npx -y figma-console-mcp@latest` để Designer tự dán token và chạy trong cửa sổ terminal riêng, để token không đi qua hội thoại. Hướng dẫn cài plugin Desktop Bridge theo tài liệu của `figma-console-mcp`.
   - D: không cài gì; nhắc cách gửi ảnh và link frame.
4. Tên server giữ đúng `figma-desktop`, `figma-console`: agent review `.claude/agents/ux-lead.md` dùng các tên này. Server đã có sẵn với tên khác thì dùng server đó và thêm tên công cụ vào dòng `tools` của agent theo `USER-GUIDE.md` mục A3.

## 3. Repo của PO
Hỏi một lần, ba lựa chọn theo `USER-GUIDE.md` mục A4: có link repo, chỉ có quyền đọc, không có repo.
- Có link: hỏi nơi đặt (đề xuất thư mục cạnh repo này), `git clone`. Lỗi quyền truy cập: soạn tin nhắn xin quyền để Designer gửi người quản lý repo; tạm ghi trường hợp "không có repo" và đi tiếp.
- Ghi đường dẫn trên máy vào `.uiux/setup.md`. Link repo và cách làm việc với PO ghi vào Product KB mục 2 chỉ khi mục đó còn trống.

## 4. Ghi trạng thái
Tạo hoặc cập nhật `.uiux/setup.md` theo `engine/templates/local-setup.md`. Thư mục `.uiux/` không đưa lên git.

## 5. Mở lại khi cần
Kết nối Figma vừa thêm và lệnh của quy trình chỉ có hiệu lực ở phiên Claude Code mở tại thư mục repo. Cần mở lại khi: vừa thêm server ở bước 2, hoặc phiên hiện tại không mở tại thư mục repo. Ghi trạng thái `chờ mở lại`, hướng dẫn:
- VS Code: File, Open Folder, chọn thư mục repo, mở Claude Code.
- Ứng dụng desktop: chọn thư mục repo khi mở phiên mới.
- Terminal: `cd <thư mục repo>` sau đó `claude`.
Sau khi mở lại, Designer gõ "tiếp tục cài đặt" hoặc `/setup`.

## 6. Kiểm tra
1. Phiên đang mở tại thư mục repo (thư mục làm việc có `AGENTS.md` và `engine/`). Với Claude Code, nhờ Designer gõ `/` và xác nhận thấy `/ux`.
2. Figma: nhờ Designer gửi link một frame bất kỳ; AI đọc cấu trúc và chụp ảnh frame. Lựa chọn D: nhờ gửi một ảnh, AI mô tả lại.
3. Khả năng ghi "Kiểm khi cài" (lưu version, ghi annotation) với A, C: chỉ thử khi Product KB đã có khu vực nháp; chưa có thì ghi `chưa kiểm`, lần E2 đầu tiên kiểm.
4. Repo của PO: `git pull`, liệt kê intent theo đường dẫn ở KB mục 2 (chưa có đường dẫn thì liệt kê thư mục gốc).
Bước nào lỗi: ghi lỗi, đưa cách khắc phục theo `USER-GUIDE.md` mục A3 hoặc A4, hỏi Designer muốn sửa ngay hoặc dùng cách thay thế.

## 7. Product KB
- `domain/domain.md` đã có và đã điền: báo tên sản phẩm, bỏ qua.
- Chưa có hoặc còn khung trống: hỏi Designer muốn dựng ngay bằng `/new-domain`, hoặc để `/new-intent` hỏi bù sáu thông tin tối thiểu ở việc đầu tiên. Designer không phụ trách sản phẩm mới thì hỏi người phụ trách đã có repo sản phẩm chưa, quay lại bước 0.

## 8. Kết thúc
Ghi trạng thái `xong`. Trình bảng: mục, kết quả, việc Designer còn phải làm. Chỉ việc kế tiếp bằng một câu mẫu:
```
PRD tính năng <tên> đã duyệt, intent <đường dẫn intent của PO>.
```

## Không làm
- Không ghi token, mật khẩu vào bất kỳ file nào trong repo hoặc trong `.uiux/`.
- Không đưa `.uiux/` lên git. Không commit, không push khi Designer chưa yêu cầu.
- Không chạy lệnh cần quyền quản trị thay Designer.
- Không sửa repo của PO trong lúc cài đặt; chỉ clone và pull.
