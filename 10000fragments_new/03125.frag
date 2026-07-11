uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.63; vec2 jc = vec2(0.10 + 0.3 * sin(t * 1.31 + ph), 0.25 + 0.3 * cos(t * 1.73 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 20; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 20.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = fract(p * 2.67) - 0.5;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.49, 0.35, 0.40), vec3(0.98, 0.56, 0.67), d);
	col *= 0.85 + 0.12 * sin(gl_FragCoord.y * 1.90 + time * 15.96);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
