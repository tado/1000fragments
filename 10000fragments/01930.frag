uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 22.54 - t * 3.68 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(-0.24, -0.80) * sin(length(p) * 5.46 - time * 0.72) * 0.36;
	p = rot2(time * 0.49) * p;
	{ p = vec2(atan(p.y, p.x) * 1.40, length(p) * 5.28 - time * 0.76); }
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.11; p = rot2(2.56) * p; }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.88 + time * 0.17);
	col = clamp((col - 0.5) * 1.65 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
