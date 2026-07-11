uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 10.52 + vec2(t * 1.07, -t * 0.65) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 3.0 + t * 0.85 + ph), sin(lt * 3.0 + t * 0.41)) * 0.66;
        md = min(md, length(p - lp)); }
    v = exp(-md * 8.50) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.47;
	vec2 q1 = p; vec2 q2 = p;
	{ float fr = length(q1); q1 *= 1.0 + -0.69 * fr * fr; }
	q1 += vec2(-0.87, 0.64) * sin(length(q1) * 5.96 - time * 2.36) * 0.25;
	q2.y += sin(q2.x * 7.86 + time * 1.97) * 0.29;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; q2.x += 0.44 / wf * sin(wf * 3.92 * q2.y + time * 1.79); q2.y += 0.37 / wf * cos(wf * 1.70 * q2.x + time * 1.47); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.88);
	float d = abs(d1 - d2);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 4.52 + time * 0.39);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
