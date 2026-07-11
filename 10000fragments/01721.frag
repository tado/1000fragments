uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 34.39 - t * 4.36 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(length(p) * 1.44 + time * 0.30) * p;
	p *= 2.01;
	{ p = vec2(atan(p.y, p.x) * 1.63, length(p) * 4.48 - time * 0.51); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.55 + time * 0.27, vec3(0.52, 0.45, 0.54), vec3(0.46, 0.44, 0.50), vec3(1.33, 1.30, 0.76), vec3(0.51, 0.55, 0.48));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
