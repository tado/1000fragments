uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 4.80) - 0.5;
    float rad = 0.23 + 0.12 * sin(t * 0.98 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.42;
	p = rot2(2.41) * p;
	{ p = vec2(atan(p.y, p.x) * 1.17, length(p) * 5.97 - time * 0.72); }
	p += vec2(0.41, -0.54) * sin(length(p) * 4.78 - time * 1.19) * 0.39;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.94 + time * 0.06, vec3(0.42, 0.55, 0.53), vec3(0.35, 0.43, 0.40), vec3(0.70, 0.82, 1.30), vec3(0.80, 0.53, 0.66));
	col = mod(col * 2.13, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
