uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 9.88);
    float gsh = hash21(vec2(grow, floor(t * 6.32))) - 0.5;
    float gx = p.x + gsh * 0.38;
    v = sin(gx * 16.24 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 2.28));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = (floor(p * 12.6) + 0.5) / 12.6;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.88 + time * 0.19, vec3(0.55, 0.54, 0.43), vec3(0.41, 0.38, 0.36), vec3(1.22, 1.31, 0.75), vec3(0.84, 0.49, 0.27));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
