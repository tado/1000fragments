uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 13.14 + sin(p.y * 1.38 + t * 5.69) * 4.31 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.55; p = rot2(1.85) * p; }
	p = rot2(length(p) * -3.20 + time * 1.19) * p;
	p += vec2(-0.16, -0.23) * sin(length(p) * 2.21 - time * 1.55) * 0.26;
	p = rot2(p.y * 2.64 + time * 0.74) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.11), field(p, time, 2.22));
	col = 0.5 + 0.5 * col;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.52));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
