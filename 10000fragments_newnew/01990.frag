uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 4.89 + t * 4.06 + ph) + sin(p.y * 5.38 - t * 4.06 + ph)
        + sin((p.x + p.y) * 5.64 + t * 4.06 + ph) + sin(length(p) * 10.35 - t * 4.06 + ph));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 2.0 + t * 0.47 + ph), sin(lt * 4.0 + t * 1.12)) * 0.59;
        md = min(md, length(p - lp)); }
    v = exp(-md * 7.63) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.57;
	vec2 q1 = p; vec2 q2 = p;
	{ float lr = log(length(q1) + 0.001); float la = atan(q1.y, q1.x); q1 = vec2(la * 1.59, lr * 1.66 + time * -0.48); }
	q1 = fract(q1 * 1.29) - 0.5;
	{ float iv = dot(q2, q2) + 0.05; q2 = q2 / iv * 0.43; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.44);
	float d = min(d1, d2);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.83, 0.55, 1.38) + vec3(0.24, 0.17, 0.19);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.77 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
