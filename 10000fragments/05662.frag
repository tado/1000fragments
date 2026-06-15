uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 4.94) - 0.5;
    float rad = 0.38 + 0.12 * sin(t * 0.62 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.74;
	{ p = vec2(atan(p.y, p.x) * 1.16, length(p) * 4.77 - time * 0.58); }
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.33; p = rot2(2.02) * p; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.01 + time * 0.04, vec3(0.50, 0.49, 0.47), vec3(0.32, 0.37, 0.31), vec3(0.97, 1.12, 1.00), vec3(0.55, 0.29, 1.00));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.70));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
