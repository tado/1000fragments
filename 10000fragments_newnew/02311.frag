uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.83; vec2 jc = vec2(-0.38 + 0.3 * sin(t * 1.74 + ph), -0.44 + 0.3 * cos(t * 0.78 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 39; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 39.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = sin(p * 2.49 + time * 0.92) * 1.36;
	p += vec2(0.95, 0.98) * sin(length(p) * 5.17 - time * 2.40) * 0.16;
	p *= 2.05;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.44, 1.28, 0.78) + vec3(0.16, 0.16, 0.15);
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
