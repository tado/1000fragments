uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 2.0 + t * 0.36 + ph), sin(lt * 4.0 + t * 1.23)) * 0.69;
        md = min(md, length(p - lp)); }
    v = exp(-md * 5.34) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.75;
	p *= 2.10;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.42 / wf * sin(wf * 2.12 * p.y + time * 1.94); p.y += 0.27 / wf * cos(wf * 1.63 * p.x + time * 1.96); }
	p = rot2(p.y * 1.45 + time * 0.84) * p;
	p.x += sin(p.y * 6.78 + time * 2.67) * 0.29;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.73), field(p, time, 1.45));
	col = 0.5 + 0.5 * col;
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
