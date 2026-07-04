uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 2.0 + t * 1.31 + ph), sin(lt * 2.0 + t * 0.67)) * 0.90;
        md = min(md, length(p - lp)); }
    v = exp(-md * 4.64) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * 0.66;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.88 / 3.1415927, 1.50 / r + time * 2.38);
	tv.x += tv.y * 0.12;
	float d = field(tv, time, 0.0);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 3.65 + time * 0.67);
	col *= clamp(r * 2.67, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
