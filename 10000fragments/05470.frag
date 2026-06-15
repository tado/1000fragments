uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.62 + 0.19 * cos(sa * 5 + t * 2.68 + ph);
    v = sin((sr - petal) * 14.75);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = fract(p * 1.46) - 0.5;
	{ float fr = length(p); p *= 1.0 + 0.35 * fr * fr; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.39), field(p, time, 2.79));
	col = 0.5 + 0.5 * col;
	col = clamp((col - 0.5) * 2.06 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
