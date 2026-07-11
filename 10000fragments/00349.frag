uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 4.87 + t * 3.89 + ph) + sin(p.y * 14.39 - t * 1.08 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 11.03 + sin(p.y * 4.14 + t * 3.37) * 2.41 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.66;
	p = rot2(1.05) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.34);
	float d = d1 + d2;
	vec3 col = palette(d * 0.50 + time * 0.29, vec3(0.52, 0.57, 0.41), vec3(0.35, 0.41, 0.38), vec3(0.85, 0.84, 1.10), vec3(0.06, 0.67, 0.97));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.21));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
