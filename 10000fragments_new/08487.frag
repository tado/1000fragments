uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 15.17 + vec2(t * 2.62, -t * 2.98) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.55 + 0.28 * cos(sa * 9.0 + t * 0.80 + ph);
    v = sin((sr - petal) * 18.69);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 1.0 + t * 0.92 + ph), sin(lt * 1.0 + t * 0.68)) * 0.59;
        md = min(md, length(p - lp)); }
    v = exp(-md * 6.67) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.72;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 = rot2(length(q1) * 1.55 + time * 0.55) * q1;
	q2 = abs(q2) - 0.78;
	q2 *= 2.22;
	q3 *= 1.28;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.65);
	float d3 = fieldC(q3, time, 1.79);
	d2 = min(d2, d3);
	float d = 0.5 * (d1 + d2);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.15, 0.26, 0.04), vec3(0.99, 0.81, 0.97), cc);
	col *= 0.87 + 0.11 * sin(gl_FragCoord.y * 1.01 + time * 17.02);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
