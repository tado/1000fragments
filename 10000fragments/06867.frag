uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 9.24, t * 0.53 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.38;
	{ float fr = length(p); p *= 1.0 + -0.36 * fr * fr; }
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.23; p = rot2(0.69) * p; }
	p = abs(p) - 0.59;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.80, 0.59, 0.55) + vec3(0.20, 0.26, 0.07);
	col = mod(col * 2.51, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
