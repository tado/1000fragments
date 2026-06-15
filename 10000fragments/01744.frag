uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 12.99 + t * 4.01 + ph) + sin(p.y * 6.29 - t * 4.01 + ph)
        + sin((p.x + p.y) * 2.47 + t * 4.01 + ph) + sin(length(p) * 17.27 - t * 4.01 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.86;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.25 / wf * sin(wf * 2.52 * p.y + time * 1.08); p.y += 0.47 / wf * cos(wf * 3.95 * p.x + time * 1.21); }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.78 + time * 0.01);
	col = clamp((col - 0.5) * 1.33 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
