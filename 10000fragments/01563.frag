uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 1.0 + t * 1.08 + ph), sin(lt * 3.0 + t * 0.37)) * 0.64;
        md = min(md, length(p - lp)); }
    v = exp(-md * 5.93) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.05), cos(time * 0.82)) * 0.21;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.65 / 3.1415927, 0.79 / r - time * 1.15);
	tv.x += tv.y * 0.44;
	float d = field(tv, time, 0.0);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 3.01 + time * 0.39);
	col *= clamp(r * 2.94, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
