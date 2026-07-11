uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 4.11 + sin(p.y * 4.06 + t * 1.84) * 4.20 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p += vec2(0.67, -0.66) * sin(length(p) * 4.95 - time * 1.38) * 0.14;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.28 / wf * sin(wf * 3.50 * p.y + time * 1.15); p.y += 0.25 / wf * cos(wf * 3.49 * p.x + time * 0.97); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.95 + time * 0.27, vec3(0.42, 0.48, 0.58), vec3(0.46, 0.35, 0.37), vec3(1.34, 1.06, 1.06), vec3(0.15, 0.92, 0.95));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.57));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
