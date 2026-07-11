uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 6.09 + sin(p.y * 2.43 + t * 0.92) * 4.18 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.07;
	p *= 2.85;
	p += vec2(-0.85, 0.47) * sin(length(p) * 3.10 - time * 1.30) * 0.27;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.36; p = rot2(2.51) * p; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.93 + time * 0.20, vec3(0.43, 0.46, 0.54), vec3(0.44, 0.42, 0.46), vec3(1.01, 1.39, 0.81), vec3(0.16, 0.98, 0.10));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.18));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
