uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (1.75 + 0.32 * sin(t * 1.04)) + vec2(-0.23, 0.18) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 32; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 32.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.39;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.49; p = rot2(0.50) * p; }
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 4.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = (floor(p * 24.2) + 0.5) / 24.2;
	vec3 col = vec3(field(p, (time * 0.83), 0.0), field(p, (time * 0.83), 0.12), field(p, (time * 0.83), 0.23));
	col = 0.5 + 0.5 * col;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.13));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.47);
	col = clamp(col, 0.0, 1.0) * vec3(1.046, 1.005, 0.922) * 1.00 + 0.018;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
