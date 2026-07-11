uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 21.94 + sin(p.y * 1.60 + t * 2.79) * 2.04 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 2.22) - 0.5;
    float rad = 0.27 + 0.12 * sin(t * 0.98 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.40;
	p = rot2(1.30) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.90);
	float d = d1 * d2;
	vec3 col = palette(d * 0.93 + time * 0.27, vec3(0.46, 0.47, 0.45), vec3(0.43, 0.39, 0.39), vec3(1.36, 1.22, 0.83), vec3(0.81, 0.97, 0.62));
	col = fract(col * 1.64);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
