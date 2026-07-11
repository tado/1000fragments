uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.92; vec2 jc = vec2(0.20 + 0.3 * sin(t * 1.37 + ph), -0.43 + 0.3 * cos(t * 1.20 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 30; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 30.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.48; p = rot2(2.47) * p; }
	{ p = vec2(atan(p.y, p.x) * 2.82, length(p) * 5.31 - time * 0.70); }
	{ float fr = length(p); p *= 1.0 + 0.55 * fr * fr; }
	p *= 1.92;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.89, 0.98, 0.21) * (0.18 / (abs(d) + 0.03));
	col = col / (1.0 + col);
	col *= 0.87 + 0.15 * sin(gl_FragCoord.y * 1.93 + time * 11.81);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
