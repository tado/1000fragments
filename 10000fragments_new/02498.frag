uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 6.09, t * 1.86 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.49;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.45; p = rot2(0.92) * p; }
	p = fract(p * 2.60) - 0.5;
	p = rot2(0.43) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.15), field(p, time, 2.30));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
