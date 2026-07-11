uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.65 + 0.12 * cos(sa * 5 + t * 0.88 + ph);
    v = sin((sr - petal) * 14.16);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.45;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.46), field(p, time, 0.92));
	col = 0.5 + 0.5 * col;
	col = fract(col * 2.29);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
