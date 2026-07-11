uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float vnoise2(vec2 p){
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash21(i + vec2(0.0, 0.0)), hash21(i + vec2(1.0, 0.0)), u.x),
               mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x), u.y);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 3.40 + ph), vnoise2(p * 3.40 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 3.40 + 2.80 * wq + vec2(1.7, 9.2) + t * 0.44),
                   vnoise2(p * 3.40 + 2.22 * wq + vec2(8.3, 2.8) - t * 0.59));
    v = vnoise2(p * 3.40 + 1.17 * wr) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 hx = p * 3.98;
    vec2 r1 = vec2(1.0, 1.7320508);
    vec2 h1 = r1 * 0.5;
    vec2 a1 = mod(hx, r1) - h1;
    vec2 b1 = mod(hx - h1, r1) - h1;
    vec2 gv = dot(a1, a1) < dot(b1, b1) ? a1 : b1;
    float hd = max(abs(gv.x) * 0.8660254 + abs(gv.y) * 0.5, abs(gv.y));
    v = sin(hd * 9.83 - t * 5.10 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p;
	{ q1 = vec2(atan(q1.y, q1.x) * 2.57, length(q1) * 2.33 - time * 0.57); }
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; q1.x += 0.36 / wf * sin(wf * 2.64 * q1.y + time * 1.68); q1.y += 0.21 / wf * cos(wf * 4.00 * q1.x + time * 0.77); }
	q2 = (floor(q2 * 10.5) + 0.5) / 10.5;
	q2 += vec2(0.83, 0.13) * sin(length(q2) * 3.85 - time * 1.67) * 0.35;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.52);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.73));
	vec3 col = vec3(0.18, 0.24, 0.18) * (0.21 / (abs(d) + 0.09));
	col = col / (1.0 + col);
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
