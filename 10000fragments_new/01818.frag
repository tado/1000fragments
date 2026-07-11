uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 2.24, t * 2.14 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 5.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = (floor(p * 14.6) + 0.5) / 14.6;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.51, 0.36, 0.46) * (0.12 / (abs(d) + 0.04));
	col = col / (1.0 + col);
	col *= 0.84 + 0.18 * sin(gl_FragCoord.y * 1.89 + time * 14.31);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
