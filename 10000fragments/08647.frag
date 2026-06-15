uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 7.01 + t * 2.58 + ph) + sin(p.y * 8.45 - t * 2.58 + ph)
        + sin((p.x + p.y) * 10.43 + t * 2.58 + ph) + sin(length(p) * 10.02 - t * 2.58 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(length(p) * -3.01 + time * 0.64) * p;
	p = rot2(2.28) * p;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.36; p = rot2(2.42) * p; }
	p = abs(p) - 0.67;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.12 + time * 0.27, vec3(0.58, 0.45, 0.54), vec3(0.45, 0.30, 0.47), vec3(1.36, 1.26, 1.28), vec3(0.70, 0.97, 0.61));
	col = mod(col * 2.71, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
