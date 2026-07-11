uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 4.57, t * 2.05 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 7.78 + t * 4.28 + ph) + sin(p.y * 13.83 - t * 4.28 + ph)
        + sin((p.x + p.y) * 5.45 + t * 4.28 + ph) + sin(length(p) * 15.08 - t * 4.28 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; q1.x += 0.45 / wf * sin(wf * 3.82 * q1.y + time * 1.94); q1.y += 0.27 / wf * cos(wf * 1.56 * q1.x + time * 1.07); }
	q1 = abs(q1);
	{ float ka = atan(q2.y, q2.x); float kr = length(q2); float kn = 7.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); q2 = kr * vec2(cos(ka), sin(ka)); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.31);
	float d = max(d1, d2);
	vec3 col = vec3(0.42, 0.60, 0.95) * (0.20 / (abs(d) + 0.04));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
