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
        vec2 lp = vec2(sin(lt * 4.0 + t * 0.97 + ph), sin(lt * 2.0 + t * 0.48)) * 0.74;
        md = min(md, length(p - lp)); }
    v = exp(-md * 6.03) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(-0.31, -0.86) * sin(length(p) * 3.68 - time * 1.11) * 0.25;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.24 / wf * sin(wf * 2.63 * p.y + time * 1.02); p.y += 0.29 / wf * cos(wf * 2.15 * p.x + time * 1.61); }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.43 + time * 0.11);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
