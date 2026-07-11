uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 8.77, t * 1.91 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.79;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.13; p = rot2(0.53) * p; }
	p *= 2.63;
	{ p = vec2(atan(p.y, p.x) * 1.26, length(p) * 4.37 - time * 0.34); }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.53, 1.07, 0.88) + vec3(0.16, 0.08, 0.21);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
