uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 7.96 + sr * 22.38 - t * 2.44 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ p = vec2(atan(p.y, p.x) * 1.74, length(p) * 4.34 - time * 0.20); }
	{ float fr = length(p); p *= 1.0 + 0.45 * fr * fr; }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.40, 0.05, 0.17), vec3(0.93, 0.86, 0.74), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
