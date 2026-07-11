uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 15.14 + t * 1.55 + ph) * 0.7;
    float wb = sin(p.y * 18.27 - t * 2.83 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.71;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 5.0 + t * 1.10 + ph), sin(lt * 3.0 + t * 0.97)) * 0.97;
        md = min(md, length(p - lp)); }
    v = exp(-md * 7.01) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.73;
	vec2 q1 = p; vec2 q2 = p;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; q2.x += 0.40 / wf * sin(wf * 2.97 * q2.y + time * 0.97); q2.y += 0.25 / wf * cos(wf * 3.23 * q2.x + time * 1.48); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.32);
	float d = max(d1, d2);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.25, 0.05, 0.32), vec3(0.57, 0.81, 0.98), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
