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
    float ms = 0.0;
    for(int mi = 0; mi < 5; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 0.99 * sin(mf + 3.0) + ph), cos(t * 1.74 * cos(mf + 3.0) + ph));
        ms += 0.079 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.24, 0.0)) * 12.42 - t * 3.04 + ph);
    float mb = sin(length(p + vec2(0.24, 0.0)) * 13.14 - t * 3.16 + ph);
    v = ma * mb;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float rv = 0.0; float ra = 0.5; vec2 rq = p * 4.86;
    for(int ri = 0; ri < 4; ri++){ rv += ra * vnoise2(rq + t * 1.16); rq = rq * 2.1 + 3.7; ra *= 0.55; }
    v = smoothstep(0.39, 0.53, rv + 0.09 * sin(t * 0.99 + ph)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.81;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	{ float lr = log(length(q2) + 0.001); float la = atan(q2.y, q2.x); q2 = vec2(la * 1.92, lr * 1.72 + time * 0.65); }
	q2 = sin(q2 * 1.51 + time * 0.56) * 1.39;
	q3 = abs(q3);
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.42);
	float d3 = fieldC(q3, time, 0.55);
	d2 = min(d2, d3);
	float d = 0.5 * (d1 + d2);
	vec3 col = palette(d * 1.32 + time * 0.07, vec3(0.46, 0.57, 0.44), vec3(0.41, 0.42, 0.46), vec3(0.75, 0.92, 0.98), vec3(0.05, 0.60, 0.40));
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.95 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
