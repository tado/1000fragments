uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.68; vec2 jc = vec2(0.08 + 0.3 * sin(t * 1.06 + ph), 0.46 + 0.3 * cos(t * 1.06 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 40; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(40) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = fract(p * 2.19) - 0.5;
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.33 / wf * sin(wf * 3.99 * p.y + time * 0.77); p.y += 0.37 / wf * cos(wf * 3.46 * p.x + time * 1.48); }
	p += vec2(0.83, -0.49) * sin(length(p) * 2.72 - time * 0.69) * 0.14;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.50; p = rot2(1.62) * p; }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.24, 1.16, 1.36) + vec3(0.04, 0.09, 0.12);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.18));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
