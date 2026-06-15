uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.57 + 0.15 * cos(sa * 8 + t * 0.70 + ph);
    v = sin((sr - petal) * 18.11);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.37;
	p += vec2(0.32, 0.54) * sin(length(p) * 4.93 - time * 1.56) * 0.21;
	p = rot2(time * 0.28) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.91), field(p, time, 1.81));
	col = 0.5 + 0.5 * col;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.27));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
