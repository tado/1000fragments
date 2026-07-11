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
    vec2 wq = vec2(vnoise2(p * 2.94 + ph), vnoise2(p * 2.94 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 2.94 + 3.97 * wq + vec2(1.7, 9.2) + t * 0.50),
                   vnoise2(p * 2.94 + 2.21 * wq + vec2(8.3, 2.8) - t * 0.78));
    v = vnoise2(p * 2.94 + 3.28 * wr) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 4.92 + ph), vnoise2(p * 4.92 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 4.92 + 2.47 * wq + vec2(1.7, 9.2) + t * 0.94),
                   vnoise2(p * 4.92 + 1.04 * wq + vec2(8.3, 2.8) - t * 0.91));
    v = vnoise2(p * 4.92 + 1.94 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.45;
	vec2 q1 = p; vec2 q2 = p;
	{ q2 = vec2(atan(q2.y, q2.x) * 1.84, length(q2) * 2.67 - time * 0.46); }
	{ float lr = log(length(q2) + 0.001); float la = atan(q2.y, q2.x); q2 = vec2(la * 1.09, lr * 1.34 + time * 0.86); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.59);
	float d = abs(d1 - d2);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 3.66 + time * 0.39);
	col = fract(col * 1.63);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
