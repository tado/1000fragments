uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 13.25 + sin(p.y * 1.51 + t * 3.36) * 4.46 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 24.13 + sin(p.y * 3.84 + t * 0.69) * 1.54 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.67;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.32 / wf * sin(wf * 3.05 * p.y + time * 0.84); p.y += 0.32 / wf * cos(wf * 1.96 * p.x + time * 0.97); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.29);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 0.58 + time * 0.15, vec3(0.51, 0.54, 0.43), vec3(0.49, 0.50, 0.32), vec3(0.84, 1.10, 1.16), vec3(0.38, 0.02, 0.16));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.41));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
