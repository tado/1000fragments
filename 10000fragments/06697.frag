uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 7.24, t * 1.56 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.04;
	p += vec2(-0.57, -0.01) * sin(length(p) * 2.98 - time * 1.50) * 0.11;
	{ p = vec2(atan(p.y, p.x) * 1.24, length(p) * 2.30 - time * 0.39); }
	p = rot2(time * -1.30) * p;
	p = rot2(p.y * 3.53 + time * 0.50) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.57 + time * 0.02, vec3(0.59, 0.40, 0.59), vec3(0.41, 0.48, 0.36), vec3(0.83, 1.30, 1.02), vec3(0.96, 0.27, 0.92));
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
