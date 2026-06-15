uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 6.82) - 0.5;
    float rad = 0.33 + 0.12 * sin(t * 1.28 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 7.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = fract(p * 2.52) - 0.5;
	{ p = vec2(atan(p.y, p.x) * 1.48, length(p) * 3.69 - time * 0.20); }
	p = rot2(p.y * 1.88 + time * 0.71) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.58), field(p, time, 1.16));
	col = 0.5 + 0.5 * col;
	col = clamp((col - 0.5) * 1.54 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
