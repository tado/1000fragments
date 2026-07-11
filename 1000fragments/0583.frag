uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 4.04 + sin(p.y * 5.29 + t * 0.87) * 2.09 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.25;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.43 / wf * sin(wf * 1.88 * p.y + time * 0.88); p.y += 0.21 / wf * cos(wf * 2.22 * p.x + time * 1.99); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.29 + time * 0.07, vec3(0.53, 0.56, 0.48), vec3(0.34, 0.31, 0.45), vec3(1.22, 0.72, 1.11), vec3(0.63, 0.26, 0.28));
	col = fract(col * 1.88);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
