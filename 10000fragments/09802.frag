uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.98; vec2 jc = vec2(-0.15 + 0.3 * sin(t * 0.71 + ph), -0.37 + 0.3 * cos(t * 0.71 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 37; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(37) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.44;
	p = fract(p * 1.08) - 0.5;
	{ p = vec2(atan(p.y, p.x) * 1.03, length(p) * 4.92 - time * 0.71); }
	p += vec2(0.46, -0.70) * sin(length(p) * 2.88 - time * 1.89) * 0.22;
	p = rot2(p.y * 3.08 + time * 0.61) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.48), field(p, time, 0.97));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
