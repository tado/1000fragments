uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 6.94 + sr * 12.74 - t * 0.67 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 cp = p * 1.37;
    v = 0.5 * (sin(3.0 * cp.x + t * 2.57) * sin(4.0 * cp.y + ph)
             + sin(4.0 * cp.x - t * 1.07) * sin(3.0 * cp.y + ph));
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.62 + 0.17 * cos(sa * 8.0 + t * 1.24 + ph);
    v = sin((sr - petal) * 11.25);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.41;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 = (floor(q1 * 22.6) + 0.5) / 22.6;
	{ float fr = length(q3); q3 *= 1.0 + 0.37 * fr * fr; }
	q3 = mix(q3, q3.yx, 0.5 + 0.5 * sin(time * 2.45));
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.15);
	float d3 = fieldC(q3, time, 0.86);
	d2 = max(d2, d3);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.73));
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.02, 0.10, 0.14), vec3(0.77, 0.86, 0.69), cc);
	col *= 0.88 + 0.19 * sin(gl_FragCoord.y * 2.13 + time * 12.28);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
