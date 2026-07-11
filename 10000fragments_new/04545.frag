uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 3.0 + t * 0.77 + ph), sin(lt * 3.0 + t * 1.36)) * 0.98;
        md = min(md, length(p - lp)); }
    v = exp(-md * 3.92) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * 0.28;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.71 / 3.1415927, 1.40 / r + time * 2.17);
	tv.x += tv.y * 0.11;
	float d = field(tv, time, 0.0);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 2.70 + time * 0.87);
	col *= clamp(r * 2.97, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
