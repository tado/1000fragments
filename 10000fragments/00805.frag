uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 17.95 + sin(p.y * 3.99 + t * 4.25) * 3.31 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.26; p = rot2(1.71) * p; }
	p = rot2(time * -0.93) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.92 + time * 0.10, vec3(0.41, 0.49, 0.55), vec3(0.40, 0.40, 0.41), vec3(0.92, 1.24, 1.00), vec3(0.39, 0.75, 0.91));
	col = fract(col * 2.31);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
