uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 14.24 + t * 3.63 + ph) + sin(p.y * 8.34 - t * 5.85 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.26; p = rot2(1.45) * p; }
	p = rot2(length(p) * -1.20 + time * 1.14) * p;
	p = rot2(0.31) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.81 + time * 0.14, vec3(0.57, 0.53, 0.49), vec3(0.31, 0.49, 0.36), vec3(1.30, 1.06, 1.15), vec3(0.37, 0.20, 0.77));
	col = mod(col * 1.88, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
