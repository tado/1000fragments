uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 11.98 + t * 5.38 + ph) + sin(p.y * 15.26 - t * 4.13 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.98;
	p = rot2(length(p) * -3.68 + time * 0.80) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.21 + time * 0.11, vec3(0.52, 0.59, 0.55), vec3(0.46, 0.35, 0.48), vec3(0.74, 0.99, 1.12), vec3(0.91, 0.35, 0.29));
	col = mod(col * 1.70, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
