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
    float petal = 0.69 + 0.10 * cos(sa * 6 + t * 1.97 + ph);
    v = sin((sr - petal) * 12.67);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(length(p) * 3.64 + time * 0.53) * p;
	p = fract(p * 2.32) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.13 + time * 0.10);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
