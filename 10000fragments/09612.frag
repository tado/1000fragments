uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.33; vec2 jc = vec2(-0.59 + 0.3 * sin(t * 0.52 + ph), 0.37 + 0.3 * cos(t * 0.52 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 31; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(31) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p += vec2(0.15, -0.95) * sin(length(p) * 5.05 - time * 0.63) * 0.31;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.21), field(p, time, 0.42));
	col = 0.5 + 0.5 * col;
	col = fract(col * 1.78);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
