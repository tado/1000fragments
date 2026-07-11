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
    vec2 wq = vec2(vnoise2(p * 4.35 + ph), vnoise2(p * 4.35 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 4.35 + 3.37 * wq + vec2(1.7, 9.2) + t * 0.85),
                   vnoise2(p * 4.35 + 3.76 * wq + vec2(8.3, 2.8) - t * 0.86));
    v = vnoise2(p * 4.35 + 3.46 * wr) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 5.42 + t * 2.70 + ph) + sin(p.y * 7.91 - t * 2.70 + ph)
        + sin((p.x + p.y) * 7.64 + t * 2.70 + ph) + sin(length(p) * 3.53 - t * 2.70 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.45;
	vec2 q1 = p; vec2 q2 = p;
	q2 = rot2(0.91) * q2;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.82);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.16 + time * 0.17, vec3(0.49, 0.46, 0.55), vec3(0.32, 0.40, 0.48), vec3(0.81, 1.00, 1.13), vec3(0.12, 0.43, 0.66));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.28));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
