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
    vec2 hx = p * 2.74;
    vec2 r1 = vec2(1.0, 1.7320508);
    vec2 h1 = r1 * 0.5;
    vec2 a1 = mod(hx, r1) - h1;
    vec2 b1 = mod(hx - h1, r1) - h1;
    vec2 gv = dot(a1, a1) < dot(b1, b1) ? a1 : b1;
    float hd = max(abs(gv.x) * 0.8660254 + abs(gv.y) * 0.5, abs(gv.y));
    v = sin(hd * 13.93 - t * 1.27 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 3.78 + ph), vnoise2(p * 3.78 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 3.78 + 1.01 * wq + vec2(1.7, 9.2) + t * 0.61),
                   vnoise2(p * 3.78 + 1.87 * wq + vec2(8.3, 2.8) - t * 1.12));
    v = vnoise2(p * 3.78 + 3.62 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p;
	q1.x += sin(q1.y * 7.44 + time * 3.06) * 0.28;
	q2 = abs(q2);
	{ float fr = length(q2); q2 *= 1.0 + 0.46 * fr * fr; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.49);
	float d = 0.5 * (d1 + d2);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.91, 1.41, 0.82) + vec3(0.08, 0.13, 0.13);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
