uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.33 + 0.20 * cos(sa * 8 + t * 1.30 + ph);
    v = sin((sr - petal) * 6.72);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.81;
	{ float fr = length(p); p *= 1.0 + -0.57 * fr * fr; }
	p = rot2(time * -0.21) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.05), field(p, time, 2.11));
	col = 0.5 + 0.5 * col;
	col = mod(col * 2.39, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
