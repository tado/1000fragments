uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float pa = atan(p.y, p.x) + t * 0.11;
    float pk = 6.2831853 / 7.0;
    float pd = cos(floor(0.5 + pa / pk) * pk - pa) * length(p);
    v = sin(pd * 12.57 - t * 1.83 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = sin(p * 2.38 + time * 2.08) * 0.72;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.26, 0.31, 0.82) * (0.21 / (abs(d) + 0.03));
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 1.85 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
