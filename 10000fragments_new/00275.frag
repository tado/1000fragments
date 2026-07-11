uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 5.0 + t * 1.11 + ph), sin(lt * 1.0 + t * 0.46)) * 0.88;
        md = min(md, length(p - lp)); }
    v = exp(-md * 8.09) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.09), cos(time * 0.79)) * 0.26;
	float an = atan(p.y, p.x) + time * -0.47;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.09 / 3.1415927, 0.83 / r - time * 2.75);
	float d = field(tv, time, 0.0);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 3.33 + time * 0.79);
	col *= clamp(r * 1.75, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
