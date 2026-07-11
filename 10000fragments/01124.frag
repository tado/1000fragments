uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 6.37 + t * 3.17 + ph) + sin(p.y * 3.18 - t * 3.17 + ph)
        + sin((p.x + p.y) * 11.20 + t * 3.17 + ph) + sin(length(p) * 14.52 - t * 3.17 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = fract(p * 2.13) - 0.5;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.18; p = rot2(0.32) * p; }
	p = abs(p);
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.87 + time * 0.22, vec3(0.51, 0.43, 0.58), vec3(0.42, 0.42, 0.48), vec3(0.96, 1.07, 1.08), vec3(0.85, 0.40, 0.26));
	col = clamp((col - 0.5) * 1.85 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
