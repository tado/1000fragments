uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 5.99) - 0.5;
    float rad = 0.30 + 0.12 * sin(t * 2.57 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = abs(p) - 0.31;
	p = rot2(0.60) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.75 + time * 0.04, vec3(0.55, 0.46, 0.40), vec3(0.47, 0.48, 0.30), vec3(1.08, 1.13, 1.37), vec3(0.01, 0.96, 0.54));
	col = mod(col * 2.39, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
