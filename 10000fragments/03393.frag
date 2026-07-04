uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 11.46 + sin(p.y * 3.22 + t * 3.62) * 4.52 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.29;
	p *= 1.0 + 0.25 * sin(time * 2.90);
	p = rot2(length(p) * 1.11 + time * 0.64) * p;
	p = vec2(p.x * p.x - p.y * p.y, 2.0 * p.x * p.y) * 1.01;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.75 + time * 0.29, vec3(0.59, 0.46, 0.48), vec3(0.33, 0.38, 0.48), vec3(1.21, 1.33, 0.88), vec3(0.60, 0.06, 0.30));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
