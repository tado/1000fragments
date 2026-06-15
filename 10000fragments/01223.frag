uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 25.78 + sin(p.y * 3.53 + t * 4.40) * 2.87 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.54;
	p = fract(p * 1.22) - 0.5;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.45; p = rot2(0.63) * p; }
	{ p = vec2(atan(p.y, p.x) * 1.65, length(p) * 3.90 - time * 0.20); }
	p = abs(p) - 0.70;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.47, 0.67, 1.00) + vec3(0.16, 0.10, 0.24);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.31));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
