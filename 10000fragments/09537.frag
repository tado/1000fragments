uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.13; vec2 jc = vec2(-0.19 + 0.3 * sin(t * 0.44 + ph), 0.25 + 0.3 * cos(t * 0.44 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 28; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(28) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.18, 1.29, 0.62) + vec3(0.11, 0.10, 0.28);
	col = clamp((col - 0.5) * 2.17 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
