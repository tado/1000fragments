uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 14; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.42 * sin(mf + 3.0) + ph), cos(t * 1.08 * cos(mf + 3.0) + ph));
        ms += 0.038 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 8.46 + t * 3.66 + ph) * 0.7;
    float wb = sin(p.y * 7.13 - t * 3.58 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.73;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 hx = p * 2.83;
    vec2 r1 = vec2(1.0, 1.7320508);
    vec2 h1 = r1 * 0.5;
    vec2 a1 = mod(hx, r1) - h1;
    vec2 b1 = mod(hx - h1, r1) - h1;
    vec2 gv = dot(a1, a1) < dot(b1, b1) ? a1 : b1;
    float hd = max(abs(gv.x) * 0.8660254 + abs(gv.y) * 0.5, abs(gv.y));
    v = sin(hd * 20.62 - t * 1.56 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	{ q2 = vec2(atan(q2.y, q2.x) * 1.72, length(q2) * 2.80 - time * 0.80); }
	q3 = fract(q3 * 2.14) - 0.5;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.16);
	float d3 = fieldC(q3, time, 1.66);
	d2 = min(d2, d3);
	float d = max(d1, d2);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 2.10 + time * 0.34);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
