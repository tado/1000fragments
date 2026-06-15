uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 11.27 + t * 4.42 + ph) + sin(p.y * 16.64 - t * 4.99 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.14;
	{ p = vec2(atan(p.y, p.x) * 1.68, length(p) * 5.88 - time * 0.78); }
	p = rot2(p.y * 3.94 + time * 0.50) * p;
	{ float fr = length(p); p *= 1.0 + 0.22 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.60 + time * 0.02, vec3(0.57, 0.54, 0.56), vec3(0.32, 0.42, 0.45), vec3(0.75, 1.21, 0.78), vec3(0.49, 0.92, 0.56));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
