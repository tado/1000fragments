uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 20.22 + sin(p.y * 1.40 + t * 0.64) * 2.98 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.47, 0.0)) * 8.16 - t * 4.49 + ph);
    float mb = sin(length(p + vec2(0.47, 0.0)) * 15.21 - t * 4.49 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.81;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.26 / wf * sin(wf * 3.12 * p.y + time * 1.03); p.y += 0.41 / wf * cos(wf * 2.54 * p.x + time * 1.13); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.01);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 1.18 + time * 0.18, vec3(0.57, 0.44, 0.41), vec3(0.41, 0.34, 0.36), vec3(0.75, 1.15, 1.12), vec3(0.88, 0.24, 0.83));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
