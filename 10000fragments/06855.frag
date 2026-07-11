uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 6.99, t * 0.85 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.05;
	{ p = vec2(atan(p.y, p.x) * 2.88, length(p) * 3.17 - time * 0.53); }
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.45; p = rot2(2.42) * p; }
	p = rot2(p.y * 2.82 + time * 0.79) * p;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.63, 1.28, 0.64) + vec3(0.20, 0.17, 0.04);
	col = fract(col * 2.06);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
