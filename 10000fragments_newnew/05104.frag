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
    v = sin(p.x * 10.56 + sin(p.y * 3.95 + t * 4.07) * 1.81 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float bx = p.x + (vnoise2(vec2(p.y * 3.10, t * 2.02)) - 0.5) * 1.40;
    v = exp(-abs(bx) * 8.03) * 2.0 - 1.0 + 0.0 * ph;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 11; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.25 * sin(mf + 3.0) + ph), cos(t * 2.17 * cos(mf + 3.0) + ph));
        ms += 0.074 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.32;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 = rot2(0.64) * q1;
	for(int fo = 0; fo < 2; fo++){ q1 = abs(q1) - 0.26; q1 = rot2(1.60) * q1; }
	q2.x += sin(q2.y * 3.28 + time * 2.56) * 0.16;
	q2 = vec2(q2.x * q2.x - q2.y * q2.y, 2.0 * q2.x * q2.y) * 0.84;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.11);
	float d3 = fieldC(q3, time, 1.06);
	d2 = abs(d2 - d3);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 1.35));
	vec3 col = palette(d * 1.31 + time * 0.33, vec3(0.44, 0.42, 0.60), vec3(0.36, 0.32, 0.40), vec3(1.24, 1.15, 1.07), vec3(0.45, 0.32, 0.79));
	col *= 0.81 + 0.19 * sin(gl_FragCoord.y * 1.92 + time * 14.00);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
