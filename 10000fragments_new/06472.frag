uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 2.0 + t * 0.77 + ph), sin(lt * 2.0 + t * 1.44)) * 0.73;
        md = min(md, length(p - lp)); }
    v = exp(-md * 5.77) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.63), cos(time * 0.47)) * 0.23;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.47 / 3.1415927, 0.91 / r - time * 1.46);
	tv.x += tv.y * 0.35;
	float d = field(tv, time, 0.0);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.29, 0.25, 0.48), vec3(0.90, 0.93, 0.87), cc);
	col *= clamp(r * 2.14, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
