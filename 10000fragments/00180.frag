uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 10.06 + t * 0.81 + ph) + sin(p.y * 11.01 - t * 1.40 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.34;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.37 / wf * sin(wf * 3.40 * p.y + time * 1.47); p.y += 0.43 / wf * cos(wf * 3.05 * p.x + time * 1.64); }
	p = abs(p) - 0.40;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.03 + time * 0.05, vec3(0.49, 0.53, 0.53), vec3(0.44, 0.33, 0.40), vec3(1.40, 1.16, 1.34), vec3(0.96, 0.96, 0.63));
	col = fract(col * 2.08);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
