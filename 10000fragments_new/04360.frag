uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 2.31) - 0.5;
    float rad = 0.22 + 0.12 * sin(t * 2.09 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 11.95 + sin(p.y * 2.27 + t * 3.89) * 1.26 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = (floor(p * 23.3) + 0.5) / 23.3;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.13; p = rot2(1.04) * p; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.17);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.79 + time * 0.22, vec3(0.42, 0.42, 0.53), vec3(0.41, 0.34, 0.49), vec3(1.00, 0.87, 1.20), vec3(0.65, 0.52, 0.87));
	col *= 0.87 + 0.16 * sin(gl_FragCoord.y * 1.51 + time * 12.10);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
