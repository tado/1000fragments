uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.39 + 0.29 * cos(sa * 4 + t * 0.64 + ph);
    v = sin((sr - petal) * 6.82);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.49;
	p += vec2(0.50, 0.46) * sin(length(p) * 3.17 - time * 0.91) * 0.30;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.14, 0.15, 0.34), vec3(0.83, 0.74, 0.51), d);
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
