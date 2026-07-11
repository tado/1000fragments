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
    float grow = floor(p.y * 21.69);
    float gsh = hash21(vec2(grow, floor(t * 8.73))) - 0.5;
    float gx = p.x + gsh * 0.59;
    v = sin(gx * 14.37 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 3.10));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.69;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.87) * p * 13.32;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.73;
	float v = smoothstep(rad, rad - 0.17, length(hf));
	vec3 col = palette(d * 1.37 + time * 0.23, vec3(0.50, 0.59, 0.46), vec3(0.37, 0.44, 0.39), vec3(0.94, 0.85, 1.25), vec3(0.62, 0.05, 0.43)) * v;
	col *= 0.82 + 0.11 * sin(gl_FragCoord.y * 1.46 + time * 14.41);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
