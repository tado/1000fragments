uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 11.31 + t * 2.83 + ph) + sin(p.y * 9.96 - t * 4.89 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.40;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.44 / wf * sin(wf * 3.30 * p.y + time * 0.76); p.y += 0.22 / wf * cos(wf * 2.87 * p.x + time * 1.25); }
	p = rot2(2.47) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.98), field(p, time, 1.96));
	col = 0.5 + 0.5 * col;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.54));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
