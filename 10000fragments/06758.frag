uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 2.81, t * 0.98 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.36;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.27; p = rot2(0.64) * p; }
	p = rot2(length(p) * -1.94 + time * 0.77) * p;
	p = rot2(p.y * 1.51 + time * 0.34) * p;
	p = rot2(0.31) * p;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.17, 0.11, 0.15), vec3(0.77, 0.96, 0.85), d);
	col = mod(col * 2.14, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
