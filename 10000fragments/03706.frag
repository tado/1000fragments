uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.35, 0.0)) * 14.62 - t * 2.34 + ph);
    float mb = sin(length(p + vec2(0.35, 0.0)) * 24.88 - t * 2.34 + ph);
    v = ma * mb;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 5.15) - 0.5;
    float rad = 0.21 + 0.12 * sin(t * 3.96 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.30;
	p *= 3.23;
	p = abs(p) - 0.46;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.26 / wf * sin(wf * 2.26 * p.y + time * 0.84); p.y += 0.34 / wf * cos(wf * 2.17 * p.x + time * 1.45); }
	{ float fr = length(p); p *= 1.0 + -0.63 * fr * fr; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.68);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.50 + time * 0.00, vec3(0.40, 0.50, 0.58), vec3(0.37, 0.30, 0.48), vec3(1.09, 0.83, 1.07), vec3(0.56, 0.89, 0.84));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
