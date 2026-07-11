uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 1.0 + t * 0.99 + ph), sin(lt * 2.0 + t * 1.10)) * 0.72;
        md = min(md, length(p - lp)); }
    v = exp(-md * 9.50) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y += sin(p.x * 3.36 + time * 2.01) * 0.38;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.21, lr * 2.05 + time * 0.37); }
	p += vec2(-0.10, 0.12) * sin(length(p) * 5.99 - time * 1.72) * 0.11;
	p = rot2(p.y * 3.20 + time * 1.02) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.76), field(p, time, 1.52));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
