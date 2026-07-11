uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 2.0 + t * 1.26 + ph), sin(lt * 5.0 + t * 0.45)) * 0.50;
        md = min(md, length(p - lp)); }
    v = exp(-md * 9.37) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.18), cos(time * 1.01)) * 0.24;
	float an = atan(p.y, p.x) + time * 0.64;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.09 / 3.1415927, 1.00 / r - time * 1.03);
	float d = field(tv, time, 0.0);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.24, 0.18, 0.44), vec3(0.58, 0.94, 0.71), cc);
	col *= clamp(r * 2.89, 0.0, 1.0);
	col *= 0.89 + 0.19 * sin(gl_FragCoord.y * 2.45 + time * 10.87);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
