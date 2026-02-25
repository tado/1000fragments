# 1000fragments-claude 作業記録

作業日: 2026-02-25
担当: Claude Sonnet 4.6

---

## 概要

`100fragments/` フォルダに収録された101個のGLSLフラグメントシェーダー（`00.frag`〜`100.frag`）を解析し、TouchDesigner互換の1000個のフラグメントシェーダー（`0000.frag`〜`0999.frag`）を `1000fragments-claude/` フォルダに生成した。

---

## 作業フロー

### Step 1: 既存シェーダーの解析

`100fragments/` 内の全101ファイルを解析し、以下の14種類のビジュアルテクニックを特定した。

| # | テクニック | 代表ファイル |
|---|-----------|------------|
| 1 | Pulsing Circles / Distance Fields | 01, 02, 29, 34〜39 |
| 2 | Noise-based Patterns (Perlin, FBM) | 03, 04, 12〜14, 45〜50 |
| 3 | Rotating Line Patterns | 06〜08, 10, 11, 15〜18 |
| 4 | Wave Distortion / Coordinate Warping | 19〜21, 23〜27 |
| 5 | Radial Waves (concentric) | 30, 98 |
| 6 | HSB Color Wheel (polar coordinates) | 08 |
| 7 | Scan Line / Rain Effects | 44, 51, 56 |
| 8 | Moving Point / Particle Effects | 18, 19, 73〜79, 88〜90 |
| 9 | Rotating Grid / Modulo Patterns | 61〜70 |
| 10 | Perspective / Tunnel Effects | 83〜86 |
| 11 | Cellular / Voronoi Patterns | 99, 100 |
| 12 | Animated Rectangles (abs coordinates) | 94〜96 |
| 13 | Random / Noise Grid (blocky flickering) | 80〜82 |
| 14 | High-Frequency Sine Wave Patterns | 52〜55, 70 |

解析結果の詳細は `memory/analysis.md` に保存済み。

#### 共通数学パターン

```glsl
// Noise Hash
float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

// FBM (Fractional Brownian Motion)
float fbm(vec2 st, int oct) {
    float v = 0.0, a = 0.5;
    for (int i = 0; i < 8; i++) {
        if (i >= oct) break;
        v += a * noise(st); st *= 2.0; a *= 0.5;
    }
    return v;
}

// 2D Rotation Matrix
mat2 rotate2d(float angle) {
    return mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
}
```

---

### Step 2: 第1世代シェーダー生成（gen_1000_final.py）

**25カテゴリ × 40バリエーション = 1000個**を生成するPythonスクリプトを作成・実行。

- スクリプト: `gen_1000_final.py`
- 生成先: `1000fragments-claude/0000.frag`〜`0999.frag`
- 全シェーダーにTouchDesigner互換フォーマット（`TDOutputSwizzle`）を適用

---

### Step 3: 第2世代シェーダー生成（gen_1000_v2.py）— カテゴリ拡張

既存25カテゴリにさらに26の新アルゴリズムを追加し、**51カテゴリ**に拡張して全1000個を再生成。

- スクリプト: `gen_1000_v2.py`
- 分配方式:
  - Cat 0〜30（31カテゴリ）× **20**バリエーション = **620個**
  - Cat 31〜50（20カテゴリ）× **19**バリエーション = **380個**
  - 合計: **1000個**

---

### Step 4: GLSL構文検証と修正（validate_and_fix.py）

`glslangValidator.exe`（プロジェクト内バイナリ）を用いて全1000個を検証。

- スクリプト: `validate_and_fix.py`
- 検証方式: TouchDesigner互換スタブを付加してファイルベース検証

```
#version 450
vec4 TDOutputSwizzle(vec4 c) { return c; }
// + 各シェーダー本体
```

#### 発見・修正したバグ（2件）

**バグ1: ネストf-string内の`{ff(tile)}`が未評価**
- **原因**: Pythonのf-string内で`pat.replace("p", "...{ff(tile)}...")`とした際、`replace()`の引数は通常文字列のためf-string評価されず、`{ff(tile)}`という文字列がそのままGLSLコードに出力されていた
- **症状**: `ERROR: unexpected LEFT_BRACE`
- **影響**: Cat 33（Hypnotic Zoom）の全19シェーダー（0658〜0676）
- **修正**: `tile_s = ff(tile)` として事前計算し、f-string外で文字列を構築

