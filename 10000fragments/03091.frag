uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 4.09) - 0.5;
    float rad = 0.23 + 0.12 * sin(t * 3.62 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p += vec2(0.62, -0.78) * sin(length(p) * 3.17 - time * 1.61) * 0.32;
	p = rot2(p.y * -3.94 + time * 0.14) * p;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 6.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.96 + time * 0.04, vec3(0.46, 0.58, 0.41), vec3(0.33, 0.47, 0.43), vec3(1.04, 1.30, 0.88), vec3(0.81, 0.16, 0.52));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
