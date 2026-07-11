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
    float grow = floor(p.y * 16.99);
    float gsh = hash21(vec2(grow, floor(t * 4.18))) - 0.5;
    float gx = p.x + gsh * 0.98;
    v = sin(gx * 10.73 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 3.87));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.11;
	p = rot2(0.44) * p;
	p = rot2(time * -0.78) * p;
	p += vec2(0.31, 0.79) * sin(length(p) * 5.68 - time * 1.36) * 0.11;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.51 + time * 0.25, vec3(0.55, 0.41, 0.48), vec3(0.47, 0.43, 0.34), vec3(0.84, 0.77, 1.22), vec3(0.38, 0.32, 0.43));
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.63 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
