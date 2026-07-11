uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 6.0 + qr * 4.24 * sin(t * 0.46) + t * 3.89 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 hx = p * 5.91;
    vec2 r1 = vec2(1.0, 1.7320508);
    vec2 h1 = r1 * 0.5;
    vec2 a1 = mod(hx, r1) - h1;
    vec2 b1 = mod(hx - h1, r1) - h1;
    vec2 gv = dot(a1, a1) < dot(b1, b1) ? a1 : b1;
    float hd = max(abs(gv.x) * 0.8660254 + abs(gv.y) * 0.5, abs(gv.y));
    v = sin(hd * 11.34 - t * 2.41 + ph);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 7; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.18 * sin(mf + 3.0) + ph), cos(t * 1.16 * cos(mf + 3.0) + ph));
        ms += 0.040 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q2 = (floor(q2 * 28.2) + 0.5) / 28.2;
	q2 += vec2(-0.43, 0.52) * sin(length(q2) * 3.22 - time * 1.16) * 0.28;
	q3 = (floor(q3 * 15.2) + 0.5) / 15.2;
	{ float ka = atan(q3.y, q3.x); float kr = length(q3); float kn = 3.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); q3 = kr * vec2(cos(ka), sin(ka)); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.67);
	float d3 = fieldC(q3, time, 1.33);
	d2 = max(d2, d3);
	float d = min(d1, d2);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.70, 0.85, 1.43) + vec3(0.05, 0.19, 0.04);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
