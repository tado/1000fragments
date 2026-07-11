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
    v = 0.25 * (sin(p.x * 2.71 + t * 0.79 + ph) + sin(p.y * 10.80 - t * 0.79 + ph)
        + sin((p.x + p.y) * 6.78 + t * 0.79 + ph) + sin(length(p) * 14.96 - t * 0.79 + ph));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 4.49 + ph), vnoise2(p * 4.49 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 4.49 + 1.15 * wq + vec2(1.7, 9.2) + t * 1.04),
                   vnoise2(p * 4.49 + 3.92 * wq + vec2(8.3, 2.8) - t * 0.32));
    v = vnoise2(p * 4.49 + 1.87 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.56;
	vec2 q1 = p; vec2 q2 = p;
	q1 = fract(q1 * 1.35) - 0.5;
	{ float lr = log(length(q1) + 0.001); float la = atan(q1.y, q1.x); q1 = vec2(la * 1.12, lr * 1.73 + time * 0.41); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.50);
	float d = d1 * d2;
	vec3 col = vec3(0.94, 0.76, 0.59) * (0.15 / (abs(d) + 0.04));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
