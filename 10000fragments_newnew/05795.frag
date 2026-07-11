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
    float grow = floor(p.y * 7.59);
    float gsh = hash21(vec2(grow, floor(t * 8.11))) - 0.5;
    float gx = p.x + gsh * 0.91;
    v = sin(gx * 9.12 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 1.78));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(1.15) * p * 21.63;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.50;
	float v = smoothstep(rad, rad - 0.16, length(hf));
	vec3 col = palette(d * 1.06 + time * 0.14, vec3(0.46, 0.52, 0.52), vec3(0.37, 0.42, 0.36), vec3(1.15, 0.73, 1.29), vec3(0.32, 0.34, 0.45)) * v;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
