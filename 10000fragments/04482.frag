uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 1.0 + t * 0.62 + ph), sin(lt * 5.0 + t * 0.85)) * 0.81;
        md = min(md, length(p - lp)); }
    v = exp(-md * 9.06) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 6.03 + t * 1.26 + ph) * 0.7;
    float wb = sin(p.y * 14.28 - t * 1.00 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.43;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.95;
	vec2 q1 = p; vec2 q2 = p;
	q1 = sin(q1 * 1.47 + time * 0.68) * 1.06;
	{ float lr = log(length(q1) + 0.001); float la = atan(q1.y, q1.x); q1 = vec2(la * 1.42, lr * 2.54 + time * -0.84); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.06);
	float d = abs(d1 - d2);
	vec3 col = vec3(0.20, 0.30, 0.23) * (0.20 / (abs(d) + 0.04));
	col = col / (1.0 + col);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.39 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
