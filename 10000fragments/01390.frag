uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 13.63);
    float gsh = hash21(vec2(grow, floor(t * 4.78))) - 0.5;
    float gx = p.x + gsh * 1.15;
    v = sin(gx * 13.21 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 2.78));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 hx = p * 5.67;
    vec2 r1 = vec2(1.0, 1.7320508);
    vec2 h1 = r1 * 0.5;
    vec2 a1 = mod(hx, r1) - h1;
    vec2 b1 = mod(hx - h1, r1) - h1;
    vec2 gv = dot(a1, a1) < dot(b1, b1) ? a1 : b1;
    float hd = max(abs(gv.x) * 0.8660254 + abs(gv.y) * 0.5, abs(gv.y));
    v = sin(hd * 20.14 - t * 4.75 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p;
	{ float lr = log(length(q1) + 0.001); float la = atan(q1.y, q1.x); q1 = vec2(la * 1.11, lr * 2.04 + time * -0.30); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.36);
	float d = min(d1, d2);
	vec3 col = vec3(0.21, 0.35, 0.20) * (0.25 / (abs(d) + 0.09));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
