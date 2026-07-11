uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 4.0 + t * 1.14 + ph), sin(lt * 1.0 + t * 0.58)) * 0.68;
        md = min(md, length(p - lp)); }
    v = exp(-md * 9.77) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.09), cos(time * 1.46)) * 0.07;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.43 / 3.1415927, 1.29 / r - time * 1.57);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 1.45 + time * 0.02, vec3(0.48, 0.57, 0.54), vec3(0.44, 0.44, 0.35), vec3(1.04, 0.71, 1.19), vec3(0.79, 0.68, 0.85));
	col *= clamp(r * 2.54, 0.0, 1.0);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.48));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
