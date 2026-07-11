uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 1.0 + t * 1.41 + ph), sin(lt * 3.0 + t * 0.63)) * 0.61;
        md = min(md, length(p - lp)); }
    v = exp(-md * 6.93) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.76;
	p = rot2(length(p) * 3.77 + time * 0.30) * p;
	p += vec2(-0.14, 0.81) * sin(length(p) * 3.41 - time * 1.08) * 0.27;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.23 / wf * sin(wf * 2.59 * p.y + time * 1.25); p.y += 0.45 / wf * cos(wf * 2.79 * p.x + time * 2.11); }
	p = (floor(p * 6.2) + 0.5) / 6.2;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.50, 0.39, 0.79) * (0.08 / (abs(d) + 0.06));
	col = col / (1.0 + col);
	col = fract(col * 1.03);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
