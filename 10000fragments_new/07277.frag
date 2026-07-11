uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 7.46);
    float gsh = hash21(vec2(grow, floor(t * 9.91))) - 0.5;
    float gx = p.x + gsh * 0.67;
    v = sin(gx * 12.69 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 2.54));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.43; p = rot2(1.18) * p; }
	p = abs(p) - 0.71;
	p = fract(p * 2.72) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.32 + time * 0.11, vec3(0.43, 0.44, 0.43), vec3(0.31, 0.49, 0.31), vec3(0.77, 1.27, 1.31), vec3(0.11, 0.98, 0.70));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
