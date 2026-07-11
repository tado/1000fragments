uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 3.0 + t * 0.69 + ph), sin(lt * 1.0 + t * 0.47)) * 0.83;
        md = min(md, length(p - lp)); }
    v = exp(-md * 4.63) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.05 / 3.1415927, 0.70 / r + time * 1.22);
	tv.x += tv.y * 0.30;
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 1.13 + time * 0.23, vec3(0.53, 0.48, 0.41), vec3(0.45, 0.49, 0.33), vec3(1.28, 1.10, 1.09), vec3(0.49, 0.24, 0.86));
	col *= clamp(r * 2.50, 0.0, 1.0);
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.11;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
