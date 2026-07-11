uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 4.32) - 0.5;
    float rad = 0.42 + 0.12 * sin(t * 1.19 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 4.94) - 0.5;
    float rad = 0.37 + 0.12 * sin(t * 3.65 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 12.0 + qr * 6.06 * sin(t * 1.32) + t * 2.12 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.78;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 = (floor(q1 * 27.7) + 0.5) / 27.7;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.85);
	float d3 = fieldC(q3, time, 0.68);
	d2 = max(d2, d3);
	float d = max(d1, d2);
	vec3 col = vec3(0.18, 0.74, 0.25) * (0.08 / (abs(d) + 0.06));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
