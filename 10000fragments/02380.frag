uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.35 + 0.21 * cos(sa * 8 + t * 2.20 + ph);
    v = sin((sr - petal) * 14.88);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.43;
	p = abs(p);
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.08, 0.17, 0.14), vec3(0.63, 0.78, 0.53), d);
	col = mod(col * 1.41, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
