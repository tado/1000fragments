uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 2.13) - 0.5;
    float rad = 0.41 + 0.12 * sin(t * 2.89 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.08;
	p = rot2(time * -0.63) * p;
	p = fract(p * 2.15) - 0.5;
	{ float fr = length(p); p *= 1.0 + -0.44 * fr * fr; }
	p *= 2.19;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.45 + time * 0.26, vec3(0.49, 0.43, 0.47), vec3(0.33, 0.34, 0.50), vec3(0.94, 1.24, 1.31), vec3(0.38, 0.24, 0.70));
	col = mod(col * 2.64, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
