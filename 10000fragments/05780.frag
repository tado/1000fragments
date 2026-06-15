uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.55 + 0.12 * cos(sa * 6 + t * 0.47 + ph);
    v = sin((sr - petal) * 11.68);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.91;
	{ p = vec2(atan(p.y, p.x) * 2.60, length(p) * 2.40 - time * 0.69); }
	p *= 1.83;
	p += vec2(0.72, 0.74) * sin(length(p) * 5.18 - time * 1.15) * 0.10;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.10, 0.32, 0.10), vec3(0.63, 0.57, 0.81), d);
	col = mod(col * 2.02, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
