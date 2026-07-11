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
    float grow = floor(p.y * 8.76);
    float gsh = hash21(vec2(grow, floor(t * 6.30))) - 0.5;
    float gx = p.x + gsh * 0.40;
    v = sin(gx * 14.50 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 3.71));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(0.08, -0.16) * sin(length(p) * 3.45 - time * 1.65) * 0.25;
	p = fract(p * 1.09) - 0.5;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.50; p = rot2(2.37) * p; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.75 + time * 0.14, vec3(0.57, 0.42, 0.43), vec3(0.47, 0.32, 0.31), vec3(1.32, 1.02, 0.83), vec3(0.27, 0.06, 0.46));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.79));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
