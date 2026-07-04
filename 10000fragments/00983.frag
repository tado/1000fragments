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
    float grow = floor(p.y * 23.85);
    float gsh = hash21(vec2(grow, floor(t * 2.27))) - 0.5;
    float gx = p.x + gsh * 1.19;
    v = sin(gx * 12.78 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 1.23));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.15;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.36) * p * 13.20;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.54;
	float v = smoothstep(rad, rad - 0.10, length(hf));
	vec3 col = palette(d * 1.01 + time * 0.09, vec3(0.44, 0.58, 0.48), vec3(0.40, 0.33, 0.44), vec3(1.38, 1.36, 0.85), vec3(0.97, 0.77, 0.71)) * v;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
