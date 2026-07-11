uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 3.91 + t * 0.57 + ph) + sin(p.y * 4.39 - t * 0.57 + ph)
        + sin((p.x + p.y) * 3.89 + t * 0.57 + ph) + sin(length(p) * 14.97 - t * 0.57 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.24;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.32 / wf * sin(wf * 1.54 * p.y + time * 1.58); p.y += 0.34 / wf * cos(wf * 3.84 * p.x + time * 0.80); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.98 + time * 0.26, vec3(0.60, 0.43, 0.55), vec3(0.41, 0.42, 0.41), vec3(0.84, 1.21, 1.07), vec3(0.06, 0.90, 0.82));
	col = clamp((col - 0.5) * 1.36 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
