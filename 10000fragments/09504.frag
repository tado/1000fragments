uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.40; vec2 jc = vec2(0.29 + 0.3 * sin(t * 1.18 + ph), 0.12 + 0.3 * cos(t * 1.18 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 26; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(26) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.24;
	p = abs(p);
	p += vec2(0.04, 0.87) * sin(length(p) * 3.01 - time * 1.56) * 0.16;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.95), field(p, time, 1.91));
	col = 0.5 + 0.5 * col;
	col = fract(col * 2.24);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
