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
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 5.0 + qr * 5.25 * sin(t * 0.56) + t * 1.55 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float wr = length(p) + 0.33 * vnoise2(p * 3.56 + t * 0.44);
    v = sin(wr * 19.43 - t * 1.15 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p;
	q2 = sin(q2 * 1.31 + time * 0.69) * 1.11;
	{ float lr = log(length(q2) + 0.001); float la = atan(q2.y, q2.x); q2 = vec2(la * 1.79, lr * 2.51 + time * -0.22); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.28);
	float d = max(d1, d2);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.97, 1.43, 1.37) + vec3(0.00, 0.10, 0.11);
	col = clamp((col - 0.5) * 1.24 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
