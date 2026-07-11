uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 13.46);
    float gsh = hash21(vec2(grow, floor(t * 5.47))) - 0.5;
    float gx = p.x + gsh * 0.94;
    v = sin(gx * 6.81 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 2.63));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 5.40 + t * 1.15 + ph) * 0.7;
    float wb = sin(p.y * 17.36 - t * 3.22 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.43;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.16;
	vec2 q1 = p; vec2 q2 = p;
	q2 = fract(q2 * 1.95) - 0.5;
	{ float lr = log(length(q2) + 0.001); float la = atan(q2.y, q2.x); q2 = vec2(la * 1.91, lr * 2.52 + time * 0.44); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.89);
	float d = min(d1, d2);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 4.50 + time * 0.86);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
