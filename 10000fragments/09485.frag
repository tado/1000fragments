uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 3.20 + vec2(t * 1.40, -t * 1.40) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 2.04) - 0.5;
    float rad = 0.35 + 0.12 * sin(t * 3.06 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.27 / wf * sin(wf * 2.25 * p.y + time * 1.83); p.y += 0.29 / wf * cos(wf * 2.92 * p.x + time * 1.10); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.98);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.74 + time * 0.15, vec3(0.57, 0.53, 0.44), vec3(0.45, 0.40, 0.32), vec3(1.20, 1.24, 1.25), vec3(0.43, 0.45, 0.79));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.13));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
