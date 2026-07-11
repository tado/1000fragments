uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 12.65 + t * 3.90 + ph) + sin(p.y * 12.21 - t * 3.90 + ph)
        + sin((p.x + p.y) * 7.52 + t * 3.90 + ph) + sin(length(p) * 12.07 - t * 3.90 + ph));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 10.0 + qr * 6.75 * sin(t * 1.39) + t * 3.08 + ph);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 24.43 - t * 7.85 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	{ float fr = length(q1); q1 *= 1.0 + 0.50 * fr * fr; }
	{ q3 = vec2(atan(q3.y, q3.x) * 1.43, length(q3) * 5.36 - time * 0.92); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.45);
	float d3 = fieldC(q3, time, 1.20);
	d2 = 0.5 * (d2 + d3);
	float d = min(d1, d2);
	vec3 col = vec3(0.67, 0.20, 0.92) * (0.19 / (abs(d) + 0.09));
	col = col / (1.0 + col);
	col = mod(col * 2.97, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
