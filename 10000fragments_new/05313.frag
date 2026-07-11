uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 5.05, t * 1.66 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.27;
	p = abs(p);
	p = rot2(p.y * -1.23 + time * 1.04) * p;
	p = rot2(time * -1.57) * p;
	p = rot2(1.36) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.84 + time * 0.09, vec3(0.59, 0.58, 0.53), vec3(0.42, 0.41, 0.32), vec3(1.13, 1.32, 0.72), vec3(0.33, 0.55, 0.11));
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
