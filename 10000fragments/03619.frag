uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 4.04) - 0.5;
    float rad = 0.30 + 0.12 * sin(t * 3.01 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.28;
	p += vec2(0.01, 0.49) * sin(length(p) * 5.07 - time * 1.50) * 0.35;
	p *= 3.33;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.22 / wf * sin(wf * 2.73 * p.y + time * 0.92); p.y += 0.30 / wf * cos(wf * 2.90 * p.x + time * 1.82); }
	{ p = vec2(atan(p.y, p.x) * 2.39, length(p) * 3.65 - time * 0.52); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.46 + time * 0.09, vec3(0.46, 0.49, 0.45), vec3(0.49, 0.50, 0.42), vec3(0.83, 0.87, 1.13), vec3(0.69, 0.66, 0.15));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.51));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
