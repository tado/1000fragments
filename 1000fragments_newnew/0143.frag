uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 2.0 + t * 0.41 + ph), sin(lt * 2.0 + t * 0.77)) * 0.87;
        md = min(md, length(p - lp)); }
    v = exp(-md * 5.78) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.02 / 3.1415927, 0.51 / r + (time * 0.75) * 1.38);
	float d = field(tv, (time * 0.75), 0.0);
	vec3 col = vec3(0.5 + 0.5 * (d)) * vec3(0.55, 0.53, 0.62) + vec3(0.11, 0.09, 0.09);
	col *= clamp(r * 1.89, 0.0, 1.0);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.59 * dot(vg, vg);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.56);
	col = clamp(col, 0.0, 1.0) * vec3(1.039, 0.974, 0.918) * 1.00 + 0.047;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
