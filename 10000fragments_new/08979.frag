uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 9.31 + t * 1.64 + ph) + sin(p.y * 4.81 - t * 1.64 + ph)
        + sin((p.x + p.y) * 3.38 + t * 1.64 + ph) + sin(length(p) * 17.44 - t * 1.64 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.21;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.30 / wf * sin(wf * 3.16 * p.y + time * 0.72); p.y += 0.26 / wf * cos(wf * 2.07 * p.x + time * 0.87); }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.94, 1.00, 0.54) * (0.23 / (abs(d) + 0.09));
	col = col / (1.0 + col);
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
