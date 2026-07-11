uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.27; vec2 jc = vec2(0.24 + 0.3 * sin(t * 0.90 + ph), -0.66 + 0.3 * cos(t * 0.90 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 25; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(25) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.95;
	p = rot2(2.02) * p;
	p = fract(p * 1.60) - 0.5;
	p = rot2(time * 1.32) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.57), field(p, time, 1.15));
	col = 0.5 + 0.5 * col;
	col = fract(col * 2.31);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
