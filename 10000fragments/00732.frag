uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 5.93 + sin(p.y * 3.83 + t * 1.44) * 3.47 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.25;
	p = rot2(0.38) * p;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.38; p = rot2(1.56) * p; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.90 + time * 0.06, vec3(0.46, 0.44, 0.45), vec3(0.44, 0.44, 0.49), vec3(1.17, 0.94, 1.39), vec3(0.37, 0.27, 0.12));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
