uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 4.0 + t * 0.62 + ph), sin(lt * 2.0 + t * 1.32)) * 0.73;
        md = min(md, length(p - lp)); }
    v = exp(-md * 7.24) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 26.34 - t * 2.36 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.27;
	vec2 q1 = p; vec2 q2 = p;
	{ float ka = atan(q1.y, q1.x); float kr = length(q1); float kn = 3.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); q1 = kr * vec2(cos(ka), sin(ka)); }
	{ float ka = atan(q2.y, q2.x); float kr = length(q2); float kn = 7.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); q2 = kr * vec2(cos(ka), sin(ka)); }
	{ q2 = vec2(atan(q2.y, q2.x) * 1.28, length(q2) * 4.15 - time * 0.34); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.23);
	float d = 0.5 * (d1 + d2);
	vec3 col = vec3(0.90, 0.44, 0.47) * (0.16 / (abs(d) + 0.06));
	col = col / (1.0 + col);
	col = mod(col * 2.36, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
