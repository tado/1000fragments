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
    float grow = floor(p.y * 20.65);
    float gsh = hash21(vec2(grow, floor(t * 2.93))) - 0.5;
    float gx = p.x + gsh * 1.12;
    v = sin(gx * 8.01 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 4.51));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.09;
	p.y += sin(p.x * 2.36 + time * 2.35) * 0.12;
	p *= 3.00;
	p = abs(p) - 0.59;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.45; p = rot2(1.14) * p; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.63 + time * 0.01, vec3(0.55, 0.53, 0.51), vec3(0.38, 0.30, 0.33), vec3(1.26, 1.31, 0.87), vec3(0.32, 0.83, 0.50));
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
