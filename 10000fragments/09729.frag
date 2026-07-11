uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.94; vec2 jc = vec2(-0.49 + 0.3 * sin(t * 1.45 + ph), -0.16 + 0.3 * cos(t * 1.45 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 31; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(31) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.68;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.33 / wf * sin(wf * 3.13 * p.y + time * 1.72); p.y += 0.34 / wf * cos(wf * 2.87 * p.x + time * 0.82); }
	p = abs(p) - 0.40;
	p = rot2(length(p) * -2.05 + time * 0.49) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.31), field(p, time, 2.63));
	col = 0.5 + 0.5 * col;
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
