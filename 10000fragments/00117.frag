uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 6.71 + t * 1.05 + ph) + sin(p.y * 7.55 - t * 2.60 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.77;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.40 / wf * sin(wf * 2.17 * p.y + time * 1.32); p.y += 0.50 / wf * cos(wf * 2.35 * p.x + time * 1.20); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.66 + time * 0.01, vec3(0.45, 0.60, 0.53), vec3(0.46, 0.41, 0.41), vec3(1.36, 1.18, 0.82), vec3(0.50, 0.82, 0.52));
	col = clamp((col - 0.5) * 1.46 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
