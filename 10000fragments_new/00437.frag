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
    float grow = floor(p.y * 9.20);
    float gsh = hash21(vec2(grow, floor(t * 8.52))) - 0.5;
    float gx = p.x + gsh * 0.80;
    v = sin(gx * 14.99 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 3.35));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.88;
	{ p = vec2(atan(p.y, p.x) * 1.71, length(p) * 5.59 - time * 0.35); }
	p = fract(p * 1.80) - 0.5;
	p = rot2(0.87) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.74 + time * 0.21, vec3(0.50, 0.40, 0.54), vec3(0.43, 0.37, 0.30), vec3(0.83, 1.02, 1.03), vec3(0.13, 0.55, 0.62));
	col *= 0.87 + 0.11 * sin(gl_FragCoord.y * 1.10 + time * 7.60);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
