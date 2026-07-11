uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 4.04) - 0.5;
    float rad = 0.43 + 0.12 * sin(t * 3.87 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.68;
	{ float fr = length(p); p *= 1.0 + 0.44 * fr * fr; }
	p = rot2(0.31) * p;
	p *= 3.08;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.62 + time * 0.19, vec3(0.41, 0.48, 0.47), vec3(0.49, 0.38, 0.36), vec3(0.71, 1.35, 1.31), vec3(0.38, 0.27, 0.69));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.24));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
