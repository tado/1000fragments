uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 9.66 + t * 4.10 + ph) + sin(p.y * 7.60 - t * 5.18 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.77;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.45; p = rot2(1.07) * p; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.11 + time * 0.15, vec3(0.45, 0.59, 0.49), vec3(0.45, 0.44, 0.47), vec3(0.97, 1.11, 1.15), vec3(0.94, 0.97, 1.00));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
