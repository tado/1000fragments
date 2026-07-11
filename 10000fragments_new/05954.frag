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
        vec2 lp = vec2(sin(lt * 1.0 + t * 0.33 + ph), sin(lt * 5.0 + t * 0.54)) * 0.89;
        md = min(md, length(p - lp)); }
    v = exp(-md * 3.34) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 5.83) - 0.5;
    float rad = 0.25 + 0.12 * sin(t * 1.63 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = fract(p * 2.99) - 0.5;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.50 / wf * sin(wf * 2.12 * p.y + time * 1.42); p.y += 0.36 / wf * cos(wf * 1.69 * p.x + time * 1.94); }
	{ p = vec2(atan(p.y, p.x) * 2.63, length(p) * 3.79 - time * 0.47); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.77);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.98 + time * 0.02, vec3(0.42, 0.53, 0.55), vec3(0.33, 0.38, 0.34), vec3(1.02, 0.72, 1.29), vec3(0.70, 0.17, 0.45));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
