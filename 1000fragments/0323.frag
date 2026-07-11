uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 2.36 + t * 1.70 + ph) + sin(p.y * 2.54 - t * 5.81 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.14;
	p = rot2(length(p) * -3.94 + time * 1.14) * p;
	p *= 2.73;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.26 / wf * sin(wf * 2.08 * p.y + time * 1.84); p.y += 0.32 / wf * cos(wf * 3.04 * p.x + time * 0.98); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.58 + time * 0.27, vec3(0.56, 0.47, 0.43), vec3(0.38, 0.37, 0.39), vec3(1.20, 0.74, 0.84), vec3(0.74, 0.14, 0.13));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.71));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
