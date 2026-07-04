uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 3.87 + vec2(t * 1.73, -t * 1.91) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.29;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.47; p = rot2(0.77) * p; }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.77, 0.99, 0.77) * (0.05 / (abs(d) + 0.08));
	col = col / (1.0 + col);
	col = mod(col * 2.91, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
