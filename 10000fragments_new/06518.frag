uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 12.19 + t * 2.03 + ph) * 0.7;
    float wb = sin(p.y * 19.98 - t * 1.57 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.51;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 4.0 + t * 0.93 + ph), sin(lt * 2.0 + t * 0.79)) * 0.75;
        md = min(md, length(p - lp)); }
    v = exp(-md * 4.69) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.32;
	vec2 q1 = p; vec2 q2 = p;
	q2 = rot2(1.06) * q2;
	{ float lr = log(length(q2) + 0.001); float la = atan(q2.y, q2.x); q2 = vec2(la * 1.94, lr * 2.78 + time * 0.78); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.40);
	float d = 0.5 * (d1 + d2);
	vec3 col = vec3(0.69, 0.34, 0.68) * (0.10 / (abs(d) + 0.07));
	col = col / (1.0 + col);
	col *= 0.83 + 0.13 * sin(gl_FragCoord.y * 2.32 + time * 6.96);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
