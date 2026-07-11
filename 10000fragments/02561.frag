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
    float petal = 0.57 + 0.12 * cos(sa * 7 + t * 2.99 + ph);
    v = sin((sr - petal) * 15.95);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.99;
	{ p = vec2(atan(p.y, p.x) * 2.39, length(p) * 3.40 - time * 0.77); }
	p *= 2.05;
	p += vec2(-0.58, 0.43) * sin(length(p) * 3.67 - time * 1.40) * 0.16;
	p = rot2(time * 0.44) * p;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.36 + time * 0.10);
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
