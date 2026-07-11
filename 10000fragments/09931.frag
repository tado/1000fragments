uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.75; vec2 jc = vec2(0.07 + 0.3 * sin(t * 0.30 + ph), 0.58 + 0.3 * cos(t * 0.30 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 33; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(33) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.15;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.48; p = rot2(0.69) * p; }
	p = rot2(1.74) * p;
	p = rot2(time * 1.00) * p;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.86, 1.32, 0.97) + vec3(0.11, 0.14, 0.07);
	col = mod(col * 2.29, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
