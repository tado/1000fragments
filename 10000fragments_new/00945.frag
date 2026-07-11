uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 3.0 + t * 0.89 + ph), sin(lt * 1.0 + t * 0.36)) * 0.94;
        md = min(md, length(p - lp)); }
    v = exp(-md * 9.31) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 11.42 + sin(p.y * 5.57 + t * 5.04) * 2.81 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.78;
	vec2 q1 = p; vec2 q2 = p;
	for(int fo = 0; fo < 5; fo++){ q2 = abs(q2) - 0.41; q2 = rot2(2.02) * q2; }
	q2 = rot2(q2.y * -3.92 + time * 0.61) * q2;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.36);
	float d = 0.5 * (d1 + d2);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.35, 0.07, 0.41), vec3(0.98, 0.65, 0.87), cc);
	col *= 0.81 + 0.15 * sin(gl_FragCoord.y * 0.87 + time * 15.71);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
