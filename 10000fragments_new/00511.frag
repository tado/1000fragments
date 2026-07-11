uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.31 + 0.14 * cos(sa * 3.0 + t * 2.76 + ph);
    v = sin((sr - petal) * 17.75);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 2.97, t * 1.27 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.69;
	vec2 q1 = p; vec2 q2 = p;
	q1 = abs(q1) - 0.44;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; q1.x += 0.31 / wf * sin(wf * 3.00 * q1.y + time * 1.67); q1.y += 0.49 / wf * cos(wf * 2.27 * q1.x + time * 1.48); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.11);
	float d = d1 * d2;
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.29, 0.17, 0.39), vec3(0.96, 0.80, 0.88), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
