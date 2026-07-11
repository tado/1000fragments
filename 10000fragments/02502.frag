uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.33 + 0.14 * cos(sa * 5 + t * 1.76 + ph);
    v = sin((sr - petal) * 12.47);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.06;
	p = rot2(time * -0.51) * p;
	p += vec2(-0.61, 0.47) * sin(length(p) * 4.08 - time * 1.96) * 0.39;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.23), field(p, time, 0.45));
	col = 0.5 + 0.5 * col;
	col = mod(col * 1.58, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
