uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 4.0 + t * 1.07 + ph), sin(lt * 2.0 + t * 1.15)) * 0.97;
        md = min(md, length(p - lp)); }
    v = exp(-md * 6.88) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * 0.20;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.22 / 3.1415927, 0.83 / r - time * 1.07);
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.42, 0.41, 0.52) * (0.20 / (abs(d) + 0.08));
	col = col / (1.0 + col);
	col *= clamp(r * 3.00, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
