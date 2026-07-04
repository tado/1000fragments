uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 2.0 + t * 0.32 + ph), sin(lt * 1.0 + t * 0.79)) * 0.71;
        md = min(md, length(p - lp)); }
    v = exp(-md * 7.15) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.67), cos(time * 1.30)) * 0.25;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.40 / 3.1415927, 0.90 / r + time * 0.93);
	float d = field(tv, time, 0.0);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.05, 0.14, 0.27), vec3(0.67, 0.88, 0.64), cc);
	col *= clamp(r * 2.92, 0.0, 1.0);
	col *= 0.84 + 0.16 * sin(gl_FragCoord.y * 0.84 + time * 16.45);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
