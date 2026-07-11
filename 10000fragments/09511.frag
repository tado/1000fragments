uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.80; vec2 jc = vec2(-0.19 + 0.3 * sin(t * 0.71 + ph), 0.49 + 0.3 * cos(t * 0.71 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 39; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(39) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.68;
	p = rot2(1.67) * p;
	p = rot2(p.y * 3.61 + time * 0.90) * p;
	p = rot2(time * -1.34) * p;
	p = fract(p * 1.73) - 0.5;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.79), field(p, time, 1.59));
	col = 0.5 + 0.5 * col;
	col = fract(col * 2.23);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
