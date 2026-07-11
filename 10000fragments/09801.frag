uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.32; vec2 jc = vec2(0.37 + 0.3 * sin(t * 0.80 + ph), 0.17 + 0.3 * cos(t * 0.80 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 38; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(38) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p += vec2(-0.54, 0.10) * sin(length(p) * 4.22 - time * 1.83) * 0.36;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.72 + time * 0.01, vec3(0.50, 0.58, 0.58), vec3(0.35, 0.32, 0.36), vec3(0.77, 0.72, 0.71), vec3(0.02, 0.86, 0.12));
	col = mod(col * 2.29, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
