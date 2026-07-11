uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 6.14);
    float gsh = hash21(vec2(grow, floor(t * 8.69))) - 0.5;
    float gx = p.x + gsh * 0.41;
    v = sin(gx * 9.60 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 2.87));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 8; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.65 * sin(mf + 3.0) + ph), cos(t * 0.77 * cos(mf + 3.0) + ph));
        ms += 0.061 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 hx = p * 4.22;
    vec2 r1 = vec2(1.0, 1.7320508);
    vec2 h1 = r1 * 0.5;
    vec2 a1 = mod(hx, r1) - h1;
    vec2 b1 = mod(hx - h1, r1) - h1;
    vec2 gv = dot(a1, a1) < dot(b1, b1) ? a1 : b1;
    float hd = max(abs(gv.x) * 0.8660254 + abs(gv.y) * 0.5, abs(gv.y));
    v = sin(hd * 18.68 - t * 2.38 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.62;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	{ float fr = length(q1); q1 *= 1.0 + 0.49 * fr * fr; }
	q1.x += sin(q1.y * 7.95 + time * 3.63) * 0.12;
	q2 = rot2(time * -1.09) * q2;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; q3.x += 0.43 / wf * sin(wf * 1.96 * q3.y + time * 1.71); q3.y += 0.41 / wf * cos(wf * 2.40 * q3.x + time * 2.01); }
	{ float fr = length(q3); q3 *= 1.0 + 0.36 * fr * fr; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.46);
	float d3 = fieldC(q3, time, 1.71);
	d2 = max(d2, d3);
	float d = min(d1, d2);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.30, 0.17, 0.05), vec3(0.57, 0.57, 0.56), cc);
	col = mod(col * 2.10, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
