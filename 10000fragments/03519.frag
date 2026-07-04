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
    vec2 wq = vec2(vnoise2(p * 3.37 + ph), vnoise2(p * 3.37 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 3.37 + 2.57 * wq + vec2(1.7, 9.2) + t * 1.18),
                   vnoise2(p * 3.37 + 1.23 * wq + vec2(8.3, 2.8) - t * 1.12));
    v = vnoise2(p * 3.37 + 1.57 * wr) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 hx = p * 3.44;
    vec2 r1 = vec2(1.0, 1.7320508);
    vec2 h1 = r1 * 0.5;
    vec2 a1 = mod(hx, r1) - h1;
    vec2 b1 = mod(hx - h1, r1) - h1;
    vec2 gv = dot(a1, a1) < dot(b1, b1) ? a1 : b1;
    float hd = max(abs(gv.x) * 0.8660254 + abs(gv.y) * 0.5, abs(gv.y));
    v = sin(hd * 15.02 - t * 3.76 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.10;
	vec2 q1 = p; vec2 q2 = p;
	q2 = vec2(q2.x * q2.x - q2.y * q2.y, 2.0 * q2.x * q2.y) * 0.84;
	{ float fr = length(q2); q2 *= 1.0 + 0.72 * fr * fr; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.14);
	float d = max(d1, d2);
	vec3 col = vec3(0.64, 0.71, 0.48) * (0.24 / (abs(d) + 0.03));
	col = col / (1.0 + col);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.80 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