**バグ2: `str.replace("p", ...)`が`step`内の`p`も置換**
- **原因**: `"step(0.5,fract(p.x...))"` に対して `.replace("p", expr)` を実行すると `step` → `stefract(...)` という不正な関数名が生成される
- **症状**: `ERROR: 'stefract': no matching overloaded function found`
- **影響**: Cat 33の`base_type==1`パターン 5シェーダー（0659, 0663, 0667, 0671, 0675）
- **修正**: `re.sub(r'\bp\b', replace_str, pat)` で単語境界付き正規表現置換に変更

#### 最終検証結果

```
Total shaders:   1000
Broken found:    0
All shaders are valid!
```

---

## 生成ファイル構成

```
1000fragments/
├── gen_1000_final.py       # 第1世代生成スクリプト（25カテゴリ×40）
├── gen_1000_v2.py          # 第2世代生成スクリプト（51カテゴリ）★最終版
├── validate_and_fix.py     # GLSL構文検証・自動修正スクリプト
├── Claude-task.md          # 本ドキュメント
└── 1000fragments-claude/
    ├── 0000.frag           # Cat 0: Pulsing Circles vi=0
    ├── ...
    └── 0999.frag           # Cat 50: Grand Synthesis vi=18
```

---

## 51カテゴリ詳細

### GLSLベースフォーマット（全シェーダー共通）

```glsl
uniform float time;       // 経過時間（秒）
uniform vec2 resolution;  // 出力解像度（ピクセル）
out vec4 fragColor;

void main() {
    // ... 各カテゴリのロジック ...
    vec4 color = vec4(r, g, b, 1.0);
    fragColor = TDOutputSwizzle(color);
}
```

---

### Cat 0〜24: オリジナルカテゴリ（各20バリエーション）

| Cat | 範囲 | 名称 | アルゴリズム概要 |
|-----|------|------|----------------|
| 0 | 0000〜0019 | **Pulsing Circles** | N個の円から広がるsin波紋。距離フィールドによる計算。円の数(1〜5)・周波数・速度・カラーパレットを変化 |
| 1 | 0020〜0039 | **FBM Noise** | FBM（Fractional Brownian Motion）ノイズ。オクターブ数(2〜7)・スケール・速度・後処理（mod/abs/sin/step）を変化 |
| 2 | 0040〜0059 | **Rotating Lines** | 角度`atan(y,x)`ベースの回転ライン。ライン数(1〜6)・回転速度・線幅・カラーを変化 |
| 3 | 0060〜0079 | **Wave Distortion** | sin/cosで座標を歪めてから描画。X/Y周波数・振幅・レイヤー数(1〜3)を変化 |
| 4 | 0080〜0099 | **Radial Waves** | 原点からの距離`length(st)`をsinに入力した同心円波。RGB分離・周波数・速度を変化 |
| 5 | 0100〜0119 | **HSB Color Wheel** | `atan(y,x)`で角度→色相マッピング。`hsb2rgb()`変換。回転速度・彩度・明度・パターンを変化 |
| 6 | 0120〜0139 | **Scan Lines** | sin波による水平/垂直/斜め/交差スキャンライン。ライン数・速度・方向を変化 |
| 7 | 0140〜0159 | **Moving Points** | 軌道運動する複数点の距離フィールド蓄積。`amp/length(pos-uv)`でグロー計算。点数(3〜10)・速度を変化 |
| 8 | 0160〜0179 | **Grid Modulo** | RGBチャンネルを異なる速度で回転させmod演算。`rot2d()`関数で各チャンネルを独立回転 |
| 9 | 0180〜0199 | **Tunnel Effect** | `vec3(pos.x, fov, pos.y)`からz除算でパースペクティブ投影。チェッカーボードグリッド。FOV・スケール・速度を変化 |
| 10 | 0200〜0219 | **Voronoi** | `random2()`でセル点を生成、最近傍距離`m_dist`を計算。アニメーション速度・スケール・エッジカラーを変化 |
| 11 | 0220〜0239 | **Animated Rectangles** | `step()`関数による矩形SDF。サイズをsinでアニメーション。矩形数(1〜5)・速度を変化 |
| 12 | 0240〜0259 | **Noise Grid** | セル単位で`random()`、時間で離散的に切り替わるブロックノイズ。セルサイズ・切り替え速度を変化 |
| 13 | 0260〜0279 | **High-Freq Sine** | `sin(uv.x*高周波 + cos(uv.y*周波数)*位相変調)`をRGB各チャンネルに適用。高密度干渉パターン |
| 14 | 0280〜0299 | **Plasma** | 4方向のsin波（水平・垂直・斜め・放射状）の重ね合わせ。古典的デモシーンプラズマエフェクト |
| 15 | 0300〜0319 | **Lissajous** | `vec2(sin(time*fx), cos(time*fy))`でリサージュ軌跡。`smoothstep(thick, 0, dist)`でグロー描画 |
| 16 | 0320〜0339 | **Julia Set** | `z = z² + c`の反復。cをtime軸で円運動させてアニメーション。反復回数(20〜36)・ズーム・カラーマッピングを変化 |
| 17 | 0340〜0359 | **Kaleidoscope** | `atan()`で角度取得→セグメント数で折りたたみ対称。内部パターンにFBM/sin/ノイズを使用 |
| 18 | 0360〜0379 | **Starfield** | `fract(uv * density + vec2(0, time*speed))`で星の層を生成。多層パララックスで奥行き感 |
| 19 | 0380〜0399 | **Interference** | N個の波源から`sin(length(st-src)*freq - time*speed)`を合計。多波源干渉パターン |
| 20 | 0400〜0419 | **Spiral** | `mod(angle*arms/TWO_PI + radius*tightness, 1.0)`で螺旋形状。`smoothstep`でアウトライン描画 |
| 21 | 0420〜0439 | **Moire** | 2つの回転グリッド`sin(s1.x)*sin(s1.y)*sin(s2.x)*sin(s2.y)`の掛け合わせ。角度差でモアレ縞 |
| 22 | 0440〜0459 | **Mandala** | 多重対称（3〜10分割）の角度折りたたみを複数レイヤー重ね。sin/mod/noise/stepパターンを使用 |
| 23 | 0460〜0479 | **Glitch Art** | 時間量子化した`random()`でブロックオフセット。`floor(time*speed)`でフレーム単位更新 |
| 24 | 0480〜0499 | **Hybrid** | 2手法を組み合わせた複合表現（10種）。FBM+円・Voronoi+放射・Julia+Plasma・Kaleido+noise等 |

