uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 8.51) - 0.5;
    float rad = 0.27 + 0.12 * sin(t * 1.21 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.23, 0.0)) * 17.39 - t * 2.70 + ph);
    float mb = sin(length(p + vec2(0.23, 0.0)) * 35.69 - t * 2.70 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.91;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.29 / wf * sin(wf * 3.90 * p.y + time * 0.69); p.y += 0.24 / wf * cos(wf * 2.56 * p.x + time * 1.97); }
	{ float fr = length(p); p *= 1.0 + -0.67 * fr * fr; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.10);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.22 + time * 0.04, vec3(0.59, 0.40, 0.44), vec3(0.38, 0.46, 0.38), vec3(1.26, 1.27, 1.35), vec3(0.36, 0.29, 0.41));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
