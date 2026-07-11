uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 11.17 + sr * 20.96 - t * 3.97 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.79;
	{ p = vec2(atan(p.y, p.x) * 2.21, length(p) * 5.49 - time * 0.65); }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.65, 0.28, 0.56) * (0.10 / (abs(d) + 0.09));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
