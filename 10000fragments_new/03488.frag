uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 9.38, t * 1.08 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.37;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.28; p = rot2(1.00) * p; }
	p = rot2(length(p) * -3.35 + time * 0.38) * p;
	p = rot2(time * 0.68) * p;
	p = rot2(2.20) * p;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.68, 0.55, 1.38) + vec3(0.04, 0.17, 0.29);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
