SoloBizKit – PDF to Word

Upload the `pdf-to-word` folder to the ROOT of the GitHub repository.

Features:
- Drag & drop upload
- Multiple PDFs in one selection
- Add more files later
- Remove individual files
- Convert each PDF to its own DOCX
- Combine several PDFs into one DOCX
- Progress indicator
- Browser-based text extraction
- Warm green SoloBizKit design
- No account required

Technical note:
The converter extracts selectable text from PDFs using PDF.js and creates DOCX files with docx.js.
It does NOT provide full layout-perfect PDF-to-Word conversion.
Scanned/image-only PDFs need OCR and will not convert into editable text in this version.

External browser libraries:
- PDF.js
- docx.js
- JSZip is loaded for future bulk ZIP support
