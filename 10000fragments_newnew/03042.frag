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
        vec2 lp = vec2(sin(lt * 3.0 + t * 0.31 + ph), sin(lt * 2.0 + t * 1.42)) * 0.64;
        md = min(md, length(p - lp)); }
    v = exp(-md * 9.31) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.10;
    for(int ki = 0; ki < 6; ki++){ kp = abs(kp) - 0.55; kp = rot2(0.55) * kp; kp *= 1.34; }
    v = sin(kp.x * 2.11 - t * 2.06 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.83;
	p = rot2(0.42) * p;
	p = mix(p, p.yx, 0.5 + 0.5 * sin(time * 2.09));
	p.x += sin(p.y * 4.13 + time * 1.13) * 0.23;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.18);
	float d = max(d1, d2);
	vec3 col = palette(d * 0.82 + time * 0.17, vec3(0.54, 0.58, 0.55), vec3(0.35, 0.38, 0.49), vec3(0.86, 1.07, 0.75), vec3(0.50, 0.93, 0.74));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
