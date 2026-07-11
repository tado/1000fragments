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
    vec2 wq = vec2(vnoise2(p * 2.82 + ph), vnoise2(p * 2.82 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 2.82 + 2.16 * wq + vec2(1.7, 9.2) + t * 1.03),
                   vnoise2(p * 2.82 + 3.56 * wq + vec2(8.3, 2.8) - t * 0.52));
    v = vnoise2(p * 2.82 + 3.61 * wr) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 6.77 + t * 0.57 + ph) * 0.7;
    float wb = sin(p.y * 7.95 - t * 1.82 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.68;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 6.06 + sin(p.y * 3.30 + t * 2.23) * 4.74 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 = rot2(length(q1) * 1.93 + time * 0.83) * q1;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.16);
	float d3 = fieldC(q3, time, 1.53);
	d2 = max(d2, d3);
	float d = abs(d1 - d2);
	vec3 col = hue(d * 0.46 + time * 0.09);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
