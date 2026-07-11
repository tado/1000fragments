uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.55; vec2 jc = vec2(0.36 + 0.3 * sin(t * 1.15 + ph), 0.24 + 0.3 * cos(t * 0.51 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 34; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 34.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.36;
	p = (floor(p * 12.4) + 0.5) / 12.4;
	p = rot2(1.40) * p;
	p = fract(p * 2.61) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.95, 0.30, 0.20) * (0.12 / (abs(d) + 0.06));
	col = col / (1.0 + col);
	col = mod(col * 1.63, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
