uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 11.09 + vec2(t * 2.49, -t * 2.49) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.54;
	{ p = vec2(atan(p.y, p.x) * 1.69, length(p) * 3.92 - time * 0.76); }
	p = rot2(2.95) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.53 + time * 0.06, vec3(0.44, 0.46, 0.51), vec3(0.32, 0.48, 0.32), vec3(1.11, 0.70, 0.83), vec3(0.69, 0.58, 0.72));
	col = mod(col * 1.47, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
