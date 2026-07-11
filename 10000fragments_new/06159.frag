uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.58; vec2 jc = vec2(0.08 + 0.3 * sin(t * 0.54 + ph), 0.58 + 0.3 * cos(t * 1.19 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 19; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 19.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(time * -1.47) * p;
	p = (floor(p * 10.2) + 0.5) / 10.2;
	p = fract(p * 2.30) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.27, 0.53, 0.79) * (0.21 / (abs(d) + 0.06));
	col = col / (1.0 + col);
	col = fract(col * 1.39);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
