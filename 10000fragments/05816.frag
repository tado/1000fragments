uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 8.64) - 0.5;
    float rad = 0.42 + 0.12 * sin(t * 3.59 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.96;
	{ float fr = length(p); p *= 1.0 + -0.31 * fr * fr; }
	p += vec2(-0.66, -0.13) * sin(length(p) * 3.39 - time * 1.41) * 0.13;
	p = rot2(length(p) * 1.70 + time * 1.19) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.38 + time * 0.07, vec3(0.58, 0.46, 0.50), vec3(0.47, 0.32, 0.46), vec3(1.26, 1.21, 1.14), vec3(0.29, 0.20, 0.92));
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
