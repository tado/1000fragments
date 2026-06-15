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
    float petal = 0.46 + 0.18 * cos(sa * 8 + t * 0.89 + ph);
    v = sin((sr - petal) * 8.63);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.30;
	p = rot2(p.y * -1.68 + time * 0.67) * p;
	p = abs(p) - 0.51;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.50 + time * 0.18);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
