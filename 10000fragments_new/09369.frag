uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 1.0 + t * 1.18 + ph), sin(lt * 1.0 + t * 0.78)) * 0.95;
        md = min(md, length(p - lp)); }
    v = exp(-md * 6.00) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.48), cos(time * 0.87)) * 0.10;
	float an = atan(p.y, p.x) + time * -0.57;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.55 / 3.1415927, 1.00 / r - time * 2.48);
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.94, 0.87, 0.85) + vec3(0.03, 0.10, 0.18);
	col *= clamp(r * 1.85, 0.0, 1.0);
	col = clamp((col - 0.5) * 1.97 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
