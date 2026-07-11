uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 5.0 + t * 0.81 + ph), sin(lt * 1.0 + t * 0.84)) * 0.63;
        md = min(md, length(p - lp)); }
    v = exp(-md * 3.26) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 6.62 + sr * 20.80 - t * 3.80 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p;
	{ float lr = log(length(q2) + 0.001); float la = atan(q2.y, q2.x); q2 = vec2(la * 1.05, lr * 2.74 + time * 0.34); }
	q2 = (floor(q2 * 21.6) + 0.5) / 21.6;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.54);
	float d = max(d1, d2);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 3.62 + time * 0.17);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
