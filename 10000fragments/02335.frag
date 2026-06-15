uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.86; vec2 jc = vec2(-0.40 + 0.3 * sin(t * 1.25 + ph), 0.69 + 0.3 * cos(t * 1.25 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 22; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(22) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.14;
	{ p = vec2(atan(p.y, p.x) * 2.40, length(p) * 3.89 - time * 0.57); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.28), field(p, time, 2.55));
	col = 0.5 + 0.5 * col;
	col = mod(col * 1.55, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
