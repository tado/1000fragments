uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 12.89 + t * 1.29 + ph) + sin(p.y * 11.97 - t * 1.29 + ph)
        + sin((p.x + p.y) * 6.18 + t * 1.29 + ph) + sin(length(p) * 3.52 - t * 1.29 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p += vec2(-0.84, -0.86) * sin(length(p) * 2.14 - time * 1.98) * 0.39;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.40 / wf * sin(wf * 2.24 * p.y + time * 1.07); p.y += 0.28 / wf * cos(wf * 2.01 * p.x + time * 1.02); }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.69 + time * 0.13);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
