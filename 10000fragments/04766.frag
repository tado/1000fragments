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
    float petal = 0.57 + 0.18 * cos(sa * 5 + t * 0.78 + ph);
    v = sin((sr - petal) * 10.07);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.75;
	p = rot2(length(p) * 3.02 + time * 0.89) * p;
	p = fract(p * 2.53) - 0.5;
	p += vec2(-0.17, -0.58) * sin(length(p) * 3.68 - time * 1.52) * 0.11;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.98 + time * 0.16);
	col = clamp((col - 0.5) * 2.15 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
