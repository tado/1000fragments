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
    float wr = length(p) + 0.25 * vnoise2(p * 2.49 + t * 0.98);
    v = sin(wr * 28.45 - t * 2.28 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 12.0 + qr * 7.11 * sin(t * 1.10) + t * 3.70 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.76;
	vec2 q1 = p; vec2 q2 = p;
	{ q1 = vec2(atan(q1.y, q1.x) * 2.17, length(q1) * 3.57 - time * 0.75); }
	q2 = rot2(1.84) * q2;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.06);
	float d = d1 * d2;
	vec3 col = palette(d * 0.61 + time * 0.15, vec3(0.48, 0.49, 0.51), vec3(0.45, 0.43, 0.36), vec3(0.94, 1.30, 1.26), vec3(0.55, 0.27, 0.22));
	col = mod(col * 2.12, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
