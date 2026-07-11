uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.24; vec2 jc = vec2(-0.68 + 0.3 * sin(t * 1.64 + ph), -0.35 + 0.3 * cos(t * 1.79 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 29; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 29.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.31;
	p *= 1.0 + 0.25 * sin(time * 1.76);
	p = rot2(length(p) * -2.88 + time * 0.48) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.36), field(p, time, 2.71));
	col = 0.5 + 0.5 * col;
	col = clamp((col - 0.5) * 1.63 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
