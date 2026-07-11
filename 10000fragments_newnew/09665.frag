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
        vec2 lp = vec2(sin(lt * 3.0 + t * 1.29 + ph), sin(lt * 2.0 + t * 0.31)) * 0.51;
        md = min(md, length(p - lp)); }
    v = exp(-md * 4.99) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.48), cos(time * 0.83)) * 0.12;
	float an = atan(p.y, p.x) + time * -0.62;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.11 / 3.1415927, 1.12 / r - time * 1.10);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 1.49 + time * 0.40, vec3(0.52, 0.46, 0.51), vec3(0.43, 0.31, 0.36), vec3(0.91, 1.28, 0.95), vec3(0.11, 0.25, 0.95));
	col *= clamp(r * 2.48, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
