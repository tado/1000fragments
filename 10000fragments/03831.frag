uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 17.71 + t * 3.64 + ph) + sin(p.y * 10.26 - t * 0.58 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.84;
	p *= 3.25;
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.35 / wf * sin(wf * 3.09 * p.y + time * 1.80); p.y += 0.28 / wf * cos(wf * 1.84 * p.x + time * 1.90); }
	p = abs(p);
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.96 + time * 0.01);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
