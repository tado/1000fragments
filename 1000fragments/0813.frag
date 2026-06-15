uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 6.51 + sin(p.y * 2.41 + t * 0.82) * 2.59 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.34;
	p = abs(p);
	p += vec2(-0.31, 0.37) * sin(length(p) * 3.47 - time * 1.54) * 0.23;
	p = rot2(time * -1.00) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.37 + time * 0.08, vec3(0.47, 0.41, 0.47), vec3(0.42, 0.35, 0.48), vec3(0.76, 1.33, 0.93), vec3(0.91, 0.74, 0.75));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.97));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
