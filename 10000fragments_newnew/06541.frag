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
    v = 0.5 * (sin(p.x * 13.68 + t * 1.03 + ph) + sin(p.y * 2.23 - t * 2.97 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 12.93);
    float gsh = hash21(vec2(grow, floor(t * 4.82))) - 0.5;
    float gx = p.x + gsh * 0.38;
    v = sin(gx * 19.54 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 3.14));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.89;
	p = vec2(p.x * p.x - p.y * p.y, 2.0 * p.x * p.y) * 1.05;
	p = rot2(2.50) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.02);
	float d = d1 * d2;
	vec3 col = palette(d * 0.69 + time * 0.24, vec3(0.58, 0.45, 0.50), vec3(0.43, 0.45, 0.32), vec3(0.93, 1.04, 0.96), vec3(0.53, 0.18, 0.20));
	col *= 0.83 + 0.14 * sin(gl_FragCoord.y * 2.20 + time * 17.22);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
