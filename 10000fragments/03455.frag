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
    vec2 wq = vec2(vnoise2(p * 1.71 + ph), vnoise2(p * 1.71 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 1.71 + 1.24 * wq + vec2(1.7, 9.2) + t * 1.18),
                   vnoise2(p * 1.71 + 1.93 * wq + vec2(8.3, 2.8) - t * 0.34));
    v = vnoise2(p * 1.71 + 2.81 * wr) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 5.57 + t * 0.66 + ph) * 0.7;
    float wb = sin(p.y * 14.97 - t * 2.76 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.72;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.26;
	vec2 q1 = p; vec2 q2 = p;
	{ float fr = length(q2); q2 *= 1.0 + 0.31 * fr * fr; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.32);
	float d = max(d1, d2);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 4.31 + time * 0.62);
	col = fract(col * 1.30);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
