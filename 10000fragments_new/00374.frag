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
    float grow = floor(p.y * 12.01);
    float gsh = hash21(vec2(grow, floor(t * 5.34))) - 0.5;
    float gx = p.x + gsh * 0.77;
    v = sin(gx * 11.69 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 1.52));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.07;
	p = fract(p * 2.31) - 0.5;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 6.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = abs(p);
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.47; p = rot2(2.30) * p; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.71 + time * 0.11, vec3(0.47, 0.48, 0.41), vec3(0.43, 0.50, 0.39), vec3(0.85, 1.37, 1.05), vec3(0.09, 0.87, 0.26));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
