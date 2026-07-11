uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.48 + 0.25 * cos(sa * 8.0 + t * 0.96 + ph);
    v = sin((sr - petal) * 7.69);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.37;
	p += vec2(0.10, 0.75) * sin(length(p) * 2.77 - time * 1.76) * 0.20;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.43, 0.53, 0.22) * (0.11 / (abs(d) + 0.06));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
