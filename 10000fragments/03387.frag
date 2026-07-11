uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 5.48) - 0.5;
    float rad = 0.27 + 0.12 * sin(t * 0.89 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.22;
	p = abs(p);
	p = rot2(0.60) * p;
	p = rot2(p.y * -2.57 + time * 0.96) * p;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 7.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.36, 0.45, 0.10), vec3(0.77, 0.78, 0.86), d);
	col = mod(col * 1.22, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
