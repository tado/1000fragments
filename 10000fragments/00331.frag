uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 3.05 + t * 0.65 + ph) + sin(p.y * 7.26 - t * 5.72 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.48;
	p = fract(p * 2.60) - 0.5;
	p = rot2(0.39) * p;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.34 / wf * sin(wf * 3.75 * p.y + time * 1.39); p.y += 0.24 / wf * cos(wf * 2.21 * p.x + time * 1.29); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.61 + time * 0.29, vec3(0.56, 0.48, 0.54), vec3(0.46, 0.34, 0.33), vec3(1.00, 1.05, 1.33), vec3(0.95, 0.54, 0.90));
	col = fract(col * 2.07);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
