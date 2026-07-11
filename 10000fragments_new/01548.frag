uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 4.0 + t * 0.89 + ph), sin(lt * 2.0 + t * 1.10)) * 0.56;
        md = min(md, length(p - lp)); }
    v = exp(-md * 4.45) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 8.09, t * 1.64 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 2.0 + t * 0.51 + ph), sin(lt * 3.0 + t * 0.62)) * 0.54;
        md = min(md, length(p - lp)); }
    v = exp(-md * 7.23) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.48;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 = fract(q1 * 1.44) - 0.5;
	for(int fo = 0; fo < 2; fo++){ q1 = abs(q1) - 0.54; q1 = rot2(2.18) * q1; }
	q3 *= 3.14;
	for(int fo = 0; fo < 3; fo++){ q3 = abs(q3) - 0.54; q3 = rot2(1.19) * q3; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.84);
	float d3 = fieldC(q3, time, 1.59);
	d2 = abs(d2 - d3);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 1.14));
	vec3 col = palette(d * 1.23 + time * 0.15, vec3(0.47, 0.54, 0.42), vec3(0.33, 0.35, 0.35), vec3(0.94, 1.10, 1.00), vec3(0.78, 0.45, 0.56));
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
