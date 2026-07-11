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
        vec2 lp = vec2(sin(lt * 3.0 + t * 0.73 + ph), sin(lt * 3.0 + t * 0.93)) * 0.61;
        md = min(md, length(p - lp)); }
    v = exp(-md * 7.51) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.55;
	p = abs(p) - 0.46;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.36, lr * 2.21 + time * 0.92); }
	p = rot2(length(p) * 3.68 + time * 1.07) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.75 + time * 0.20, vec3(0.49, 0.48, 0.41), vec3(0.43, 0.39, 0.49), vec3(1.16, 0.84, 1.15), vec3(0.45, 0.59, 0.86));
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
