uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 3.37 + sr * 12.50 - t * 2.14 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.30;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.47 / wf * sin(wf * 2.75 * p.y + time * 1.57); p.y += 0.36 / wf * cos(wf * 2.67 * p.x + time * 1.98); }
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 7.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.74 + time * 0.30, vec3(0.46, 0.53, 0.54), vec3(0.39, 0.49, 0.37), vec3(0.84, 1.18, 1.27), vec3(0.91, 0.77, 0.65));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
