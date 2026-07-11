uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.82; vec2 jc = vec2(-0.04 + 0.3 * sin(t * 1.37 + ph), -0.07 + 0.3 * cos(t * 1.15 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 30; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 30.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.10;
	p += vec2(0.96, 0.54) * sin(length(p) * 4.83 - time * 0.98) * 0.38;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.23, 0.94, 0.48) * (0.19 / (abs(d) + 0.04));
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.91));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
