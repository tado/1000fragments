uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 11.97);
    float gsh = hash21(vec2(grow, floor(t * 8.81))) - 0.5;
    float gx = p.x + gsh * 0.69;
    v = sin(gx * 11.96 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 3.79));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p.x += sin(p.y * 3.77 + time * 1.99) * 0.38;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.43 + time * 0.11, vec3(0.55, 0.52, 0.41), vec3(0.43, 0.44, 0.41), vec3(1.13, 1.22, 1.20), vec3(0.13, 0.63, 0.11));
	col *= 0.89 + 0.14 * sin(gl_FragCoord.y * 2.63 + time * 13.29);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
