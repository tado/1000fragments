uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.24; vec2 jc = vec2(-0.38 + 0.3 * sin(t * 0.24 + ph), 0.28 + 0.3 * cos(t * 0.24 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 17; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(17) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.59;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 4.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.30; p = rot2(1.30) * p; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.75), field(p, time, 1.49));
	col = 0.5 + 0.5 * col;
	col = fract(col * 1.42);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
