uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.50, 0.0)) * 24.72 - t * 6.10 + ph);
    float mb = sin(length(p + vec2(0.50, 0.0)) * 21.87 - t * 2.35 + ph);
    v = ma * mb;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 12.0 + qr * 6.89 * sin(t * 1.37) + t * 1.21 + ph);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 19.26 + sin(p.y * 4.21 + t * 5.79) * 2.53 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.73;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q2 = abs(q2);
	{ float lr = log(length(q2) + 0.001); float la = atan(q2.y, q2.x); q2 = vec2(la * 1.97, lr * 1.37 + time * -0.42); }
	{ float lr = log(length(q3) + 0.001); float la = atan(q3.y, q3.x); q3 = vec2(la * 2.07, lr * 1.33 + time * 0.29); }
	q3 = abs(q3) - 0.65;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.41);
	float d3 = fieldC(q3, time, 1.61);
	d2 = 0.5 * (d2 + d3);
	float d = min(d1, d2);
	vec3 col = vec3(0.43, 0.63, 0.50) * (0.22 / (abs(d) + 0.09));
	col = col / (1.0 + col);
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.11;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
