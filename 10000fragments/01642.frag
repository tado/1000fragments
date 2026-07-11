uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 35.74 - t * 7.93 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.41; p = rot2(2.31) * p; }
	p = rot2(p.y * -3.03 + time * 0.26) * p;
	p = rot2(length(p) * 3.46 + time * 1.01) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.17 + time * 0.01, vec3(0.49, 0.53, 0.58), vec3(0.44, 0.32, 0.38), vec3(1.15, 1.31, 0.81), vec3(0.65, 0.64, 0.76));
	col = fract(col * 1.61);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
