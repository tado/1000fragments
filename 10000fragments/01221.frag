uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 13.14 + t * 4.35 + ph) + sin(p.y * 9.98 - t * 4.35 + ph)
        + sin((p.x + p.y) * 7.43 + t * 4.35 + ph) + sin(length(p) * 12.94 - t * 4.35 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.22 / wf * sin(wf * 2.81 * p.y + time * 1.83); p.y += 0.36 / wf * cos(wf * 1.98 * p.x + time * 1.29); }
	p = rot2(2.40) * p;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.35, 0.01, 0.32), vec3(0.56, 0.55, 0.94), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
