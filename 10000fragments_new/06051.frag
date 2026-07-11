uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 1.0 + t * 0.38 + ph), sin(lt * 3.0 + t * 0.77)) * 0.64;
        md = min(md, length(p - lp)); }
    v = exp(-md * 8.46) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.45 / wf * sin(wf * 3.20 * p.y + time * 1.53); p.y += 0.49 / wf * cos(wf * 3.85 * p.x + time * 0.85); }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.30, lr * 2.85 + time * 0.55); }
	p = rot2(time * 1.33) * p;
	p = fract(p * 1.91) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.82, 0.57, 0.55) * (0.09 / (abs(d) + 0.07));
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.79));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
