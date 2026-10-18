# DIP Made Ease

Animated, chapter-by-chapter lessons for **Digital Image Processing (CSE 0613 4205)** at BUFT, with narration that switches between **English and Bangla**.

The site covers all 12 lectures: 96 animated chapters plus a quiz for each lecture. Every chapter plays step by step. Each step shows an animation, a caption, and voice-over in the chosen language.

## Use it

Open `index.html` in a browser. It is a single self-contained file and needs no server.

To publish it for students, enable **GitHub Pages** (Settings → Pages → deploy from the `main` branch, root folder). On the free GitHub plan, Pages requires the repository to be public.

## Narration

The voice-over uses the browser's built-in speech (Web Speech API).

- **English** works in all modern browsers.
- **Bangla** needs a Bangla voice on the device:
  - Microsoft Edge includes Bangla voices out of the box.
  - On Android, install Bangla in Google Text-to-speech settings.

If no voice is available, the captions still advance on their own.

## Lectures

| No. | Topic |
|---|---|
| 01 | Introduction to Digital Image Processing |
| 02 | The Origins of Digital Image Processing |
| 03 | Elements of Visual Perception |
| 04 | Image Sensing and Acquisition |
| 05 | Image Sampling and Quantization |
| 06 | Spatial and Intensity Resolution |
| 07 | Basic Relationships Between Pixels |
| 08 | Mathematical Tools in DIP |
| 09 | Spatial and Intensity Transformation |
| 10 | Spatial Filtering: Smoothing and Sharpening |
| 11 | Image Compression |
| 12 | Morphological Image Processing |

## Editing

`index.html` is generated from the files in `src/`:

- `src/lib.js`: drawing helpers and image operations
- `src/engine.js`: navigation, narration and quizzes
- `src/l01.js` … `src/l12.js`: one file per lecture, holding chapters, animation steps, English and Bangla narration, slide notes and quiz
- `src/css.html`, `src/css2.html`, `src/defs.html`: styles and shared SVG definitions

After editing, rebuild:

```bash
python3 src/build.py     # writes index.html and syntax-checks the script
python3 src/test.py      # optional: clicks through every step in both languages (needs Playwright)
```

## Author

Abduz Zami, Lecturer, Dept. of CSE, BGMEA University of Fashion & Technology (BUFT), Dhaka.
