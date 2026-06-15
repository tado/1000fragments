uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 34.63 - t * 2.66 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.41;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.48 / wf * sin(wf * 3.19 * p.y + time * 1.34); p.y += 0.22 / wf * cos(wf * 3.53 * p.x + time * 0.61); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.26 + time * 0.01, vec3(0.57, 0.47, 0.59), vec3(0.45, 0.41, 0.47), vec3(0.70, 1.02, 1.40), vec3(0.28, 0.68, 0.67));
	col = mod(col * 2.40, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
