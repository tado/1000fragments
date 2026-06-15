uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 21.03 - t * 8.64 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.95;
	p = fract(p * 2.43) - 0.5;
	p = rot2(length(p) * 1.64 + time * 1.01) * p;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.28; p = rot2(1.10) * p; }
	{ p = vec2(atan(p.y, p.x) * 2.26, length(p) * 5.10 - time * 0.77); }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.70 + time * 0.19);
	col = clamp((col - 0.5) * 1.58 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
