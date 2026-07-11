uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.35 + 0.11 * cos(sa * 9.0 + t * 2.16 + ph);
    v = sin((sr - petal) * 11.17);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.99;
	{ p = vec2(atan(p.y, p.x) * 2.65, length(p) * 2.21 - time * 0.87); }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.82, 0.91, 0.84) * (0.19 / (abs(d) + 0.05));
	col = col / (1.0 + col);
	col *= 0.88 + 0.18 * sin(gl_FragCoord.y * 1.33 + time * 14.09);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
