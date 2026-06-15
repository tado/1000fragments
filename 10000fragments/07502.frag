uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 4.25) - 0.5;
    float rad = 0.38 + 0.12 * sin(t * 2.14 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.28;
	p = rot2(2.05) * p;
	p = rot2(length(p) * -3.07 + time * 0.95) * p;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.56; p = rot2(1.21) * p; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.94 + time * 0.03, vec3(0.43, 0.43, 0.50), vec3(0.42, 0.38, 0.43), vec3(1.04, 0.98, 0.73), vec3(0.83, 0.89, 0.75));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.84));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
