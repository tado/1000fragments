uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 4.22, t * 1.83 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p += vec2(-0.20, 0.48) * sin(length(p) * 4.34 - time * 1.24) * 0.26;
	p.x += sin(p.y * 4.63 + time * 2.21) * 0.14;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.48; p = rot2(1.04) * p; }
	p *= 1.39;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.05, 1.51, 1.14) + vec3(0.19, 0.23, 0.09);
	col = clamp((col - 0.5) * 2.19 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
