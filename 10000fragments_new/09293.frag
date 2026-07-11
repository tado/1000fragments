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
    vec2 hx = p * 5.68;
    vec2 r1 = vec2(1.0, 1.7320508);
    vec2 h1 = r1 * 0.5;
    vec2 a1 = mod(hx, r1) - h1;
    vec2 b1 = mod(hx - h1, r1) - h1;
    vec2 gv = dot(a1, a1) < dot(b1, b1) ? a1 : b1;
    float hd = max(abs(gv.x) * 0.8660254 + abs(gv.y) * 0.5, abs(gv.y));
    v = sin(hd * 22.50 - t * 4.55 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 4.75 + ph), vnoise2(p * 4.75 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 4.75 + 3.97 * wq + vec2(1.7, 9.2) + t * 0.54),
                   vnoise2(p * 4.75 + 3.30 * wq + vec2(8.3, 2.8) - t * 0.83));
    v = vnoise2(p * 4.75 + 1.86 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.34;
	vec2 q1 = p; vec2 q2 = p;
	q1 = fract(q1 * 2.20) - 0.5;
	q1 = (floor(q1 * 13.8) + 0.5) / 13.8;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.06);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.74));
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.04, 0.30, 0.06), vec3(0.88, 0.68, 0.76), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
