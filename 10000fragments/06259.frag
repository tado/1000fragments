uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 4.21) - 0.5;
    float rad = 0.24 + 0.12 * sin(t * 2.44 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.70;
	{ float fr = length(p); p *= 1.0 + -0.52 * fr * fr; }
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.58; p = rot2(0.72) * p; }
	p = rot2(time * -1.39) * p;
	p = abs(p) - 0.23;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.56 + time * 0.28, vec3(0.43, 0.46, 0.54), vec3(0.48, 0.48, 0.38), vec3(1.22, 0.80, 1.11), vec3(0.56, 0.22, 0.17));
	col = mod(col * 1.32, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
