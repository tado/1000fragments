uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 5.67 + sin(p.y * 3.92 + t * 4.93) * 1.76 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(time * -0.86) * p;
	p = abs(p);
	p += vec2(-0.94, -0.43) * sin(length(p) * 3.81 - time * 0.95) * 0.32;
	{ float fr = length(p); p *= 1.0 + 0.35 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.67 + time * 0.16, vec3(0.55, 0.51, 0.47), vec3(0.47, 0.34, 0.42), vec3(1.17, 1.18, 1.03), vec3(0.32, 0.69, 0.87));
	col = clamp((col - 0.5) * 1.80 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
