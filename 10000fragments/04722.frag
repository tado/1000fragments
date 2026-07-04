uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 4.50 + sin(p.y * 1.47 + t * 5.64) * 3.62 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.73;
	p = sin(p * 3.00 + time * 0.68) * 1.36;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.48 / wf * sin(wf * 3.62 * p.y + time * 1.29); p.y += 0.24 / wf * cos(wf * 1.82 * p.x + time * 1.04); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.63 + time * 0.03, vec3(0.44, 0.47, 0.42), vec3(0.42, 0.44, 0.46), vec3(0.92, 1.01, 1.16), vec3(0.11, 0.43, 0.65));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.78));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
