uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 5.0 + t * 0.98 + ph), sin(lt * 2.0 + t * 0.31)) * 0.52;
        md = min(md, length(p - lp)); }
    v = exp(-md * 7.65) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.82), cos(time * 0.75)) * 0.20;
	float an = atan(p.y, p.x) + time * -0.47;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.06 / 3.1415927, 0.39 / r + time * 0.80);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.59 + time * 0.26, vec3(0.42, 0.51, 0.54), vec3(0.42, 0.43, 0.36), vec3(1.24, 0.86, 0.74), vec3(0.84, 0.81, 0.88));
	col *= clamp(r * 2.18, 0.0, 1.0);
	col = clamp((col - 0.5) * 2.06 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
