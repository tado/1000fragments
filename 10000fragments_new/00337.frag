uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.50; vec2 jc = vec2(0.28 + 0.3 * sin(t * 0.85 + ph), 0.11 + 0.3 * cos(t * 1.28 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 22; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 22.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.20;
	p = rot2(time * 1.39) * p;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.39; p = rot2(1.74) * p; }
	p.y += sin(p.x * 5.91 + time * 2.69) * 0.16;
	{ float fr = length(p); p *= 1.0 + -0.58 * fr * fr; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.83), field(p, time, 1.65));
	col = 0.5 + 0.5 * col;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.83));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
