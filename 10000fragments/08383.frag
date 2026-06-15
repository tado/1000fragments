uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.52; vec2 jc = vec2(-0.50 + 0.3 * sin(t * 1.05 + ph), -0.52 + 0.3 * cos(t * 1.05 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 35; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(35) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.64;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.20; p = rot2(1.66) * p; }
	p = abs(p);
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.19), field(p, time, 2.39));
	col = 0.5 + 0.5 * col;
	col = mod(col * 2.99, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
