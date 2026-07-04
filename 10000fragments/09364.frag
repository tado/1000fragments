uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    float zx = abs(fract(p.x * 2.10 + t * 0.71) - 0.5) * 2.0;
    v = sin((p.y * 2.23 + zx * 0.76 + t * 0.56) * 3.1415927 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float lv = length(p) * 2.53 - t * 1.52;
    v = sin(floor(lv * 5.5) / 5.5 * 6.2831853 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.98;
	vec2 q1 = p; vec2 q2 = p;
	q1 = sin(q1 * 2.91 + time * 2.34) * 1.43;
	q2 *= 1.0 + 0.12 * sin(time * 1.05);
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; q2.x += 0.23 / wf * sin(wf * 3.61 * q2.y + time * 1.26); q2.y += 0.45 / wf * cos(wf * 1.52 * q2.x + time * 1.29); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.39);
	float d = 0.5 * (d1 + d2);
	vec3 col = vec3(0.49, 0.71, 0.66) * (0.07 / (abs(d) + 0.07));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
