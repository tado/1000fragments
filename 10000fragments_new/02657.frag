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
    vec2 wq = vec2(vnoise2(p * 2.15 + ph), vnoise2(p * 2.15 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 2.15 + 3.78 * wq + vec2(1.7, 9.2) + t * 0.43),
                   vnoise2(p * 2.15 + 3.75 * wq + vec2(8.3, 2.8) - t * 0.41));
    v = vnoise2(p * 2.15 + 2.51 * wr) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.56, 0.0)) * 36.87 - t * 3.47 + ph);
    float mb = sin(length(p + vec2(0.56, 0.0)) * 25.56 - t * 5.99 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.69;
	vec2 q1 = p; vec2 q2 = p;
	q2 = abs(q2);
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.75);
	float d = max(d1, d2);
	vec3 col = palette(d * 0.57 + time * 0.27, vec3(0.46, 0.54, 0.54), vec3(0.36, 0.38, 0.45), vec3(1.24, 0.79, 1.04), vec3(0.25, 0.48, 0.49));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
