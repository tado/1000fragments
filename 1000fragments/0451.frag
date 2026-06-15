uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 23.38 - t * 3.99 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 15.90 + t * 1.67 + ph) + sin(p.y * 10.15 - t * 2.74 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.61;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 4.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.46 / wf * sin(wf * 3.31 * p.y + time * 0.62); p.y += 0.28 / wf * cos(wf * 2.74 * p.x + time * 1.57); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.02);
	float d = d1 + d2;
	vec3 col = palette(d * 1.28 + time * 0.04, vec3(0.42, 0.56, 0.54), vec3(0.35, 0.30, 0.34), vec3(1.17, 0.77, 0.92), vec3(0.62, 0.99, 0.36));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
