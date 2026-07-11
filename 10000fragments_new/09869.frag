uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 1.0 + t * 1.44 + ph), sin(lt * 3.0 + t * 0.62)) * 0.79;
        md = min(md, length(p - lp)); }
    v = exp(-md * 6.60) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.64;
	p.x += sin(p.y * 2.21 + time * 1.69) * 0.30;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.16, lr * 2.69 + time * 0.72); }
	p = rot2(0.67) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.51), field(p, time, 1.03));
	col = 0.5 + 0.5 * col;
	col *= 0.87 + 0.14 * sin(gl_FragCoord.y * 1.09 + time * 5.55);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
