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
    float grow = floor(p.y * 8.94);
    float gsh = hash21(vec2(grow, floor(t * 9.50))) - 0.5;
    float gx = p.x + gsh * 0.45;
    v = sin(gx * 11.56 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 2.09));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.57) * p * 8.22;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.69;
	float v = smoothstep(rad, rad - 0.15, length(hf));
	vec3 col = palette(d * 1.09 + time * 0.27, vec3(0.59, 0.57, 0.56), vec3(0.47, 0.48, 0.46), vec3(0.79, 1.16, 1.01), vec3(0.12, 0.63, 0.58)) * v;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
