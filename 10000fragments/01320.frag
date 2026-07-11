uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 9.65 + t * 3.19 + ph) + sin(p.y * 13.32 - t * 3.19 + ph)
        + sin((p.x + p.y) * 5.53 + t * 3.19 + ph) + sin(length(p) * 8.87 - t * 3.19 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(time * -1.18) * p;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.11; p = rot2(1.76) * p; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.53 + time * 0.25, vec3(0.47, 0.43, 0.56), vec3(0.42, 0.39, 0.47), vec3(1.21, 1.14, 0.96), vec3(0.18, 0.28, 0.12));
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
