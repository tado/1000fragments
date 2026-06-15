uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.43 + 0.16 * cos(sa * 9 + t * 1.32 + ph);
    v = sin((sr - petal) * 17.82);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.52;
	{ float fr = length(p); p *= 1.0 + -0.75 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.90 + time * 0.11);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
