uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 4.23 + sin(p.y * 1.59 + t * 3.64) * 2.89 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.35;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.23 / wf * sin(wf * 2.80 * p.y + time * 1.56); p.y += 0.39 / wf * cos(wf * 2.85 * p.x + time * 0.83); }
	p = fract(p * 1.99) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.24 + time * 0.26, vec3(0.57, 0.48, 0.48), vec3(0.31, 0.48, 0.49), vec3(1.12, 1.28, 0.74), vec3(0.60, 0.39, 0.39));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
