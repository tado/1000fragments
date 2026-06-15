uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 8.78) - 0.5;
    float rad = 0.27 + 0.12 * sin(t * 2.44 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.53;
	p = fract(p * 1.32) - 0.5;
	{ float fr = length(p); p *= 1.0 + -0.39 * fr * fr; }
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.20; p = rot2(1.11) * p; }
	p = rot2(3.05) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.86 + time * 0.08, vec3(0.48, 0.49, 0.47), vec3(0.50, 0.46, 0.31), vec3(0.80, 0.81, 1.37), vec3(0.28, 0.44, 0.91));
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
