uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 5.18 + t * 1.47 + ph) + sin(p.y * 7.08 - t * 1.47 + ph)
        + sin((p.x + p.y) * 6.73 + t * 1.47 + ph) + sin(length(p) * 4.81 - t * 1.47 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 10.74 + t * 5.65 + ph) + sin(p.y * 17.03 - t * 1.67 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.28 / wf * sin(wf * 1.53 * p.y + time * 1.66); p.y += 0.49 / wf * cos(wf * 2.80 * p.x + time * 1.74); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.13);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.7));
	vec3 col = palette(d * 1.43 + time * 0.12, vec3(0.57, 0.50, 0.49), vec3(0.38, 0.45, 0.40), vec3(1.11, 1.29, 0.87), vec3(0.36, 0.84, 0.99));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
