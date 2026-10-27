# Script hỗ trợ

Script chạy được bằng lệnh, dùng chung cho mọi sản phẩm. Không bắt buộc: thiếu script thì stage dùng cách kiểm bậc thấp hơn và ghi vào Limitation.

| Script | Dùng ở | Việc |
|---|---|---|
| `prototype-audit.mjs` | E3, R1 | Kiểm tự động prototype HTML: đi qua từng màn theo hash, chụp nhiều cỡ màn hình, kiểm tràn ngang, vùng chạm, focus, tên trợ năng, ảnh thiếu alt, tương phản gần đúng, lỗi console. Đạt bậc 2 ở `engine/knowledge/prototyping.md` mục Cách kiểm prototype |

## Cài một lần trên mỗi máy

Cần Node.js bản 18 trở lên. Chạy ở thư mục gốc của repo:

```
npm --prefix engine/scripts install
npx --prefix engine/scripts playwright install chromium
```

Lệnh thứ hai tải bản Chromium riêng của Playwright vào bộ nhớ đệm của máy, không cần cài Chrome. Thư mục `engine/scripts/node_modules/` không đưa lên git.

## Chạy

```
node engine/scripts/prototype-audit.mjs --file intents/<slug>/execution/prototype/index.html --out intents/<slug>/execution/prototype/audit
```

Tuỳ chọn:

| Tuỳ chọn | Mặc định | Ý nghĩa |
|---|---|---|
| `--target <px>` | 24 | Ngưỡng vùng chạm. Mặc định theo WCAG 2.2 mức AA (2.5.8); dùng ngưỡng sản phẩm chọn ở Product KB mục 9 nếu có |
| `--routes "#/scr-1,#/scr-2"` | Tự tìm liên kết `#/...` | Danh sách màn cần kiểm |
| `--viewports 360,768,1440` | 360, 390, 768, 1024, 1440, 1920 | Chiều rộng màn hình cần chụp, theo breakpoint của sản phẩm |
| `--url <http...>` | | Kiểm một trang đang chạy thay cho file |
| `--executable <path>` | | Đường dẫn Chromium khi không tự tìm được |

Kết quả: `report.md`, `report.json` và thư mục `screenshots/` trong thư mục `--out`. Mã thoát 2 khi có phát hiện mức cao.

Phát hiện của script là gợi ý để kiểm tiếp. Tương phản tính gần đúng trên trình duyệt; vùng chạm cần xét ngoại lệ của 2.5.8. Trước khi ghi finding ở R1, đo lại trên Figma theo `engine/knowledge/accessibility.md`. Script không bấm, không nhập liệu: kiểm tương tác vẫn cần bậc 1 hoặc Designer.

## Giấy phép

`prototype-audit.mjs` dựa trên mã nguồn giấy phép MIT của ui-ux-pro-max-skill; toàn văn giấy phép ở `THIRD_PARTY_NOTICES.md`.
