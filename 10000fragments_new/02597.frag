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
        vec2 lp = vec2(sin(lt * 3.0 + t * 1.08 + ph), sin(lt * 2.0 + t * 1.35)) * 0.98;
        md = min(md, length(p - lp)); }
    v = exp(-md * 3.73) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.75;
	p *= 2.03;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.41 / wf * sin(wf * 2.71 * p.y + time * 2.09); p.y += 0.28 / wf * cos(wf * 2.12 * p.x + time * 1.54); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.02 + time * 0.13, vec3(0.43, 0.47, 0.54), vec3(0.47, 0.31, 0.49), vec3(1.38, 1.09, 1.01), vec3(0.00, 0.94, 0.69));
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.11;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
