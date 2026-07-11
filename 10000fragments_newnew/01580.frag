uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.71; vec2 jc = vec2(-0.32 + 0.3 * sin(t * 0.32 + ph), -0.39 + 0.3 * cos(t * 1.50 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 26; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 26.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(p.y * 1.83 + time * 0.43) * p;
	p = fract(p * 2.82) - 0.5;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.07), field(p, time, 2.15));
	col = 0.5 + 0.5 * col;
	col = fract(col * 1.91);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
