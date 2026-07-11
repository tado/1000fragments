uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 5.0 + t * 1.43 + ph), sin(lt * 2.0 + t * 0.49)) * 0.91;
        md = min(md, length(p - lp)); }
    v = exp(-md * 6.89) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * 0.53;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.29 / 3.1415927, 1.21 / r + time * 1.52);
	float d = field(tv, time, 0.0);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 4.32 + time * 0.53);
	col *= clamp(r * 1.49, 0.0, 1.0);
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
