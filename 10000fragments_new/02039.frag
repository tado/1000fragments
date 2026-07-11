uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 4.0 + t * 1.23 + ph), sin(lt * 4.0 + t * 0.81)) * 0.80;
        md = min(md, length(p - lp)); }
    v = exp(-md * 9.44) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.21;
	p = rot2(p.y * -2.73 + time * 0.55) * p;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.33, lr * 2.43 + time * -0.94); }
	{ p = vec2(atan(p.y, p.x) * 1.85, length(p) * 4.77 - time * 0.63); }
	p *= 1.77;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.04 + time * 0.11, vec3(0.41, 0.48, 0.57), vec3(0.45, 0.43, 0.34), vec3(1.13, 0.77, 1.19), vec3(0.63, 0.95, 0.18));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
