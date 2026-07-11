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
    float grow = floor(p.y * 20.48);
    float gsh = hash21(vec2(grow, floor(t * 5.83))) - 0.5;
    float gx = p.x + gsh * 0.82;
    v = sin(gx * 13.75 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 4.18));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.82;
	p.x += sin(p.y * 4.75 + time * 1.90) * 0.25;
	p *= 2.89;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.67, lr * 1.77 + time * -0.87); }
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.50; p = rot2(1.04) * p; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.69 + time * 0.01, vec3(0.54, 0.53, 0.51), vec3(0.38, 0.45, 0.38), vec3(1.35, 0.97, 1.04), vec3(0.33, 0.05, 0.59));
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
