uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.82; vec2 jc = vec2(0.08 + 0.3 * sin(t * 1.24 + ph), 0.17 + 0.3 * cos(t * 1.39 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 40; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 40.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.55;
	p = rot2(1.44) * p;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.38; p = rot2(1.29) * p; }
	p.y += sin(p.x * 3.91 + time * 3.72) * 0.34;
	p = fract(p * 2.51) - 0.5;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.65), field(p, time, 1.30));
	col = 0.5 + 0.5 * col;
	col = fract(col * 2.04);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
