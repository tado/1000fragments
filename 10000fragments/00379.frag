uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 11.66 + sin(p.y * 1.90 + t * 4.37) * 3.77 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.10;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.37; p = rot2(1.82) * p; }
	p = rot2(p.y * 1.36 + time * 0.92) * p;
	p = rot2(0.84) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.90 + time * 0.01, vec3(0.44, 0.58, 0.56), vec3(0.42, 0.45, 0.36), vec3(1.14, 1.02, 0.73), vec3(0.91, 0.81, 0.89));
	col = fract(col * 2.20);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
