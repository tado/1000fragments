uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.40 + 0.22 * cos(sa * 4 + t * 0.72 + ph);
    v = sin((sr - petal) * 10.44);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 7.55 + t * 1.81 + ph) + sin(p.y * 3.47 - t * 1.81 + ph)
        + sin((p.x + p.y) * 4.19 + t * 1.81 + ph) + sin(length(p) * 10.59 - t * 1.81 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.83;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.47 / wf * sin(wf * 3.05 * p.y + time * 0.75); p.y += 0.40 / wf * cos(wf * 3.77 * p.x + time * 1.47); }
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 3.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.85);
	float d = d1 + d2;
	vec3 col = palette(d * 0.76 + time * 0.09, vec3(0.47, 0.55, 0.56), vec3(0.41, 0.36, 0.41), vec3(0.75, 1.01, 1.03), vec3(0.15, 0.35, 0.16));
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
