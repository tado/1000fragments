uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.46; vec2 jc = vec2(0.34 + 0.3 * sin(t * 0.96 + ph), -0.63 + 0.3 * cos(t * 0.82 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 16; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 16.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.52; p = rot2(0.89) * p; }
	p.y += sin(p.x * 5.73 + time * 2.25) * 0.21;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.74, 0.59, 1.14) + vec3(0.27, 0.29, 0.23);
	col = fract(col * 1.42);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
