uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.33 + 0.13 * cos(sa * 7 + t * 1.17 + ph);
    v = sin((sr - petal) * 17.42);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.57;
	p += vec2(-0.51, 0.78) * sin(length(p) * 5.31 - time * 0.59) * 0.38;
	p = abs(p) - 0.68;
	p = fract(p * 1.86) - 0.5;
	{ p = vec2(atan(p.y, p.x) * 1.03, length(p) * 4.55 - time * 0.52); }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.95 + time * 0.09);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.94));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
