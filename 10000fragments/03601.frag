uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 8.61) - 0.5;
    float rad = 0.35 + 0.12 * sin(t * 0.59 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.73;
	p = rot2(length(p) * -1.34 + time * 0.96) * p;
	p = rot2(2.19) * p;
	{ p = vec2(atan(p.y, p.x) * 2.89, length(p) * 3.65 - time * 0.58); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.58 + time * 0.24, vec3(0.50, 0.53, 0.43), vec3(0.43, 0.49, 0.40), vec3(1.36, 1.23, 0.84), vec3(0.70, 0.39, 0.42));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
