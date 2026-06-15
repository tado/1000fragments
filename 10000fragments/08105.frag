uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.50 + 0.20 * cos(sa * 5 + t * 2.52 + ph);
    v = sin((sr - petal) * 15.46);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.73;
	p = rot2(time * 1.17) * p;
	p += vec2(-0.81, 0.04) * sin(length(p) * 2.93 - time * 1.24) * 0.20;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.82), field(p, time, 1.65));
	col = 0.5 + 0.5 * col;
	col = fract(col * 1.64);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
