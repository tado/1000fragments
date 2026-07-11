uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 12.91 + sin(p.y * 5.71 + t * 5.70) * 1.91 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.36 / wf * sin(wf * 3.25 * p.y + time * 0.79); p.y += 0.30 / wf * cos(wf * 2.38 * p.x + time * 1.32); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.13 + time * 0.00, vec3(0.45, 0.50, 0.52), vec3(0.37, 0.39, 0.36), vec3(1.37, 1.05, 1.39), vec3(0.56, 0.21, 0.37));
	col = mod(col * 1.76, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
