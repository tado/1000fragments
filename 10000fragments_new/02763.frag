uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 4.0 + t * 1.42 + ph), sin(lt * 4.0 + t * 1.42)) * 0.74;
        md = min(md, length(p - lp)); }
    v = exp(-md * 7.98) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.67;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.17, lr * 1.51 + time * -0.56); }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.28, 1.34, 0.62) + vec3(0.22, 0.01, 0.22);
	col *= 0.90 + 0.13 * sin(gl_FragCoord.y * 2.09 + time * 17.74);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
