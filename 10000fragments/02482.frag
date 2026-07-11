uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.49 + 0.11 * cos(sa * 5 + t * 0.38 + ph);
    v = sin((sr - petal) * 19.11);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.30;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.47), field(p, time, 0.95));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
