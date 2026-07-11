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
        vec2 lp = vec2(sin(lt * 1.0 + t * 0.31 + ph), sin(lt * 4.0 + t * 1.22)) * 0.60;
        md = min(md, length(p - lp)); }
    v = exp(-md * 8.76) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.30 / 3.1415927, 0.37 / r + time * 0.74);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 1.01 + time * 0.34, vec3(0.41, 0.44, 0.57), vec3(0.35, 0.48, 0.30), vec3(1.07, 1.16, 1.09), vec3(0.20, 0.47, 0.96));
	col *= clamp(r * 1.25, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
