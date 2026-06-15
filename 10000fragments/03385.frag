uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 5.46) - 0.5;
    float rad = 0.30 + 0.12 * sin(t * 1.17 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 5.85 + vec2(t * 0.62, -t * 0.62) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.40;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.36; p = rot2(1.68) * p; }
	p = fract(p * 1.67) - 0.5;
	p = abs(p);
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.39);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.32 + time * 0.07, vec3(0.54, 0.43, 0.49), vec3(0.49, 0.37, 0.43), vec3(1.29, 0.80, 0.70), vec3(0.96, 0.22, 0.03));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.98));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
