uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 15.27 + t * 2.37 + ph) + sin(p.y * 12.99 - t * 2.18 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.84;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.31 / wf * sin(wf * 3.42 * p.y + time * 1.46); p.y += 0.28 / wf * cos(wf * 1.69 * p.x + time * 1.57); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.73 + time * 0.22, vec3(0.53, 0.50, 0.46), vec3(0.38, 0.36, 0.32), vec3(1.11, 0.80, 0.84), vec3(0.44, 0.52, 0.51));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
