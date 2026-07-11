uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.68 + 0.26 * cos(sa * 5 + t * 2.08 + ph);
    v = sin((sr - petal) * 18.20);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.95;
	p = rot2(time * -0.42) * p;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.25, lr * 2.94 + time * -0.40); }
	p = rot2(p.y * -3.99 + time * 0.60) * p;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.29, 0.42, 0.45), vec3(0.53, 0.86, 0.86), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
