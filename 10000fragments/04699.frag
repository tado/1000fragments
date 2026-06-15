uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 3.18 + t * 1.74 + ph) + sin(p.y * 10.41 - t * 2.96 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.63;
	p = rot2(p.y * -1.27 + time * 0.47) * p;
	{ p = vec2(atan(p.y, p.x) * 1.13, length(p) * 4.56 - time * 0.39); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.66 + time * 0.15, vec3(0.59, 0.46, 0.50), vec3(0.42, 0.37, 0.46), vec3(1.08, 1.16, 1.20), vec3(0.18, 0.87, 0.78));
	col = fract(col * 1.43);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
