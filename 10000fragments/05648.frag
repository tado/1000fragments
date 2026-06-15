uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 9.47 + sin(p.y * 5.82 + t * 2.93) * 4.43 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 5.08) - 0.5;
    float rad = 0.27 + 0.12 * sin(t * 1.57 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = abs(p) - 0.59;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.46; p = rot2(0.81) * p; }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.53, lr * 1.49 + time * -0.72); }
	p = rot2(p.y * 1.18 + time * 0.83) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.68);
	float d = d1 * d2;
	vec3 col = palette(d * 1.80 + time * 0.03, vec3(0.54, 0.56, 0.48), vec3(0.47, 0.30, 0.30), vec3(0.80, 0.87, 1.03), vec3(0.25, 0.41, 0.50));
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
