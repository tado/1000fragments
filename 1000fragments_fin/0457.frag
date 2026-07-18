uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 hx = p * 3.37;
    vec2 r1 = vec2(1.0, 1.7320508);
    vec2 h1 = r1 * 0.5;
    vec2 a1 = mod(hx, r1) - h1;
    vec2 b1 = mod(hx - h1, r1) - h1;
    vec2 gv = dot(a1, a1) < dot(b1, b1) ? a1 : b1;
    float hd = max(abs(gv.x) * 0.8660254 + abs(gv.y) * 0.5, abs(gv.y));
    v = sin(hd * 19.77 - t * 1.84 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.60 + 0.20 * cos(sa * 6.0 + t * 1.01 + ph);
    v = sin((sr - petal) * 11.39);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x += p.y * -0.48;
	p.x = abs(p.x);
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p;
	q2 *= 1.0 + 0.22 * sin((time * 0.59) * 3.54);
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; q2.x += 0.40 / wf * sin(wf * 1.99 * q2.y + (time * 0.59) * 1.49); q2.y += 0.22 / wf * cos(wf * 2.07 * q2.x + (time * 0.59) * 1.20); }
	float d1 = fieldA(q1, (time * 0.59), 0.0);
	float d2 = fieldB(q2, (time * 0.59), 0.92);
	float d = mix(d1, d2, 0.5 + 0.5 * sin((time * 0.59) * 1.38));
	vec3 col = vec3(0.5 + 0.5 * (d)) * vec3(0.48, 0.54, 0.48) + vec3(0.05, 0.06, 0.08);
	col = clamp((col - 0.5) * 2.04 + 0.5, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.34);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.21);
	col *= vec3(0.988, 0.987, 0.992);
	col += 0.005;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.39 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
