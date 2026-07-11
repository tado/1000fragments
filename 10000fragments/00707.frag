uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 18.62 + sin(p.y * 2.42 + t * 1.29) * 3.46 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(length(p) * 2.99 + time * 0.66) * p;
	p = rot2(p.y * 3.78 + time * 0.42) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.81 + time * 0.24, vec3(0.45, 0.46, 0.56), vec3(0.35, 0.46, 0.43), vec3(1.20, 0.78, 0.91), vec3(0.34, 0.39, 0.87));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.01));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
