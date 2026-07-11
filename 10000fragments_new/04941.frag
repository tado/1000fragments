uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.31 + 0.15 * cos(sa * 7.0 + t * 2.03 + ph);
    v = sin((sr - petal) * 14.18);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.68;
	p += vec2(-0.99, 0.88) * sin(length(p) * 2.44 - time * 0.82) * 0.21;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.27), field(p, time, 2.55));
	col = 0.5 + 0.5 * col;
	col = mod(col * 1.67, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
