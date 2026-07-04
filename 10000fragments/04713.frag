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
    float wr = length(p) + 0.32 * vnoise2(p * 5.60 + t * 0.98);
    v = sin(wr * 28.39 - t * 1.87 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 10.53);
    float gsh = hash21(vec2(grow, floor(t * 2.13))) - 0.5;
    float gx = p.x + gsh * 0.56;
    v = sin(gx * 14.18 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 1.49));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p;
	{ float lr = log(length(q2) + 0.001); float la = atan(q2.y, q2.x); q2 = vec2(la * 2.43, lr * 1.82 + time * -0.43); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.00);
	float d = 0.5 * (d1 + d2);
	vec3 col = vec3(0.76, 0.16, 0.74) * (0.18 / (abs(d) + 0.10));
	col = col / (1.0 + col);
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
