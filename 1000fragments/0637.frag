uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 24.99 + sin(p.y * 4.64 + t * 2.90) * 4.87 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.44;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 5.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.28 / wf * sin(wf * 1.75 * p.y + time * 0.60); p.y += 0.34 / wf * cos(wf * 1.96 * p.x + time * 1.35); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.82 + time * 0.29, vec3(0.51, 0.59, 0.47), vec3(0.47, 0.41, 0.38), vec3(1.14, 1.20, 1.34), vec3(0.47, 0.22, 0.83));
	col = mod(col * 1.77, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
