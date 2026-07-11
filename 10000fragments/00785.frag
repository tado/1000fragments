uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 21.21 + sin(p.y * 3.88 + t * 5.26) * 2.49 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ p = vec2(atan(p.y, p.x) * 2.18, length(p) * 2.37 - time * 0.38); }
	{ float fr = length(p); p *= 1.0 + 0.50 * fr * fr; }
	p = rot2(time * -0.32) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.65 + time * 0.01, vec3(0.57, 0.44, 0.43), vec3(0.43, 0.43, 0.45), vec3(1.27, 0.96, 1.25), vec3(0.21, 0.95, 0.03));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.80));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
