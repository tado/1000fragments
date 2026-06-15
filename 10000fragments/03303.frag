uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 8.88 + t * 2.57 + ph) + sin(p.y * 9.41 - t * 2.57 + ph)
        + sin((p.x + p.y) * 11.94 + t * 2.57 + ph) + sin(length(p) * 17.07 - t * 2.57 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.28 / wf * sin(wf * 1.63 * p.y + time * 1.80); p.y += 0.40 / wf * cos(wf * 2.12 * p.x + time * 0.62); }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.31 + time * 0.25);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
