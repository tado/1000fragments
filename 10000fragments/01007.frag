uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 13.11 + t * 4.22 + ph) + sin(p.y * 7.88 - t * 4.22 + ph)
        + sin((p.x + p.y) * 9.06 + t * 4.22 + ph) + sin(length(p) * 16.10 - t * 4.22 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.55;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.27; p = rot2(2.06) * p; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.69 + time * 0.18, vec3(0.42, 0.41, 0.55), vec3(0.34, 0.36, 0.47), vec3(0.96, 0.76, 1.37), vec3(0.16, 0.82, 0.39));
	col = clamp((col - 0.5) * 1.87 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
