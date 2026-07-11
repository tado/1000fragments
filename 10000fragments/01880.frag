uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 9.66 + sr * 15.57 - t * 1.48 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = abs(p) - 0.30;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.18, lr * 1.57 + time * -0.67); }
	p = rot2(2.78) * p;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.44, 0.26, 0.36), vec3(0.53, 0.79, 0.52), d);
	col = mod(col * 1.76, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
