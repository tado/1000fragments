uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 9.40 - t * 6.59 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.21, 0.0)) * 38.96 - t * 2.00 + ph);
    float mb = sin(length(p + vec2(0.21, 0.0)) * 35.71 - t * 2.00 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.50 / wf * sin(wf * 1.59 * p.y + time * 0.69); p.y += 0.49 / wf * cos(wf * 2.43 * p.x + time * 2.00); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.10);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.45 + time * 0.03, vec3(0.56, 0.53, 0.57), vec3(0.45, 0.50, 0.34), vec3(1.06, 1.08, 0.75), vec3(0.17, 0.77, 0.89));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
