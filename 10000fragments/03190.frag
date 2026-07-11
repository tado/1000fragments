uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 9.01 + vec2(t * 0.64, -t * 0.64) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(time * 0.66) * p;
	{ float fr = length(p); p *= 1.0 + 0.39 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.02 + time * 0.26, vec3(0.45, 0.47, 0.49), vec3(0.42, 0.32, 0.50), vec3(1.19, 1.12, 1.32), vec3(0.87, 0.37, 0.36));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.57));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
