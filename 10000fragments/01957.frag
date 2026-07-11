uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 3.42 + sr * 21.68 - t * 3.79 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.05;
	{ float fr = length(p); p *= 1.0 + -0.27 * fr * fr; }
	{ p = vec2(atan(p.y, p.x) * 1.54, length(p) * 4.48 - time * 0.61); }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.14, 0.21, 0.13), vec3(0.87, 0.54, 0.95), d);
	col = clamp((col - 0.5) * 1.89 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
