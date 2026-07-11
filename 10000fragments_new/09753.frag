uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.84; vec2 jc = vec2(0.02 + 0.3 * sin(t * 1.75 + ph), -0.01 + 0.3 * cos(t * 1.41 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 32; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 32.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 8.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	{ p = vec2(atan(p.y, p.x) * 1.80, length(p) * 4.88 - time * 0.76); }
	p = fract(p * 1.21) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.71, 0.42, 0.76) * (0.07 / (abs(d) + 0.09));
	col = col / (1.0 + col);
	col *= 0.84 + 0.18 * sin(gl_FragCoord.y * 2.76 + time * 7.52);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
