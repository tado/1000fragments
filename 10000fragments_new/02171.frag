uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 2.0 + t * 0.77 + ph), sin(lt * 4.0 + t * 0.36)) * 0.72;
        md = min(md, length(p - lp)); }
    v = exp(-md * 5.30) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 5.0 + t * 0.51 + ph), sin(lt * 5.0 + t * 0.93)) * 0.52;
        md = min(md, length(p - lp)); }
    v = exp(-md * 8.43) * 2.0 - 1.0;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.70 + 0.24 * cos(sa * 6.0 + t * 2.09 + ph);
    v = sin((sr - petal) * 16.82);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.23;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 = fract(q1 * 1.28) - 0.5;
	q3 = abs(q3) - 0.42;
	{ q3 = vec2(atan(q3.y, q3.x) * 2.98, length(q3) * 3.04 - time * 0.81); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.45);
	float d3 = fieldC(q3, time, 1.43);
	d2 = max(d2, d3);
	float d = 0.5 * (d1 + d2);
	vec3 col = palette(d * 0.49 + time * 0.10, vec3(0.52, 0.45, 0.56), vec3(0.48, 0.36, 0.38), vec3(1.39, 1.37, 0.89), vec3(0.87, 0.00, 0.18));
	col = fract(col * 2.37);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
