uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 18.69 + sin(p.y * 1.14 + t * 1.69) * 1.17 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.54;
	p *= 3.36;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.44 / wf * sin(wf * 1.57 * p.y + time * 0.78); p.y += 0.47 / wf * cos(wf * 3.55 * p.x + time * 0.88); }
	p = fract(p * 1.88) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.99 + time * 0.29, vec3(0.48, 0.53, 0.45), vec3(0.48, 0.42, 0.46), vec3(1.24, 0.85, 1.05), vec3(0.99, 0.84, 0.57));
	col = mod(col * 2.96, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
