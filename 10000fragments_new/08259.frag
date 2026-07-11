uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.83; vec2 jc = vec2(0.33 + 0.3 * sin(t * 1.05 + ph), -0.66 + 0.3 * cos(t * 1.63 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 20; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 20.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.80;
	p *= 2.19;
	p = fract(p * 2.25) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.80, 0.20, 0.68) * (0.14 / (abs(d) + 0.02));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
