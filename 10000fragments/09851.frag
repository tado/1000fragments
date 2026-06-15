uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 2.70, t * 2.08 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(0.14, -0.63) * sin(length(p) * 5.38 - time * 1.56) * 0.13;
	{ float fr = length(p); p *= 1.0 + 0.20 * fr * fr; }
	{ p = vec2(atan(p.y, p.x) * 2.16, length(p) * 3.97 - time * 0.23); }
	p = abs(p);
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.05, 1.43, 1.51) + vec3(0.05, 0.24, 0.18);
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
