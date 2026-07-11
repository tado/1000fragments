uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 5.26, t * 1.63 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.44;
	p = fract(p * 2.88) - 0.5;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.19; p = rot2(2.18) * p; }
	p += vec2(0.38, 0.96) * sin(length(p) * 2.92 - time * 1.92) * 0.34;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.38), field(p, time, 0.76));
	col = 0.5 + 0.5 * col;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.09));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
