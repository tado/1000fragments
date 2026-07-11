uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 11.09 + t * 3.92 + ph) + sin(p.y * 11.76 - t * 2.68 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.83;
	p = rot2(length(p) * 1.54 + time * 0.39) * p;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.60; p = rot2(2.12) * p; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.58 + time * 0.18, vec3(0.53, 0.56, 0.57), vec3(0.38, 0.44, 0.47), vec3(1.22, 1.12, 1.11), vec3(0.32, 0.05, 0.12));
	col = clamp((col - 0.5) * 1.46 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
