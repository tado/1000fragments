uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.77; vec2 jc = vec2(-0.23 + 0.3 * sin(t * 1.22 + ph), -0.10 + 0.3 * cos(t * 1.22 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 20; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(20) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(time * 1.36) * p;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.53; p = rot2(1.59) * p; }
	p = rot2(1.74) * p;
	{ float fr = length(p); p *= 1.0 + 0.72 * fr * fr; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.35), field(p, time, 2.69));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
