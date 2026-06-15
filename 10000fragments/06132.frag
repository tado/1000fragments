uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 17.69 + sin(p.y * 1.69 + t * 2.57) * 2.96 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ p = vec2(atan(p.y, p.x) * 2.29, length(p) * 3.38 - time * 0.79); }
	p = rot2(time * -0.42) * p;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.11; p = rot2(2.36) * p; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.48), field(p, time, 0.95));
	col = 0.5 + 0.5 * col;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.06));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
