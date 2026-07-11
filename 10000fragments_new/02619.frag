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
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 hx = p * 6.68;
    vec2 r1 = vec2(1.0, 1.7320508);
    vec2 h1 = r1 * 0.5;
    vec2 a1 = mod(hx, r1) - h1;
    vec2 b1 = mod(hx - h1, r1) - h1;
    vec2 gv = dot(a1, a1) < dot(b1, b1) ? a1 : b1;
    float hd = max(abs(gv.x) * 0.8660254 + abs(gv.y) * 0.5, abs(gv.y));
    v = sin(hd * 14.34 - t * 1.55 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 1.97 + ph), vnoise2(p * 1.97 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 1.97 + 2.57 * wq + vec2(1.7, 9.2) + t * 0.85),
                   vnoise2(p * 1.97 + 2.34 * wq + vec2(8.3, 2.8) - t * 1.13));
    v = vnoise2(p * 1.97 + 3.02 * wr) * 2.0 - 1.0;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 2.65 + t * 3.99 + ph) + sin(p.y * 11.32 - t * 3.99 + ph)
        + sin((p.x + p.y) * 4.22 + t * 3.99 + ph) + sin(length(p) * 6.21 - t * 3.99 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q3 += vec2(-0.61, -0.21) * sin(length(q3) * 3.92 - time * 1.86) * 0.35;
	{ float ka = atan(q3.y, q3.x); float kr = length(q3); float kn = 5.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); q3 = kr * vec2(cos(ka), sin(ka)); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.83);
	float d3 = fieldC(q3, time, 1.28);
	d2 = abs(d2 - d3);
	float d = 0.5 * (d1 + d2);
	vec3 col = palette(d * 1.37 + time * 0.24, vec3(0.59, 0.42, 0.42), vec3(0.34, 0.43, 0.47), vec3(1.35, 1.05, 0.86), vec3(1.00, 0.75, 0.22));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
