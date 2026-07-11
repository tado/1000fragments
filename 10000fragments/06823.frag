uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 2.80, t * 2.19 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.72;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.45; p = rot2(2.22) * p; }
	p = fract(p * 2.87) - 0.5;
	p *= 1.29;
	p = rot2(length(p) * 2.55 + time * 1.11) * p;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.51, 0.75, 1.03) + vec3(0.02, 0.01, 0.01);
	col = mod(col * 1.58, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
