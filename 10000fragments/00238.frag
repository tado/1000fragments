uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.45 + 0.10 * cos(sa * 4 + t * 1.98 + ph);
    v = sin((sr - petal) * 16.16);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.32;
	p = rot2(length(p) * -3.61 + time * 1.16) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.95), field(p, time, 1.90));
	col = 0.5 + 0.5 * col;
	col = fract(col * 2.15);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
