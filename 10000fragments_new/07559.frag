uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 2.0 + t * 1.34 + ph), sin(lt * 5.0 + t * 1.25)) * 0.59;
        md = min(md, length(p - lp)); }
    v = exp(-md * 7.65) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 3.0 + t * 1.19 + ph), sin(lt * 3.0 + t * 1.14)) * 0.52;
        md = min(md, length(p - lp)); }
    v = exp(-md * 8.88) * 2.0 - 1.0;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.37 + 0.17 * cos(sa * 4.0 + t * 2.67 + ph);
    v = sin((sr - petal) * 17.93);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q2 += vec2(0.71, -0.12) * sin(length(q2) * 4.13 - time * 1.78) * 0.28;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.99);
	float d3 = fieldC(q3, time, 1.29);
	d2 = max(d2, d3);
	float d = abs(d1 - d2);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.04, 0.29, 0.26), vec3(0.99, 0.57, 0.57), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
