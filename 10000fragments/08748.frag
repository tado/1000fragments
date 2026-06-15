uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 14.38 + sin(p.y * 4.50 + t * 2.20) * 3.12 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.32;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.42; p = rot2(1.56) * p; }
	p = rot2(time * -0.68) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.80 + time * 0.01, vec3(0.46, 0.60, 0.44), vec3(0.46, 0.47, 0.40), vec3(0.79, 1.06, 0.71), vec3(0.86, 0.83, 0.13));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.89));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
