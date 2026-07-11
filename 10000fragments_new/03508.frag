uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.02; vec2 jc = vec2(-0.41 + 0.3 * sin(t * 0.35 + ph), 0.14 + 0.3 * cos(t * 0.34 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 35; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 35.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p.x += sin(p.y * 3.61 + time * 1.32) * 0.27;
	p = rot2(p.y * -1.15 + time * 1.18) * p;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.79, 0.28, 0.40) * (0.19 / (abs(d) + 0.09));
	col = col / (1.0 + col);
	col = fract(col * 1.20);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
