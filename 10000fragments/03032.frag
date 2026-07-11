uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 8.04 + vec2(t * 1.01, -t * 1.01) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.21;
	p = rot2(length(p) * -2.70 + time * 0.21) * p;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.34; p = rot2(0.49) * p; }
	p *= 1.66;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.51 + time * 0.10, vec3(0.47, 0.45, 0.57), vec3(0.33, 0.38, 0.30), vec3(1.23, 0.79, 0.86), vec3(0.15, 0.14, 0.38));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
