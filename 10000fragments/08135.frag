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
    float grow = floor(p.y * 22.05);
    float gsh = hash21(vec2(grow, floor(t * 9.52))) - 0.5;
    float gx = p.x + gsh * 0.60;
    v = sin(gx * 14.23 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 4.67));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.16;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.61) * p * 8.70;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.63;
	float v = smoothstep(rad, rad - 0.08, length(hf));
	vec3 col = palette(d * 1.17 + time * 0.28, vec3(0.52, 0.51, 0.49), vec3(0.39, 0.43, 0.48), vec3(1.20, 0.76, 0.83), vec3(0.28, 0.82, 0.32)) * v;
	col = fract(col * 1.80);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
