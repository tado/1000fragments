uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 2.03 + t * 4.57 + ph) + sin(p.y * 7.25 - t * 4.57 + ph)
        + sin((p.x + p.y) * 7.57 + t * 4.57 + ph) + sin(length(p) * 6.63 - t * 4.57 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.24 / wf * sin(wf * 3.41 * p.y + time * 0.90); p.y += 0.28 / wf * cos(wf * 3.06 * p.x + time * 1.32); }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.32 + time * 0.27);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.79));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