---

### Cat 25〜50: 新規カテゴリ（Cat 25〜30は各20、Cat 31〜50は各19バリエーション）

| Cat | 範囲 | 名称 | アルゴリズム概要 |
|-----|------|------|----------------|
| 25 | 0500〜0519 | **Domain Warping** | `f = fbm(p + 4*fbm(p + 4*fbm(p)))`による多重ドメイン歪み（Inigo Quilez手法）。有機的・流体的パターン |
| 26 | 0520〜0539 | **Sphere Raytracing** | 解析的球体交差（二次方程式）によるレイトレース。拡散照明 + 鏡面反射（Phong）+ 動くライト |
| 27 | 0540〜0559 | **Alt Fractals** | Burning Ship（`z = (|Re(z)|+i|Im(z)|)² + c`）・Tricorn（共役使用）・Mandelbar変種フラクタル |
| 28 | 0560〜0579 | **Chromatic Aberration** | 中心からの方向ベクトルでRGBチャンネルを異なる量オフセットサンプリング。バレル歪み + ビネット |
| 29 | 0580〜0599 | **Flow Field** | ノイズ角度`angle = noise(p*freq)*2π`に沿って複数ステップ積分。フローフィールドの可視化 |
| 30 | 0600〜0619 | **Neon Polar Curves** | 極座標で`r = f(angle)`の数学曲線（Rose・Cardioid・Rhodonea等）を`abs(r - curve)`で距離描画 |
| 31 | 0620〜0638 | **Lightning / Arc** | `bx = offset + noise(vec2(st.y*freq, time*speed))`で水平変位した垂直アーク。`glow/abs(st.x-bx)` |
| 32 | 0639〜0657 | **Oscilloscope** | 複数のsin波を`smoothstep(thick, 0, abs(st.y - wave_y))`で画面描画。チャンネルごとに色分け |
| 33 | 0658〜0676 | **Hypnotic Zoom** | `scale = pow(tile, mod(time*speed, 1.0))`でループするズーム。フェードクロスで自己相似遷移 |
| 34 | 0677〜0695 | **Solar Rays** | `pow(abs(sin(atan(y,x)*numRays)), sharpness)`で光線を生成。ノイズ変調 + 放射状フォールオフ |
| 35 | 0696〜0714 | **Terrain Contours** | FBMハイトマップ`h`の等高線を`abs(sin(h*freq*π))`で描画。地形トポグラフィック表現 |
| 36 | 0715〜0733 | **Magnetic Field** | 2極子の電場`B = (st-p1)/r1² - (st-p2)/r2²`を計算。場の強度・角度をカラーマッピング |
| 37 | 0734〜0752 | **Posterized Noise** | FBMノイズを`floor(n*levels)/levels`で段階量子化。エッジ検出でアウトラインを加算 |
| 38 | 0753〜0771 | **Shape Morphing** | 円・正方形・菱形・多角形のSDFを`mix(sdf1, sdf2, sin(time)*0.5+0.5)`で補間。アウトライン描画 |
| 39 | 0772〜0790 | **Iridescent** | 薄膜干渉: `phase = 2π * thickness / wavelength`（R/G/B波長別）→`cos(phase)`でスペクトル色 |
| 40 | 0791〜0809 | **Ring Cascade** | N個のリング`sin(r*freq_i - time*speed_i + phase_i)/i`を合計。多重振動の干渉リング |
| 41 | 0810〜0828 | **Halftone** | `length(fract(st*density) - 0.5) < random(cell)*0.48`でドット生成。角度回転オプション付き |
| 42 | 0829〜0847 | **Smoke / Turbulence** | `flow_uv = st + vec2(0, -time*upspeed)`に水平FBM歪みを加えてfbmサンプリング。煙の密度表現 |
| 43 | 0848〜0866 | **Crystallographic** | 六方晶系タイリング（`vec2 r=vec2(1,√3)`でセルグリッド）またはp4m正方対称。4種の対称群 |
| 44 | 0867〜0885 | **Gravitational Lensing** | `distorted = st + normalize(st-mass)*strength/length(st-mass)`でUVを湾曲。アインシュタインリング効果 |
| 45 | 0886〜0904 | **Fractal Folding** | `z = abs(z); if(z.x<z.y) z=z.yx; z = z*scale - offset`を反復。シェルピンスキー風IFSフラクタル |
| 46 | 0905〜0923 | **Digital Rain** | 列ごとに乱数速度で`fract(st.y + time*col_spd)`を計算。`exp(-drop*trail)`で残光表現 |
| 47 | 0924〜0942 | **Pinwheel** | `floor(mod(angle/seg_size, 2.0))`でセクター塗り分け。リング分割と組み合わせた回転風車 |
| 48 | 0943〜0961 | **Retro CRT** | `sin(st.y*scanlines*π)^power`の走査線マスク × 信号値（sin/noise/fbm）× ビネット |
| 49 | 0962〜0980 | **Bokeh / Light Orbs** | 軌道運動する複数光源に対し`glow/max(length(uv-lp)-bsize, eps)`でボケ蓄積。カラー混合 |
| 50 | 0981〜0999 | **Grand Synthesis** | 複数手法の複合最終表現（10種）。Spiral+Domain Warping・Voronoi+HSB・Julia+Kaleido・Terrain等 |

