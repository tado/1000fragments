uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 12.85 + vec2(t * 1.37, -t * 1.37) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.52;
	p *= 3.10;
	p += vec2(0.31, -0.72) * sin(length(p) * 5.60 - time * 0.71) * 0.17;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.49; p = rot2(2.50) * p; }
	p = rot2(p.y * 2.48 + time * 0.59) * p;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.51, 0.57, 1.15) + vec3(0.24, 0.04, 0.14);
	col = clamp((col - 0.5) * 1.88 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
