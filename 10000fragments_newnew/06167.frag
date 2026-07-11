uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 3.0 + t * 0.81 + ph), sin(lt * 2.0 + t * 0.80)) * 0.72;
        md = min(md, length(p - lp)); }
    v = exp(-md * 7.61) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * -0.49;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.19 / 3.1415927, 0.88 / r - time * 2.65);
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.94, 0.16, 0.47) * (0.23 / (abs(d) + 0.09));
	col = col / (1.0 + col);
	col *= clamp(r * 1.03, 0.0, 1.0);
	col = fract(col * 1.60);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
