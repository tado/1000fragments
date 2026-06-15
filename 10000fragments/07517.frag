uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 7.61 + vec2(t * 0.39, -t * 0.39) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.93;
	p = fract(p * 1.48) - 0.5;
	{ p = vec2(atan(p.y, p.x) * 1.43, length(p) * 4.92 - time * 0.37); }
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.34; p = rot2(0.60) * p; }
	p = rot2(length(p) * -3.87 + time * 0.84) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.76), field(p, time, 1.52));
	col = 0.5 + 0.5 * col;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.77));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
