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
        vec2 lp = vec2(sin(lt * 1.0 + t * 0.39 + ph), sin(lt * 1.0 + t * 0.47)) * 0.82;
        md = min(md, length(p - lp)); }
    v = exp(-md * 8.52) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.76), cos(time * 0.76)) * 0.13;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.11 / 3.1415927, 0.90 / r - time * 1.41);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.73 + time * 0.09, vec3(0.43, 0.54, 0.52), vec3(0.47, 0.47, 0.41), vec3(1.08, 0.71, 1.13), vec3(0.09, 0.50, 0.51));
	col *= clamp(r * 2.74, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