---

## カラーパレット体系

全カテゴリで共通の10種カラーパレット（`vi % 10`でサイクル）:

| モード | 内容 |
|--------|------|
| 0 | グレースケール |
| 1 | ウォーム（オレンジ系） |
| 2 | クール（ブルー系） |
| 3 | レインボー（sin波RGB） |
| 4 | ネオン（高彩度パープル/グリーン） |
| 5 | マゼンタ〜ティール |
| 6 | ファイア（オレンジ/レッド） |
| 7 | マトリックスグリーン |
| 8 | ティール系 |
| 9 | レッド〜ブルー反転 |

---

## 検証ツール

### validate_and_fix.py

全シェーダーをglslangValidatorで検証し、エラーのあるシェーダーを自動修正するスクリプト。

```
python validate_and_fix.py
```

- `glslangValidator.exe`（`glslang_bin/bin/`）を使用
- TouchDesigner互換スタブを付加してファイルベース検証（`--stdin`フラグは使用しない）
- エラーシェーダーは8種の視覚的フォールバックでランダム置換
- 最終検証で置換後シェーダーの有効性を確認

### 注意: `--stdin`フラグについて

`glslangValidator --stdin -S frag file.frag` と指定すると、`--stdin`が優先されstdinから読み込みを行う（=空入力でexit 0）。ファイルベース検証には必ず `glslangValidator -S frag file.frag` を使用すること。

---

## 最終状態

| 項目 | 内容 |
|------|------|
| 生成ファイル数 | 1000個（`0000.frag`〜`0999.frag`） |
| 生成先フォルダ | `1000fragments-claude/` |
| カテゴリ数 | 51カテゴリ（Cat 0〜50） |
| GLSL検証 | 全1000個エラーなし |
| 修正したバグ | 2件（Cat33: f-string評価漏れ・word-boundary置換） |
| 使用スクリプト | `gen_1000_v2.py`（生成）、`validate_and_fix.py`（検証） |
