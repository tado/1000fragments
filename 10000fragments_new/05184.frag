uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.44, 0.0)) * 39.58 - t * 7.28 + ph);
    float mb = sin(length(p + vec2(0.44, 0.0)) * 26.39 - t * 3.73 + ph);
    v = ma * mb;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 3.0 + qr * 2.14 * sin(t * 0.41) + t * 5.76 + ph);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 22.40 + sin(p.y * 1.25 + t * 3.84) * 2.46 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.49;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	{ float lr = log(length(q2) + 0.001); float la = atan(q2.y, q2.x); q2 = vec2(la * 1.65, lr * 2.20 + time * -0.51); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.48);
	float d3 = fieldC(q3, time, 0.02);
	d2 = max(d2, d3);
	float d = 0.5 * (d1 + d2);
	vec3 col = vec3(0.54, 0.66, 0.15) * (0.15 / (abs(d) + 0.02));
	col = col / (1.0 + col);
	col = mod(col * 1.59, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
