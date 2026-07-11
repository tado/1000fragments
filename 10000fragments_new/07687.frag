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
        vec2 lp = vec2(sin(lt * 5.0 + t * 0.57 + ph), sin(lt * 4.0 + t * 1.10)) * 0.85;
        md = min(md, length(p - lp)); }
    v = exp(-md * 6.81) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.59 + 0.30 * cos(sa * 8.0 + t * 2.18 + ph);
    v = sin((sr - petal) * 8.90);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.25 / wf * sin(wf * 3.63 * p.y + time * 2.10); p.y += 0.31 / wf * cos(wf * 2.34 * p.x + time * 1.58); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.97);
	float d = max(d1, d2);
	vec3 col = palette(d * 0.68 + time * 0.07, vec3(0.49, 0.48, 0.50), vec3(0.46, 0.34, 0.33), vec3(1.10, 1.11, 1.28), vec3(0.71, 0.76, 0.20));
	col = fract(col * 1.09);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
