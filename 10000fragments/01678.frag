uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 32.12 - t * 6.05 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.71;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.53; p = rot2(1.94) * p; }
	p = rot2(length(p) * -3.76 + time * 0.71) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.51 + time * 0.04, vec3(0.59, 0.52, 0.54), vec3(0.39, 0.40, 0.38), vec3(0.75, 1.26, 0.95), vec3(0.74, 0.52, 0.28));
	col = clamp((col - 0.5) * 2.17 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
