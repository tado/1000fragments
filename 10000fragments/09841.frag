uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.96; vec2 jc = vec2(-0.09 + 0.3 * sin(t * 0.98 + ph), 0.19 + 0.3 * cos(t * 0.98 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 23; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(23) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.52;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.86, 1.01, 0.69) + vec3(0.09, 0.25, 0.08);
	col = mod(col * 2.79, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
