uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 7.0 + qr * 3.87 * sin(t * 1.23) + t * 1.04 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 9.92 + t * 1.05 + ph) * 0.7;
    float wb = sin(p.y * 5.97 - t * 1.08 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.50;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.81;
	vec2 q1 = p; vec2 q2 = p;
	q1 *= 3.19;
	{ float ka = atan(q1.y, q1.x); float kr = length(q1); float kn = 9.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); q1 = kr * vec2(cos(ka), sin(ka)); }
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; q2.x += 0.27 / wf * sin(wf * 1.78 * q2.y + time * 0.90); q2.y += 0.47 / wf * cos(wf * 3.04 * q2.x + time * 1.59); }
	q2 += vec2(-0.07, -0.02) * sin(length(q2) * 4.79 - time * 2.36) * 0.34;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.19);
	float d = min(d1, d2);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 4.77 + time * 0.82);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.17 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
