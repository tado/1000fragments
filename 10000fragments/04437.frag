uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.51 + 0.22 * cos(sa * 9.0 + t * 0.52 + ph);
    v = sin((sr - petal) * 9.89);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 4.0 + t * 1.21 + ph), sin(lt * 2.0 + t * 0.46)) * 0.93;
        md = min(md, length(p - lp)); }
    v = exp(-md * 3.69) * 2.0 - 1.0;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 cp = p * 1.97;
    v = 0.5 * (sin(1.0 * cp.x + t * 1.52) * sin(5.0 * cp.y + ph)
             + sin(5.0 * cp.x - t * 2.32) * sin(1.0 * cp.y + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q2 = abs(q2) - 0.76;
	q2 = rot2(length(q2) * 3.37 + time * 1.47) * q2;
	q3 = vec2(q3.x * q3.x - q3.y * q3.y, 2.0 * q3.x * q3.y) * 1.12;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.01);
	float d3 = fieldC(q3, time, 0.27);
	d2 = d2 * d3;
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 1.04));
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.02, 0.12, 0.15), vec3(0.65, 0.89, 0.49), cc);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.97 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
