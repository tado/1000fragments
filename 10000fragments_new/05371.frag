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

float fieldA(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.68 + 0.23 * cos(sa * 4.0 + t * 0.72 + ph);
    v = sin((sr - petal) * 13.25);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 2.15 + ph), vnoise2(p * 2.15 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 2.15 + 1.10 * wq + vec2(1.7, 9.2) + t * 0.73),
                   vnoise2(p * 2.15 + 2.00 * wq + vec2(8.3, 2.8) - t * 0.35));
    v = vnoise2(p * 2.15 + 3.56 * wr) * 2.0 - 1.0;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 8.98 + sin(p.y * 2.03 + t * 1.46) * 4.84 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.03;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q2 = rot2(length(q2) * 2.39 + time * 1.12) * q2;
	q3 = rot2(time * 0.52) * q3;
	q3 *= 2.47;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.88);
	float d3 = fieldC(q3, time, 1.97);
	d2 = abs(d2 - d3);
	float d = min(d1, d2);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.02, 0.22, 0.07), vec3(0.60, 0.75, 0.96), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
