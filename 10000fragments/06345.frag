uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.68; vec2 jc = vec2(0.09 + 0.3 * sin(t * 0.68 + ph), -0.24 + 0.3 * cos(t * 0.68 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 16; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(16) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = abs(p) - 0.24;
	{ p = vec2(atan(p.y, p.x) * 1.08, length(p) * 4.32 - time * 0.59); }
	p = rot2(2.30) * p;
	p = fract(p * 1.62) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.94 + time * 0.04);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
