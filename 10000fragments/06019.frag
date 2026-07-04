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
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 3.25 + ph), vnoise2(p * 3.25 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 3.25 + 3.86 * wq + vec2(1.7, 9.2) + t * 0.87),
                   vnoise2(p * 3.25 + 1.36 * wq + vec2(8.3, 2.8) - t * 1.17));
    v = vnoise2(p * 3.25 + 2.26 * wr) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float pa = atan(p.y, p.x) + t * 0.49;
    float pk = 6.2831853 / 5.0;
    float pd = cos(floor(0.5 + pa / pk) * pk - pa) * length(p);
    v = sin(pd * 19.64 - t * 2.36 + ph);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float lv = length(p) * 2.43 - t * 0.80;
    v = sin(floor(lv * 3.6) / 3.6 * 6.2831853 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.32;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	{ float lr = log(length(q1) + 0.001); float la = atan(q1.y, q1.x); q1 = vec2(la * 1.81, lr * 1.88 + time * 0.22); }
	q3 = rot2(length(q3) * 2.30 + time * 0.94) * q3;
	q3 = abs(q3) - 0.36;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.48);
	float d3 = fieldC(q3, time, 1.77);
	d2 = d2 * d3;
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 1.02));
	vec3 col = hue(d * 0.45 + time * 0.22);
	col = mod(col * 2.45, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
