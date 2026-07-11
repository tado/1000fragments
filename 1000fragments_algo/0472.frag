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
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.55);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float fs = 0.0; float famp = 0.5; vec2 fq = p * 2.17 + ph;
    for(int fi = 0; fi < 4; fi++){ fs += famp * vnoise2(fq + t * 0.77); fq *= 2.0; famp *= 0.5; }
    v = fs * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 cp = p * 2.24;
    v = 0.5 * (sin(4.0 * cp.x + t * 2.06) * sin(4.0 * cp.y + ph)
             + sin(4.0 * cp.x - t * 1.99) * sin(4.0 * cp.y + ph));
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 5; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 2.23 * sin(mf + 3.0) + ph), cos(t * 1.99 * cos(mf + 3.0) + ph));
        ms += 0.043 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q2 = rot2(q2.y * -3.60 + (time * 0.67) * 0.31) * q2;
	q2 = fract(q2 * 1.35) - 0.5;
	q3 = (floor(q3 * 21.1) + 0.5) / 21.1;
	float d1 = fieldA(q1, (time * 0.67), 0.0);
	float d2 = fieldB(q2, (time * 0.67), 1.01);
	float d3 = fieldC(q3, (time * 0.67), 1.13);
	d2 = 0.5 * (d2 + d3);
	float d = abs(d1 - d2);
	vec3 col = palette((d) * 0.91 + (time * 0.67) * 0.07, vec3(0.31, 0.30, 0.31), vec3(0.32, 0.29, 0.25), vec3(0.84, 0.63, 0.55), vec3(0.81, 0.98, 0.76));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.55);
	col = clamp(col, 0.0, 1.0) * vec3(1.042, 1.002, 0.938) * 1.00 + 0.033;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
