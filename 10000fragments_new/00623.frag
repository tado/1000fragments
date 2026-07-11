uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 3.17) - 0.5;
    float rad = 0.43 + 0.12 * sin(t * 1.42 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.77;
	p = rot2(2.61) * p;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 8.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p.y += sin(p.x * 7.86 + time * 1.96) * 0.15;
	p = rot2(length(p) * 2.78 + time * 0.55) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.30 + time * 0.24, vec3(0.45, 0.50, 0.42), vec3(0.45, 0.37, 0.47), vec3(1.20, 1.25, 1.34), vec3(0.56, 0.60, 0.26));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.94));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
