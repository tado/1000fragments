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

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 3.80 + ph), vnoise2(p * 3.80 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 3.80 + 3.53 * wq + vec2(1.7, 9.2) + t * 0.73),
                   vnoise2(p * 3.80 + 3.51 * wq + vec2(8.3, 2.8) - t * 0.63));
    v = vnoise2(p * 3.80 + 1.72 * wr) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 2.39 + ph), vnoise2(p * 2.39 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 2.39 + 2.13 * wq + vec2(1.7, 9.2) + t * 1.18),
                   vnoise2(p * 2.39 + 1.37 * wq + vec2(8.3, 2.8) - t * 1.02));
    v = vnoise2(p * 2.39 + 2.07 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.98;
	vec2 q1 = p; vec2 q2 = p;
	q1 += vec2(-0.04, 0.67) * sin(length(q1) * 4.48 - time * 2.12) * 0.11;
	{ q2 = vec2(atan(q2.y, q2.x) * 2.84, length(q2) * 4.05 - time * 0.55); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.32);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.76));
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.22, 0.11, 0.15), vec3(0.62, 0.88, 0.55), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
