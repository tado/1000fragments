uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.94; vec2 jc = vec2(-0.23 + 0.3 * sin(t * 1.54 + ph), -0.43 + 0.3 * cos(t * 1.05 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 34; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 34.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.49;
	p = rot2(length(p) * 2.08 + time * 0.44) * p;
	{ float fr = length(p); p *= 1.0 + 0.48 * fr * fr; }
	p = vec2(p.x * p.x - p.y * p.y, 2.0 * p.x * p.y) * 0.82;
	p = rot2(p.y * -3.13 + time * 0.29) * p;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.53, 0.20, 0.18) * (0.20 / (abs(d) + 0.04));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
