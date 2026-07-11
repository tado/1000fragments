uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.56, 0.0)) * 21.54 - t * 2.64 + ph);
    float mb = sin(length(p + vec2(0.56, 0.0)) * 25.44 - t * 2.64 + ph);
    v = ma * mb;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 13.25 + t * 3.14 + ph) + sin(p.y * 3.21 - t * 3.14 + ph)
        + sin((p.x + p.y) * 9.87 + t * 3.14 + ph) + sin(length(p) * 3.16 - t * 3.14 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.83;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.44 / wf * sin(wf * 2.54 * p.y + time * 1.11); p.y += 0.36 / wf * cos(wf * 3.55 * p.x + time * 0.73); }
	p = fract(p * 2.91) - 0.5;
	p = abs(p);
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.65);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.13 + time * 0.11, vec3(0.51, 0.54, 0.49), vec3(0.39, 0.43, 0.50), vec3(1.11, 0.88, 0.84), vec3(0.18, 0.58, 0.51));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
