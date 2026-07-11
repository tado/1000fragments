uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.21; vec2 jc = vec2(-0.51 + 0.3 * sin(t * 0.36 + ph), -0.57 + 0.3 * cos(t * 0.83 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 39; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 39.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.13; p = rot2(2.24) * p; }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.88, lr * 1.59 + time * 0.35); }
	p.y += sin(p.x * 5.16 + time * 2.00) * 0.22;
	p = mix(p, p.yx, 0.5 + 0.5 * sin(time * 2.27));
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.11, 0.02, 0.36), vec3(0.78, 0.63, 0.75), d);
	col *= 0.87 + 0.10 * sin(gl_FragCoord.y * 1.93 + time * 15.81);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
