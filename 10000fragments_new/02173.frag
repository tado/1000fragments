uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
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
    vec2 cw = p * 3.27 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 1.34 + t * 1.53 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 14; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.41 * sin(mf + 3.0) + ph), cos(t * 2.22 * cos(mf + 3.0) + ph));
        ms += 0.092 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 2.52 + ph), vnoise2(p * 2.52 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 2.52 + 3.67 * wq + vec2(1.7, 9.2) + t * 0.56),
                   vnoise2(p * 2.52 + 1.90 * wq + vec2(8.3, 2.8) - t * 0.38));
    v = vnoise2(p * 2.52 + 2.50 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.82;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 = (floor(q1 * 15.2) + 0.5) / 15.2;
	q2 = rot2(0.85) * q2;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.18);
	float d3 = fieldC(q3, time, 0.26);
	d2 = abs(d2 - d3);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.44 + time * 0.11, vec3(0.43, 0.50, 0.59), vec3(0.44, 0.38, 0.42), vec3(1.38, 1.19, 1.07), vec3(0.53, 0.96, 0.55));
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.53 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
