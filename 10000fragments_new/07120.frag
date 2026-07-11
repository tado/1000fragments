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
    vec2 kp = p * 2.44;
    for(int ki = 0; ki < 3; ki++){ kp = abs(kp) - 0.67; kp = rot2(0.59) * kp; kp *= 1.36; }
    v = sin(kp.x * 2.14 - t * 3.72 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 2.35 + ph), vnoise2(p * 2.35 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 2.35 + 2.73 * wq + vec2(1.7, 9.2) + t * 1.04),
                   vnoise2(p * 2.35 + 2.47 * wq + vec2(8.3, 2.8) - t * 0.63));
    v = vnoise2(p * 2.35 + 2.61 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p;
	q1 = fract(q1 * 1.60) - 0.5;
	{ q1 = vec2(atan(q1.y, q1.x) * 1.17, length(q1) * 3.38 - time * 0.64); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.84);
	float d = 0.5 * (d1 + d2);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 2.70 + time * 0.53);
	col = mod(col * 1.35, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
