uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 29.15 - t * 3.85 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.84;
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.23 / wf * sin(wf * 3.86 * p.y + time * 1.54); p.y += 0.35 / wf * cos(wf * 2.46 * p.x + time * 1.41); }
	{ p = vec2(atan(p.y, p.x) * 1.64, length(p) * 5.42 - time * 0.45); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.75 + time * 0.02, vec3(0.55, 0.50, 0.50), vec3(0.39, 0.39, 0.45), vec3(1.11, 0.79, 0.98), vec3(0.38, 0.31, 0.81));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.23));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
