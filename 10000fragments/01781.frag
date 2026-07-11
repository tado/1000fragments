uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 36.09 - t * 1.01 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.93;
	p = rot2(1.51) * p;
	{ p = vec2(atan(p.y, p.x) * 1.85, length(p) * 2.50 - time * 0.38); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.80 + time * 0.07, vec3(0.50, 0.44, 0.54), vec3(0.41, 0.33, 0.41), vec3(1.25, 1.05, 1.22), vec3(0.79, 0.59, 0.54));
	col = clamp((col - 0.5) * 1.37 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
