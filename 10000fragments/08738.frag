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
    float grow = floor(p.y * 8.84);
    float gsh = hash21(vec2(grow, floor(t * 5.45))) - 0.5;
    float gx = p.x + gsh * 0.77;
    v = sin(gx * 11.37 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 3.35));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.74;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.47) * p * 16.07;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.59;
	float v = smoothstep(rad, rad - 0.13, length(hf));
	vec3 col = palette(d * 0.99 + time * 0.18, vec3(0.57, 0.60, 0.40), vec3(0.33, 0.49, 0.45), vec3(1.33, 1.29, 0.95), vec3(0.81, 0.48, 0.14)) * v;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
