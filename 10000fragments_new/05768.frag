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
        vec2 lp = vec2(sin(lt * 5.0 + t * 1.41 + ph), sin(lt * 4.0 + t * 1.24)) * 0.60;
        md = min(md, length(p - lp)); }
    v = exp(-md * 6.75) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * -0.54;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.97 / 3.1415927, 1.37 / r + time * 2.51);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 1.26 + time * 0.32, vec3(0.55, 0.59, 0.41), vec3(0.38, 0.40, 0.39), vec3(1.33, 0.99, 1.33), vec3(0.76, 0.19, 0.10));
	col *= clamp(r * 2.18, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
