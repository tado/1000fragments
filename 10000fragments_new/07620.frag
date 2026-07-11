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
        vec2 lp = vec2(sin(lt * 5.0 + t * 0.96 + ph), sin(lt * 2.0 + t * 1.28)) * 1.00;
        md = min(md, length(p - lp)); }
    v = exp(-md * 4.64) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.89), cos(time * 0.51)) * 0.18;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.78 / 3.1415927, 1.08 / r + time * 1.20);
	float d = field(tv, time, 0.0);
	vec3 col = hue(d * 0.80 + time * 0.37);
	col *= clamp(r * 1.33, 0.0, 1.0);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.60 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
