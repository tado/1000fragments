uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 6.09) - 0.5;
    float rad = 0.21 + 0.12 * sin(t * 3.44 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p += vec2(-0.67, 0.71) * sin(length(p) * 4.44 - time * 0.88) * 0.35;
	p = (floor(p * 17.1) + 0.5) / 17.1;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.30 / wf * sin(wf * 2.69 * p.y + time * 1.45); p.y += 0.47 / wf * cos(wf * 3.60 * p.x + time * 0.77); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.59 + time * 0.11, vec3(0.55, 0.43, 0.60), vec3(0.50, 0.44, 0.36), vec3(0.79, 1.00, 1.13), vec3(0.88, 0.75, 0.33));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
