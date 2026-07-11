uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.32; vec2 jc = vec2(-0.47 + 0.3 * sin(t * 1.49 + ph), 0.05 + 0.3 * cos(t * 1.65 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 27; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 27.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.38;
	p.x += sin(p.y * 6.10 + time * 1.53) * 0.24;
	p = (floor(p * 28.7) + 0.5) / 28.7;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.39), field(p, time, 0.78));
	col = 0.5 + 0.5 * col;
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
