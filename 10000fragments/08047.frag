uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.38 + 0.30 * cos(sa * 4 + t * 2.61 + ph);
    v = sin((sr - petal) * 7.54);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.46;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.27, 0.94, 0.89) + vec3(0.10, 0.18, 0.19);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
