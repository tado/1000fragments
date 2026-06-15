uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 12.37 + t * 1.72 + ph) + sin(p.y * 10.69 - t * 1.72 + ph)
        + sin((p.x + p.y) * 10.49 + t * 1.72 + ph) + sin(length(p) * 16.86 - t * 1.72 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.76;
	p = fract(p * 2.60) - 0.5;
	{ p = vec2(atan(p.y, p.x) * 2.52, length(p) * 5.21 - time * 0.15); }
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.30 / wf * sin(wf * 2.07 * p.y + time * 1.23); p.y += 0.37 / wf * cos(wf * 2.05 * p.x + time * 1.09); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.63 + time * 0.08, vec3(0.58, 0.46, 0.45), vec3(0.31, 0.43, 0.45), vec3(0.87, 1.30, 1.29), vec3(0.26, 0.65, 0.32));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
