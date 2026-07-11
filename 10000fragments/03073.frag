uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 13.89 + vec2(t * 2.37, -t * 2.37) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.47;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.47; p = rot2(1.41) * p; }
	p = rot2(2.53) * p;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.10, 0.08, 0.21), vec3(0.55, 0.79, 0.80), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
