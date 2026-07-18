uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 3.15 + vec2(t * 2.57, -t * 2.48) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 3.0 + t * 1.49 + ph), sin(lt * 2.0 + t * 0.88)) * 0.76;
        md = min(md, length(p - lp)); }
    v = exp(-md * 5.34) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p += vec2(sin((time * 0.63) * 0.91), cos((time * 0.63) * 0.36)) * 0.06;
	p = p.yx;
	p.x *= resolution.x / resolution.y;
	p *= 1.62;
	vec2 q1 = p; vec2 q2 = p;
	{ float iv = dot(q1, q1) + 0.05; q1 = q1 / iv * 0.68; }
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; q1.x += 0.23 / wf * sin(wf * 3.57 * q1.y + (time * 0.63) * 1.40); q1.y += 0.30 / wf * cos(wf * 3.05 * q1.x + (time * 0.63) * 0.74); }
	q2 = sin(q2 * 1.68 + (time * 0.63) * 2.09) * 0.64;
	float d1 = fieldA(q1, (time * 0.63), 0.0);
	float d2 = fieldB(q2, (time * 0.63), 0.58);
	float d = abs(d1 - d2);
	float cc = clamp(0.5 + 0.5 * (d), 0.0, 1.0);
	vec3 col = mix(mix(vec3(0.010, 0.070, 0.103), vec3(0.182, 0.618, 0.493), smoothstep(0.0, 0.54, cc)), vec3(0.962, 0.985, 0.882), smoothstep(0.54, 1.0, cc));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.16);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.19);
	col *= vec3(1.006, 0.968, 1.019);
	col += 0.023;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.54 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
