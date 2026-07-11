uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 17.42 + t * 4.75 + ph) + sin(p.y * 12.75 - t * 0.91 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.56;
	p = rot2(2.54) * p;
	p *= 2.15;
	{ float fr = length(p); p *= 1.0 + -0.26 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.75 + time * 0.30, vec3(0.54, 0.46, 0.55), vec3(0.35, 0.35, 0.50), vec3(1.14, 1.11, 1.24), vec3(0.22, 0.55, 0.92));
	col = clamp((col - 0.5) * 1.76 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
