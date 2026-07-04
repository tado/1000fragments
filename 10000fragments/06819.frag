uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 3.32 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 1.95 + t * 3.91 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 3.0 + t * 0.85 + ph), sin(lt * 2.0 + t * 1.10)) * 0.83;
        md = min(md, length(p - lp)); }
    v = exp(-md * 9.40) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.78;
	vec2 q1 = p; vec2 q2 = p;
	q2 = fract(q2 * 1.93) - 0.5;
	{ q2 = vec2(atan(q2.y, q2.x) * 1.29, length(q2) * 4.30 - time * 0.81); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.83);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.52));
	vec3 col = vec3(0.20, 0.46, 0.72) * (0.14 / (abs(d) + 0.07));
	col = col / (1.0 + col);
	col *= 0.90 + 0.11 * sin(gl_FragCoord.y * 1.87 + time * 16.57);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
