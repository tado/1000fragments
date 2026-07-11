uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.36 + 0.14 * cos(sa * 3 + t * 2.81 + ph);
    v = sin((sr - petal) * 10.18);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ p = vec2(atan(p.y, p.x) * 2.38, length(p) * 5.93 - time * 0.25); }
	p += vec2(-0.77, -0.20) * sin(length(p) * 5.12 - time * 1.47) * 0.22;
	p = rot2(2.33) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.22), field(p, time, 2.44));
	col = 0.5 + 0.5 * col;
	col = pow(clamp(col, 0.0, 1.0), vec3(0.89));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
