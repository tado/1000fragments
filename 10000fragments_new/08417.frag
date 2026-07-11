uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 1.0 + t * 1.36 + ph), sin(lt * 4.0 + t * 1.26)) * 0.75;
        md = min(md, length(p - lp)); }
    v = exp(-md * 5.75) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = (floor(p * 29.2) + 0.5) / 29.2;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.17; p = rot2(0.91) * p; }
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.49 / wf * sin(wf * 3.66 * p.y + time * 1.42); p.y += 0.31 / wf * cos(wf * 3.27 * p.x + time * 2.05); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.65), field(p, time, 1.30));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
