uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.69; vec2 jc = vec2(-0.70 + 0.3 * sin(t * 1.33 + ph), 0.41 + 0.3 * cos(t * 1.02 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 22; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 22.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.43;
	p = abs(p);
	p = rot2(time * -1.23) * p;
	{ p = vec2(atan(p.y, p.x) * 2.21, length(p) * 2.73 - time * 0.48); }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.95, 0.64, 0.78) * (0.19 / (abs(d) + 0.07));
	col = col / (1.0 + col);
	col = mod(col * 2.65, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
