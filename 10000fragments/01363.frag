uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 11.10 + t * 4.55 + ph) + sin(p.y * 9.79 - t * 4.55 + ph)
        + sin((p.x + p.y) * 5.31 + t * 4.55 + ph) + sin(length(p) * 11.30 - t * 4.55 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.36;
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.28 / wf * sin(wf * 2.77 * p.y + time * 1.61); p.y += 0.41 / wf * cos(wf * 3.09 * p.x + time * 1.00); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.66 + time * 0.22, vec3(0.52, 0.57, 0.60), vec3(0.40, 0.38, 0.30), vec3(1.25, 0.92, 1.11), vec3(0.36, 0.15, 0.73));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
