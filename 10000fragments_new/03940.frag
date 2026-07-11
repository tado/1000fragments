uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 1.0 + t * 0.95 + ph), sin(lt * 2.0 + t * 1.16)) * 0.50;
        md = min(md, length(p - lp)); }
    v = exp(-md * 4.11) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.63;
    for(int ki = 0; ki < 4; ki++){ kp = abs(kp) - 0.72; kp = rot2(2.52) * kp; kp *= 1.30; }
    v = sin(kp.x * 2.15 - t * 3.45 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 4.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p *= 1.46;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.29; p = rot2(2.04) * p; }
	p += vec2(0.76, 0.12) * sin(length(p) * 2.63 - time * 1.77) * 0.17;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.13);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 0.75 + time * 0.18, vec3(0.42, 0.41, 0.57), vec3(0.49, 0.37, 0.49), vec3(1.04, 1.26, 0.96), vec3(0.46, 0.91, 0.57));
	col *= 0.83 + 0.17 * sin(gl_FragCoord.y * 2.13 + time * 16.35);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
