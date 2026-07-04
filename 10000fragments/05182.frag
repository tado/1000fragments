uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 2.0 + t * 1.04 + ph), sin(lt * 5.0 + t * 0.49)) * 0.84;
        md = min(md, length(p - lp)); }
    v = exp(-md * 5.14) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.00), cos(time * 0.47)) * 0.06;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.29 / 3.1415927, 0.73 / r - time * 2.08);
	float d = field(tv, time, 0.0);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.18, 0.35, 0.38), vec3(0.69, 0.57, 0.62), cc);
	col *= clamp(r * 2.66, 0.0, 1.0);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.83 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
