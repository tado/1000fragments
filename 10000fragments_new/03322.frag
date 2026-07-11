uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 5.0 + t * 0.82 + ph), sin(lt * 5.0 + t * 0.57)) * 0.82;
        md = min(md, length(p - lp)); }
    v = exp(-md * 9.69) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * 0.71;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.68 / 3.1415927, 1.30 / r + time * 0.93);
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.50, 0.91, 0.78) * (0.14 / (abs(d) + 0.04));
	col = col / (1.0 + col);
	col *= clamp(r * 1.86, 0.0, 1.0);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.32 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
