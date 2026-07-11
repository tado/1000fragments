uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 3.0 + t * 0.78 + ph), sin(lt * 2.0 + t * 0.63)) * 0.74;
        md = min(md, length(p - lp)); }
    v = exp(-md * 8.35) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * 0.61;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.42 / 3.1415927, 0.53 / r - time * 0.88);
	float d = field(tv, time, 0.0);
	vec3 col = hue(d * 0.86 + time * 0.25);
	col *= clamp(r * 2.89, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
