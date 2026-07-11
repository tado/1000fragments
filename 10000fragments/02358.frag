uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.57 + 0.12 * cos(sa * 9 + t * 0.86 + ph);
    v = sin((sr - petal) * 18.83);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.77;
	p = rot2(length(p) * 1.77 + time * 0.80) * p;
	p *= 3.25;
	p = rot2(0.48) * p;
	p += vec2(-0.41, 0.03) * sin(length(p) * 3.57 - time * 0.88) * 0.17;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.63 + time * 0.14);
	col = fract(col * 1.84);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
