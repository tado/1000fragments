uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.46; vec2 jc = vec2(0.22 + 0.3 * sin(t * 1.46 + ph), 0.40 + 0.3 * cos(t * 1.46 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 18; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(18) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.04;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 3.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = rot2(length(p) * 1.84 + time * 0.37) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.68 + time * 0.22, vec3(0.51, 0.40, 0.59), vec3(0.46, 0.41, 0.48), vec3(1.21, 1.23, 1.02), vec3(0.98, 0.65, 0.05));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
