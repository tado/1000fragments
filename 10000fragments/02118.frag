uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 7.15 + sr * 17.52 - t * 3.47 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ p = vec2(atan(p.y, p.x) * 1.29, length(p) * 3.21 - time * 0.49); }
	p += vec2(-0.97, 0.55) * sin(length(p) * 4.58 - time * 0.88) * 0.12;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.86), field(p, time, 1.72));
	col = 0.5 + 0.5 * col;
	col = clamp((col - 0.5) * 2.00 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
